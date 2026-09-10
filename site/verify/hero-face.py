import asyncio, sys
from playwright.async_api import async_playwright

# His face in each source crop, as fractions of that crop. Read off the
# original 6670x10000 frame: his head spans x 41-54%, y 19-31% of the source.
# The wide crop is source y 8-45%, so the head maps to y 30-62% of it; the
# tall crop is source y 6-93%, so it maps to y 15-29%.
FACE = {"juan-campos-hero-wide.jpg": (0.40, 0.28, 0.56, 0.64),
        "juan-campos-hero-tall.jpg": (0.40, 0.13, 0.56, 0.31)}

JS = """(face) => {
  const img=document.querySelector('.opener-img');
  const name=img.currentSrc.split('/').pop();
  const f=face[name]; if(!f) return {err:'no face box for '+name};
  const r=img.getBoundingClientRect();
  const nw=img.naturalWidth, nh=img.naturalHeight;
  // replicate object-fit: cover + object-position
  const scale=Math.max(r.width/nw, r.height/nh);
  const dw=nw*scale, dh=nh*scale;
  const cs=getComputedStyle(img);
  const [px,py]=cs.objectPosition.split(' ').map(v=>parseFloat(v)/100);
  const offX=(r.width-dw)*px, offY=(r.height-dh)*py;
  const box={ x:r.left+offX+f[0]*dw, y:r.top+offY+f[1]*dh,
              r:r.left+offX+f[2]*dw, b:r.top+offY+f[3]*dh };
  const hits=[];
  for(const sel of ['.opener-display','.opener-lead','.stat-fig','.stat-label','.opener-meta','.opener-pill']){
    const e=document.querySelector(sel); if(!e) continue;
    const w=document.createTreeWalker(e, NodeFilter.SHOW_TEXT); let n;
    while((n=w.nextNode())){
      if(!n.textContent.trim()) continue;
      const rg=document.createRange(); rg.selectNodeContents(n);
      for(const g of rg.getClientRects()){
        if(g.width<2||g.height<2) continue;
        const ox=Math.min(g.right,box.r)-Math.max(g.left,box.x);
        const oy=Math.min(g.bottom,box.b)-Math.max(g.top,box.y);
        if(ox>0&&oy>0) hits.push({sel, text:n.textContent.trim().slice(0,28),
                                  overlapPx:Math.round(ox*oy)});
      }
    }
  }
  return {img:name, face:{x:Math.round(box.x),y:Math.round(box.y),r:Math.round(box.r),b:Math.round(box.b)}, hits};
}"""

async def main():
    bad=0
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for w,h in [(1920,1080),(1680,1050),(1440,900),(1280,800),(1024,768),
                    (900,1200),(768,1024),(430,932),(390,844),(320,720),(844,390)]:
            c=await b.new_context(viewport={"width":w,"height":h}); pg=await c.new_page()
            await pg.goto("http://127.0.0.1:4321/", wait_until="networkidle")
            await pg.wait_for_timeout(2200)
            r=await pg.evaluate(JS, FACE)
            hits=r.get('hits',[])
            merged={}
            for x in hits: merged[x['sel']]=merged.get(x['sel'],0)+x['overlapPx']
            if merged:
                bad+=1
                print(f"  FAIL {w}x{h} {r['img']:<26} type over face: {merged}")
            else:
                print(f"  OK   {w}x{h} {r['img']:<26} face box {r['face']}")
            await c.close()
        await b.close()
    print(f"\nTYPE-OVER-FACE FAILURES: {bad}")
    sys.exit(1 if bad else 0)
asyncio.run(main())

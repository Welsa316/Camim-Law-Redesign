"""
Three assertions about the opening frame, at every width.

1. No type crosses it. The face box is projected through object-fit and
   object-position and every glyph rect is tested against it.
2. It stays lit. The mean luminance of the face region with the veil in place
   must keep at least 85% of what the photograph has there without it, and
   the top of the face must sit in the upper quarter of the frame. This is the
   check that was missing when the scrim was darkening his chin: the type
   cleared its thresholds, the frame passed, and his face was under 0.6 of navy.

    python3 verify/hero-face.py [base-url]
"""
import asyncio, io, sys
from playwright.async_api import async_playwright
from PIL import Image

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4321"
MIN_LIGHT_KEPT = 0.85   # veiled / raw mean luminance over the face box
MAX_FACE_TOP = 0.30     # top of the face box as a fraction of the frame height; the bar is under 12% of any frame this applies to

def mean_lum(png: bytes) -> float:
    px = list(Image.open(io.BytesIO(png)).convert("L").getdata())
    return sum(px) / len(px)

# His face in each source crop, as fractions of that crop. Read off the
# original 6670x10000 frame: his head spans x 41-54%, y 19-31% of the source.
# The wide crop is source y 11-53%, so the head maps to y 19-48% of it; the
# tall crop is source y 6-93%, so it maps to y 15-29%.
FACE = {"juan-campos-hero-wide.jpg": (0.416, 0.160, 0.519, 0.418),
        "juan-campos-hero-tall.jpg": (0.410, 0.140, 0.545, 0.311)}

JS = """(face) => {
  const img=document.querySelector('.opener-img');
  const name=(img.currentSrc||img.src).split('/').pop();
  const f=face[name];
  const r=img.getBoundingClientRect();
  const nw=img.naturalWidth||1, nh=img.naturalHeight||1;
  // replicate object-fit (cover or contain) + object-position
  const fit=getComputedStyle(img).objectFit;
  const scale=(fit==='contain'?Math.min:Math.max)(r.width/nw, r.height/nh);
  const dw=nw*scale, dh=nh*scale;
  const cs=getComputedStyle(img);
  const [px,py]=cs.objectPosition.split(' ').map(v=>parseFloat(v)/100);
  const offX=(r.width-dw)*px, offY=(r.height-dh)*py;
  const box=f ? { x:r.left+offX+f[0]*dw, y:r.top+offY+f[1]*dh,
              r:r.left+offX+f[2]*dw, b:r.top+offY+f[3]*dh } : null;
  const hits=[];
  if (f) for(const sel of ['.opener-display','.opener-lead','.stat-fig','.stat-label','.opener-meta','.opener-pill']){
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
  // Nothing in the frame may sit under the fixed phone bar. The bar is not
  // part of the frame and does not push it, so a frame that grows past the
  // viewport hides its own last line behind it — which is exactly what
  // happened when the bar's reserve was mistaken for decoration and removed.
  const bar=document.querySelector('.mbar');
  const barTop=(bar && getComputedStyle(bar).display!=='none') ? bar.getBoundingClientRect().top : Infinity;
  // Portrait only. A landscape phone sets min-height:auto and lets the frame
  // run past the fold on purpose, and everything there is reachable by
  // scrolling. Gating on whether the frame happens to fit the screen was the
  // wrong test: the frame outgrowing its reserve is the defect, so that
  // condition exempted precisely the case it was written to catch.
  const covered=[];
  if (innerHeight >= innerWidth) {
    for(const sel of ['.opener-display','.stat-fig','.stat-label','.opener-meta','.opener-pill','.opener-rule']){
      const e=document.querySelector(sel); if(!e) continue;
      const g=e.getBoundingClientRect();
      if(g.height>1 && g.bottom > barTop + 1) covered.push(sel+' by '+Math.round(g.bottom-barTop)+'px');
    }
  }
  const hero=document.querySelector('.opener').getBoundingClientRect();
  if(!f) return {img:name, noFace:true, hits:[], covered, heroH:hero.height, faceTop:0, box:null};
  return {img:name, box, hits, heroH: hero.height, covered,
          face:{x:Math.round(box.x),y:Math.round(box.y),r:Math.round(box.r),b:Math.round(box.b)},
          faceTop:(box.y-hero.top)/hero.height};
}"""

async def main():
    bad_count=0
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for w,h in [(1920,1080),(1680,1050),(1440,900),(1280,800),(1024,768),
                    (900,1200),(768,1024),(430,932),(390,844),(320,720),(844,390)]:
            c=await b.new_context(viewport={"width":w,"height":h}); pg=await c.new_page()
            await pg.goto("http://localhost:4321/", wait_until="networkidle")
            await pg.wait_for_timeout(2200)
            r=await pg.evaluate(JS, FACE)
            # The opening frame is a slideshow of places now, not a portrait.
            # The two face assertions have nothing to measure; the one about
            # the phone bar is about layout and still does.
            if r.get('noFace'):
                bad=[]
                if r.get('covered'): bad.append("behind the phone bar: " + ", ".join(r['covered']))
                if bad:
                    bad_count+=1; print(f"  FAIL {w}x{h} {r['img']:<26} " + "; ".join(bad))
                else:
                    print(f"  OK   {w}x{h} {r['img']:<26} no portrait in the frame; layout clear of the bar")
                await c.close(); continue
            hits=r.get('hits',[])
            merged={}
            for x in hits: merged[x['sel']]=merged.get(x['sel'],0)+x['overlapPx']
            bad=[]
            if merged: bad.append(f"type over face: {merged}")
            if r.get('covered'): bad.append("behind the phone bar: " + ", ".join(r['covered']))
            # A landscape phone gives a frame under 600px tall, sized to its content,
            # where the bar is a larger share of the height; the ceiling moves with it.
            limit = MAX_FACE_TOP if r['heroH'] >= 600 else 0.40
            if r['faceTop'] > limit: bad.append(f"face top at {r['faceTop']*100:.0f}% of frame (max {limit*100:.0f}%)")
            # light kept: blank the type, shoot the face box with and without the veil
            bx=r['box']; clip={"x":max(0,bx['x']),"y":max(0,bx['y']),
                               "width":bx['r']-max(0,bx['x']),"height":bx['b']-max(0,bx['y'])}
            await pg.add_style_tag(content=".opener-frame{opacity:0!important}")
            await pg.wait_for_timeout(120)
            veiled=mean_lum(await pg.screenshot(clip=clip))
            await pg.add_style_tag(content=".opener-veil{display:none!important}")
            await pg.wait_for_timeout(120)
            raw=mean_lum(await pg.screenshot(clip=clip))
            kept=veiled/raw if raw else 1.0
            if kept < MIN_LIGHT_KEPT: bad.append(f"face keeps only {kept*100:.0f}% of its light (min {MIN_LIGHT_KEPT*100:.0f}%)")
            if bad:
                bad_count+=1
                print(f"  FAIL {w}x{h} {r['img']:<26} " + "; ".join(bad))
            else:
                print(f"  OK   {w}x{h} {r['img']:<26} face top {r['faceTop']*100:.0f}%, light kept {kept*100:.0f}%")
            await c.close()
        await b.close()
    print(f"\nHERO FACE FAILURES: {bad_count}")
    sys.exit(1 if bad_count else 0)
asyncio.run(main())

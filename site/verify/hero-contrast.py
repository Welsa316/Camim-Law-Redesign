import asyncio, io, sys
from playwright.async_api import async_playwright
from PIL import Image

def srgb(c):
    c/=255.0
    return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def lum(p): return 0.2126*srgb(p[0])+0.7152*srgb(p[1])+0.0722*srgb(p[2])
def ratio(a,b):
    l1,l2=lum(a),lum(b); hi,lo=max(l1,l2),min(l1,l2)
    return (hi+0.05)/(lo+0.05)

# Measure the rects the GLYPHS occupy, via Range, not the block box. A short
# line inside a full-width <p> otherwise samples background it never covers.
RECTS = """() => {
  // The overlay header is drawn ON the photograph, so its contrast is a
  // pixel question like the rest of the frame. A computed-style scan reads
  // its ground as the page's paper and reports 1.00 on every link.
  const sel=['.stat-fig','.stat-label','.opener-display','.opener-lead','.opener-meta',
             '.hdr-mark-name','.hdr-mark-rest','.hdr-link','.hdr-phone','.hdr-pay','.hdr-lang','.hdr-cta','.hdr-toggle'];
  const out=[];
  for(const s of sel){
    for(const e of document.querySelectorAll(s)){
    const cs=getComputedStyle(e);
    if(cs.display==='none'||cs.visibility==='hidden') continue;
    const rects=[]; const walk=document.createTreeWalker(e, NodeFilter.SHOW_TEXT); let n;
    while((n=walk.nextNode())){
      if(!n.textContent.trim()) continue;
      if(n.parentElement.closest('.sr-only')) continue;
      const r=document.createRange(); r.selectNodeContents(n);
      for(const b of r.getClientRects()) if(b.width>1&&b.height>1)
        rects.push({x:b.left,y:b.top,w:b.width,h:b.height});
    }
    if(!rects.length) continue;
    out.push({sel:s + (e.textContent.trim() ? ' ' + e.textContent.trim().slice(0,10) : ''),
              color:cs.color, size:parseFloat(cs.fontSize),
              weight:parseInt(cs.fontWeight,10), rects});
    }
  }
  return out;
}"""

# Blank the GLYPHS, not the frame. The scrim behind the type is a
# pseudo-element of .opener-top, which lives inside .opener-frame, so hiding
# the frame hides the very layer under test and the scan then reports the
# unscrimmed photograph. Colours go transparent; every box stays put.
BLANK = """
  .opener-frame, .opener-frame * {
    color: transparent !important; text-shadow: none !important;
    -webkit-text-fill-color: transparent !important;
  }
  .opener-pill { background: transparent !important; box-shadow: none !important; }
  .opener-rule { opacity: 0 !important; }
  /* Glyphs only. The header's own call to action is an opaque pill and its
     background is the ground its text really has, so backgrounds stay. */
  .hdr, .hdr * {
    color: transparent !important; text-shadow: none !important;
    -webkit-text-fill-color: transparent !important;
  }
"""

async def main():
    fails=0
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for name,w,h in [("1440",1440,900),("1920",1920,1080),("1280",1280,800),
                         ("768",768,1024),("430",430,932),("390",390,844),("320",320,720),
                         ("844x390 landscape",844,390)]:
            c=await b.new_context(viewport={"width":w,"height":h},device_scale_factor=1)
            pg=await c.new_page()
            await pg.goto("http://localhost:4321/", wait_until="networkidle")
            await pg.wait_for_timeout(2500)
            blocks=await pg.evaluate(RECTS)
            await pg.add_style_tag(content=BLANK)
            await pg.wait_for_timeout(250)
            png=await pg.screenshot(clip={"x":0,"y":0,"width":w,"height":h})
            im=Image.open(io.BytesIO(png)).convert("RGB")
            print(f"--- {name} ({w}x{h}) ---")
            for bl in blocks:
                fg=[int(v) for v in bl['color'].replace('rgb(','').replace('rgba(','').replace(')','').split(',')[:3]]
                worst=None; worstL=-1
                for r in bl['rects']:
                    x0=max(0,int(r['x'])); y0=max(0,int(r['y']))
                    x1=min(w,int(r['x']+r['w'])); y1=min(h,int(r['y']+r['h']))
                    if x1<=x0 or y1<=y0: continue
                    for px in im.crop((x0,y0,x1,y1)).getdata():
                        L=lum(px)
                        if L>worstL: worstL=L; worst=px
                if worst is None: continue
                cr=ratio(fg,list(worst))
                large = bl['size']>=24 or (bl['size']>=18.66 and bl['weight']>=700)
                need = 3.0 if large else 4.5
                ok = cr>=need
                if not ok: fails+=1
                print(f"  {'OK ' if ok else 'FAIL'} {bl['sel']:<34} {bl['size']:>5.1f}px  worst-bg={worst}  ratio={cr:.2f} need={need}")
            await c.close()
        await b.close()
    print(f"\nHERO CONTRAST FAILURES: {fails}")
    sys.exit(1 if fails else 0)
asyncio.run(main())

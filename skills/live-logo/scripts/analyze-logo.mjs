// Finds the parts of an SVG logo and where its core is.
// Usage: node analyze-logo.mjs path/to/logo.svg
// Needs Playwright (npm i -D playwright, then npx playwright install chromium).
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const svg = readFileSync(process.argv[2], 'utf8');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1000, height: 1000 });
await page.setContent(`<!doctype html><body style="margin:0">${svg}</body>`);
// Draw it at a known size so every measurement is in the same screen pixels.
await page.evaluate(() => { const s = document.querySelector('svg'); s.setAttribute('width', '800'); s.removeAttribute('height'); });

const report = await page.evaluate(() => {
  const root = document.querySelector('svg');
  const shapes = [...root.querySelectorAll('path,rect,circle,ellipse,polygon,polyline,line,text,image,use')]
    .filter((el) => !el.closest('defs,clipPath,mask,symbol,pattern'));
  // Union of the visible parts, in screen pixels (handles transforms on groups).
  const rects = shapes.map((el) => el.getBoundingClientRect());
  const L = Math.min(...rects.map((r) => r.left)), T = Math.min(...rects.map((r) => r.top));
  const R = Math.max(...rects.map((r) => r.right)), B = Math.max(...rects.map((r) => r.bottom));
  const all = { x: L, y: T, width: R - L, height: B - T };
  const cx = all.x + all.width / 2, cy = all.y + all.height / 2;
  const area = all.width * all.height || 1;
  const parts = shapes.map((el, i) => {
    const r = rects[i];
    const b = { x: r.left, y: r.top, width: r.width, height: r.height };
    const cs = getComputedStyle(el);
    return {
      i, tag: el.tagName, id: el.id || '', cls: el.getAttribute('class') || '', group: el.parentElement.id || el.parentElement.getAttribute('class') || '',
      x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1),
      share: +((b.width * b.height) / area * 100).toFixed(1),
      fill: cs.fill, stroke: cs.stroke !== 'none' ? `${cs.stroke} ${cs.strokeWidth}` : '',
      offCentre: +Math.hypot(b.x + b.width / 2 - cx, b.y + b.height / 2 - cy).toFixed(1),
    };
  });
  const aspect = all.width / (all.height || 1);
  const colours = [...new Set(parts.map((p) => p.fill).filter((f) => f && f !== 'none'))];
  const texts = parts.filter((p) => p.tag === 'text').length;
  const stroked = parts.filter((p) => p.stroke).length;
  return {
    box: { px: [+all.width.toFixed(1), +all.height.toFixed(1)], aspect: +aspect.toFixed(2), centre: [+cx.toFixed(1), +cy.toFixed(1)] },
    shape: aspect > 2.2 ? 'wide (wordmark or combination mark)' : aspect < 0.6 ? 'tall (stacked lockup)' : 'compact (symbol, monogram or emblem)',
    clip: [L, T, R - L, B - T],
    colours, partCount: parts.length, textParts: texts, strokedParts: stroked,
    biggest: [...parts].sort((a, b) => b.share - a.share).slice(0, 3).map((p) => p.i),
    nearestCentre: [...parts].sort((a, b) => a.offCentre - b.offCentre).slice(0, 3).map((p) => p.i),
    parts,
  };
});
// Symmetry from the pixels: flip the drawn logo and count how much still overlaps (100 = identical).
const [x, y, width, height] = report.clip;
delete report.clip;
const png = (await page.screenshot({ clip: { x, y, width, height }, omitBackground: true })).toString('base64');
report.symmetry = await page.evaluate(async (data) => {
  const img = new Image();
  img.src = `data:image/png;base64,${data}`;
  await img.decode();
  const w = 160, h = Math.max(1, Math.round((160 * img.height) / img.width));
  const draw = (fx, fy) => {
    const c = new OffscreenCanvas(w, h).getContext('2d');
    c.translate(fx ? w : 0, fy ? h : 0); c.scale(fx ? -1 : 1, fy ? -1 : 1); c.drawImage(img, 0, 0, w, h);
    return c.getImageData(0, 0, w, h).data;
  };
  const base = draw(false, false);
  const score = (d) => { let both = 0, any = 0; for (let i = 3; i < d.length; i += 4) { const a = base[i] > 127, b = d[i] > 127; if (a || b) any++; if (a && b) both++; } return Math.round((both / (any || 1)) * 100); };
  return { leftRight: score(draw(true, false)), topBottom: score(draw(false, true)), turnedHalfway: score(draw(true, true)) };
}, png);
// Starting points for the recommendation. The agent still looks at the logo and decides.
const hints = [];
const sym = report.symmetry, big = report.parts[report.biggest[0]];
if (sym.turnedHalfway >= 85) hints.push('Looks the same turned upside down: animate from the centre outward (split, unfold, spin into place).');
if (sym.leftRight >= 85) hints.push('Mirror image left to right: open from the vertical centre line (centre wipe, both halves sliding apart or together).');
if (sym.topBottom >= 85 && sym.leftRight < 85) hints.push('Mirror image top to bottom: open from the horizontal centre line.');
if (big && big.share >= 45) hints.push(`One shape dominates (part ${big.i}, ${big.share}% of the area): it is likely the core. Bring it in first, then the rest.`);
if (report.shape.startsWith('wide') && report.partCount >= 4) hints.push('Wide with many parts: likely letters. Stagger them in reading order, or lead with the symbol and let the name follow.');
if (report.textParts) hints.push('Contains live <text>: convert to outlines for a dependable look, or animate letters with care for font loading.');
if (report.strokedParts && report.strokedParts >= report.partCount / 2) hints.push('Mostly strokes: a draw-on reveal will read naturally.');
if (report.colours.length >= 3 && report.partCount >= 3) hints.push('Several coloured pieces: assemble them (gather, orbit, stack) into the final mark.');
if (report.partCount === 1) hints.push('Only one shape: split it into parts in a vector editor first, or use whole-logo effects (fade and blur, mask wipe, scale, draw-on).');
report.hints = hints;
console.log(JSON.stringify(report, null, 2));
await browser.close();

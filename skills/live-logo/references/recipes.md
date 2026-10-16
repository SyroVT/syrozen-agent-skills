# Recipes

Pick recipes from the recommendation, not all of them. Every recipe uses the same example logo: a mark of three bars and a four-letter wordmark. Swap in your own parts. All code is plain HTML, CSS and a little JavaScript, and works in current Chrome, Edge, Firefox and Safari.

## The example markup

```html
<a class="logo intro" id="logo" href="/" aria-label="Acme home">
  <svg class="logo-svg" viewBox="0 0 420 100" aria-hidden="true">
    <g class="word">
      <text class="lt l0" x="120" y="74">A</text>
      <text class="lt l1" x="190" y="74">C</text>
      <text class="lt l2" x="262" y="74">M</text>
      <text class="lt l3" x="346" y="74">E</text>
    </g>
    <g class="mark">
      <rect class="bar b1" x="0" y="10" width="90" height="18" rx="4"/>
      <rect class="bar b2" x="0" y="41" width="90" height="18" rx="4"/>
      <rect class="bar b3" x="0" y="72" width="90" height="18" rx="4"/>
    </g>
  </svg>
</a>
```

The mark comes after the letters so it paints on top: letters can slide behind it.

## Shared CSS

```css
:root{
  --ease-out:cubic-bezier(.23,1,.32,1);
  --ease-in-out:cubic-bezier(.77,0,.175,1);
  /* A spring: overshoots, settles. */
  --spring:linear(0,.35 8%,.78 17%,1.06 27%,1.13 33%,1.08 41%,.98 53%,.99 64%,1.01 76%,1);
}
.logo{display:inline-block;line-height:0;color:#111}
.logo-svg{height:40px;width:auto;overflow:visible}
.logo-svg text{font:700 72px/1 system-ui,sans-serif;fill:currentColor}
.logo-svg .bar{fill:#2f6f5e}
.logo-svg .lt,.logo-svg .bar,.logo-svg .mark{transform-box:fill-box;transform-origin:center}
```

## Centre unfold

For logos with a centre (the example's bars are symmetric about the middle bar). The bars start squashed into the middle, open out, then the letters slide out from behind the mark.

```css
.logo.intro .b1{animation:barIn .6s var(--ease-in-out) .1s backwards;--dy:31px}
.logo.intro .b2{animation:barIn .6s var(--ease-in-out) .1s backwards;--dy:0px}
.logo.intro .b3{animation:barIn .6s var(--ease-in-out) .1s backwards;--dy:-31px}
@keyframes barIn{from{transform:translateY(var(--dy)) scaleX(.2);opacity:0}}

.logo.intro .lt{animation:letterIn .7s var(--ease-out) backwards}
.logo.intro .l0{animation-delay:.55s;--from:-110px}
.logo.intro .l1{animation-delay:.6s;--from:-180px}
.logo.intro .l2{animation-delay:.65s;--from:-250px}
.logo.intro .l3{animation-delay:.7s;--from:-330px}
@keyframes letterIn{from{transform:translateX(var(--from));opacity:0}}
```

```js
// Play once: skip if the page opens scrolled, and drop the class when done.
const logo = document.getElementById('logo');
if (scrollY > 48) logo.classList.remove('intro');
logo.addEventListener('animationend', (e) => {
  if (e.target.classList.contains('l3')) logo.classList.remove('intro');
});
```

`backwards` means the resting state is the normal state: if the animation never runs, the logo is simply there.

## Wipes (centre, left to right, bottom up)

A mask uncovers the whole logo. Works on any logo, even a single merged path. `clip-path` on the `<svg>` element is well supported.

```css
.logo.intro .logo-svg{animation:wipeLR .9s var(--ease-in-out) backwards}
@keyframes wipeLR{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}

/* From the vertical centre line out, for mirror-symmetric logos. */
@keyframes wipeCentre{from{clip-path:inset(0 50% 0 50%)}to{clip-path:inset(0 0 0 0)}}
/* Bottom up. */
@keyframes wipeUp{from{clip-path:inset(100% 0 0 0)}to{clip-path:inset(0 0 0 0)}}
```

## Letter stagger

Letters rise and fade in reading order. Set a delay per letter, or use a custom property from the markup (`style="--i:2"`).

```css
.logo.intro .lt{animation:letterRise .6s var(--ease-out) backwards;animation-delay:calc(.08s * var(--i,0))}
.logo .l0{--i:0}.logo .l1{--i:1}.logo .l2{--i:2}.logo .l3{--i:3}
@keyframes letterRise{from{transform:translateY(40%);opacity:0;filter:blur(3px)}}
```

## Typing

Letters appear in steps, as if typed. Best with sans or monospace names.

```css
.logo.intro .lt{animation:typeOn .01s steps(1) backwards;animation-delay:calc(.11s * var(--i,0) + .2s)}
@keyframes typeOn{from{opacity:0}}
```

## Rise (bottom up)

For marks that grow from a base: bars, buildings, plants.

```css
.logo.intro .bar{transform-origin:bottom;animation:grow .7s var(--ease-out) backwards}
.logo.intro .b1{animation-delay:.2s}.logo.intro .b2{animation-delay:.1s}.logo.intro .b3{animation-delay:0s}
@keyframes grow{from{transform:scaleY(0);opacity:0}}
```

## Drop (top down) and stamp

```css
/* Drops in and settles with a small squash. */
.logo.intro .mark{animation:drop .8s var(--spring) backwards}
@keyframes drop{from{transform:translateY(-120%);opacity:0}}

/* Stamp: lands from large with a hard stop. For emblems and seals. */
.logo.intro .logo-svg{animation:stamp .45s cubic-bezier(.5,0,.75,0) backwards}
@keyframes stamp{from{transform:scale(1.8);opacity:0}}
```

## Rotate in

For circular and radial marks.

```css
.logo.intro .mark{animation:turnIn .9s var(--ease-out) backwards}
@keyframes turnIn{from{transform:rotate(-180deg) scale(.6);opacity:0}}
```

## Split

The core splits to reveal what sits behind it. Put the two halves in their own groups (`.half-a`, `.half-b`) on top of the hidden part.

```css
.logo.intro .half-a{animation:splitA .7s var(--ease-in-out) .2s backwards}
.logo.intro .half-b{animation:splitB .7s var(--ease-in-out) .2s backwards}
@keyframes splitA{from{transform:translateX(50%)}}
@keyframes splitB{from{transform:translateX(-50%)}}
```

## Fade and blur

The safe default for complex logos and emblems that can't be split.

```css
.logo.intro .logo-svg{animation:focusIn .8s var(--ease-out) backwards}
@keyframes focusIn{from{opacity:0;filter:blur(8px);transform:scale(.96)}}
```

## Draw on

For outline logos. `pathLength="1"` makes every path's length 1, so one dash value fits all.

```html
<path class="draw" pathLength="1" d="…" fill="none" stroke="currentColor" stroke-width="6"/>
```

```css
.logo.intro .draw{stroke-dasharray:1;animation:draw 1.1s var(--ease-in-out) backwards}
@keyframes draw{from{stroke-dashoffset:1}}
/* Optional: fade a fill in after the stroke finishes. */
.logo.intro .fill{animation:fadeIn .4s var(--ease-out) 1s backwards}
@keyframes fadeIn{from{opacity:0}}
```

## Fold to monogram on scroll

The letters slide into the mark and fade; the header ends up showing only the mark. Scrolling back up reverses it, because it is a transition.

```css
.logo .lt{transition:transform .5s var(--ease-in-out),opacity .3s var(--ease-out)}
.logo.compact .lt{opacity:0}
.logo.compact .l0{transform:translateX(-110px)}
.logo.compact .l1{transform:translateX(-180px)}
.logo.compact .l2{transform:translateX(-250px)}
.logo.compact .l3{transform:translateX(-330px)}
```

```js
let compact = false, ticking = false;
const update = () => {
  ticking = false;
  // Different thresholds going down and up stop flicker at the edge.
  const next = compact ? scrollY > 8 : scrollY > 48;
  if (next !== compact) logo.classList.toggle('compact', compact = next);
};
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
update();
```

If the header should also get narrower, animate the SVG's `transform: scale()` or clip the wordmark, not its `width`.

## Bounce on hover

A hop with squash and stretch. The keyframes play once per hover.

```css
@media (hover:hover) and (pointer:fine){
  .logo:hover .mark{animation:hop .55s var(--ease-out)}
}
.logo:active .mark{transform:scale(.94)} /* touch screens get a press instead */
@keyframes hop{
  0%{transform:none}
  20%{transform:translateY(0) scale(1.08,.9)}
  45%{transform:translateY(-14%) scale(.95,1.06)}
  70%{transform:translateY(0) scale(1.04,.96)}
  100%{transform:none}
}
```

For a bounce that reverses smoothly if the pointer leaves early, use a transition with the spring instead:

```css
.logo .mark{transition:transform .5s var(--spring)}
@media (hover:hover) and (pointer:fine){ .logo:hover .mark{transform:translateY(-8%)} }
```

## Wiggle

A quick, damped nod. Good for "you have a new message" or a playful hover.

```css
.logo.wiggle .mark{animation:wiggle .5s var(--ease-out)}
@keyframes wiggle{20%{transform:rotate(-8deg)}40%{transform:rotate(6deg)}60%{transform:rotate(-3deg)}80%{transform:rotate(1deg)}}
```

```js
const nudge = () => { logo.classList.remove('wiggle'); void logo.offsetWidth; logo.classList.add('wiggle'); };
```

## Tilt toward the pointer

```css
.logo-svg{transition:transform .3s var(--ease-out);transform:perspective(500px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))}
```

```js
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  logo.addEventListener('pointermove', (e) => {
    const r = logo.getBoundingClientRect();
    logo.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - .5) * 16}deg`);
    logo.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - .5) * -16}deg`);
  });
  logo.addEventListener('pointerleave', () => { logo.style.removeProperty('--rx'); logo.style.removeProperty('--ry'); });
}
```

## Breathe while loading

```css
.logo.loading .bar{animation:breathe 1.4s ease-in-out infinite}
.logo.loading .b2{animation-delay:.15s}
.logo.loading .b3{animation-delay:.3s}
@keyframes breathe{50%{transform:scaleX(.6);opacity:.55}}
```

Add `loading` when work starts and remove it when it ends. Pair it with a text status for screen readers (`<span role="status">Loading…</span>`), since the logo itself is hidden from them.

## Spin while working, with a soft stop

Removing a spin class makes the mark snap back. This version eases to the next full turn instead.

```js
const mark = logo.querySelector('.mark');
let spin;
function startSpin() {
  spin = mark.animate([{ transform: 'rotate(0turn)' }, { transform: 'rotate(1turn)' }], { duration: 1200, iterations: Infinity });
}
function stopSpin() {
  if (!spin) return;
  const done = (spin.currentTime % 1200) / 1200; // fraction of a turn
  spin.cancel();
  mark.animate([{ transform: `rotate(${done}turn)` }, { transform: 'rotate(1turn)' }], { duration: 500 * (1 - done) + 200, easing: 'cubic-bezier(.23,1,.32,1)' });
  spin = null;
}
```

## Pop on success

```css
.logo.pop .mark{animation:pop .45s var(--spring)}
@keyframes pop{from{transform:scale(.6)}to{transform:none}}
```

## Scroll-linked turn

The mark turns as the page scrolls through its first 600 px. Browsers without scroll-driven animations just show the static logo.

```css
@supports (animation-timeline:scroll()){
  .logo .mark{animation:turn linear both;animation-timeline:scroll(root);animation-range:0 600px}
  @keyframes turn{to{transform:rotate(180deg)}}
}
```

## Reduced motion

Put this last so it wins.

```css
@media (prefers-reduced-motion:reduce){
  .logo *, .logo-svg{animation:none !important;transition:none !important}
  .logo.compact .lt{opacity:0} /* the fold still happens, just without movement */
}
```

In JavaScript, check `matchMedia('(prefers-reduced-motion: reduce)').matches` before starting Web Animations such as the spin.

## A preview page for the owner

Show the three recommended options side by side, each with a replay button.

```html
<div class="option" id="opt1"><!-- the logo markup, with this option's class --></div>
<button type="button" data-replay="opt1">Replay</button>
```

```js
document.querySelectorAll('[data-replay]').forEach((b) => b.addEventListener('click', () => {
  const logo = document.getElementById(b.dataset.replay).querySelector('.logo');
  logo.classList.remove('intro'); void logo.offsetWidth; logo.classList.add('intro');
}));
```

## Proving it works (Playwright)

Pauses every animation at chosen moments and screenshots them, so the result doesn't depend on timing luck.

```js
// node check-logo.mjs http://localhost:8080/
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(process.argv[2]);
for (const t of [0, 300, 700, 1400]) {
  await page.evaluate((ms) => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = ms; }), t);
  await page.locator('.logo').screenshot({ path: `logo-${t}ms.png` });
}
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.reload();
console.log('running animations with reduced motion:', await page.evaluate(() => document.getAnimations().length));
await browser.close();
```

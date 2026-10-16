# Patterns

Small, tested building blocks. They assume the tokens in [tokens.css](tokens.css).

## Sticky frosted header with a hairline on scroll

```html
<a class="skip-link" href="#main">Skip to content</a>
<header class="nav" id="nav">
  <div class="nav-inner">
    <a class="brand" href="/" aria-label="Company home"><!-- logo SVG, aria-hidden --></a>
    <nav aria-label="Main"><ul class="nav-links"><li><a href="#work">Work</a></li><li><a href="#about">About</a></li></ul></nav>
    <a class="btn btn-ink btn-sm" href="#contact">Start a project</a>
  </div>
</header>
```

```css
.skip-link{position:absolute;left:16px;top:-100px;z-index:100;background:var(--ink);color:var(--paper);padding:10px 14px;border-radius:8px}
.skip-link:focus{top:12px}
.nav{position:sticky;top:0;z-index:50;padding-top:env(safe-area-inset-top);background:rgba(255,255,255,.78);-webkit-backdrop-filter:saturate(1.6) blur(18px);backdrop-filter:saturate(1.6) blur(18px);border-bottom:1px solid transparent;transition:border-color .3s var(--ease-out)}
.nav.scrolled{border-bottom-color:var(--line)}
.nav-inner{max-width:var(--wrap);margin:0 auto;height:var(--nav-h);padding:0 var(--gutter);display:flex;align-items:center;gap:32px}
.nav-inner nav{margin-left:auto}
.nav-links{display:flex;gap:28px;margin:0;padding:0;list-style:none}
.nav-links a{font-size:14px;color:var(--ink-2);text-decoration:none;transition:color .2s var(--ease-out)}
@media (max-width:720px){.nav-inner nav{display:none}.nav-inner .btn{margin-left:auto}}
```

```js
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true }); onScroll();
```

## Buttons

```css
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 24px;border-radius:var(--pill);font:inherit;font-size:15px;font-weight:500;text-decoration:none;border:1px solid transparent;cursor:pointer;touch-action:manipulation;transition:transform .16s var(--ease-out),background-color .2s var(--ease-out),color .2s var(--ease-out),border-color .2s var(--ease-out)}
.btn:active{transform:scale(.97)}
.btn-sm{min-height:40px;padding:0 18px;font-size:14px}
.btn-ink{background:var(--ink);color:var(--paper)}
.btn-quiet{background:transparent;color:var(--ink);border-color:var(--line)}
@media (hover:hover) and (pointer:fine){
  .btn-ink:hover{background:var(--action)}
  .btn-quiet:hover{border-color:var(--ink)}
  .nav-links a:hover{color:var(--ink)}
}
```

## Eyebrow label

```html
<p class="eyebrow">What we build</p>
```

```css
.eyebrow{font-family:var(--mono);font-size:var(--label);letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:20px;display:flex;align-items:center;gap:10px}
.eyebrow::before{content:"";width:18px;height:2px;background:var(--accent);transform:skewX(-35deg)}
```

## Hero with staggered rise

```html
<section class="hero">
  <p class="eyebrow">Software studio</p>
  <h1>Software that does the work.</h1>
  <p class="lede">One or two plain sentences on what you do and for whom.</p>
  <div class="cta"><a class="btn btn-ink" href="#contact">Start a project</a><a class="btn btn-quiet" href="#work">See the work</a></div>
</section>
```

```css
.hero{max-width:var(--wrap);margin:0 auto;padding:clamp(72px,14vh,160px) var(--gutter);min-height:calc(88dvh - var(--nav-h));display:flex;flex-direction:column;justify-content:center}
.hero .lede{margin-top:28px;font-size:clamp(18px,2vw,22px);color:var(--ink-2);max-width:30em}
.hero .cta{margin-top:40px;display:flex;flex-wrap:wrap;gap:12px}
.hero > *{animation:rise .8s var(--ease-out) backwards}
.hero > :nth-child(2){animation-delay:.07s}
.hero > :nth-child(3){animation-delay:.17s}
.hero > :nth-child(4){animation-delay:.25s}
@keyframes rise{from{opacity:0;transform:translateY(14px);filter:blur(4px)}}
```

## Ruled grid instead of cards

```html
<ul class="grid">
  <li><h3>Websites</h3><p>One line on what this is.</p></li>
  <li><h3>Web apps</h3><p>One line on what this is.</p></li>
  <li><h3>Internal tools</h3><p>One line on what this is.</p></li>
</ul>
```

```css
.grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line);margin:0;padding:0;list-style:none}
.grid li{padding:36px 32px 40px 0;border-bottom:1px solid var(--line)}
.grid li + li{padding-left:32px;border-left:1px solid var(--line)}
.grid h3{font-size:22px;margin-bottom:10px}
.grid p{color:var(--ink-2)}
@media (max-width:820px){.grid{grid-template-columns:1fr}.grid li + li{padding-left:0;border-left:0}}
```

## Statement paragraph

```html
<p class="statement">We build fewer things, better. <span class="ink">Every screen earns its place.</span></p>
```

```css
.statement{max-width:24em;font-size:clamp(24px,3.4vw,42px);line-height:1.22;letter-spacing:-.02em;color:var(--muted)}
.statement .ink{color:var(--ink)}
```

## Reveal on scroll (only below the fold)

```css
.js .reveal.pending{opacity:0;transform:translateY(16px);filter:blur(3px)}
.reveal{transition:opacity .7s var(--ease-out),transform .7s var(--ease-out),filter .7s var(--ease-out)}
```

```js
document.documentElement.classList.add('js');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce && 'IntersectionObserver' in window) {
  const items = [...document.querySelectorAll('.reveal')];
  const show = (el) => { el.classList.remove('pending'); io.unobserve(el); };
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    // A fast scroll or a jump to an anchor can skip past items: show everything before this one too.
    items.slice(0, items.indexOf(e.target) + 1).forEach(show);
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((el) => {
    // Never hide what is already on screen.
    if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('pending'); io.observe(el); }
  });
}
```

## Form field

```html
<label class="field"><span>Email</span><input type="email" name="email" autocomplete="email" required></label>
```

```css
.field{display:grid;gap:8px;font-size:14px;color:var(--ink-2)}
.field input,.field textarea{font:inherit;font-size:16px;color:var(--ink);background:var(--paper);border:1px solid var(--field-line);border-radius:var(--radius);padding:12px 14px;min-height:48px}
.field input:focus-visible,.field textarea:focus-visible{outline:2px solid var(--action);outline-offset:2px}
```

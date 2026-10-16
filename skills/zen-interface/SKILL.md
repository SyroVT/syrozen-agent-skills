---
name: zen-interface
description: Design and build calm, precise, premium web interfaces that read as crafted rather than template-made - a written direction first, a small token system (one ink, one paper, one accent, one sans plus one mono, two easing curves), hairline structure instead of cards and shadows, deliberate motion, and accessibility built in - then check the result at phone and desktop widths. Use when designing or restyling a website, landing page or web app UI, when a page looks generic or "AI-made", or when asked for a premium, minimal, developer-facing or big-tech look.
---

# Zen interface

Most generic interfaces fail the same way: every section a centred card, a purple gradient, emoji for icons, shadows on everything, three accent colours fighting, and motion on things that didn't need it. A crafted interface does fewer things, on purpose, very precisely.

This skill is a way of working, not a theme. It produces a quiet, exact look by default, and the same steps work for warmer or bolder brands.

## Step 1: Write the direction before touching CSS

Write five lines and get them agreed:

1. **Who it's for**, and what they must do on the page.
2. **Three words** for how it should feel (for example: calm, exact, confident).
3. **One or two real references** the owner admires, and what exactly to take from each (the type, the spacing, the restraint), not "make it like X".
4. **What it must never look like** (for example: "a fashion brand", "a crypto site", "a template").
5. **The brand's one signature element:** a mark, a shape, a colour, a type treatment. It will appear in a few deliberate places, not everywhere.

If the owner can't answer, offer two or three short written directions (a paragraph each, with a type pairing and palette) and let them choose before building.

## Step 2: Set a small token system

Put every value in custom properties on `:root` and use nothing else. A starter is in [references/tokens.css](references/tokens.css).

- **Colour:** one ink (near-black, slightly tinted), one paper (white or near-white), one mist (a faint tint for alternate sections), a muted text colour, a hairline (ink at about 10% opacity), and **one accent** used sparingly. A second accent is allowed only for one job (for example, focus and hover). Check every text pair reaches 4.5:1 (3:1 for large text and for borders that identify fields).
- **Type:** one variable sans for everything, plus one monospace for small labels, numbers and code. Headings: weight 500, letter-spacing between -0.02em and -0.045em (tighter as they grow), line-height 0.98 to 1.1, `text-wrap: balance`. Body: 16 to 18 px, line-height 1.5 to 1.6, `text-wrap: pretty`, lines no longer than about 34em. Size headings with `clamp()` so they scale with the screen.
- **Space:** a content width (about 1100 to 1200 px), a gutter of `clamp(16px, 4vw, 40px)`, and section padding of `clamp(64px, 12vw, 150px)`. Big gaps between sections, tight gaps inside a group.
- **Shape:** pill buttons or one small radius, used consistently. No mix of 4, 8, 12 and 24 px corners.
- **Motion:** two curves only. Arrivals: `cubic-bezier(.23,1,.32,1)`. Moves between two places: `cubic-bezier(.77,0,.175,1)`.

## Step 3: Structure with lines and space, not boxes

- Separate content with **hairline rules** and space. Cards with shadows are the exception, used when something really is a separate object (a product, a file, a person).
- Lay out with grids whose cells share borders (a services grid with lines between items reads as one designed object; nine floating cards read as a template).
- Mix alignment on purpose: a big left-aligned headline with a narrow lede reads more designed than everything centred.
- Use a **mono eyebrow** above section titles: 12 px, uppercase, wide tracking, muted, with a tiny accent mark. It gives rhythm and a technical edge.
- Give pages one **statement** moment: a large, muted paragraph with a few words in full ink.
- Use the **signature element** structurally: aligned to the headline's cap height, as a divider, as the favicon, in the empty state. Not as decoration scattered around.
- Header: sticky, slightly translucent with a backdrop blur, and a hairline that appears only once the page is scrolled.

## Step 4: Make interaction feel exact

- Tap targets at least 44 to 48 px tall (40 px for small secondary buttons).
- Press feedback: `transform: scale(.97)` on `:active`, about 160 ms.
- Hover styles only inside `@media (hover: hover) and (pointer: fine)`, so phones don't get stuck hover states.
- Transition only colour, background, border and transform, 160 to 300 ms. Never `transition: all`.
- Focus: a 2 px outline in the accent's deep shade with a 3 px offset, on `:focus-visible`, never removed. A skip link to the main content.
- `-webkit-tap-highlight-color: transparent` and `touch-action: manipulation` on controls.
- Forms: visible labels (not placeholders as labels), field borders at 3:1 contrast, errors in words next to the field, inputs at 16 px or more so phones don't zoom.

## Step 5: Motion with a reason

Every animation must do one job: orient (where did this come from), focus (look here), confirm (that worked), or show the brand. If it does none of those, remove it.

- **Hero:** eyebrow, headline, lede and buttons rise about 14 px and sharpen from a 4 px blur, staggered 50 to 100 ms, about 800 ms each. Once.
- **Reveal on scroll:** only for content that starts below the fold, with an IntersectionObserver, a small rise and fade, once per element. Never hide content that is already on screen.
- **Logo:** one meaningful motion (see the `live-logo` skill), not a loop.
- **Respect reduced motion:** under `prefers-reduced-motion: reduce`, remove movement and show everything at once.
- Keep scroll native. No scroll hijacking, no smooth-scroll libraries fighting the browser.

Recipes for these are in [references/patterns.md](references/patterns.md).

## Step 6: Phone first, really

- Check at 320 px wide (the smallest common phone) and 1280 px. No horizontal scrolling at any width.
- Use `100dvh` rather than `100vh` for full-height sections, and `env(safe-area-inset-*)` around the header and fixed elements.
- Large headings must still fit at 320 px: let `clamp()` bring them down to about 40 to 46 px.
- Hide nothing important on phones; reorder instead.

## Step 7: Check it isn't generic

Go through [references/generic-checklist.md](references/generic-checklist.md) and fix anything that matches. The short version: one accent, no gradients for their own sake, no emoji or clip-art icons, no shadow on everything, no centred-everything, no filler copy, no fake logos or testimonials, and button labels that say what happens ("Start a project", not "Get started").

## Step 8: Verify like a user

1. Screenshot every page at 320 and 1280 px and look at them side by side with the direction from Step 1. Does it feel like the three words?
2. Run axe-core (WCAG 2.2 AA) on every page: zero violations.
3. Use the whole page with only the keyboard. Check focus is always visible and in a sensible order.
4. Turn on reduced motion and reload.
5. Check Lighthouse performance and that fonts load with `font-display: swap` and are self-hosted where possible.

## Deliver

- The written direction.
- The token file and the built pages or components.
- Screenshots at both widths, the axe result, and notes on keyboard and reduced-motion checks.
- A short list of what each principle changed (for example: "replaced 6 shadowed cards with a ruled grid").

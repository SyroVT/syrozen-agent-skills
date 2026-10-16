---
name: live-logo
description: Study any logo, find its core (the shape that makes it recognisable and the point the motion should grow from), recommend the live animations that suit that logo and brand, then build the chosen one for a web page in SVG and CSS. Covers centre-out, top-down, bottom-up, left-to-right, draw-on, mask wipes, letter staggers, assembly, morphs, bounces, loading loops and scroll folds. Use when asked to animate a logo, make a logo "live" or "alive", add a logo intro, turn a logo into a loading indicator, or choose which logo animation would look best.
---

# Live logo

There is no single right logo animation. The right one comes out of the logo itself: its shape, where its weight sits, what makes it recognisable, and what the brand wants to feel like. A Z built from two bars and a diagonal wants to unfold from its centre. A script wordmark wants to be written. A ring wants to turn. A stack of coloured dots wants to gather.

This skill reads the logo first, recommends, and only then builds.

## Step 1: Read the logo

Get the logo as an SVG. If there is only a PNG, ask for the vector file, or trace it and say so.

Run the analyser to measure it:

```sh
node scripts/analyze-logo.mjs logo.svg
```

It reports the overall shape (wide, tall or compact), every part with its size and position, the colours, whether it is drawn with strokes or fills, how symmetrical it is (left-right, top-bottom and turned upside down, as a percentage of overlap) and starting hints. Then look at the logo yourself and write down:

1. **Logo type.** Wordmark (just the name), lettermark or monogram (initials), symbol (a picture or abstract shape alone), combination mark (symbol plus name), emblem (name inside a badge or seal), mascot (a character).
2. **The core.** The one feature that makes it recognisable: a distinctive stroke, a cut, a dot, an arrow, a negative space, the initial. Ask: if you could show only one part for half a second, which part would still say the brand? That part moves first or moves most.
3. **The origin.** Where the motion should start. See [references/finding-the-core.md](references/finding-the-core.md):
   - symmetric when turned upside down, or radial: **from the centre out**;
   - mirror image left to right: **from the vertical centre line**;
   - built on a baseline, heavy at the bottom (buildings, mountains, plants, bars that rise): **bottom up**;
   - hanging, falling, stamped or heavy at the top: **top down**;
   - a name in a left-to-right script: **left to right** (right to left for Arabic and Hebrew);
   - a single continuous line: **along the line**;
   - circular, a ring, a wheel, a globe: **around the centre**;
   - several separate pieces: **from outside in** (they gather);
   - one dominant shape with small details: **from the core outward**.
4. **Construction.** Strokes or fills, how many separate pieces, overlaps, gradients, text still as live `<text>`. This decides what is cheap to animate.
5. **Personality.** From the brand's site, colours and words: calm and premium, precise and technical, playful, bold, organic and human, trustworthy and steady.

## Step 2: Recommend

Use [references/styles.md](references/styles.md), a catalogue of reveal and motion styles, each with the logos and brands it suits and when to avoid it. Match on three things: the origin from Step 1, the logo type, and the personality.

Give the owner **three options**, best first. For each:

- a name and one line describing what the viewer sees;
- why it fits this logo (point at the core and origin) and this brand;
- the moment it plays (first load, scroll, hover, loading, success) and its length;
- the effort (CSS only, small script, needs the logo split into parts, needs a library).

Also say what you would **not** do with this logo and why (for example: "no bounce: the brand is a law firm" or "no letter stagger: the name is one custom-drawn shape").

When you can, build a quick preview page with all three options side by side, each with a replay button, and share screenshots or a link so the owner can pick by eye.

## Step 3: Pick the moments

A logo can do more than one thing, but each moment has its own job. Choose one or two:

| Moment | Job | Typical length |
| --- | --- | --- |
| First load | Introduce the brand | 0.6 to 1.5 s, once per visit |
| Scroll | Get out of the way (full logo folds into the symbol) | 0.3 to 0.6 s, reverses on scroll up |
| Hover or tap | Show it is alive and clickable | 0.15 to 0.5 s |
| Loading or thinking | Turn waiting into brand time (the mark pulses, spins or draws while work happens) | Loops only while working |
| Success | Celebrate once | 0.3 to 0.6 s |
| Idle | Ambient life | Rare; stops after a few cycles |

## Step 4: Prepare and build

1. Inline the SVG in the page (an `<img>` can't be animated from outside). Give the link an accessible name and set `aria-hidden="true"` on the SVG.
2. Split it into named groups: the core, the other parts of the symbol, each letter. If the logo is one merged path, separate it in a vector editor, or use whole-logo styles (fade and blur, mask wipe, scale, draw-on).
3. Set `transform-box: fill-box; transform-origin: <origin>` on each moving part. The origin from Step 1 becomes `transform-origin` (`center`, `bottom`, `top`, `left`) or the starting offset.
4. Build it with the matching recipe in [references/recipes.md](references/recipes.md). Plain CSS covers almost everything. Reach for a library only for true shape morphing (GSAP MorphSVG, flubber) or an existing After Effects animation (Lottie).

## Step 5: Rules for motion that feels right

- Animate `transform` and `opacity` (and `stroke-dashoffset` for drawing). Never animate `width`, `left`, `top` or path data in a loop.
- Arrivals use a strong ease-out (`cubic-bezier(.23,1,.32,1)`). Moves between two places use ease-in-out (`cubic-bezier(.77,0,.175,1)`). Springs (`linear()` with overshoot) only for playful brands. Linear only for continuous spins.
- Stagger parts 40 to 120 ms apart. Keep the whole intro under about 1.5 s; nobody waits for a logo.
- The resting state is the logo itself. Use `animation-fill-mode: backwards` so the logo is simply there if animation never runs.
- Play intros once. Skip them if the page opens already scrolled, and remove the intro class when done.
- Hover effects only under `@media (hover: hover) and (pointer: fine)`; touch gets a press response on `:active`.
- Under `prefers-reduced-motion: reduce`, show the final state with no movement.
- Anything that moves longer than 5 seconds must stop by itself or be pausable (WCAG 2.2.2). Loading loops stop when loading stops.
- Never flash more than three times a second.
- Keep the logo crisp and readable at every frame where it might be paused.

## Step 6: Test

1. Watch it at 1280 px and 320 px wide: load, scroll down and up, hover, tap.
2. Capture frames at set moments with the Playwright script at the end of [references/recipes.md](references/recipes.md), so the owner can see the motion without running it.
3. Turn on reduced motion and confirm the final logo shows at once.
4. Check the browser's performance panel shows no layout or paint during the animation.
5. Tab to the logo link and check the focus outline isn't clipped.

## Deliver

- The logo reading (type, core, origin, construction, personality), with the analyser output.
- The three recommendations, the owner's pick, and what to avoid.
- The prepared SVG, CSS and any script.
- Frame screenshots, and confirmation that reduced motion and phone widths were checked.

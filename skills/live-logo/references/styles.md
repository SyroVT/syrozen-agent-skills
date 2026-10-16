# Logo motion styles

Each style lists what the viewer sees, the logos and origins it suits, the personalities it fits, and when to avoid it. Recipes for the CSS are in [recipes.md](recipes.md).

## Reveals (first load)

| Style | What you see | Best for | Personality | Avoid when |
| --- | --- | --- | --- | --- |
| **Centre unfold** | Pieces start collapsed at the centre and open out to their places | Logos that look the same turned upside down; radial and symmetric symbols | Precise, premium, calm | The logo has no clear centre |
| **Split** | The core splits in two to reveal a second shape or letter behind it | Monograms with two letters; marks with a hidden shape | Clever, premium | The pieces don't share an edge |
| **Centre wipe** | A mask opens from the vertical centre line to both edges | Mirror-symmetric logos, badges, shields | Calm, trustworthy | Asymmetric logos (looks off-balance) |
| **Left-to-right wipe** | A mask uncovers the logo in reading direction | Wordmarks and combination marks | Precise, calm, any | Very short names (too fast to notice) |
| **Letter stagger** | Letters rise, fade or slide in one after another | Wordmarks with separate letters | Any; tune the easing | Custom lettering joined into one shape |
| **Typing** | The name appears letter by letter with a caret | Tech, developer and media brands with sans or mono type | Technical | Script or serif fonts; luxury brands |
| **Handwriting** | The name is written with a pen stroke, then fills | Script and signature logos | Human, personal, artisan | Geometric type |
| **Draw on** | Outlines trace themselves, then the fill fades in | Line art, monoline marks, icons | Precise, crafted | Solid blobs with no strokes (convert first) |
| **Rise (bottom up)** | Parts grow or slide up from their base, staggered | Buildings, plants, bars, mountains, flames | Optimistic, growth | Hanging or top-heavy shapes |
| **Drop (top down)** | The mark drops in and settles with a small squash | Pins, drops, stamps, heavy tops | Playful or bold | Trustworthy brands (if it bounces) |
| **Stamp** | Scales down from large onto the page with a hard stop | Emblems, seals, badges | Bold, official | Delicate logos |
| **Assemble** | Separate pieces fly, fall or orbit in from outside and lock into place | Multi-part and multi-colour marks (dots, tiles, blocks) | Playful, collaborative | Single-shape logos |
| **Gather dots** | Coloured dots move as a group (wave, bounce, circle), then become the mark | Brands whose colours are dots or pieces | Friendly, playful | One-colour logos |
| **Rotate in** | The mark turns a quarter or half turn as it arrives | Circular marks, wheels, rings, radial marks | Energetic, technical | Text-heavy logos (unreadable mid-turn) |
| **Ring draw** | A ring draws around, then the centre appears | Circular logos and badges | Calm, complete | Square logos |
| **Fade and blur** | The logo sharpens from a soft blur and fades in | Complex logos, emblems, photographic marks, anything that can't be split | Premium, calm, safe default | Brands that want energy |
| **Scale up** | Grows from small with a smooth ease-out (or a spring) | Compact symbols and app icons | Any | Wide wordmarks (feels heavy) |
| **3D flip** | Turns over in depth to reveal the logo | Two-sided or card-like marks | Playful, tech | Thin type (gets unreadable mid-flip) |
| **Morph** | One shape smoothly becomes the logo (a dot becomes a letter) | Organic or fluid brands; marks derived from simple shapes | Organic, creative | Needs a library and matching point counts; costly |
| **Layer stack** | Overlapping layers appear from back to front | Interlocking and layered marks | Considered, premium | Flat single-layer logos |
| **Directional slide** | The mark moves in the direction it points | Arrows, chevrons, wings, speed marks | Fast, forward | Marks with no direction |
| **Colour fill** | The shape appears as an outline, then colour floods in from the origin | Logos whose colour is the point (gradients, rainbows) | Bold, vibrant | One-colour logos |
| **Partial** | Only the core moves (a dot lands, a spark turns, an eye blinks); the rest is still | Established logos that must stay recognisable | Any; the safest choice for known brands | A logo with no clear core |

## Living motion (after the reveal)

| Style | What you see | Best for | Avoid when |
| --- | --- | --- | --- |
| **Fold to symbol** | On scroll, the name slides into the symbol and fades; the header keeps just the mark | Combination marks in sticky headers | Logos without a symbol |
| **Hover bounce** | A hop with squash and stretch | Playful brands, mascots, compact marks | Serious brands |
| **Hover tilt** | The mark leans toward the pointer | Compact symbols, card-like marks | Wide wordmarks |
| **Wiggle or nod** | A quick, damped rotation | Notifications, playful hover | Long loops |
| **Breathe** | A slow scale and opacity pulse | Loading, waiting, calm brands | Anything already busy |
| **Thinking spin** | The core rotates while work happens, easing to a stop when done | Radial and circular marks; AI and data products | Text-heavy marks |
| **Pulse rays** | Rays of a radial mark grow and shrink in sequence | Stars, sparks, suns | Non-radial marks |
| **Shimmer** | A soft highlight passes across | Premium, metallic or glass brands | Overused; stop after a few passes |
| **Pop** | One overshoot on success | Any compact mark | Repeated often |
| **Scroll-linked** | The mark turns or draws in step with scrolling | Long story pages | Short pages; distracting in apps |

## Dated or risky

- Long intros before the page can be used.
- Random particle explosions that have nothing to do with the logo.
- Glitch effects outside gaming, music or security brands.
- Shiny 3D bevels with no reason.
- Looping a whole-logo animation forever in the header.
- Over-animated type where the name is hard to read at any moment.

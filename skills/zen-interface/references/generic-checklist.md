# Does it look generic?

Go through every line. Each "yes" is something to fix.

## Colour
- More than one accent colour competing for attention?
- A purple-to-blue (or any) gradient that isn't part of the brand?
- Pure black `#000` text on pure white, or grey text that fails 4.5:1?
- Coloured section backgrounds alternating for no reason?

## Type
- More than two font families?
- Headings in bold 700 with default letter-spacing (they look heavy and loose at large sizes)?
- Body lines running wider than about 34em?
- Orphaned single words at the end of headings (fix with `text-wrap: balance`)?

## Layout
- Every section centred?
- Rows of identical cards with shadows and rounded corners?
- Icons in coloured circles above every card?
- The same padding everywhere, so nothing groups and nothing breathes?
- Decorative blobs, 3D shapes or stock illustrations with no meaning?

## Content
- Placeholder or filler text ("Lorem ipsum", "Unlock your potential", "Seamless solutions")?
- Vague button labels ("Get started", "Learn more") where a specific verb would do?
- Logos of companies that aren't real clients, or invented testimonials and numbers?
- Emoji used as icons?

## Motion
- Things animating that don't need to (every card, every icon, on every scroll)?
- Content hidden until it animates in, even when it's already on screen?
- Long intros that delay the page?
- Bouncy easing on a serious brand?
- No reduced-motion handling?

## Details
- No visible focus style, or `outline: none` without a replacement?
- Hover states that stick on phones?
- Buttons under 44 px tall on touch screens?
- Inputs under 16 px font (phones zoom in)?
- No favicon, no link-preview image, no custom 404?
- Horizontal scrolling at 320 px?

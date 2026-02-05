# Tailwind CSS Classes Reference

A comprehensive reference of Tailwind CSS utility classes organized by category.

## Layout

### Display
- `block`, `inline-block`, `inline`, `flex`, `inline-flex`, `table`, `inline-table`, `table-caption`, `table-cell`, `table-column`, `table-column-group`, `table-footer-group`, `table-header-group`, `table-row-group`, `table-row`, `flow-root`, `grid`, `inline-grid`, `contents`, `list-item`, `hidden`

### Position
- `static`, `fixed`, `absolute`, `relative`, `sticky`

### Top / Right / Bottom / Left
- `inset-{value}`, `inset-x-{value}`, `inset-y-{value}`
### Absolute Position values
- `top-{value}`, `right-{value}`, `bottom-{value}`, `left-{value}`
- Examples: `top-0`, `right-0`, `bottom-0`, `left-0`, `top-4`, `right-8`, `bottom-12`, `left-auto`, `top-1/2`
- Values: `0`, `px`, `0.5`, `1`, `1.5`, `2`, `2.5`, `3`, `3.5`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `14`, `16`, `20`, `24`, `28`, `32`, `36`, `40`, `44`, `48`, `52`, `56`, `60`, `64`, `72`, `80`, `96`, `auto`, `1/2`, `1/3`, `2/3`, `1/4`, `2/4`, `3/4`, `full`

### Visibility
- `visible`, `invisible`, `collapse`

### Z-Index
- `z-0`, `z-10`, `z-20`, `z-30`, `z-40`, `z-50`, `z-auto`

### Overflow
- `overflow-auto`, `overflow-hidden`, `overflow-visible`, `overflow-scroll`
- `overflow-x-auto`, `overflow-x-hidden`, `overflow-x-visible`, `overflow-x-scroll`
- `overflow-y-auto`, `overflow-y-hidden`, `overflow-y-visible`, `overflow-y-scroll`

### Overscroll Behavior
- `overscroll-auto`, `overscroll-contain`, `overscroll-none`
- `overscroll-y-auto`, `overscroll-y-contain`, `overscroll-y-none`
- `overscroll-x-auto`, `overscroll-x-contain`, `overscroll-x-none`

### Float
- `float-right`, `float-left`, `float-none`

### Clear
- `clear-left`, `clear-right`, `clear-both`, `clear-none`

### Isolation
- `isolate`, `isolation-auto`

### Object Fit
- `object-contain`, `object-cover`, `object-fill`, `object-none`, `object-scale-down`

### Object Position
- `object-bottom`, `object-center`, `object-left`, `object-left-bottom`, `object-left-top`, `object-right`, `object-right-bottom`, `object-right-top`, `object-top`

## Flexbox & Grid

### Flex Direction
- `flex-row`, `flex-row-reverse`, `flex-col`, `flex-col-reverse`

### Flex Wrap
- `flex-wrap`, `flex-wrap-reverse`, `flex-nowrap`

### Flex
- `flex-1`, `flex-auto`, `flex-initial`, `flex-none`

### Flex Grow
- `grow`, `grow-0`

### Flex Shrink
- `shrink`, `shrink-0`

### Order
- `order-1`, `order-2`, `order-3`, `order-4`, `order-5`, `order-6`, `order-7`, `order-8`, `order-9`, `order-10`, `order-11`, `order-12`, `order-first`, `order-last`, `order-none`

### Grid Template Columns
- `grid-cols-1` through `grid-cols-12`, `grid-cols-none`

### Grid Column Start / End
- `col-auto`, `col-span-1` through `col-span-12`, `col-span-full`
- `col-start-1` through `col-start-13`, `col-start-auto`
- `col-end-1` through `col-end-13`, `col-end-auto`

### Grid Template Rows
- `grid-rows-1` through `grid-rows-6`, `grid-rows-none`

### Grid Row Start / End
- `row-auto`, `row-span-1` through `row-span-6`, `row-span-full`
- `row-start-1` through `row-start-7`, `row-start-auto`
- `row-end-1` through `row-end-7`, `row-end-auto`

### Grid Auto Flow
- `grid-flow-row`, `grid-flow-col`, `grid-flow-dense`, `grid-flow-row-dense`, `grid-flow-col-dense`

### Grid Auto Columns
- `auto-cols-auto`, `auto-cols-min`, `auto-cols-max`, `auto-cols-fr`

### Grid Auto Rows
- `auto-rows-auto`, `auto-rows-min`, `auto-rows-max`, `auto-rows-fr`

### Gap
- `gap-{value}`, `gap-x-{value}`, `gap-y-{value}`
- Values: `0`, `px`, `0.5`, `1`, `1.5`, `2`, `2.5`, `3`, `3.5`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `14`, `16`, `20`, `24`, `28`, `32`, `36`, `40`, `44`, `48`, `52`, `56`, `60`, `64`, `72`, `80`, `96`

### Justify Content
- `justify-start`, `justify-end`, `justify-center`, `justify-between`, `justify-around`, `justify-evenly`

### Justify Items
- `justify-items-start`, `justify-items-end`, `justify-items-center`, `justify-items-stretch`

### Justify Self
- `justify-self-auto`, `justify-self-start`, `justify-self-end`, `justify-self-center`, `justify-self-stretch`

### Align Content
- `content-center`, `content-start`, `content-end`, `content-between`, `content-around`, `content-evenly`, `content-baseline`

### Align Items
- `items-start`, `items-end`, `items-center`, `items-baseline`, `items-stretch`

### Align Self
- `self-auto`, `self-start`, `self-end`, `self-center`, `self-stretch`, `self-baseline`

### Place Content
- `place-content-center`, `place-content-start`, `place-content-end`, `place-content-between`, `place-content-around`, `place-content-evenly`, `place-content-stretch`

### Place Items
- `place-items-start`, `place-items-end`, `place-items-center`, `place-items-stretch`

### Place Self
- `place-self-auto`, `place-self-start`, `place-self-end`, `place-self-center`, `place-self-stretch`

## Spacing

### Padding
- `p-{value}` (all sides)
- `px-{value}` (horizontal), `py-{value}` (vertical)
- `pt-{value}`, `pr-{value}`, `pb-{value}`, `pl-{value}` (individual sides)
- Values: `0`, `px`, `0.5`, `1`, `1.5`, `2`, `2.5`, `3`, `3.5`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `14`, `16`, `20`, `24`, `28`, `32`, `36`, `40`, `44`, `48`, `52`, `56`, `60`, `64`, `72`, `80`, `96`

### Margin
- `m-{value}` (all sides), `m-auto`
- `mx-{value}`, `mx-auto` (horizontal), `my-{value}`, `my-auto` (vertical)
- `mt-{value}`, `mt-auto`, `mr-{value}`, `mr-auto`, `mb-{value}`, `mb-auto`, `ml-{value}`, `ml-auto` (individual sides)
- Values: same as padding, plus negative values with `-m-{value}` prefix

### Space Between
- `space-x-{value}`, `space-x-reverse`
- `space-y-{value}`, `space-y-reverse`
- Values: same as padding/margin

## Sizing

### Width
- `w-{value}`
- Values: `0`, `px`, `0.5`, `1`, `1.5`, `2`, `2.5`, `3`, `3.5`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `14`, `16`, `20`, `24`, `28`, `32`, `36`, `40`, `44`, `48`, `52`, `56`, `60`, `64`, `72`, `80`, `96`, `auto`, `1/2`, `1/3`, `2/3`, `1/4`, `2/4`, `3/4`, `1/5`, `2/5`, `3/5`, `4/5`, `1/6`, `2/6`, `3/6`, `4/6`, `5/6`, `1/12`, `2/12`, `3/12`, `4/12`, `5/12`, `6/12`, `7/12`, `8/12`, `9/12`, `10/12`, `11/12`, `full`, `screen`, `min`, `max`, `fit`

### Min-Width
- `min-w-0`, `min-w-full`, `min-w-min`, `min-w-max`, `min-w-fit`

### Max-Width
- `max-w-0`, `max-w-none`, `max-w-xs`, `max-w-sm`, `max-w-md`, `max-w-lg`, `max-w-xl`, `max-w-2xl`, `max-w-3xl`, `max-w-4xl`, `max-w-5xl`, `max-w-6xl`, `max-w-7xl`, `max-w-full`, `max-w-min`, `max-w-max`, `max-w-fit`, `max-w-prose`, `max-w-screen-sm`, `max-w-screen-md`, `max-w-screen-lg`, `max-w-screen-xl`, `max-w-screen-2xl`

### Height
- `h-{value}`
- Values: same as width

### Min-Height
- `min-h-0`, `min-h-full`, `min-h-screen`, `min-h-min`, `min-h-max`, `min-h-fit`

### Max-Height
- `max-h-{value}`, `max-h-full`, `max-h-screen`, `max-h-min`, `max-h-max`, `max-h-fit`

## Typography

### Font Family
- `font-sans`, `font-serif`, `font-mono`

### Font Size
- `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-6xl`, `text-7xl`, `text-8xl`, `text-9xl`

### Font Smoothing
- `antialiased`, `subpixel-antialiased`

### Font Style
- `italic`, `not-italic`

### Font Weight
- `font-thin`, `font-extralight`, `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`, `font-black`

### Font Variant Numeric
- `normal-nums`, `ordinal`, `slashed-zero`, `lining-nums`, `oldstyle-nums`, `proportional-nums`, `tabular-nums`, `diagonal-fractions`, `stacked-fractions`

### Letter Spacing
- `tracking-tighter`, `tracking-tight`, `tracking-normal`, `tracking-wide`, `tracking-wider`, `tracking-widest`

### Line Height
- `leading-3`, `leading-4`, `leading-5`, `leading-6`, `leading-7`, `leading-8`, `leading-9`, `leading-10`, `leading-none`, `leading-tight`, `leading-snug`, `leading-normal`, `leading-relaxed`, `leading-loose`

### List Style Type
- `list-none`, `list-disc`, `list-decimal`

### List Style Position
- `list-inside`, `list-outside`

### Text Align
- `text-left`, `text-center`, `text-right`, `text-justify`, `text-start`, `text-end`

### Text Color
- `text-{color}-{shade}`
- Colors: `slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`
- Shades: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`
- Special: `text-inherit`, `text-current`, `text-transparent`, `text-black`, `text-white`

### Text Decoration
- `underline`, `overline`, `line-through`, `no-underline`

### Text Decoration Color
- `decoration-{color}-{shade}` (same colors/shades as text color)

### Text Decoration Style
- `decoration-solid`, `decoration-double`, `decoration-dotted`, `decoration-dashed`, `decoration-wavy`

### Text Decoration Thickness
- `decoration-auto`, `decoration-from-font`, `decoration-0`, `decoration-1`, `decoration-2`, `decoration-4`, `decoration-8`

### Text Underline Offset
- `underline-offset-auto`, `underline-offset-0`, `underline-offset-1`, `underline-offset-2`, `underline-offset-4`, `underline-offset-8`

### Text Transform
- `uppercase`, `lowercase`, `capitalize`, `normal-case`

### Text Overflow
- `truncate`, `text-ellipsis`, `text-clip`

### Text Indent
- `indent-{value}` (same values as padding/margin)

### Vertical Align
- `align-baseline`, `align-top`, `align-middle`, `align-bottom`, `align-text-top`, `align-text-bottom`, `align-sub`, `align-super`

### Whitespace
- `whitespace-normal`, `whitespace-nowrap`, `whitespace-pre`, `whitespace-pre-line`, `whitespace-pre-wrap`, `whitespace-break-spaces`

### Word Break
- `break-normal`, `break-words`, `break-all`, `break-keep`

### Content
- `content-none`

## Backgrounds

### Background Attachment
- `bg-fixed`, `bg-local`, `bg-scroll`

### Background Clip
- `bg-clip-border`, `bg-clip-padding`, `bg-clip-content`, `bg-clip-text`

### Background Color
- `bg-{color}-{shade}` (same colors/shades as text color)
- Special: `bg-inherit`, `bg-current`, `bg-transparent`, `bg-black`, `bg-white`

### Background Origin
- `bg-origin-border`, `bg-origin-padding`, `bg-origin-content`

### Background Position
- `bg-bottom`, `bg-center`, `bg-left`, `bg-left-bottom`, `bg-left-top`, `bg-right`, `bg-right-bottom`, `bg-right-top`, `bg-top`

### Background Repeat
- `bg-repeat`, `bg-no-repeat`, `bg-repeat-x`, `bg-repeat-y`, `bg-repeat-round`, `bg-repeat-space`

### Background Size
- `bg-auto`, `bg-cover`, `bg-contain`

### Background Image
- `bg-none`, `bg-gradient-to-t`, `bg-gradient-to-tr`, `bg-gradient-to-r`, `bg-gradient-to-br`, `bg-gradient-to-b`, `bg-gradient-to-bl`, `bg-gradient-to-l`, `bg-gradient-to-tl`

### Gradient Color Stops
- `from-{color}-{shade}`, `via-{color}-{shade}`, `to-{color}-{shade}` (same colors/shades as text color)

## Borders

### Border Radius
- `rounded-none`, `rounded-sm`, `rounded`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`
- `rounded-t-{size}`, `rounded-r-{size}`, `rounded-b-{size}`, `rounded-l-{size}`
- `rounded-tl-{size}`, `rounded-tr-{size}`, `rounded-br-{size}`, `rounded-bl-{size}`

### Border Width
- `border`, `border-0`, `border-2`, `border-4`, `border-8`
- `border-x-{width}`, `border-y-{width}`
- `border-t-{width}`, `border-r-{width}`, `border-b-{width}`, `border-l-{width}`

### Border Color
- `border-{color}-{shade}` (same colors/shades as text color)

### Border Style
- `border-solid`, `border-dashed`, `border-dotted`, `border-double`, `border-hidden`, `border-none`

### Divide Width
- `divide-x`, `divide-x-0`, `divide-x-2`, `divide-x-4`, `divide-x-8`, `divide-x-reverse`
- `divide-y`, `divide-y-0`, `divide-y-2`, `divide-y-4`, `divide-y-8`, `divide-y-reverse`

### Divide Color
- `divide-{color}-{shade}` (same colors/shades as text color)

### Divide Style
- `divide-solid`, `divide-dashed`, `divide-dotted`, `divide-double`, `divide-none`

### Outline Width
- `outline-0`, `outline-1`, `outline-2`, `outline-4`, `outline-8`

### Outline Color
- `outline-{color}-{shade}` (same colors/shades as text color)

### Outline Style
- `outline-none`, `outline`, `outline-dashed`, `outline-dotted`, `outline-double`

### Outline Offset
- `outline-offset-0`, `outline-offset-1`, `outline-offset-2`, `outline-offset-4`, `outline-offset-8`

### Ring Width
- `ring`, `ring-0`, `ring-1`, `ring-2`, `ring-4`, `ring-8`, `ring-inset`

### Ring Color
- `ring-{color}-{shade}` (same colors/shades as text color)

### Ring Offset Width
- `ring-offset-0`, `ring-offset-1`, `ring-offset-2`, `ring-offset-4`, `ring-offset-8`

### Ring Offset Color
- `ring-offset-{color}-{shade}` (same colors/shades as text color)

## Effects

### Box Shadow
- `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-inner`, `shadow-none`

### Box Shadow Color
- `shadow-{color}-{shade}` (same colors/shades as text color)

### Opacity
- `opacity-0`, `opacity-5`, `opacity-10`, `opacity-20`, `opacity-25`, `opacity-30`, `opacity-40`, `opacity-50`, `opacity-60`, `opacity-70`, `opacity-75`, `opacity-80`, `opacity-90`, `opacity-95`, `opacity-100`

### Mix Blend Mode
- `mix-blend-normal`, `mix-blend-multiply`, `mix-blend-screen`, `mix-blend-overlay`, `mix-blend-darken`, `mix-blend-lighten`, `mix-blend-color-dodge`, `mix-blend-color-burn`, `mix-blend-hard-light`, `mix-blend-soft-light`, `mix-blend-difference`, `mix-blend-exclusion`, `mix-blend-hue`, `mix-blend-saturation`, `mix-blend-color`, `mix-blend-luminosity`, `mix-blend-plus-lighter`

### Background Blend Mode
- `bg-blend-normal`, `bg-blend-multiply`, `bg-blend-screen`, `bg-blend-overlay`, `bg-blend-darken`, `bg-blend-lighten`, `bg-blend-color-dodge`, `bg-blend-color-burn`, `bg-blend-hard-light`, `bg-blend-soft-light`, `bg-blend-difference`, `bg-blend-exclusion`, `bg-blend-hue`, `bg-blend-saturation`, `bg-blend-color`, `bg-blend-luminosity`

## Filters

### Blur
- `blur-none`, `blur-sm`, `blur`, `blur-md`, `blur-lg`, `blur-xl`, `blur-2xl`, `blur-3xl`

### Brightness
- `brightness-0`, `brightness-50`, `brightness-75`, `brightness-90`, `brightness-95`, `brightness-100`, `brightness-105`, `brightness-110`, `brightness-125`, `brightness-150`, `brightness-200`

### Contrast
- `contrast-0`, `contrast-50`, `contrast-75`, `contrast-100`, `contrast-125`, `contrast-150`, `contrast-200`

### Drop Shadow
- `drop-shadow-sm`, `drop-shadow`, `drop-shadow-md`, `drop-shadow-lg`, `drop-shadow-xl`, `drop-shadow-2xl`, `drop-shadow-none`

### Grayscale
- `grayscale-0`, `grayscale`

### Hue Rotate
- `hue-rotate-0`, `hue-rotate-15`, `hue-rotate-30`, `hue-rotate-60`, `hue-rotate-90`, `hue-rotate-180`

### Invert
- `invert-0`, `invert`

### Saturate
- `saturate-0`, `saturate-50`, `saturate-100`, `saturate-150`, `saturate-200`

### Sepia
- `sepia-0`, `sepia`

### Backdrop Blur
- `backdrop-blur-none`, `backdrop-blur-sm`, `backdrop-blur`, `backdrop-blur-md`, `backdrop-blur-lg`, `backdrop-blur-xl`, `backdrop-blur-2xl`, `backdrop-blur-3xl`

### Backdrop Brightness
- `backdrop-brightness-{value}` (same values as brightness)

### Backdrop Contrast
- `backdrop-contrast-{value}` (same values as contrast)

### Backdrop Grayscale
- `backdrop-grayscale-0`, `backdrop-grayscale`

### Backdrop Hue Rotate
- `backdrop-hue-rotate-{value}` (same values as hue-rotate)

### Backdrop Invert
- `backdrop-invert-0`, `backdrop-invert`

### Backdrop Opacity
- `backdrop-opacity-{value}` (same values as opacity)

### Backdrop Saturate
- `backdrop-saturate-{value}` (same values as saturate)

### Backdrop Sepia
- `backdrop-sepia-0`, `backdrop-sepia`

## Tables

### Border Collapse
- `border-collapse`, `border-separate`

### Border Spacing
- `border-spacing-{value}`, `border-spacing-x-{value}`, `border-spacing-y-{value}`

### Table Layout
- `table-auto`, `table-fixed`

### Caption Side
- `caption-top`, `caption-bottom`

## Transitions & Animation

### Transition Property
- `transition-none`, `transition-all`, `transition`, `transition-colors`, `transition-opacity`, `transition-shadow`, `transition-transform`

### Transition Duration
- `duration-75`, `duration-100`, `duration-150`, `duration-200`, `duration-300`, `duration-500`, `duration-700`, `duration-1000`

### Transition Timing Function
- `ease-linear`, `ease-in`, `ease-out`, `ease-in-out`

### Transition Delay
- `delay-75`, `delay-100`, `delay-150`, `delay-200`, `delay-300`, `delay-500`, `delay-700`, `delay-1000`

### Animation
- `animate-none`, `animate-spin`, `animate-ping`, `animate-pulse`, `animate-bounce`

## Transforms

### Scale
- `scale-{value}`, `scale-x-{value}`, `scale-y-{value}`
- Values: `0`, `50`, `75`, `90`, `95`, `100`, `105`, `110`, `125`, `150`

### Rotate
- `rotate-0`, `rotate-1`, `rotate-2`, `rotate-3`, `rotate-6`, `rotate-12`, `rotate-45`, `rotate-90`, `rotate-180`
- Negative values: `-rotate-{value}`

### Translate
- `translate-x-{value}`, `translate-y-{value}`
- Values: same as padding/margin (including negative values)

### Skew
- `skew-x-{value}`, `skew-y-{value}`
- Values: `0`, `1`, `2`, `3`, `6`, `12`
- Negative values: `-skew-{axis}-{value}`

### Transform Origin
- `origin-center`, `origin-top`, `origin-top-right`, `origin-right`, `origin-bottom-right`, `origin-bottom`, `origin-bottom-left`, `origin-left`, `origin-top-left`

## Interactivity

### Accent Color
- `accent-{color}-{shade}` (same colors/shades as text color)

### Appearance
- `appearance-none`

### Cursor
- `cursor-auto`, `cursor-default`, `cursor-pointer`, `cursor-wait`, `cursor-text`, `cursor-move`, `cursor-help`, `cursor-not-allowed`, `cursor-none`, `cursor-context-menu`, `cursor-progress`, `cursor-cell`, `cursor-crosshair`, `cursor-vertical-text`, `cursor-alias`, `cursor-copy`, `cursor-no-drop`, `cursor-grab`, `cursor-grabbing`, `cursor-all-scroll`, `cursor-col-resize`, `cursor-row-resize`, `cursor-n-resize`, `cursor-e-resize`, `cursor-s-resize`, `cursor-w-resize`, `cursor-ne-resize`, `cursor-nw-resize`, `cursor-se-resize`, `cursor-sw-resize`, `cursor-ew-resize`, `cursor-ns-resize`, `cursor-nesw-resize`, `cursor-nwse-resize`, `cursor-zoom-in`, `cursor-zoom-out`

### Caret Color
- `caret-{color}-{shade}` (same colors/shades as text color)

### Pointer Events
- `pointer-events-none`, `pointer-events-auto`

### Resize
- `resize-none`, `resize-y`, `resize-x`, `resize`

### Scroll Behavior
- `scroll-auto`, `scroll-smooth`

### Scroll Margin
- `scroll-m-{value}`, `scroll-mx-{value}`, `scroll-my-{value}`, `scroll-mt-{value}`, `scroll-mr-{value}`, `scroll-mb-{value}`, `scroll-ml-{value}`

### Scroll Padding
- `scroll-p-{value}`, `scroll-px-{value}`, `scroll-py-{value}`, `scroll-pt-{value}`, `scroll-pr-{value}`, `scroll-pb-{value}`, `scroll-pl-{value}`

### Scroll Snap Align
- `snap-start`, `snap-end`, `snap-center`, `snap-align-none`

### Scroll Snap Stop
- `snap-normal`, `snap-always`

### Scroll Snap Type
- `snap-none`, `snap-x`, `snap-y`, `snap-both`, `snap-mandatory`, `snap-proximity`

### Touch Action
- `touch-auto`, `touch-none`, `touch-pan-x`, `touch-pan-left`, `touch-pan-right`, `touch-pan-y`, `touch-pan-up`, `touch-pan-down`, `touch-pinch-zoom`, `touch-manipulation`

### User Select
- `select-none`, `select-text`, `select-all`, `select-auto`

### Will Change
- `will-change-auto`, `will-change-scroll`, `will-change-contents`, `will-change-transform`

## SVG

### Fill
- `fill-none`, `fill-current`

### Stroke
- `stroke-none`, `stroke-current`

### Stroke Width
- `stroke-0`, `stroke-1`, `stroke-2`

## Accessibility

### Screen Readers
- `sr-only`, `not-sr-only`

## Responsive Prefixes

All utility classes can be prefixed with responsive breakpoints:
- `sm:` - @media (min-width: 640px)
- `md:` - @media (min-width: 768px)
- `lg:` - @media (min-width: 1024px)
- `xl:` - @media (min-width: 1280px)
- `2xl:` - @media (min-width: 1536px)

Example: `sm:text-lg`, `md:flex`, `lg:grid-cols-3`

## State Variants

All utility classes can be prefixed with state variants:
- `hover:` - &:hover
- `focus:` - &:focus
- `active:` - &:active
- `disabled:` - &:disabled
- `visited:` - &:visited
- `checked:` - &:checked
- `focus-within:` - &:focus-within
- `focus-visible:` - &:focus-visible
- `first:` - &:first-child
- `last:` - &:last-child
- `odd:` - &:nth-child(odd)
- `even:` - &:nth-child(even)
- `group-hover:` - .group:hover &
- `group-focus:` - .group:focus &
- `peer-checked:` - .peer:checked ~ &
- `peer-focus:` - .peer:focus ~ &

Example: `hover:bg-blue-500`, `focus:ring-2`, `disabled:opacity-50`

## Dark Mode

All utility classes can be prefixed with `dark:` for dark mode:
- Example: `dark:bg-gray-900`, `dark:text-white`

## Print

All utility classes can be prefixed with `print:` for print styles:
- Example: `print:hidden`, `print:text-black`

## Container

- `container` - Sets max-width to match min-width of current breakpoint

## Arbitrary Values

You can use arbitrary values with square bracket notation:
- `w-[137px]`, `text-[#1da1f2]`, `top-[-3px]`, `p-[2.5rem]`

---

## Sources

This reference is compiled from the official Tailwind CSS documentation:

- **Tailwind CSS Documentation** - https://tailwindcss.com/docs
- **Core Concepts** - https://tailwindcss.com/docs/utility-first
- **Customization** - https://tailwindcss.com/docs/configuration
- **Responsive Design** - https://tailwindcss.com/docs/responsive-design
- **Dark Mode** - https://tailwindcss.com/docs/dark-mode
- **Hover, Focus & Other States** - https://tailwindcss.com/docs/hover-focus-and-other-states

For the most up-to-date information and detailed usage examples, please refer to the official Tailwind CSS documentation at https://tailwindcss.com

**Last Updated:** February 2026

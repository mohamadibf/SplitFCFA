---
name: SplitFCFA Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#3d4947'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#a93349'
  on-secondary: '#ffffff'
  secondary-container: '#fe7488'
  on-secondary-container: '#730425'
  tertiary: '#765700'
  on-tertiary: '#ffffff'
  tertiary-container: '#956e00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#ffdadc'
  secondary-fixed-dim: '#ffb2b9'
  on-secondary-fixed: '#400010'
  on-secondary-fixed-variant: '#891933'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is centered on a **Playful Modernism** aesthetic, specifically engineered to reduce the "financial friction" often associated with debt and expense tracking. By moving away from traditional, rigid banking aesthetics, it fosters a sense of communal harmony and transparency.

The style leverages **soft-depth surfaces** and **vibrant accents** to make the interface feel alive and approachable. It utilizes a hybrid of "Corporate Modern" reliability with the energetic bounce of "Neo-minimalism." The emotional goal is to transform the act of "splitting bills" from a chore into a collaborative social interaction. 

Key characteristics include:
- **Low-Anxiety Visuals:** Generous whitespace and soft corners to prevent data density from feeling overwhelming.
- **Micro-interactivity:** Subtle transitions that provide positive reinforcement when a debt is settled or a bill is added.
- **Clarity First:** A hierarchy that prioritizes the "who owes whom" flow over secondary metadata.

## Colors

The palette is anchored by **Teal** (Primary), chosen for its calming yet modern qualities, and **Coral** (Secondary), used sparingly for high-action items like "Settle Up" or "Add Expense." 

- **Primary (Teal):** Used for main navigation, primary buttons, and positive financial balances.
- **Secondary (Coral):** Used for alerts, highlights, and the brand's energetic "accent" moments.
- **Tertiary (Amber):** Specifically reserved for "pending" states or warnings that require attention but not immediate panic.
- **Semantic Logic:** Success greens and error reds are adjusted to match the vibrance of the brand palette to maintain visual cohesion. 
- **Base Tones:** The background is a soft off-white (`#F8FAFC`) to reduce eye strain and provide a clean canvas for layered cards.

## Typography

This design system utilizes **Inter** exclusively to ensure maximum legibility and a systematic, clean appearance across all platforms. 

- **Weight Strategy:** Headlines use Bold (700) or ExtraBold (800) to create a clear "at-a-glance" information hierarchy.
- **Numeric Display:** When showing currency amounts, use tabular figures if available to ensure decimals align perfectly in lists and tables.
- **Contrast:** High-level labels use uppercase with slight tracking (letter spacing) to differentiate them from body copy without requiring larger font sizes.

## Layout & Spacing

The layout follows a **Fluid Grid** system that prioritizes mobile-first interactions, as expense tracking often happens on the go.

- **Grid:** A 12-column grid is used for desktop, collapsing to a single column for mobile.
- **The 4px Rule:** All spacing increments are multiples of 4px. Use `md (16px)` as the standard padding for containers and `lg (24px)` for vertical section gaps.
- **Safe Areas:** On mobile devices, ensure a minimum margin of 16px from the screen edge. On desktop, content is centered with a max-width of 1200px to maintain readability.

## Elevation & Depth

To achieve a "DaisyUI-inspired" look with a custom twist, this design system uses **Tonal Layers** combined with **Ambient Shadows**.

- **Surface Levels:** 
  - **Level 0 (Background):** Soft off-white base.
  - **Level 1 (Cards):** Pure white background with a 10% opacity primary-colored shadow. This "tinted shadow" keeps the UI feeling colorful rather than grey and heavy.
  - **Level 2 (Modals/Popovers):** Slightly higher elevation with a more diffused shadow (20% opacity) and a subtle 1px border using the neutral-content color at low opacity.
- **Interactive States:** Buttons and clickable cards should "lift" (move -2px on the Y-axis and increase shadow spread) on hover to provide tactile feedback.

## Shapes

The shape language is **friendly and organic**. 

- **Components:** Standard buttons, input fields, and cards utilize a `0.5rem (8px)` corner radius.
- **Large Containers:** Modals and bottom sheets use the `rounded-xl (1.5rem)` setting to feel more modern and mobile-native.
- **Interactive Elements:** Checkboxes and radio buttons maintain the `roundedness: 2` setting, giving them a slightly softened square or circular appearance that matches the overall UI.

## Components

The component library takes inspiration from DaisyUI but applies strict brand tokens for a custom feel.

### Cards & Stats
- **Stat Cards:** Use a large `headline-lg` for the amount and `label-md` for the description. Include a small icon or colored "pill" indicator to show if the user is "Owed" (Teal) or "Owes" (Coral).
- **Shadows:** Always use the primary-tinted ambient shadow defined in the Elevation section.

### Tables & Lists
- **Zebra Tables:** For transaction history, use alternating row colors (`base-100` and `base-200`). This improves readability in data-heavy views.
- **List Items:** Use a 72px minimum height for mobile list items to ensure they are "thumb-friendly."

### Badges & Categories
- **Category Badges:** Use a "Pastel-on-Dark" approach. The badge background should be a 15% opacity version of the category color, with the text being the 100% opacity color for contrast.
  - **Food:** Amber/Orange
  - **Transport:** Blue
  - **Leisure:** Purple/Pink

### Buttons & Inputs
- **Primary Button:** Solid Teal with white text.
- **Ghost/Outline Buttons:** Used for secondary actions like "Cancel" or "Edit."
- **Input Fields:** Use a subtle background fill (`base-200`) rather than a heavy border to keep the form looking clean and modern.

### Modals & Tabs
- **Tabs:** Use the "Tab Lifted" style where the active tab is visually connected to the content area below it.
- **Modals:** Must include a clear close button and use the `rounded-xl` shape. For mobile, these should transition from the bottom of the screen (Bottom Sheet pattern).
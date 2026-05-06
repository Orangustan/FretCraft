# FretCraft — Claude Code Instructions

## Project Overview

FretCraft is a guitar skill-tree learning app. It is a **pnpm monorepo** with four packages:

- `packages/core` — rank engine, unlock logic, practice session types, rank tests
- `packages/ui` — React 18 frontend (Vite), the only visual layer
- `packages/audio-lab` — audio utilities
- `packages/score-analyzer` — score analysis tools

**Commands:**
- `pnpm dev` — start all packages in parallel
- `pnpm build` — build all packages
- `pnpm test` — run all test suites (vitest)
- `pnpm typecheck` — TypeScript check across all packages

## Tech Stack

- **Frontend:** React 18, Vite, pure CSS custom properties — no Tailwind, no CSS-in-JS
- **Styles entry:** `packages/ui/src/shared/styles/globals.css` (design tokens) + `packages/ui/src/App.css` (shell layout)
- **Animations:** CSS-only keyframes — no framer-motion or similar libraries
- **State:** React context (`packages/ui/src/store/playerStore.tsx`)
- **Testing:** Vitest

## Frontend Aesthetics

Every frontend change — new components, layout adjustments, style additions — must follow these principles:

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>

### Current Aesthetic: "Luthier's Workshop"

FretCraft's established visual language — maintain and extend it:

- **Palette:** Deep walnut backgrounds (`#0b0704`), aged brass gold (`#c8762a`), verdigris teal (`#4a9e8e`), parchment text (`#f2e8d5`)
- **Fonts:** `Cinzel Decorative` (display/logo), `Cinzel` (section headers), `Cormorant Garamond` (body), `JetBrains Mono` (data/numbers)
- **Texture:** Woodgrain via repeating linear gradients, engraved gold lines as dividers
- **Motion:** CSS keyframes only; orchestrate page-load reveals with `animation-delay` stagger
- **Elevation:** 5 background levels — `--color-bg-primary` through `--color-bg-hover`
- **Glow:** Gold/verdigris `box-shadow` and `drop-shadow` on interactive and highlighted elements

All design tokens live in `packages/ui/src/shared/styles/globals.css` — use CSS variables, never hardcode colors.

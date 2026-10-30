<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# dream-place

Single-page travel-landing site: Next.js (App Router, TypeScript strict, React 19), one route `src/app/page.tsx`.

## Development rules

- shadcn/ui components are installed via the CLI (`npx shadcn add <name> --yes`), never hand-written. Check `src/components/ui/` for an existing component first; install only the needed component plus its required dependencies, and verify the result compiles
- Inspect the project before creating anything. Reuse and improve existing components and sections (`src/components/ui/*`, `src/components/landing/*`) instead of making duplicates; keep the base-nova design language consistent
- Never break previously implemented sections — when a new feature affects them, update them in place and keep the whole site consistent
- Every component and section must be fully responsive (mobile, tablet, laptop, desktop) using Tailwind breakpoints: no horizontal overflow, overlapping elements, broken layouts, or dead whitespace. Verify at multiple viewport widths before considering a component complete
- Follow the conventions below and TypeScript best practices; avoid unnecessary dependencies
- Verify every change: `npm run lint` (ESLint), `npx tsc --noEmit` (after a dev/build run — see Commands note), `npm run build`, and a responsive check

## Commands

- `npm run dev` — dev server (Turbopack) at localhost:3000
- `npm run build` / `npm start`
- `npm run lint` — ESLint flat config; lints the repo with no args
- `npx tsc --noEmit` — typecheck (no script). Run it only AFTER `dev` or `build` has run once: `tsconfig.json` includes generated `.next/types/**` route types, so typecheck fails/incompletes on a clean checkout
- No test setup, no CI, no path other than `@/* -> ./src/*`

## UI stack — non-default shadcn ("base-nova" style)

- Primitives come from **`@base-ui/react`**, imported by subpath (e.g. `@base-ui/react/button`), NOT Radix. Do not install Radix packages to match newer shadcn components
- `cn` is the small **`cn` package**, re-exported from `src/lib/utils.ts` — not clsx + tailwind-merge
- Use the shadcn CLI (`npx shadcn add ...`) with the aliases in `components.json` (`@/components/ui`, `@/lib`, `@/hooks` → `src/...`) so variants/styling match existing `src/components/ui/*`

## Styling

- Tailwind v4 via a Turbopack rule in `next.config.ts` — there is **no `tailwind.config`**. Design tokens live in `src/app/globals.css` under `@theme inline`
- Josefin Sans is loaded with `next/font` in `src/app/layout.tsx`

## Misc

- `next.config.ts` enables `reactCompiler` and `cacheComponents` — don't hand-roll memoization; expect `cacheComponents` to make uncached fetches/Dynamic APIs require cache config
- Layout files use the `LayoutProps<"/">` route-typed props convention from `node_modules/next/dist/docs/` — don't hand-write `{ children: React.ReactNode }`-styles that disagree with it

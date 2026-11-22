# AGENTS.md

Instructions for AI coding agents working in this repo. Read fully before changing code.

## Stack

- **React 19 + TypeScript (strict)**, bundled with **Vite**
- **Tailwind CSS v4** (CSS-first config in `src/styles/index.css`, no `tailwind.config.js`)
- **Capacitor** wraps the built web app (`dist/`) for **iOS and Android**
- Routing: `react-router-dom` with **HashRouter** (do not switch to BrowserRouter)
- Variants: `class-variance-authority`; class merging: `cn()` from `@/lib/cn`
- Import alias: `@/` → `src/`

## Commands

| Task | Command |
| --- | --- |
| Dev server (browser) | `npm run dev` |
| Typecheck / lint / build | `npm run typecheck` · `npm run lint` · `npm run build` |
| First-time native setup | `npm run cap:add:ios` · `npm run cap:add:android` |
| Build + sync + open IDE | `npm run ios` · `npm run android` |
| Build + sync + run on device | `npm run ios:run` · `npm run android:run` |

**Definition of done for every change:** `npm run lint && npm run build` pass with zero errors.
After adding/removing a Capacitor plugin or changing `capacitor.config.ts`, run `npx cap sync`.

## Atomic Design (mandatory, lint-enforced)

```
src/
  components/
    atoms/       smallest UI units: Button, Text, Icon, Input, Badge
    molecules/   small groups of atoms with one purpose: ListItem, SearchField
    organisms/   self-contained UI sections: Header, TabBar, SettingsForm
    templates/   page layouts WITHOUT content/data: AppShell
  pages/         routed screens; compose templates + organisms; own data & state wiring
  hooks/         reusable React hooks (no JSX)
  lib/           pure helpers & native wrappers (no UI imports)
  styles/        index.css = design tokens + base styles
```

**Dependency direction (only downward):**
`pages → templates → organisms → molecules → atoms`

| Layer | May import | Must NOT import |
| --- | --- | --- |
| atoms | `lib`, `hooks` | any other component layer |
| molecules | atoms | molecules, organisms, templates, pages |
| organisms | atoms, molecules | organisms, templates, pages |
| templates | atoms, molecules, organisms | templates, pages |
| pages | all component layers | other pages |
| lib / hooks | each other | any component or page |

This is enforced by `eslint-plugin-boundaries` in `eslint.config.js`. **Never** disable the rule or add
exceptions to make an import work; move the code to the right layer instead.

### Component rules

1. One component per file, named export, file name = component name (`Button.tsx`). No default exports, no barrel files.
2. **Atoms & molecules are presentational**: props in, JSX out. No data fetching, no router hooks, no Capacitor calls.
   Navigation/data/native access belongs in pages (or organisms when unavoidable), passed down via props.
3. Every atom/molecule/organism accepts `className` and merges it with `cn(base, className)`.
4. Variants use `cva`; export the props type. Don't create boolean-prop soup.
5. Before creating a component, **search the existing layers** and reuse/extend. Don't duplicate.
6. Decide the layer by this test: can't be split into smaller UI parts → atom; combines atoms for one job → molecule;
   a standalone section of a screen → organism; arrangement of regions with no real content → template.

## Styling (Tailwind)

- Style with Tailwind utilities only. No inline `style`, no CSS modules, no new CSS files.
  Exception: dynamic values that Tailwind can't express.
- **Use design tokens, never raw values.** Colors/radius/spacing come from `@theme` in `src/styles/index.css`
  (`bg-primary`, `text-muted`, `rounded-card`, `border-border`). No hex colors in components.
  Need a new token? Add it to `@theme` (and dark mode override if relevant) — don't hardcode.
- Dark mode is automatic via `prefers-color-scheme`; tokens are redefined in `index.css`. Don't use `dark:` for token colors.
- **Mobile-first, touch-first:** interactive elements are at least `min-h-11` (44px). Use `active:` states, not `hover:`.
- **Safe areas:** headers use `pt-safe-top`, bottom bars use `pb-safe-bottom`, shells use `pl-safe-left pr-safe-right`.
  Never hardcode notch/status-bar paddings.
- Scrolling lives in `<main>` of `AppShell`; the body does not scroll. Inputs must stay `font-size: 16px` (prevents iOS zoom).

## Capacitor / native rules

- Access the platform through `@/lib/platform` (`isNative`, `platform`) and wrappers in `@/lib/native.ts`.
- **Every native call must degrade gracefully in the browser** (guard with `isNative` or `.catch`). The app must keep working on `npm run dev`.
- Native plugin usage lives in `src/lib/` or `src/hooks/`, never in atoms/molecules.
- Use official `@capacitor/*` plugins first. Install with `npm i`, then `npx cap sync`, and note required
  `Info.plist` / `AndroidManifest.xml` permissions in your summary to the user.
- Do not hand-edit generated files in `ios/App/App/public` or `android/app/src/main/assets/public` (build output).
  Native project config (icons, permissions, signing) in `ios/` and `android/` may be edited when needed.
- `appId` / `appName` are in `capacitor.config.ts`. Changing `appId` after native projects exist requires re-adding platforms.
- Android back button is handled by `useBackButton`; new root-level navigation must keep that working.

## TypeScript & code style

- `strict` is on. No `any`, no `@ts-ignore` (use `@ts-expect-error` with a reason if truly unavoidable).
- Function components only; hooks at top level; follow `react-hooks` lint.
- Prefer `type` over `interface` for props. Keep components small; extract at ~150 lines.
- Accessibility: icon-only buttons need `aria-label`; decorative icons are `aria-hidden` (already default in `Icon`).
- Don't add dependencies without a clear need; prefer what is already installed.

## Skills

Task playbooks live in `.claude/skills/<name>/SKILL.md`. **Read the matching skill before starting:**

| Task | Skill |
| --- | --- |
| New atom / molecule / organism / template | `.claude/skills/create-atomic-component/SKILL.md` |
| New screen or route | `.claude/skills/add-page/SKILL.md` |
| Camera, storage, haptics, push, any native feature | `.claude/skills/use-native-plugin/SKILL.md` |

## When unsure

Ask rather than invent: layer placement, new design tokens, and new native permissions are user-visible decisions.

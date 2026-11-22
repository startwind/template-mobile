# Mobile App Template

React 19 + Tailwind v4 + Capacitor (iOS/Android), structured with Atomic Design.

## Quick start

```bash
npm install
npm run dev                # develop in the browser

# once: set appId/appName in capacitor.config.ts, then
npm run cap:add:ios        # needs macOS + Xcode + CocoaPods
npm run cap:add:android    # needs Android Studio

npm run ios                # build, sync, open Xcode
npm run android            # build, sync, open Android Studio
```

Live reload on a device: `CAP_SERVER_URL=http://<lan-ip>:5173 npx cap run ios` (with `npm run dev` running).

## Structure

See `AGENTS.md` – it defines the atomic layers, import rules (enforced by ESLint), styling tokens and native guidelines
for both humans and AI agents. Task playbooks: `.claude/skills/`.

## Customize first

- `capacitor.config.ts` → `appId`, `appName`
- `src/styles/index.css` → design tokens (`@theme`)
- `index.html` → `<title>`
- App icons/splash: `npm i -D @capacitor/assets` and put `assets/icon.png` (1024²) + `assets/splash.png` (2732²), then `npx capacitor-assets generate`

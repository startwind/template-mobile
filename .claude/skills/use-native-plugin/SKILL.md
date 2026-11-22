---
name: use-native-plugin
description: Add or use a Capacitor native plugin (camera, filesystem, preferences, haptics, push, share, etc.) safely across iOS, Android and web.
---

# Use a Capacitor plugin

1. **Prefer official plugins** (`@capacitor/*`). Check https://capacitorjs.com/docs/plugins before adding community ones.
2. Install and sync:
   ```bash
   npm i @capacitor/<plugin>
   npx cap sync
   ```
3. **Wrap it** — never call a plugin from atoms/molecules. Create `src/lib/<feature>.ts` (pure functions) and, if
   React state is involved, `src/hooks/use<Feature>.ts`.
4. **Guard for web** so `npm run dev` keeps working:

```ts
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { isNative } from './platform'

export async function tap() {
  if (!isNative) return
  await Haptics.impact({ style: ImpactStyle.Light }).catch(() => {})
}
```

5. Pages (or organisms) call the hook/lib and pass results/handlers **down as props**.
6. **Permissions:** tell the user which entries are required and add them if native projects exist:
   - iOS: usage strings in `ios/App/App/Info.plist` (e.g. `NSCameraUsageDescription`)
   - Android: `<uses-permission>` in `android/app/src/main/AndroidManifest.xml`
7. Initialization that must run at startup goes into `initNative()` in `src/lib/native.ts`.
8. Run `npm run lint && npm run build`, then `npx cap sync`. State clearly that on-device testing
   (`npm run ios:run` / `npm run android:run`) is needed for native behavior — you can't verify it in the browser.

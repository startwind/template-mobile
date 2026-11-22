import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app', // TODO: set your bundle id (iOS) / applicationId (Android)
  appName: 'Mobile App', // TODO: set display name
  webDir: 'dist',
  ios: { contentInset: 'never' }, // we handle safe areas in CSS (env(safe-area-inset-*))
  plugins: {
    SplashScreen: { launchAutoHide: false },
    Keyboard: { resizeOnFullScreen: true },
  },
  // Live reload on device: set CAP_SERVER_URL=http://<your-lan-ip>:5173 then `npx cap run ios|android`
  ...(process.env.CAP_SERVER_URL
    ? { server: { url: process.env.CAP_SERVER_URL, cleartext: true } }
    : {}),
}

export default config

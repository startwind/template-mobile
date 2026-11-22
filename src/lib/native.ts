import { App } from '@capacitor/app'
import { Keyboard } from '@capacitor/keyboard'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'
import { isNative, platform } from './platform'

/** Call once at startup. Every native call is guarded so the app also runs in a plain browser. */
export async function initNative() {
  if (!isNative) return

  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  await StatusBar.setStyle({ style: dark ? Style.Dark : Style.Light }).catch(() => {})
  if (platform === 'android') {
    await StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {})
  }
  await Keyboard.setAccessoryBarVisible({ isVisible: false }).catch(() => {})

  await SplashScreen.hide().catch(() => {})
}

/** Android hardware back button: navigate back, or exit at the root. */
export function registerBackButton(canGoBack: () => boolean, goBack: () => void) {
  if (platform !== 'android') return () => {}
  const handle = App.addListener('backButton', () => (canGoBack() ? goBack() : App.exitApp()))
  return () => void handle.then((h) => h.remove())
}

import { Capacitor } from '@capacitor/core'

export const platform = Capacitor.getPlatform() // 'ios' | 'android' | 'web'
export const isNative = Capacitor.isNativePlatform()

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind class names; later classes win. Always use this for className props. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

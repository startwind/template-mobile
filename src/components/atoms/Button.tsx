import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const button = cva(
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-control px-4 font-semibold transition active:scale-[0.98] active:opacity-80 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-fg',
        secondary: 'bg-surface-alt text-fg',
        ghost: 'bg-transparent text-primary',
        danger: 'bg-danger text-white',
      },
      full: { true: 'w-full' },
    },
    defaultVariants: { variant: 'primary' },
  },
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>

export function Button({ variant, full, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cn(button({ variant, full }), className)} {...props} />
}

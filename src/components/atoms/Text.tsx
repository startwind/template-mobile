import { cva, type VariantProps } from 'class-variance-authority'
import type { ElementType, HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const text = cva('', {
  variants: {
    variant: {
      title: 'text-2xl font-bold tracking-tight',
      heading: 'text-lg font-semibold',
      body: 'text-base',
      caption: 'text-sm text-muted',
    },
  },
  defaultVariants: { variant: 'body' },
})

type TextProps = HTMLAttributes<HTMLElement> & VariantProps<typeof text> & { as?: ElementType }

export function Text({ as: Tag = 'p', variant, className, ...props }: TextProps) {
  return <Tag className={cn(text({ variant }), className)} {...props} />
}

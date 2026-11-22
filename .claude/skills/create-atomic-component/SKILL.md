---
name: create-atomic-component
description: Create a new UI component (atom, molecule, organism or template) in this Atomic Design codebase. Use whenever adding or splitting UI components.
---

# Create an atomic component

1. **Search first.** `ls src/components/*` and grep for similar components. Extend an existing one if it fits.
2. **Pick the layer** (see AGENTS.md):
   - atom: single element, no other components inside (compose them in a molecule)
   - molecule: ≥2 atoms, one purpose
   - organism: standalone screen section, may hold local UI state
   - template: layout regions only (slots via props), no content
3. **Create** `src/components/<layer>/<Name>.tsx` (PascalCase, one component, named export).
4. **Follow this shape:**

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const badge = cva('inline-flex items-center rounded-control px-2 text-sm font-medium', {
  variants: {
    tone: { neutral: 'bg-surface-alt text-fg', primary: 'bg-primary text-primary-fg' },
  },
  defaultVariants: { tone: 'neutral' },
})

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badge>

export function Badge({ tone, className, ...props }: BadgeProps) {
  return <span className={cn(badge({ tone }), className)} {...props} />
}
```

5. **Rules checklist**
   - `className` prop merged via `cn`
   - only token classes (`bg-primary`, `text-muted`, `rounded-card`) — no hex, no inline style
   - touch targets ≥ `min-h-11`; use `active:` not `hover:`
   - imports go **downward only**; use `@/` alias (e.g. `@/components/atoms/Text`)
   - atoms/molecules: no router, no data fetching, no Capacitor
   - icons: add a path to `paths` in `atoms/Icon.tsx` instead of adding an icon library
6. **Use it** in a page to verify, then run `npm run lint && npm run build`. A boundaries error means wrong layer — move code, never disable the rule.

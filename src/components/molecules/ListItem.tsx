import type { ReactNode } from 'react'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import { cn } from '@/lib/cn'

type ListItemProps = {
  title: string
  description?: string
  onClick?: () => void
  trailing?: ReactNode
  className?: string
}

export function ListItem({ title, description, onClick, trailing, className }: ListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left active:bg-surface-alt', className)}
    >
      <div className="min-w-0 flex-1">
        <Text variant="body" className="truncate font-medium">{title}</Text>
        {description && <Text variant="caption" className="truncate">{description}</Text>}
      </div>
      {trailing ?? <Icon name="chevronRight" className="size-5 text-muted" />}
    </button>
  )
}

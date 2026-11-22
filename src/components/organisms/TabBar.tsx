import { NavLink } from 'react-router-dom'
import { Icon, type IconName } from '@/components/atoms/Icon'
import { cn } from '@/lib/cn'

export type TabItem = { to: string; label: string; icon: IconName }

export function TabBar({ items }: { items: TabItem[] }) {
  return (
    <nav className="flex border-t border-border bg-surface pb-safe-bottom">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          className={({ isActive }) =>
            cn('flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs', isActive ? 'text-primary' : 'text-muted')
          }
        >
          <Icon name={item.icon} className="size-6" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

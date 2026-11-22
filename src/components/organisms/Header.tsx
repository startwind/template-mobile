import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'

type HeaderProps = { title: string; onBack?: () => void }

export function Header({ title, onBack }: HeaderProps) {
  return (
    <header className="flex items-center gap-1 border-b border-border bg-surface px-2 pt-safe-top">
      <div className="flex h-12 w-full items-center">
        {onBack ? (
          <Button variant="ghost" aria-label="Back" onClick={onBack} className="px-2">
            <Icon name="chevronLeft" />
          </Button>
        ) : (
          <span className="w-2" />
        )}
        <Text as="h1" variant="heading" className="flex-1 truncate">{title}</Text>
      </div>
    </header>
  )
}

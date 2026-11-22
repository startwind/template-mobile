import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/atoms/Button'
import { Text } from '@/components/atoms/Text'
import { ListItem } from '@/components/molecules/ListItem'
import { Header } from '@/components/organisms/Header'
import { AppShell } from '@/components/templates/AppShell'
import { platform } from '@/lib/platform'

export function HomePage() {
  const navigate = useNavigate()
  return (
    <AppShell header={<Header title="Home" />}>
      <div className="space-y-4 p-4">
        <Text variant="title">Hello 👋</Text>
        <Text variant="caption">Running on: {platform}</Text>
        <Button full onClick={() => navigate('/settings')}>Open settings</Button>
      </div>
      <div className="divide-y divide-border">
        <ListItem title="Example item" description="Replace me" />
        <ListItem title="Another item" />
      </div>
    </AppShell>
  )
}

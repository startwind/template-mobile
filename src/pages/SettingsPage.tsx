import { useNavigate } from 'react-router-dom'
import { Text } from '@/components/atoms/Text'
import { Header } from '@/components/organisms/Header'
import { AppShell } from '@/components/templates/AppShell'

export function SettingsPage() {
  const navigate = useNavigate()
  return (
    <AppShell header={<Header title="Settings" onBack={() => navigate(-1)} />}>
      <div className="p-4">
        <Text>Settings go here.</Text>
      </div>
    </AppShell>
  )
}

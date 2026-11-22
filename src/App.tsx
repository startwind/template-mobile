import { HashRouter, Route, Routes } from 'react-router-dom'
import { useBackButton } from '@/hooks/useBackButton'
import { HomePage } from '@/pages/HomePage'
import { SettingsPage } from '@/pages/SettingsPage'

function Routing() {
  useBackButton()
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  )
}

// HashRouter: works with Capacitor's local file serving without server-side rewrites.
export function App() {
  return (
    <HashRouter>
      <Routing />
    </HashRouter>
  )
}

---
name: add-page
description: Add a new routed screen/page to the app. Use for any new screen, route or tab.
---

# Add a page

1. Create `src/pages/<Name>Page.tsx` with a named export. Pages compose a **template** + **organisms/molecules/atoms**;
   they own data loading, state, navigation (`useNavigate`) and native calls (via `@/lib` / `@/hooks`).

```tsx
import { useNavigate } from 'react-router-dom'
import { Text } from '@/components/atoms/Text'
import { Header } from '@/components/organisms/Header'
import { AppShell } from '@/components/templates/AppShell'

export function ProfilePage() {
  const navigate = useNavigate()
  return (
    <AppShell header={<Header title="Profile" onBack={() => navigate(-1)} />}>
      <div className="p-4"><Text>…</Text></div>
    </AppShell>
  )
}
```

2. Register the route in `src/App.tsx` inside `<Routes>` (HashRouter; paths like `/profile`).
3. Root-level screens (reachable without a back stack) have no `onBack`; pushed screens get `onBack`.
4. **Tabs:** pass `footer={<TabBar items={…} />}` to `AppShell`. Define the `TabItem[]` in the page/App level, not inside TabBar.
5. If the page needs a new reusable UI piece, use the `create-atomic-component` skill — don't inline big markup in the page.
6. Run `npm run lint && npm run build`. Verify in the browser with `npm run dev` (mobile viewport).

import type { ReactNode } from 'react'

type AppShellProps = { header?: ReactNode; footer?: ReactNode; children: ReactNode }

/** Page skeleton: fixed header/footer, scrolling content, safe areas handled by header/footer. No data, no logic. */
export function AppShell({ header, footer, children }: AppShellProps) {
  return (
    <div className="flex h-full flex-col pl-safe-left pr-safe-right">
      {header}
      <main className="flex-1 overflow-y-auto overscroll-contain">{children}</main>
      {footer}
    </div>
  )
}

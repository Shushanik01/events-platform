import type { ComponentType } from 'react'

export interface AdminNavLink {
  labelKey: string
  to: string
  Icon: ComponentType<Record<string, never>>
  end?: boolean
}

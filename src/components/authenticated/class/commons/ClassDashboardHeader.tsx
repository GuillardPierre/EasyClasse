import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'

type CustomDashboardHeaderProps = {
  title: string
  subtitle?: string
  actions?: Array<{
    label: string
    href: string
    icon?: LucideIcon
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  }>
  customActions?: ReactNode
}

export function DashboardHeader({
  title,
  subtitle,
  actions = [],
  customActions,
}: CustomDashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {subtitle ? (
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Affichage des actions personnalisées */}
        {customActions}

        {/* Affichage des actions configurées */}
        {actions.map((action) => (
          <Button
            key={action.href}
            asChild
            variant={action.variant ?? 'default'}
          >
            <Link to={action.href} className="flex items-center gap-2">
              {action.icon ? <action.icon className="size-4" /> : null}
              {action.label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}

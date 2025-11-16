import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

type ClassDashboardHeaderProps = {
  title: string
  subtitle?: string
  actions?: Array<{
    label: string
    href: string
    icon?: LucideIcon
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  }>
}

export function ClassDashboardHeader({
  title,
  subtitle,
  actions = [],
}: ClassDashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2>{title}</h2>
        {subtitle ? (
          <p className="text-muted-foreground mt-0">{subtitle}</p>
        ) : null}
      </div>

      {actions.length ? (
        <div className="flex flex-wrap items-center gap-2">
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
      ) : null}
    </div>
  )
}

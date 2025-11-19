import { Link } from '@tanstack/react-router'
import { Edit3 } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export type ActivityItem = {
  id?: string
  title: string
  description: string
  color?: string
  href?: string
}

type RecentActivityCardProps = {
  activities: Array<ActivityItem>
  className?: string
  title?: string
  description?: string
  onEdit?: (activity: ActivityItem, index: number) => void
}

export function RecentActivityCard({
  activities,
  className,
  title = 'Activités Récentes',
  description = 'Suivi des dernières actions',
  onEdit,
}: RecentActivityCardProps) {
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.map((activity, index) => (
            <ActivityRow
              key={activity.id ?? `${activity.title}-${index}`}
              activity={activity}
              onEdit={onEdit ? () => onEdit(activity, index) : undefined}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

type ActivityRowProps = {
  activity: ActivityItem
  onEdit?: () => void
}

function ActivityRow({ activity, onEdit }: ActivityRowProps) {
  const { title, description, color, href } = activity

  const content = (
    <div className="flex items-center gap-4 rounded-md border border-transparent p-2 hover:border-border mb-0">
      <span
        className={`h-2 w-2 rounded-full ${color ?? 'bg-primary'}`}
        aria-hidden
      />
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground mt-0">{description}</p>
      </div>
      {onEdit ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onEdit()
          }}
          aria-label="Modifier l'activité"
        >
          <Edit3 className="size-4" />
        </Button>
      ) : null}
    </div>
  )

  if (href) {
    return (
      <Link
        to={href}
        className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {content}
      </Link>
    )
  }

  return content
}

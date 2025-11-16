import { Link } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export type ActivityItem = {
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
}

export function RecentActivityCard({
  activities,
  className,
  title = 'Activités Récentes',
  description = 'Suivi des dernières actions',
}: RecentActivityCardProps) {
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.map((activity) => (
            <ActivityRow key={activity.title} {...activity} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function ActivityRow({ title, description, color, href }: ActivityItem) {
  const content = (
    <div className="flex items-center gap-4 rounded-md border border-transparent p-2 hover:border-border">
      <span
        className={`h-2 w-2 rounded-full ${color ?? 'bg-primary'}`}
        aria-hidden
      />
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground mt-0">{description}</p>
      </div>
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

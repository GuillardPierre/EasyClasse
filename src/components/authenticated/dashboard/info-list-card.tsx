import { Link } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type InfoListItem = {
  primary: string
  secondary?: string
  meta?: string
  href?: string
}

type InfoListCardProps = {
  title: string
  description?: string
  items: Array<InfoListItem>
  className?: string
}

export function InfoListCard({
  title,
  description,
  items,
  className,
}: InfoListCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <InfoListRow key={item.primary + (item.secondary ?? '')} {...item} />
        ))}
      </CardContent>
    </Card>
  )
}

function InfoListRow({ primary, secondary, meta, href }: InfoListItem) {
  const content = (
    <div className="flex items-center justify-between rounded-md border border-transparent p-2 hover:border-border">
      <div>
        <p className="text-sm font-medium">{primary}</p>
        {secondary ? (
          <p className="text-xs text-muted-foreground mt-0">{secondary}</p>
        ) : null}
      </div>
      {meta ? (
        <span className="text-xs font-semibold text-muted-foreground">
          {meta}
        </span>
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

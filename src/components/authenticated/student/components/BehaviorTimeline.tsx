import type { ClassStudent } from '@/components/authenticated/class/classMockData'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { EmptyState } from './EmptyState'
import { formatDate } from '@/lib/utils'

type BehaviorTimelineProps = {
  items: ClassStudent['behaviorLog']
  className?: string
}

export function BehaviorTimeline({ items, className }: BehaviorTimelineProps) {
  const typeStyles: Record<
    ClassStudent['behaviorLog'][number]['type'],
    {
      label: string
      variant: 'default' | 'secondary' | 'destructive' | 'outline'
      className?: string
    }
  > = {
    felicitation: {
      label: 'Félicitation',
      variant: 'secondary',
      className: 'bg-emerald-100 text-emerald-800',
    },
    sanction: { label: 'Sanction', variant: 'destructive' },
    retard: { label: 'Retard', variant: 'outline' },
    absence: {
      label: 'Absence',
      variant: 'outline',
      className: 'border-transparent bg-amber-100 text-amber-800',
    },
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Comportement & évènements</CardTitle>
        <CardDescription>
          Liste des évènements associés à l'élève
        </CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <EmptyState
            title="Aucun évènement pour le moment"
            description="Ajoutez un nouvel élément en cliquant sur le bouton 'Ajouter un évènement' en haut de la page."
            skeletonLines={3}
          />
        ) : (
          <div className="space-y-6">
            {items.map((entry) => {
              const meta = typeStyles[entry.type]
              return (
                <div key={entry.id} className="flex gap-4">
                  <div className="relative">
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
                    <span className="relative z-10 mt-2 block size-2 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center justify-between  mb-0">
                      <Badge variant={meta.variant} className={meta.className}>
                        {meta.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(entry.date)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-0">
                      {entry.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0">
                      {entry.subject ? `${entry.subject} · ` : ''}
                      Ajouté par {entry.author.name}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

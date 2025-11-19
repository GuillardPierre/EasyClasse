import { Edit3 } from 'lucide-react'

import { EmptyState } from './EmptyState'
import type { ClassStudent } from '@/components/authenticated/class/classMockData'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { formatDate } from '@/lib/utils'

type BehaviorTimelineProps = {
  items: ClassStudent['events']
  className?: string
  onEdit?: (event: ClassStudent['events'][number]) => void
}

export function BehaviorTimeline({
  items,
  className,
  onEdit,
}: BehaviorTimelineProps) {
  const typeStyles: Record<
    ClassStudent['events'][number]['type'],
    {
      label: string
      variant: 'default' | 'secondary' | 'destructive' | 'outline'
      className?: string
    }
  > = {
    'rdv-parents': {
      label: 'Rendez-vous parents',
      variant: 'secondary',
      className: 'bg-emerald-100 text-emerald-800',
    },
    administratif: { label: 'Administratif', variant: 'destructive' },
    apc: { label: 'APC', variant: 'outline' },
    medical: { label: 'Medical', variant: 'outline' },
    'vie-scolaire': { label: 'Vie scolaire', variant: 'outline' },
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
                    <div className="flex flex-wrap items-center justify-between mb-0">
                      <Badge variant={meta.variant} className={meta.className}>
                        {meta.label}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(entry.date)}
                        </span>
                        {onEdit ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => onEdit(entry)}
                            aria-label="Modifier l'évènement"
                          >
                            <Edit3 className="size-4" />
                          </Button>
                        ) : null}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-0">
                      {entry.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0">
                      {entry.title ? `${entry.title} · ` : ''}
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

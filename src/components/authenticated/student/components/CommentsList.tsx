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

type CommentsListProps = {
  items: ClassStudent['comments']
  className?: string
}

export function CommentsList({ items, className }: CommentsListProps) {
  const commentMeta: Record<
    ClassStudent['comments'][number]['type'],
    { label: string; variant: 'secondary' | 'outline' }
  > = {
    comportement: { label: 'Comportement', variant: 'secondary' },
    suivi: { label: 'Suivi pédagogique', variant: 'outline' },
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Commentaires de l'élèves</CardTitle>
        <CardDescription>
          Commentaires partagés par les enseignants de l'élève
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <EmptyState
            title="Aucun commentaire enregistré"
            description="Appuyez sur le bouton 'Ajouter un commentaire'."
            skeletonLines={2}
          />
        ) : (
          items.map((comment) => (
            <div key={comment.id} className="space-y-2 rounded-md border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant={commentMeta[comment.type].variant}>
                  {commentMeta[comment.type].label}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDate(comment.date)}
                </span>
              </div>
              <p className="text-sm text-foreground mb-0">{comment.content}</p>
              <p className="text-xs text-muted-foreground mt-0">
                {comment.subject} • {comment.author.name}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

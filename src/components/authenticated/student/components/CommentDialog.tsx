import type { DialogFormBindings } from '@/components/hooks/useDialogForm'
import type { CommentFormValues } from '../hooks/useStudentComments'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

type CommentDialogProps = {
  studentName: string
  dialog: DialogFormBindings<CommentFormValues>
}

const commentTypeOptions: Array<{
  value: CommentFormValues['type']
  label: string
}> = [
  { value: 'comportement', label: 'Comportement' },
  { value: 'suivi', label: 'Suivi pédagogique' },
  { value: 'autre', label: 'Autre' },
]

export function CommentDialog({ studentName, dialog }: CommentDialogProps) {
  return (
    <Dialog open={dialog.open} onOpenChange={dialog.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {dialog.mode === 'create'
              ? 'Ajouter un commentaire'
              : 'Modifier le commentaire'}
          </DialogTitle>
          <DialogDescription>
            Ce commentaire sera ajouté au dossier de {studentName}.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            dialog.onSubmit()
          }}
        >
          <div className="space-y-2">
            <Label>Type de commentaire</Label>
            <Select
              value={dialog.values.type}
              onValueChange={(value) =>
                dialog.onFieldChange('type', value as CommentFormValues['type'])
              }
            >
              <SelectTrigger className="w-full justify-between">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {commentTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment-subject">Sujet</Label>
            <Input
              id="comment-subject"
              placeholder="Ex: Suivi en mathématiques"
              value={dialog.values.subject}
              onChange={(event) =>
                dialog.onFieldChange('subject', event.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment-content">Commentaire</Label>
            <Textarea
              id="comment-content"
              placeholder="Ajoutez ici les détails du commentaire…"
              value={dialog.values.content}
              onChange={(event) =>
                dialog.onFieldChange('content', event.target.value)
              }
              required
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment-date">Date</Label>
            <Input
              id="comment-date"
              type="date"
              value={dialog.values.date}
              onChange={(event) =>
                dialog.onFieldChange('date', event.target.value)
              }
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={dialog.onCancel}>
              Annuler
            </Button>
            <Button type="submit">
              {dialog.mode === 'create' ? 'Ajouter' : 'Mettre à jour'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

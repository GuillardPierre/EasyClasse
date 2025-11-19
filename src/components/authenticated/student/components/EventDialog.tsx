import type { DialogFormBindings } from '@/components/hooks/useDialogForm'
import type { EventFormValues } from '../hooks/useStudentEvents'
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

type EventDialogProps = {
  studentName: string
  dialog: DialogFormBindings<EventFormValues>
}

const eventTypeOptions: Array<{
  value: EventFormValues['type']
  label: string
}> = [
  { value: 'rdv-parents', label: 'Rendez-vous parents' },
  { value: 'administratif', label: 'Administratif' },
  { value: 'apc', label: 'APC / Soutien' },
  { value: 'medical', label: 'Medical' },
  { value: 'vie-scolaire', label: 'Vie scolaire' },
]

export function EventDialog({ studentName, dialog }: EventDialogProps) {
  return (
    <Dialog open={dialog.open} onOpenChange={dialog.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {dialog.mode === 'create'
              ? 'Ajouter un évènement'
              : 'Modifier l’évènement'}
          </DialogTitle>
          <DialogDescription>
            Cet évènement sera ajouté à la timeline de {studentName}.
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
            <Label>Type d'évènement</Label>
            <Select
              value={dialog.values.type}
              onValueChange={(value) =>
                dialog.onFieldChange('type', value as EventFormValues['type'])
              }
            >
              <SelectTrigger className="w-full justify-between">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {eventTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-title">Titre</Label>
            <Input
              id="event-title"
              placeholder="Ex: Rendez-vous parents"
              value={dialog.values.title}
              onChange={(event) =>
                dialog.onFieldChange('title', event.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-content">Description</Label>
            <Textarea
              id="event-content"
              placeholder="Ajoutez les détails importants…"
              value={dialog.values.content}
              onChange={(event) =>
                dialog.onFieldChange('content', event.target.value)
              }
              required
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-date">Date</Label>
            <Input
              id="event-date"
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

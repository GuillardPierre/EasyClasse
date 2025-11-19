import { Check } from 'lucide-react'
import type { DialogFormBindings } from '@/components/hooks/useDialogForm'
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
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type ClassEventFormValues = {
  title: string
  description: string
  color: string
  href: string
}

type ClassEventDialogProps = {
  dialog: DialogFormBindings<ClassEventFormValues>
  className?: string
}

const colorSuggestions: Array<{ label: string; value: string }> = [
  { label: 'Bleu (par défaut)', value: 'bg-blue-500' },
  { label: 'Vert', value: 'bg-green-500' },
  { label: 'Orange', value: 'bg-orange-500' },
  { label: 'Violet', value: 'bg-purple-500' },
  { label: 'Rouge', value: 'bg-red-500' },
]

export function ClassEventDialog({ dialog }: ClassEventDialogProps) {
  return (
    <Dialog open={dialog.open} onOpenChange={dialog.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {dialog.mode === 'create'
              ? 'Ajouter un évènement de classe'
              : 'Modifier l’évènement'}
          </DialogTitle>
          <DialogDescription>
            Ces informations seront visibles dans les activités récentes de la
            classe.
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
            <Label htmlFor="class-event-title">Titre</Label>
            <Input
              id="class-event-title"
              value={dialog.values.title}
              onChange={(event) =>
                dialog.onFieldChange('title', event.target.value)
              }
              placeholder="Ex : Sortie au musée"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="class-event-description">Description</Label>
            <Textarea
              id="class-event-description"
              value={dialog.values.description}
              onChange={(event) =>
                dialog.onFieldChange('description', event.target.value)
              }
              placeholder="Ajoutez des précisions sur l’évènement…"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Couleur</Label>
            <div className="flex flex-wrap gap-3">
              {colorSuggestions.map((option) => {
                const isSelected = dialog.values.color === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => dialog.onFieldChange('color', option.value)}
                    className={cn(
                      'relative flex size-8 items-center justify-center rounded-full border shadow-sm transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                      option.value,
                      isSelected
                        ? 'ring-2 ring-offset-2 ring-black dark:ring-white'
                        : 'opacity-80 hover:opacity-100',
                    )}
                    title={option.label}
                  >
                    {isSelected && (
                      <Check className="size-4 text-white drop-shadow-md" />
                    )}
                    <span className="sr-only">{option.label}</span>
                  </button>
                )
              })}
            </div>
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

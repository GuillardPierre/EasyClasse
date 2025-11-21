import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Plus, FileText, X } from 'lucide-react'
import { UploadArea } from './UploadArea'
import { MultiSelect } from '@/components/commons/MultiSelect'

interface AddEvaluationDialogProps {
  onAdd: (evaluation: any) => void
}

const mockClasses = [
  { id: '1', name: 'Classe Rouge' },
  { id: '2', name: 'Classe Bleue' },
  { id: '3', name: 'Classe Verte' },
  { id: '4', name: 'Classe Jaune' },
]

export function AddEvaluationDialog({ onAdd }: AddEvaluationDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [gradingType, setGradingType] = useState('numeric')
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && file) {
      onAdd({
        name,
        file,
        gradingType,
        classIds: selectedClasses || [],
        createdAt: new Date(),
      })
      // Reset form
      setName('')
      setFile(null)
      setGradingType('numeric')
      setSelectedClasses([])
      setOpen(false)
    }
  }

  const classOptions = mockClasses.map(c => ({ value: c.id, label: c.name }))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter une évaluation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nouvelle évaluation</DialogTitle>
            <DialogDescription>
              Enregistrer une évaluation dans un de vos dossier 
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom de l'évaluation</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Contrôle de Mathématiques - Chapitre 1"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Fichier du sujet</Label>
              {file ? (
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3 overflow-hidden min-w-0">
                    <div className="p-2 rounded bg-background border">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => setFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <UploadArea
                  onUpload={(f) => setFile(f)}
                  className="py-8"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-1">
              <div className="grid gap-2">
                <Label htmlFor="grading">Type de notation</Label>
                <Select value={gradingType} onValueChange={setGradingType}>
                  <SelectTrigger id="grading">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="numeric">Note sur 20</SelectItem>
                    <SelectItem value="competence">Acquis / Non acquis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Classes concernées (optionnel)</Label>
                <MultiSelect
                  options={classOptions}
                  selected={selectedClasses}
                  onChange={setSelectedClasses}
                  placeholder="Choisir des classes"
                  label="Mes classes"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={!name || !file}>
              Créer l'évaluation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

import { useState, useEffect } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StudentResult } from './EvaluationDetails'

interface StudentResultDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: StudentResult | null
  onSave: (result: StudentResult) => void
  evaluationType: 'numeric' | 'competence'
}

export function StudentResultDialog({
  open,
  onOpenChange,
  student,
  onSave,
  evaluationType,
}: StudentResultDialogProps) {
  const [grade, setGrade] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  useEffect(() => {
    if (student) {
      setGrade(student.grade?.toString() || '')
      setStatus(student.status || '')
      setComment(student.comment || '')
    } else {
      setGrade('')
      setStatus('')
      setComment('')
    }
  }, [student])

  const handleSave = () => {
    if (!student) return

    onSave({
      ...student,
      grade: grade ? parseFloat(grade) : null,
      status: status || null,
      comment: comment,
    })
    onOpenChange(false)
  }

  if (!student) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Résultat - {student.studentName}</DialogTitle>
          <DialogDescription>
            Modifiez la note et le commentaire pour cet élève.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {evaluationType === 'numeric' ? (
            <div className="grid gap-2">
              <Label htmlFor="grade">Note (/20)</Label>
              <Input
                id="grade"
                type="number"
                min="0"
                max="20"
                step="0.5"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Ex: 15"
              />
            </div>
          ) : (
            <div className="grid gap-2">
              <Label htmlFor="status">Statut</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acquis">Acquis</SelectItem>
                  <SelectItem value="partiellement_acquis">Partiellement acquis</SelectItem>
                  <SelectItem value="en_cours">En cours d'acquisition</SelectItem>
                  <SelectItem value="non_acquis">Non acquis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="comment">Commentaire</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

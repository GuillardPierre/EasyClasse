import type { UseFormRegisterReturn } from 'react-hook-form'

import { FieldLabel } from '@/components/ui/field'
import { FormError } from '@/components/ui/form-error'

interface Student {
  id: string
  name: string
}

interface StudentsPickerProps {
  students: Array<Student>
  registration: UseFormRegisterReturn
  error?: string
}

export function StudentsPicker({
  students,
  registration,
  error,
}: StudentsPickerProps) {
  return (
    <div className="space-y-3 rounded-lg border p-4">
      <FieldLabel>Ajouter des élèves</FieldLabel>
      <div className="grid max-h-64 gap-2 overflow-y-auto pr-1 md:grid-cols-2">
        {students.map((student) => (
          <label
            key={student.id}
            className="flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm cursor-pointer hover:bg-accent"
          >
            <input
              type="checkbox"
              value={student.id}
              {...registration}
              className="size-4 rounded border-border text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <span>{student.name}</span>
          </label>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Vous pourrez modifier la liste des élèves après la création de la
        classe.
      </p>
      <FormError message={error} />
    </div>
  )
}

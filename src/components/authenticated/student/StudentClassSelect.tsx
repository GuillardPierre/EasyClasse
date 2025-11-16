import { Field, FieldLabel } from '@/components/ui/field'
import { FormError } from '@/components/ui/form-error'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface StudentClassSelectProps {
  value: string | undefined
  options: Array<{ id: string; label: string }>
  onChange: (value: string) => void
  error?: string
}

export function StudentClassSelect({
  value,
  options,
  onChange,
  error,
}: StudentClassSelectProps) {
  return (
    <Field>
      <FieldLabel>Classe de l&apos;élève</FieldLabel>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-invalid={Boolean(error)}>
          <SelectValue placeholder="Sélectionner une classe" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.label}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormError message={error} />
    </Field>
  )
}

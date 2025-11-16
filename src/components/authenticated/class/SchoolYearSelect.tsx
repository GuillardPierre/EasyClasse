import { Field, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SchoolYearSelectProps {
  value: string | undefined
  years: Array<string>
  onChange: (value: string) => void
  error?: string
}

export function SchoolYearSelect({
  value,
  years,
  onChange,
  error,
}: SchoolYearSelectProps) {
  return (
    <Field>
      <FieldLabel>Année scolaire</FieldLabel>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-invalid={Boolean(error)}>
          <SelectValue placeholder="Choisir une année" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? (
        <p className="text-xs text-destructive mt-0" role="alert">
          {error}
        </p>
      ) : null}
    </Field>
  )
}

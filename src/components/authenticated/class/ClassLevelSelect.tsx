import { Field, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ClassLevelSelectProps {
  value: string | undefined
  onChange: (value: string) => void
  error?: string
}

export function ClassLevelSelect({
  value,
  onChange,
  error,
}: ClassLevelSelectProps) {
  return (
    <Field>
      <FieldLabel>Niveau de la classe</FieldLabel>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-invalid={Boolean(error)}>
          <SelectValue placeholder="Choisir un niveau" />
        </SelectTrigger>
        <SelectContent>
          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
            Primaire
          </div>
          <SelectItem value="CP">CP</SelectItem>
          <SelectItem value="CE1">CE1</SelectItem>
          <SelectItem value="CE2">CE2</SelectItem>
          <SelectItem value="CM1">CM1</SelectItem>
          <SelectItem value="CM2">CM2</SelectItem>
          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
            Collège
          </div>
          <SelectItem value="6ème">6ème</SelectItem>
          <SelectItem value="5ème">5ème</SelectItem>
          <SelectItem value="4ème">4ème</SelectItem>
          <SelectItem value="3ème">3ème</SelectItem>
          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
            Lycée
          </div>
          <SelectItem value="Seconde">Seconde</SelectItem>
          <SelectItem value="Première">Première</SelectItem>
          <SelectItem value="Terminale">Terminale</SelectItem>
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

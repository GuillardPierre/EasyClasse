import type { FormEvent } from 'react'
import type { UserInfoData } from './types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type UserInfoFormProps = {
  data: UserInfoData
  onChange: (values: Partial<UserInfoData>) => void
  onNext: () => void
}

export const UserInfoForm = ({ data, onChange, onNext }: UserInfoFormProps) => {
  const isValid =
    data.fullName.trim().length > 1 &&
    data.email.trim().length > 3 &&
    data.school.trim().length > 2 &&
    data.acceptTerms

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isValid) {
      onNext()
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nom complet</Label>
          <Input
            id="fullName"
            autoComplete="name"
            value={data.fullName}
            onChange={(event) => onChange({ fullName: event.target.value })}
            placeholder="Nom et prénom"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(event) => onChange({ email: event.target.value })}
            placeholder="m@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="school">Établissement</Label>
        <Input
          id="school"
          value={data.school}
          onChange={(event) => onChange({ school: event.target.value })}
          placeholder="Collège Jean Moulin"
        />
      </div>

      <label className="flex items-start gap-3 text-sm leading-6">
        <input
          type="checkbox"
          checked={data.acceptTerms}
          onChange={(event) => onChange({ acceptTerms: event.target.checked })}
          className="mt-1 h-4 w-4 rounded border border-muted-foreground/40"
        />
        <span>
          J’atteste que ces informations sont correctes et j’autorise ClassEasy
          à me contacter pour finaliser l’abonnement premium.
        </span>
      </label>

      <div className="flex justify-end">
        <Button type="submit" disabled={!isValid}>
          Continuer
        </Button>
      </div>
    </form>
  )
}

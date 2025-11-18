import type { FormEvent } from 'react'
import type { BillingCycle } from './types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const planDetails: Record<
  BillingCycle,
  {
    price: string
    description: string
    note: string
  }
> = {
  monthly: {
    price: '4 € / mois',
    description:
      'Accès complet avec facturation mensuelle, annulable à tout moment.',
    note: 'Idéal pour tester les fonctionnalités prenium.',
  },
  yearly: {
    price: '30 € / an',
    description:
      'Accès complet avec facturation annuelle, annulable à tout moment.',
    note: 'Idéal pour une adoption sur toute l’année scolaire.',
  },
}

type StripePaymentProps = {
  billingCycle: BillingCycle
  onBillingCycleChange: (cycle: BillingCycle) => void
  onBack: () => void
  onNext: () => void
}

export const StripePayment = ({
  billingCycle,
  onBillingCycleChange,
  onBack,
  onNext,
}: StripePaymentProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onNext()
  }

  const plan = planDetails[billingCycle]

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-lg border p-4 space-y-3 bg-muted/40">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Formule sélectionnée
            </p>
            <p className="text-lg font-semibold">
              Prenium {billingCycle === 'monthly' ? 'Mensuel' : 'Annuel'}
            </p>
          </div>
          <Badge variant="secondary" className="text-base font-semibold">
            {plan.price}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
        <p className="text-xs text-muted-foreground/80">{plan.note}</p>
      </div>

      <div className="space-y-2">
        <Label>Périodicité</Label>
        <Select
          value={billingCycle}
          onValueChange={(value: BillingCycle) => onBillingCycleChange(value)}
        >
          <SelectTrigger className="w-full sm:w-72">
            <SelectValue placeholder="Choisir une option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Mensuel</SelectItem>
            <SelectItem value="yearly">Annuel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        Le paiement est sécurisé par Stripe. Vous pourrez télécharger vos
        factures à tout moment depuis vos paramètres, et résilier librement via
        votre espace compte.
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button type="submit">Valider le paiement</Button>
      </div>
    </form>
  )
}

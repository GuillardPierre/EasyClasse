import { CheckCircle2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { BillingCycle, UserInfoData } from './types'
import { Button } from '@/components/ui/button'

type ConfirmationProps = {
  userInfo: UserInfoData
  billingCycle: BillingCycle
  onBack: () => void
}

export const Confirmation = ({
  userInfo,
  billingCycle,
  onBack,
}: ConfirmationProps) => {
  const cycleLabel = billingCycle === 'monthly' ? 'Mensuel' : 'Annuel'

  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">
            Merci d'avoir souscrit à l'abonnement premium
          </h3>
          <p className="text-sm text-muted-foreground">
            Votre abonnement {cycleLabel.toLowerCase()} est actif. Vous pouvez
            dès maintenant profiter de toutes les fonctionnalités premium.
          </p>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/30 text-left">
        <div className="grid gap-4 p-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase text-muted-foreground">Nom</p>
            <p className="font-medium">{userInfo.fullName || '—'}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground">Email</p>
            <p className="font-medium">{userInfo.email || '—'}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground">
              Établissement
            </p>
            <p className="font-medium">{userInfo.school || '—'}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground">Formule</p>
            <p className="font-medium">premium {cycleLabel}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button type="button" variant="outline" onClick={onBack}>
          Modifier le paiement
        </Button>
        <Button asChild type="button">
          <Link to="/dashboard">Accéder au dashboard</Link>
        </Button>
      </div>
    </div>
  )
}

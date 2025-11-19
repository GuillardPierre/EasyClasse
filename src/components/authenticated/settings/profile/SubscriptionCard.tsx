import { CalendarDays } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { formatDate } from '@/lib/utils'
import type { MockUserProfile } from './types'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type SubscriptionCardProps = {
  user: MockUserProfile
}

export default function SubscriptionCard({ user }: SubscriptionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Abonnement</CardTitle>
        <CardDescription>
          Gérez votre forfait et vérifiez vos avantages actuels.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold">
              {user.isPremium ? 'premium' : 'Plan gratuit'}
            </p>
          </div>
        </div>
        <Separator />
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4" aria-hidden />
            Renouvellement le {formatDate(user.renewDate, { month: 'long' })}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 pt-1">
          {user.isPremium && (
            <Button className="flex-1" variant="outline">
              Télécharger la facture
            </Button>
          )}

          <Button asChild className="flex-1">
            <Link to="/parametres/abonnement">
              {user.isPremium ? 'Gérer mon abonnement' : 'Devenir premium'}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

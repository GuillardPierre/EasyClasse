import { CalendarDays, ShieldAlert, ShieldCheck } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { MockUserProfile } from './types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type ProfileOverviewProps = {
  user: MockUserProfile
}

export default function ProfileOverview({ user }: ProfileOverviewProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar className="size-16">
            <AvatarImage src={user.avatarUrl} alt={user.fullName} />
            <AvatarFallback className="text-lg">{user.initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.fullName}</CardTitle>
            <CardDescription className="text-base">
              {user.email}
            </CardDescription>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-4" aria-hidden />
                Membre depuis le{' '}
                {formatDate(user.memberSince, { month: 'long' })}
              </span>
              <Separator
                orientation="vertical"
                decorative
                className="hidden h-4 sm:block"
              />
              <span className="inline-flex items-center gap-1">
                {user.isPremium ? (
                  <ShieldCheck
                    className="size-4 text-emerald-500"
                    aria-hidden
                  />
                ) : (
                  <ShieldAlert className="size-4 text-amber-500" aria-hidden />
                )}
                {user.isPremium
                  ? 'Abonnement Premium actif'
                  : 'Passer en Premium pour débloquer plus de fonctionnalités'}
              </span>
            </div>
          </div>
        </div>
        <Badge
          variant={user.isPremium ? 'default' : 'secondary'}
          className="px-4 py-1 text-sm"
        >
          {user.isPremium ? 'Utilisateur Prenium' : 'Offre gratuite'}
        </Badge>
      </CardHeader>
    </Card>
  )
}

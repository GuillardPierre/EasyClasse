import type { MockUserProfile } from '@/components/authenticated/settings/profile/types'
import DangerZoneCard from '@/components/authenticated/settings/profile/DangerZoneCard'
import PasswordUpdatePanel from '@/components/authenticated/settings/profile/PasswordUpdatePanel'
import ProfileOverview from '@/components/authenticated/settings/profile/ProfileOverview'
import SubscriptionCard from '@/components/authenticated/settings/profile/SubscriptionCard'

const mockUser: MockUserProfile = {
  fullName: 'Camille Durand',
  email: 'camille.durand@class-easy.fr',
  initials: 'CD',
  avatarUrl: '',
  isPremium: false,
  renewDate: '2025-12-01',
  memberSince: '2022-08-15',
  passwordLastUpdated: '2024-11-08',
}

function mockUpdatePassword() {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 900)
  })
}

function mockDeleteAccount() {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 1200)
  })
}

export default function Profil() {
  return (
    <div className="space-y-6">
      <ProfileOverview user={mockUser} />
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <PasswordUpdatePanel
          lastUpdated={mockUser.passwordLastUpdated}
          onUpdatePassword={mockUpdatePassword}
        />
        <SubscriptionCard user={mockUser} />
      </div>
      <DangerZoneCard onDeleteAccount={mockDeleteAccount} />
    </div>
  )
}

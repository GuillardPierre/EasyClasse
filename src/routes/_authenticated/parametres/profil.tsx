import { createFileRoute } from '@tanstack/react-router'
import Profil from '@/components/authenticated/settings/profile/profil'

export const Route = createFileRoute('/_authenticated/parametres/profil')({
  component: Profil,
})

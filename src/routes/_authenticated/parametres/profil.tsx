import { createFileRoute } from '@tanstack/react-router'
import Profil from '@/components/authenticated/settings/profil'

export const Route = createFileRoute('/_authenticated/parametres/profil')({
  component: Profil,
})

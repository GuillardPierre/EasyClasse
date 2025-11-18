import { createFileRoute } from '@tanstack/react-router'
import PreniumPage from '@/components/authenticated/settings/prenium/PreniumPage'

export const Route = createFileRoute('/_authenticated/parametres/abonnement')({
  component: PreniumPage,
})

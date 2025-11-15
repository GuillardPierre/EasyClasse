import { createFileRoute } from '@tanstack/react-router'
import { Dashboard } from '@/components/authenticated/dashboard'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})

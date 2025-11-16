import { createFileRoute } from '@tanstack/react-router'
import ClassDashboard from '@/components/authenticated/class/ClassDashboard'

export const Route = createFileRoute('/_authenticated/classes/$className')({
  component: ClassDashboard,
})

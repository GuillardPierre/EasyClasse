import { createFileRoute } from '@tanstack/react-router'

import { CreateStudent } from '@/components/authenticated/student/CreateStudent'

export const Route = createFileRoute('/_authenticated/eleves/creer-eleve')({
  component: CreateStudent,
})

import { createFileRoute } from '@tanstack/react-router'

import { StudentList } from '@/components/authenticated/student/StudentList'

export const Route = createFileRoute('/_authenticated/eleves/mes-eleves')({
  component: StudentList,
})

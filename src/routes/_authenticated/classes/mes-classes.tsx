import ClassList from '@/components/authenticated/class/ClassList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/classes/mes-classes')({
  component: ClassList,
})

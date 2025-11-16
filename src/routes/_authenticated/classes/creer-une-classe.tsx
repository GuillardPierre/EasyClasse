import { createFileRoute } from '@tanstack/react-router'
import { CreateClass } from '@/components/authenticated/class/CreateClass'

export const Route = createFileRoute(
  '/_authenticated/classes/creer-une-classe',
)({
  component: CreateClass,
})

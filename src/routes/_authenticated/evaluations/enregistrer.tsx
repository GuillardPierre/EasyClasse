import { createFileRoute } from '@tanstack/react-router'
import { StorageView } from '@/components/evaluations/StorageView'

export const Route = createFileRoute('/_authenticated/evaluations/enregistrer')({
  component: StorageView,
})

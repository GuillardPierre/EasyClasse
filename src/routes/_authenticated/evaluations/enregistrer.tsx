import { createFileRoute } from '@tanstack/react-router'
import { StorageView } from '@/components/evaluations/storage-view'

export const Route = createFileRoute('/_authenticated/evaluations/enregistrer')({
  component: StorageView,
})

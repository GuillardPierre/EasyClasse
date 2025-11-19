import { useEffect, useState } from 'react'

import type { ActivityItem } from '@/components/authenticated/dashboard/recent-activity-card'
import { useDialogForm } from '@/components/hooks/useDialogForm'

type ClassEventFormValues = {
  title: string
  description: string
  color: string
  href: string
}

type UseClassEventsParams = {
  initialActivities: Array<ActivityItem>
}

export type ClassActivity = ActivityItem & { id: string }

const generateId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `class-activity-${Date.now()}`

const createEmptyFormValues = (): ClassEventFormValues => ({
  title: '',
  description: '',
  color: 'bg-primary',
  href: '',
})

const normalizeActivities = (items: Array<ActivityItem>) =>
  items.map((activity, index) => ({
    id: activity.id ?? `activity-${index}`,
    title: activity.title,
    description: activity.description,
    color: activity.color ?? 'bg-primary',
    href: activity.href ?? '',
  }))

export function useClassEvents({ initialActivities }: UseClassEventsParams) {
  const [activities, setActivities] = useState<Array<ClassActivity>>(
    normalizeActivities(initialActivities),
  )

  useEffect(() => {
    setActivities(normalizeActivities(initialActivities))
  }, [initialActivities])

  const { openCreate, openEdit, dialogBindings } =
    useDialogForm<ClassEventFormValues>({
      getInitialValues: createEmptyFormValues,
      onSubmit: ({ mode, values, editingId }) => {
        setActivities((prev) => {
          if (mode === 'edit' && editingId) {
            return prev.map((activity) =>
              activity.id === editingId ? { ...activity, ...values } : activity,
            )
          }

          return [
            {
              id: generateId(),
              ...values,
            },
            ...prev,
          ]
        })
      },
    })

  return {
    activities,
    openCreateDialog: openCreate,
    openEditDialog: (activity: ClassActivity) =>
      openEdit(activity.id, {
        title: activity.title,
        description: activity.description,
        color: activity.color ?? 'bg-primary',
        href: activity.href ?? '',
      }),
    dialog: dialogBindings,
  }
}

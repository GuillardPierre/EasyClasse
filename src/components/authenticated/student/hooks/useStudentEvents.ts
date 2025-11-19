import { useEffect, useMemo, useState } from 'react'

import type {
  ClassStudent,
  StudentEventItem,
} from '@/components/authenticated/class/classMockData'
import { useDialogForm } from '@/components/hooks/useDialogForm'

export type EventFormValues = {
  type: StudentEventItem['type']
  title: string
  content: string
  date: string
}

type UseStudentEventsParams = {
  initialEvents: ClassStudent['events']
}

const generateId = (prefix: string) => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${prefix}-${Date.now()}`
}

const createEmptyFormValues = (): EventFormValues => ({
  type: 'vie-scolaire',
  title: '',
  content: '',
  date: new Date().toISOString().split('T')[0],
})

export function useStudentEvents({ initialEvents }: UseStudentEventsParams) {
  const [events, setEvents] = useState(initialEvents)

  useEffect(() => {
    setEvents(initialEvents)
  }, [initialEvents])

  const defaultAuthor = useMemo(
    () =>
      initialEvents[0]?.author ?? {
        id: 'teacher-default',
        name: 'Enseignant référent',
        email: 'enseignant@example.com',
      },
    [initialEvents],
  )

  const { openCreate, openEdit, dialogBindings } =
    useDialogForm<EventFormValues>({
      getInitialValues: createEmptyFormValues,
      onSubmit: ({ mode, values, editingId }) => {
        setEvents((prev) => {
          if (mode === 'edit' && editingId) {
            return prev.map((event) =>
              event.id === editingId ? { ...event, ...values } : event,
            )
          }

          const newEvent: ClassStudent['events'][number] = {
            id: generateId('event'),
            ...values,
            author: defaultAuthor,
          }

          return [newEvent, ...prev]
        })
      },
    })

  return {
    events,
    openCreateDialog: openCreate,
    openEditDialog: (event: ClassStudent['events'][number]) =>
      openEdit(event.id, {
        type: event.type,
        title: event.title,
        content: event.content,
        date: event.date,
      }),
    dialog: dialogBindings,
  }
}

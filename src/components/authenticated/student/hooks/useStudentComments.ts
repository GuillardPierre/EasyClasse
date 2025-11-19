import { useEffect, useMemo, useState } from 'react'

import type { ClassStudent } from '@/components/authenticated/class/classMockData'
import { useDialogForm } from '@/components/hooks/useDialogForm'

export type CommentFormValues = {
  type: ClassStudent['comments'][number]['type']
  subject: string
  content: string
  date: string
}

type UseStudentCommentsParams = {
  initialComments: ClassStudent['comments']
}

const generateId = (prefix: string) => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${prefix}-${Date.now()}`
}

const createEmptyFormValues = (): CommentFormValues => ({
  type: 'comportement',
  subject: '',
  content: '',
  date: new Date().toISOString().split('T')[0],
})

export function useStudentComments({
  initialComments,
}: UseStudentCommentsParams) {
  const [comments, setComments] = useState(initialComments)

  useEffect(() => {
    setComments(initialComments)
  }, [initialComments])

  const defaultAuthor = useMemo(
    () =>
      initialComments[0]?.author ?? {
        id: 'teacher-default',
        name: 'Enseignant référent',
        email: 'enseignant@example.com',
      },
    [initialComments],
  )

  const { openCreate, openEdit, dialogBindings } =
    useDialogForm<CommentFormValues>({
      getInitialValues: createEmptyFormValues,
      onSubmit: ({ mode, values, editingId }) => {
        setComments((prev) => {
          if (mode === 'edit' && editingId) {
            return prev.map((comment) =>
              comment.id === editingId ? { ...comment, ...values } : comment,
            )
          }

          const newComment: ClassStudent['comments'][number] = {
            id: generateId('comment'),
            ...values,
            author: defaultAuthor,
          }

          return [newComment, ...prev]
        })
      },
    })

  return {
    comments,
    openCreateDialog: openCreate,
    openEditDialog: (comment: ClassStudent['comments'][number]) =>
      openEdit(comment.id, {
        type: comment.type,
        subject: comment.subject,
        content: comment.content,
        date: comment.date,
      }),
    dialog: dialogBindings,
  }
}

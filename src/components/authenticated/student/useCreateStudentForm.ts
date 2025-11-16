import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { createStudentSchema } from './student-schema'
import type { CreateStudentFormValues } from './student-schema'

const classOptions = [
  'CP',
  'CE1',
  'CE2',
  'CM1',
  'CM2',
  '6ème',
  '5ème',
  '4ème',
  '3ème',
  'Seconde',
  'Première',
  'Terminale',
]

export function useCreateStudentForm() {
  const form = useForm<CreateStudentFormValues>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      classLevel: '',
      birthDate: '',
      email: '',
      notes: '',
    },
  })

  const availableClasses = useMemo(
    () =>
      classOptions.map((label, index) => ({
        id: `class-${index}`,
        label,
      })),
    [],
  )

  return {
    ...form,
    availableClasses,
    selectedClass: form.watch('classLevel'),
  }
}

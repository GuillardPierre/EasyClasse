import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { createStudentSchema } from './student-schema'
import type { CreateStudentFormValues } from './student-schema'

const userClasses = [
  { id: 'classe-rouge', name: 'Classe Rouge', level: 'CM2' },
  { id: 'classe-bleue', name: 'Classe Bleue', level: 'CM1' },
  { id: 'classe-verte', name: 'Classe Verte', level: 'CE2' },
  { id: 'classe-soleil', name: 'Classe Soleil', level: '6ème' },
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

  const availableClasses = useMemo(() => userClasses, [])

  return {
    ...form,
    availableClasses,
    selectedClass: form.watch('classLevel'),
  }
}

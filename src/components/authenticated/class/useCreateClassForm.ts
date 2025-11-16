import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { createClassSchema } from './class-schema'
import type { CreateClassFormValues } from './class-schema'

export function useCreateClassForm() {
  const form = useForm<CreateClassFormValues>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      name: '',
      level: '',
      year: '',
      students: [],
    },
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const schoolYears = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const startYear = new Date().getMonth() >= 7 ? currentYear : currentYear - 1
    return Array.from({ length: 3 }).map((_, index) => {
      const yearStart = startYear + index
      return `${yearStart}-${yearStart + 1}`
    })
  }, [])

  const availableStudents = useMemo(
    () => [
      { id: 'stu-1', name: 'Camille Dupuis' },
      { id: 'stu-2', name: 'Jules Martin' },
      { id: 'stu-3', name: 'Sofia Lemaire' },
      { id: 'stu-4', name: 'Noah Leroy' },
      { id: 'stu-5', name: 'Inès Robert' },
      { id: 'stu-6', name: 'Maya Bernard' },
      { id: 'stu-7', name: 'Ethan Laurent' },
      { id: 'stu-8', name: 'Zoé Fontaine' },
      { id: 'stu-9', name: 'Léo Caron' },
      { id: 'stu-10', name: 'Nora Besson' },
      { id: 'stu-1', name: 'Camille Dupuis' },
      { id: 'stu-2', name: 'Jules Martin' },
      { id: 'stu-3', name: 'Sofia Lemaire' },
      { id: 'stu-4', name: 'Noah Leroy' },
      { id: 'stu-5', name: 'Inès Robert' },
      { id: 'stu-6', name: 'Maya Bernard' },
      { id: 'stu-7', name: 'Ethan Laurent' },
      { id: 'stu-8', name: 'Zoé Fontaine' },
      { id: 'stu-9', name: 'Léo Caron' },
      { id: 'stu-10', name: 'Nora Besson' },
      { id: 'stu-1', name: 'Camille Dupuis' },
      { id: 'stu-2', name: 'Jules Martin' },
      { id: 'stu-3', name: 'Sofia Lemaire' },
      { id: 'stu-4', name: 'Noah Leroy' },
      { id: 'stu-5', name: 'Inès Robert' },
      { id: 'stu-6', name: 'Maya Bernard' },
      { id: 'stu-7', name: 'Ethan Laurent' },
      { id: 'stu-8', name: 'Zoé Fontaine' },
      { id: 'stu-9', name: 'Léo Caron' },
      { id: 'stu-10', name: 'Nora Besson' },
    ],
    [],
  )

  return {
    ...form,
    schoolYears,
    availableStudents,
    selectedLevel: form.watch('level'),
    selectedYear: form.watch('year'),
  }
}

import { z } from 'zod'

export const createClassSchema = z.object({
  name: z
    .string()
    .min(3, 'Au moins 3 caractères')
    .max(50, '50 caractères maximum'),
  level: z.string().min(1, 'Le niveau est requis'),
  year: z.string().min(1, 'L’année scolaire est requise'),
  students: z.array(z.string()).default([]),
})

export type CreateClassSchema = z.output<typeof createClassSchema>
export type CreateClassFormValues = z.input<typeof createClassSchema>

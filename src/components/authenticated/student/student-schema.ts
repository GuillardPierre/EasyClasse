import { z } from 'zod'

export const createStudentSchema = z.object({
  firstName: z
    .string()
    .min(3, 'Le prénom doit contenir au moins 3 caractères')
    .max(50, 'Maximum 50 caractères'),
  lastName: z
    .string()
    .min(3, 'Le nom doit contenir au moins 3 caractères')
    .max(50, 'Maximum 50 caractères'),
  classLevel: z
    .string()
    .optional()
    .or(z.literal(''))
    .transform((value) => value || undefined),
  birthDate: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine(
      (value) => !value || !Number.isNaN(Date.parse(value)),
      'Date de naissance invalide',
    )
    .transform((value) => value || undefined),
  email: z
    .email('Adresse email invalide')
    .optional()
    .or(z.literal(''))
    .transform((value) => value || undefined),
  notes: z
    .string()
    .max(200, '200 caractères maximum')
    .optional()
    .or(z.literal(''))
    .transform((value) => value || undefined),
})

export type CreateStudentFormValues = z.input<typeof createStudentSchema>
export type CreateStudentSchema = z.output<typeof createStudentSchema>

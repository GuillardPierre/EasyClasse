import { z } from 'zod'

export const createStudentSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Maximum 50 caractères'),
  lastName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Maximum 50 caractères'),
  classLevel: z.string().min(1, 'La classe est requise'),
  birthDate: z
    .string()
    .refine((value) => value.length > 0, 'La date de naissance est requise')
    .refine(
      (value) => !Number.isNaN(Date.parse(value)),
      'Date de naissance invalide',
    ),
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

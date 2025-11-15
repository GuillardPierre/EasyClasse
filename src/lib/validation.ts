import { z } from 'zod'

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Le nom doit contenir au moins 2 caractères')
      .max(50, 'Le nom ne peut pas dépasser 50 caractères'),

    email: z.email('Veuillez entrer une adresse email valide'),

    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule et un chiffre',
      ),

    confirmPassword: z.string().min(1, 'Veuillez confirmer votre mot de passe'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

export type SignupFormData = z.infer<typeof signupSchema>

export const loginSchema = z.object({
  email: z.email('Veuillez entrer une adresse email valide'),

  password: z.string().min(1, 'Veuillez entrer votre mot de passe'),
})

export type LoginFormData = z.infer<typeof loginSchema>

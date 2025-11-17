import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import type { PasswordFormValues } from './types'

const passwordInitialValues: PasswordFormValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

type UsePasswordUpdatePanelOptions = {
  onUpdatePassword?: (values: PasswordFormValues) => Promise<void> | void
  resetDelay?: number
}

export function usePasswordUpdatePanel({
  onUpdatePassword,
  resetDelay = 4000,
}: UsePasswordUpdatePanelOptions = {}) {
  // Contrôle la visibilité du formulaire de changement de mot de passe
  const [isFormVisible, setIsFormVisible] = useState(false)
  // Stocke les valeurs tapées par l’utilisateur
  const [formValues, setFormValues] = useState<PasswordFormValues>({
    ...passwordInitialValues,
  })
  // Indique l’état courant du traitement (idle/loading/success/error)
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  // Message d’erreur affiché sous le formulaire
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  // Référence au timeout utilisé pour réinitialiser `status`
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Vérifie que les deux nouveaux mots de passe sont identiques
  const passwordsMatch =
    formValues.newPassword.length > 0 &&
    formValues.newPassword === formValues.confirmPassword

  // Évalue si le bouton “Enregistrer” doit être activé
  const canSubmit =
    formValues.currentPassword.trim().length > 0 &&
    formValues.newPassword.trim().length >= 8 &&
    passwordsMatch &&
    status !== 'loading'

  // Met à jour la valeur d’un champ donné
  const handleChange =
    (field: keyof PasswordFormValues) =>
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: target.value,
      }))
    }

  // Soumission du formulaire : appel du callback et gestion des états
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) return

    setStatus('loading')
    setErrorMessage(null)

    try {
      await onUpdatePassword?.(formValues)
      setStatus('success')
      setFormValues({ ...passwordInitialValues })
      setIsFormVisible(false)
    } catch (error) {
      console.error(error)
      setStatus('error')
      setErrorMessage(
        'Impossible de mettre à jour le mot de passe pour le moment.',
      )
    } finally {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => setStatus('idle'), resetDelay)
    }
  }

  // Réinitialise le formulaire sans sauvegarder
  const handleCancel = () => {
    setFormValues({ ...passwordInitialValues })
    setIsFormVisible(false)
    setErrorMessage(null)
    setStatus('idle')
  }

  // Toggle d’ouverture/fermeture du formulaire
  const toggleFormVisibility = () => setIsFormVisible((previous) => !previous)

  return {
    isFormVisible,
    toggleFormVisibility,
    formValues,
    handleChange,
    handleSubmit,
    handleCancel,
    canSubmit,
    status,
    errorMessage,
    passwordsMatch,
  }
}

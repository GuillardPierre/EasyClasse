import { useCallback, useMemo, useState } from 'react'
import type { BillingCycle, UserInfoData } from '../steps/types'

export type Step = 'userInfo' | 'payment' | 'confirmation'

const defaultUserInfo: UserInfoData = {
  fullName: '',
  email: '',
  school: '',
  acceptTerms: false,
}

const wizardSteps: Array<{ key: Step; label: string; helper: string }> = [
  {
    key: 'userInfo',
    label: 'Vos informations',
    helper: 'Identifiez votre établissement',
  },
  {
    key: 'payment',
    label: 'Paiement sécurisé',
    helper: 'Activation via Stripe',
  },
  {
    key: 'confirmation',
    label: 'Confirmation',
    helper: 'Accédez immédiatement au premium',
  },
]

export const usePreniumSubscription = () => {
  const [showForm, setShowForm] = useState(false)
  const [step, setStep] = useState<Step>('userInfo')
  const [userInfo, setUserInfo] = useState<UserInfoData>(defaultUserInfo)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')

  const openForm = useCallback(() => setShowForm(true), [])
  const closeForm = useCallback(() => setShowForm(false), [])

  const currentIndex = useMemo(
    () => wizardSteps.findIndex((item) => item.key === step),
    [step],
  )

  const goToNextStep = useCallback(() => {
    setStep((prev) => {
      if (prev === 'userInfo') return 'payment'
      if (prev === 'payment') return 'confirmation'
      return prev
    })
  }, [])

  const goToPreviousStep = useCallback(() => {
    setStep((prev) => {
      if (prev === 'confirmation') return 'payment'
      if (prev === 'payment') return 'userInfo'
      return prev
    })
  }, [])

  const updateUserInfo = useCallback((values: Partial<UserInfoData>) => {
    setUserInfo((prev: UserInfoData) => ({ ...prev, ...values }))
  }, [])

  const updateBillingCycle = useCallback((cycle: BillingCycle) => {
    setBillingCycle(cycle)
  }, [])

  return {
    showForm,
    openForm,
    closeForm,
    step,
    steps: wizardSteps,
    currentIndex,
    userInfo,
    billingCycle,
    updateUserInfo,
    updateBillingCycle,
    goToNextStep,
    goToPreviousStep,
  }
}

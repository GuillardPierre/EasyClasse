import { CheckIcon } from 'lucide-react'
import { UserInfoForm } from './steps/UserInfoForm'
import { StripePayment } from './steps/StripePayment'
import { Confirmation } from './steps/Confirmation'
import type { BillingCycle, UserInfoData } from './steps/types'
import type { Step } from './hooks/usePreniumSubscription'
import CustomCard from '@/components/CustomCard'
import { cn } from '@/lib/utils'

type WizardStepMeta = {
  key: Step
  label: string
  helper: string
}

type PreniumWizardProps = {
  isVisible: boolean
  step: Step
  steps: Array<WizardStepMeta>
  currentIndex: number
  userInfo: UserInfoData
  billingCycle: BillingCycle
  onUpdateUserInfo: (values: Partial<UserInfoData>) => void
  onBillingCycleChange: (cycle: BillingCycle) => void
  onNext: () => void
  onBack: () => void
}

export const PreniumWizard = ({
  isVisible,
  step,
  steps,
  currentIndex,
  userInfo,
  billingCycle,
  onUpdateUserInfo,
  onBillingCycleChange,
  onNext,
  onBack,
}: PreniumWizardProps) => {
  if (!isVisible) {
    return null
  }

  const renderStep = () => {
    switch (step) {
      case 'userInfo':
        return (
          <UserInfoForm
            data={userInfo}
            onChange={onUpdateUserInfo}
            onNext={onNext}
          />
        )
      case 'payment':
        return (
          <StripePayment
            billingCycle={billingCycle}
            onBillingCycleChange={onBillingCycleChange}
            onBack={onBack}
            onNext={onNext}
          />
        )
      case 'confirmation':
        return (
          <Confirmation
            userInfo={userInfo}
            billingCycle={billingCycle}
            onBack={onBack}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="pt-4">
      <CustomCard
        title="Souscrivez en quelques minutes"
        description="Complétez vos informations, sécurisez votre paiement et activez votre espace premium."
      >
        <div className="space-y-8">
          <ol className="grid gap-4 md:grid-cols-3">
            {steps.map((item, index) => {
              const status =
                index < currentIndex
                  ? 'complete'
                  : index === currentIndex
                    ? 'current'
                    : 'upcoming'
              return (
                <li
                  key={item.key}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <span
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                      status === 'complete' &&
                        'bg-primary text-primary-foreground border-primary',
                      status === 'current' && 'border-primary text-primary',
                      status === 'upcoming' &&
                        'text-muted-foreground border-muted-foreground/30',
                    )}
                  >
                    {status === 'complete' ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.helper}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
          <div className="rounded-lg border border-dashed p-6">
            {renderStep()}
          </div>
        </div>
      </CustomCard>
    </div>
  )
}

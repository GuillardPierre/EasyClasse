import PreniumHero from './PreniumHero'
import PreniumBenefits from './PreniumBenefits'
import PreniumCallToAction from './PreniumCallToAction'
import { PreniumWizard } from './PreniumWizard'
import { usePreniumSubscription } from './hooks/usePreniumSubscription'

export default function PreniumPage() {
  const {
    showForm,
    openForm,
    step,
    steps,
    currentIndex,
    userInfo,
    billingCycle,
    updateUserInfo,
    updateBillingCycle,
    goToNextStep,
    goToPreviousStep,
  } = usePreniumSubscription()

  return (
    <section className="py-12 space-y-12">
      <PreniumHero />
      <PreniumBenefits />
      <PreniumCallToAction hasForm={showForm} onClick={openForm} />
      <PreniumWizard
        isVisible={showForm}
        step={step}
        steps={steps}
        currentIndex={currentIndex}
        userInfo={userInfo}
        billingCycle={billingCycle}
        onUpdateUserInfo={updateUserInfo}
        onBillingCycleChange={updateBillingCycle}
        onNext={goToNextStep}
        onBack={goToPreviousStep}
      />
    </section>
  )
}

import { Button } from '@/components/ui/button'

type PreniumCallToActionProps = {
  hasForm: boolean
  onClick: () => void
}

const PreniumCallToAction = ({
  hasForm,
  onClick,
}: PreniumCallToActionProps) => {
  if (hasForm) {
    return null
  }

  return (
    <div className="text-center">
      <Button size="lg" onClick={onClick}>
        Souscrire à l'abonnement prenium
      </Button>
    </div>
  )
}

export default PreniumCallToAction

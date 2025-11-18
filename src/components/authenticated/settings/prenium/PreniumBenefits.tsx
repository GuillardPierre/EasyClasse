import CustomCard from '@/components/CustomCard'

const PreniumBenefits = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <CustomCard
        title="Capacités étendues"
        description="Pour profiter de toutes les fonctionnalités, sans limite."
      >
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Classes illimitées :</span>{' '}
            enregistrez autant de classes que nécessaire au-delà de la limite de 3.
          </li>
          <li>
            <span className="font-medium text-foreground">Évaluations et corrections illimitées :</span>{' '}
            créez autant d’évaluations et de corrections que nécessaire.
          </li>
        </ul>
      </CustomCard>

      <CustomCard
        title="Assistance intelligente"
        description="Restez aux commandes tout en profitant d’outils modernes."
      >
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">IA de commentaires :</span>{' '}
            propose un premier jet à partir des résultats et commentaires collectés.
          </li>
          <li>
            <span className="font-medium text-foreground">Futures fonctionnalités :</span>{' '}
            accès anticipé aux nouveautés en avant-première.
          </li>
        </ul>
      </CustomCard>
    </div>
  )
}

export default PreniumBenefits


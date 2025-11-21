import { forwardRef } from 'react'
import CustomCard from '../CustomCard'

const FeaturesSection = forwardRef<HTMLElement>((_props, ref) => {
  const features = [
    {
      title: "Un outil pour suivre l'évolution de vos élèves",
      image: './images/enseignants.jpg',
      imagePosition: 'right',
      content: (
        <p>
          EasyClasse est un outil pour suivre l'évolution de vos élèves. Il vous
          permet de suivre l'évolution de vos élèves de manière simple et
          efficace.
        </p>
      ),
    },
    {
      title:
        'Enregistrez vos classes et commencez à enregistrer les notes et résultats de vos élèves',
      image: './images/classe.jpg',
      imagePosition: 'left',
      content: (
        <p>
          Vous pouvez créer des classes et enregistrer le profil de vos élèves.
        </p>
      ),
    },
    {
      title: "Remplissez plus facilement les livrets de fin d'année",
      image: './images/correction.jpg',
      imagePosition: 'right',
      content: (
        <p>
          Accédez facilement aux notes et résultats de vos élèves pour remplir
          les livrets de fin d'année.
        </p>
      ),
    },
  ]
  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center gap-2 mb-2">
        {features.map((feature) => (
          <CustomCard
            key={feature.title}
            title={feature.title}
            image={feature.image}
            imagePosition={
              feature.imagePosition === 'right'
                ? 'right'
                : feature.imagePosition === 'left'
                  ? 'left'
                  : undefined
            }
          >
            {feature.content}
          </CustomCard>
        ))}
      </div>
    </section>
  )
})

FeaturesSection.displayName = 'FeaturesSection'

export default FeaturesSection

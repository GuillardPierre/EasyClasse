import CustomButton from '@/components/CustomButton'
import { useScrollVisibility } from '@/hooks/useScrollVisibility'

interface HeroSectionProps {
  onDiscoverClick: () => void
}

export default function HeroSection({ onDiscoverClick }: HeroSectionProps) {
  const hasScrolled = useScrollVisibility()

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 md:px-8">
      <div className="flex flex-col items-center justify-center gap-4 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center">
          EasyClasse
        </h1>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-center">
          L'outil pour suivre l'évolution de vos élèves
        </h2>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-center">
          Pour les enseignants, par un enseignant
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2 w-full sm:w-auto">
          <CustomButton onClick={onDiscoverClick}>
            Découvrir l'outil
          </CustomButton>
          <CustomButton variant="default">Connexion / Inscription</CustomButton>
        </div>
      </div>

      <div
        className={`absolute bottom-4 md:bottom-8 animate-bounce transition-opacity duration-500 ${
          hasScrolled ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <svg
          className="w-6 h-6 md:w-8 md:h-8 text-foreground"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'
import FeaturesSection from '@/components/home/FeaturesSection'
import HeroSection from '@/components/home/HeroSection'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const featuresSectionRef = useRef<HTMLElement>(null)

  const scrollToFeatures = () => {
    featuresSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="w-full">
      <HeroSection onDiscoverClick={scrollToFeatures} />
      <FeaturesSection ref={featuresSectionRef} />
    </div>
  )
}

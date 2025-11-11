import { useEffect, useState } from 'react'

/**
 * Hook custom pour gérer la visibilité d'un élément en fonction du scroll
 * @returns {boolean} hasScrolled - true si l'utilisateur a scrollé, false sinon
 */
export function useScrollVisibility() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return hasScrolled
}

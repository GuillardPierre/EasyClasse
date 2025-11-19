import { useCallback, useMemo, useState } from 'react'
import { BookPlus, CalendarPlus, PlusCircle } from 'lucide-react'
import type { TableColumn } from '@/components/commons/CustomTable'
import type { ClassData } from '../classMockData'

type UseClassDashboardProps = {
  classData: ClassData
}
export function useClassDashboard({ classData }: UseClassDashboardProps) {
  const studentColumns: Array<
    TableColumn<{
      id: string
      fullName: string
      email: string
      average: string
    }>
  > = useMemo(
    () => [
      {
        key: 'fullName',
        label: 'Nom & Prénom',
      },
      {
        key: 'email',
        label: 'Email de contact',
      },
      {
        key: 'average',
        label: 'Moyenne /20',
        align: 'right',
      },
    ],
    [],
  )

  const classSlug = classData.slug
  const [isFavorite, setIsFavorite] = useState(Boolean(classData.isFavorite))

  const handleToggleFavorite = useCallback(() => {
    setIsFavorite((prev) => {
      const nextFavorite = !prev
      console.log(
        nextFavorite
          ? `Classe ${classData.displayName} ajoutée aux favoris`
          : `Classe ${classData.displayName} retirée des favoris`,
      )
      return nextFavorite
    })
  }, [classData.displayName])

  const actions = useMemo(
    () => [
      {
        label: 'Ajouter un élève',
        href: '/eleves/creer-eleve',
        variant: 'outline' as const,
        icon: PlusCircle,
      },
      {
        label: 'Nouvelle évaluation',
        href: '/assessments/new',
        variant: 'outline' as const,
        icon: BookPlus,
      },
    ],
    [],
  )

  const favoriteButtonLabel = isFavorite
    ? 'Retirer des favoris'
    : 'Ajouter aux favoris'
  const favoriteAriaLabel = isFavorite
    ? 'Retirer la classe des favoris'
    : 'Ajouter la classe aux favoris'

  return {
    studentColumns,
    classSlug,
    isFavorite,
    handleToggleFavorite,
    actions,
    favoriteButtonLabel,
    favoriteAriaLabel,
  }
}

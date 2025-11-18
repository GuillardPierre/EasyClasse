import type { ActivityItem } from '@/components/authenticated/dashboard/recent-activity-card'

export type ClassStat = {
  title: string
  value: string
}

export type ClassStudent = {
  id: string
  name: string
  email: string
  average: string
}

export type ClassData = {
  slug: string
  displayName: string
  stats: Array<ClassStat>
  students: Array<ClassStudent>
  activities: Array<ActivityItem>
}

type ClassInsights = Record<string, Omit<ClassData, 'slug'> & { slug?: string }>

const classInsights: ClassInsights = {
  'classe-rouge': {
    displayName: 'Classe Rouge',
    stats: [
      { title: 'Élèves', value: '28' },
      { title: 'Évaluations', value: '12' },
      { title: 'Réussite moyenne', value: '96%' },
    ],
    students: [
      {
        id: 'stu-1',
        name: 'Camille Dupuis',
        average: '17.2',
        email: 'camille.dupuis@example.com',
      },
      {
        id: 'stu-2',
        name: 'Jules Martin',
        average: '15.4',
        email: 'jules.martin@example.com',
      },
      {
        id: 'stu-3',
        name: 'Sofia Lemaire',
        average: '14.9',
        email: 'sofia.lemaire@example.com',
      },
    ],
    activities: [
      {
        title: 'Évaluation de mathématiques',
        description: 'Terminée hier',
        color: 'bg-blue-500',
      },
      {
        title: 'Projet de lecture',
        description: 'En cours - rendu vendredi',
        color: 'bg-purple-500',
      },
      {
        title: 'Réunion parents',
        description: 'Planifiée pour lundi prochain',
        color: 'bg-orange-500',
      },
    ],
  },
  'classe-bleue': {
    displayName: 'Classe Bleue',
    stats: [
      { title: 'Élèves', value: '26' },
      { title: 'Évaluations', value: '9' },
      { title: 'Réussite moyenne', value: '92%' },
    ],
    students: [
      {
        id: 'stu-4',
        name: 'Noah Leroy',
        average: '16.1',
        email: 'noah.leroy@example.com',
      },
      {
        id: 'stu-5',
        name: 'Inès Robert',
        average: '15.7',
        email: 'ines.robert@example.com',
      },
      {
        id: 'stu-6',
        name: 'Léa Colin',
        average: '13.8',
        email: 'lea.colin@example.com',
      },
    ],
    activities: [
      {
        title: 'Atelier sciences',
        description: 'Prévu demain',
        color: 'bg-green-500',
      },
      {
        title: 'Contrôle d’histoire',
        description: 'Corrigé envoyé aux parents',
        color: 'bg-blue-500',
      },
      {
        title: 'Sortie pédagogique',
        description: 'Validation en attente',
        color: 'bg-yellow-500',
      },
    ],
  },
}

export function slugToDisplayName(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export function studentNameToSlug(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, '-')
}

export function getClassData(slug: string): ClassData {
  const normalizedSlug = slug.toLowerCase()
  const insights = classInsights[normalizedSlug]

  return {
    slug: normalizedSlug,
    ...insights,
  }
}

export function findStudentBySlug(classData: ClassData, studentSlug: string) {
  return (
    classData.students.find(
      (student) => studentNameToSlug(student.name) === studentSlug,
    ) ?? null
  )
}

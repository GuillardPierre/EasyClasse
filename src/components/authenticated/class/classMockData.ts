import type { ActivityItem } from '@/components/authenticated/dashboard/recent-activity-card'

export type BehaviorItem = {
  id: string
  type: 'sanction' | 'felicitation' | 'retard' | 'absence' // Types d'événements
  content: string // Description ou raison
  date: string
  subject?: string // Matière associée, si pertinente
  author: {
    id: string
    name: string
    email: string
  }
}

export type ClassStat = {
  title: string
  value: string
}

export type ClassStudent = {
  id: string
  name: string
  email: string
  average: string
  attendance: {
    totalClasses: number
    absentCount: number
  }
  behaviorLog: Array<BehaviorItem>
  comments: Array<{
    id: string
    type: 'comportement' | 'suivi'
    content: string
    subject: string
    date: string
    author: {
      id: string
      name: string
      email: string
    }
  }>
  assessments: Array<{
    id: string
    type: string
    score: number
    date: string
    author: {
      id: string
      name: string
      email: string
    }
  }>
}

export type ClassData = {
  slug: string
  displayName: string
  stats: Array<ClassStat>
  students: Array<ClassStudent>
  activities: Array<ActivityItem>
}

type ClassInsights = Record<string, Omit<ClassData, 'slug'> & { slug?: string }>

const mainAuthor = {
    id: 'prof-math-01',
    name: 'Mme Dubois (Maths)',
    email: 'mme.dubois@example.com',
}
const secondAuthor = {
    id: 'prof-fr-02',
    name: 'M. Petit (Français)',
    email: 'm.petit@example.com',
}
const hgAuthor = { id: 'prof-hg-03', name: 'Mme Silva (HG)', email: 'mme.silva@example.com' }
const angAuthor = { id: 'prof-ang-04', name: 'Mme Johnson (Anglais)', email: 'mme.johnson@example.com' }
const spAuthor = { id: 'prof-sp-05', name: 'M. Moreau (SP)', email: 'm.moreau@example.com' }

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
        attendance: {
            totalClasses: 150,
            absentCount: 0,
        },
        behaviorLog: [
            {
                id: 'beh-stu1-1',
                type: 'felicitation',
                content: 'Félicitations pour sa participation active lors du débat sur le climat.',
                date: '2025-11-17',
                subject: 'Histoire-Géographie',
                author: hgAuthor,
            },
            {
                id: 'beh-stu1-2',
                type: 'retard',
                content: 'Retard de 5 minutes non justifié.',
                date: '2025-11-10',
                subject: 'Mathématiques',
                author: mainAuthor,
            },
        ],
        comments: [
            {
                id: 'comm-stu1',
                type: 'comportement',
                content: "Très participative et aide ses camarades.",
                subject: 'Anglais',
                date: '2025-11-15',
                author: angAuthor,
            },
            {
                id: 'comm-stu2',
                type: 'comportement',
                content: "Très participative et aide ses camarades. Excellent esprit d'équipe.",
                subject: 'Anglais',
                date: '2025-11-15',
                author: angAuthor,
            },
            {
                id: 'comm-stu3',
                type: 'comportement',
                content: "Très participative et aide ses camarades. Excellent esprit d'équipe.",
                subject: 'Anglais',
                date: '2025-11-15',
                author: angAuthor,
            },
        ],
        assessments: [
            {
                id: 'ass-stu1-a',
                type: 'Interrogation sur les polynômes',
                score: 18,
                date: '2025-11-10',
                author: mainAuthor,
            },
        ],
      },
      {
        id: 'stu-2',
        name: 'Jules Martin',
        average: '15.4',
        email: 'jules.martin@example.com',
        attendance: {
            totalClasses: 150,
            absentCount: 4,
        },
        behaviorLog: [
            {
                id: 'beh-stu2-1',
                type: 'sanction',
                content: 'Utilisation non autorisée du téléphone en classe.',
                date: '2025-11-15',
                subject: 'Anglais',
                author: angAuthor,
            },
            {
                id: 'beh-stu2-2',
                type: 'absence',
                content: 'Absence non justifiée au cours de Français.',
                date: '2025-11-12',
                subject: 'Français',
                author: secondAuthor,
            },
        ],
        comments: [
            {
                id: 'comm-stu2-a',
                type: 'suivi',
                content: "Bonne compréhension globale, mais doit s'entraîner davantage à la rédaction d'arguments.",
                subject: 'Histoire-Géographie',
                date: '2025-10-20',
                author: hgAuthor,
            },
        ],
        assessments: [
            {
                id: 'ass-stu2-a',
                type: 'Devoir de synthèse (Français)',
                score: 14,
                date: '2025-11-05',
                author: secondAuthor,
            },
        ],
      },
      {
        id: 'stu-3',
        name: 'Sofia Lemaire',
        average: '14.9',
        email: 'sofia.lemaire@example.com',
        attendance: {
            totalClasses: 150,
            absentCount: 1,
        },
        behaviorLog: [],
        comments: [],
        assessments: [
            {
                id: 'ass-stu3-a',
                type: 'Examen de mi-trimestre',
                score: 16,
                date: '2025-10-01',
                author: mainAuthor,
            },
        ],
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
        attendance: {
            totalClasses: 145,
            absentCount: 2,
        },
        behaviorLog: [
            {
                id: 'beh-stu4-1',
                type: 'absence',
                content: 'Absence non justifiée au cours de Sciences la semaine dernière.',
                date: '2025-10-25',
                subject: 'Sciences Physiques',
                author: spAuthor,
            },
        ],
        comments: [{
          id: 'comment-1',
          type: 'comportement',
          content: 'Noah a été très actif en classe et a posé des questions pertinentes.',
          subject: 'Mathématiques',
          date: '2025-01-01',
          author: mainAuthor,
        }],
        assessments: [{
          id: 'assessment-1',
          type: 'Contrôle sur les fractions',
          score: 15,
          date: '2025-01-01',
          author: mainAuthor,
        }],
      },
      {
        id: 'stu-5',
        name: 'Inès Robert',
        average: '15.7',
        email: 'ines.robert@example.com',
        attendance: {
            totalClasses: 145,
            absentCount: 0,
        },
        behaviorLog: [
            {
                id: 'beh-stu5-1',
                type: 'felicitation',
                content: 'Excellent travail de recherche pour le projet sur Molière.',
                date: '2025-11-10',
                subject: 'Français',
                author: secondAuthor,
            },
        ],
        comments: [
            {
                id: 'comm-stu5-a',
                type: 'suivi',
                content: "Résultats satisfaisants. Doit veiller à la qualité de sa calligraphie lors des copies.",
                subject: 'Français',
                date: '2025-11-18',
                author: secondAuthor,
            },
        ],
        assessments: [
            {
                id: 'ass-stu5-a',
                type: 'Évaluation orale (Anglais)',
                score: 17,
                date: '2025-11-14',
                author: angAuthor,
            },
        ],
      },
      {
        id: 'stu-6',
        name: 'Léa Colin',
        average: '13.8',
        email: 'lea.colin@example.com',
        attendance: {
            totalClasses: 145,
            absentCount: 0,
        },
        behaviorLog: [
            {
                id: 'beh-stu6-1',
                type: 'retard',
                content: 'Retard de 10 minutes non justifié au début du cours.',
                date: '2025-11-01',
                subject: 'Éducation Physique',
                author: { id: 'prof-eps-06', name: 'M. Dufour (EPS)', email: 'm.dufour@example.com' },
            },
        ],
        comments: [],
        assessments: [
            {
                id: 'ass-stu6-a',
                type: 'Contrôle de sciences physiques',
                score: 12,
                date: '2025-11-08',
                author: spAuthor,
            },
        ],
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

  if (!insights) {
    // Gérer le cas où le slug n'existe pas (facultatif, mais bonne pratique)
    throw new Error(`Classe avec slug "${slug}" non trouvée.`)
  }

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
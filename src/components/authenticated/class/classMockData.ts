import type { ActivityItem } from '@/components/authenticated/dashboard/recent-activity-card'

// --- TYPES ---

export type EventType =
  | 'rdv-parents' // Rendez-vous parents-profs
  | 'administratif' // Rendu de livret, papier à signer
  | 'apc' // Activités Pédagogiques Complémentaires (soutien le midi)
  | 'medical' // Visite médicale, infirmerie
  | 'vie-scolaire' // Photo de classe, sortie, etc.

export type StudentEventItem = {
  id: string
  type: EventType
  title: string
  content: string
  date: string
  author: {
    id: string
    name: string
    email: string
  }
}

export type StudentContact = {
  id: string
  name: string
  relation: string
  email: string
  phone: string
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
  contacts: Array<StudentContact>
  events: Array<StudentEventItem>
  comments: Array<{
    id: string
    type: 'comportement' | 'suivi' | 'autre'
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
  isFavorite: boolean
  displayName: string
  stats: Array<ClassStat>
  students: Array<ClassStudent>
  activities: Array<ActivityItem>
}

type ClassInsights = Record<string, Omit<ClassData, 'slug'> & { slug?: string }>

// --- AUTEURS FICTIFS ---

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
const hgAuthor = {
  id: 'prof-hg-03',
  name: 'Mme Silva (HG)',
  email: 'mme.silva@example.com',
}
const angAuthor = {
  id: 'prof-ang-04',
  name: 'Mme Johnson (Anglais)',
  email: 'mme.johnson@example.com',
}
const spAuthor = {
  id: 'prof-sp-05',
  name: 'M. Moreau (SP)',
  email: 'm.moreau@example.com',
}
const adminAuthor = {
  id: 'admin-01',
  name: 'Secrétariat / Vie Scolaire',
  email: 'vie-scolaire@example.com',
}
const nurseAuthor = {
  id: 'inf-01',
  name: 'Mme Martin (Infirmière)',
  email: 'infirmerie@example.com',
}

// --- DONNÉES MOCKÉES ---

const classInsights: ClassInsights = {
  'classe-rouge': {
    isFavorite: false,
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
        attendance: { totalClasses: 150, absentCount: 0 },
        contacts: [
          {
            id: 'ct-1a',
            name: 'Marie Dupuis',
            relation: 'Mère',
            email: 'marie.dupuis@example.com',
            phone: '06 01 02 03 04',
          },
          {
            id: 'ct-1b',
            name: 'Thomas Dupuis',
            relation: 'Père',
            email: 'thomas.dupuis@example.com',
            phone: '06 01 02 03 05',
          },
        ],
        events: [
          {
            id: 'evt-stu1-1',
            type: 'apc',
            title: 'APC Mathématiques',
            content:
              'Soutien en géométrie sur la pause méridienne (12h30 - 13h15).',
            date: '2025-11-20',
            author: mainAuthor,
          },
          {
            id: 'evt-stu1-2',
            type: 'administratif',
            title: 'Rendu de livret',
            content:
              'Livret scolaire du 1er trimestre à faire signer par les parents.',
            date: '2025-11-25',
            author: mainAuthor,
          },
        ],
        comments: [
          {
            id: 'comm-stu1',
            type: 'comportement',
            content: 'Très participative et aide ses camarades.',
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
        attendance: { totalClasses: 150, absentCount: 4 },
        contacts: [
          {
            id: 'ct-2a',
            name: 'Sophie Martin',
            relation: 'Mère',
            email: 'sophie.martin@example.com',
            phone: '06 10 20 30 40',
          },
          {
            id: 'ct-2b',
            name: 'Pierre Martin',
            relation: 'Père',
            email: 'pierre.martin@example.com',
            phone: '06 10 20 30 41',
          },
        ],
        events: [
          {
            id: 'evt-stu2-1',
            type: 'rdv-parents',
            title: 'Rencontre Parents-Prof',
            content:
              'RDV annuel pour faire le point sur le comportement et les résultats.',
            date: '2025-11-22',
            author: mainAuthor,
          },
          {
            id: 'evt-stu2-2',
            type: 'medical',
            title: 'Visite médicale',
            content: 'Contrôle de routine infirmerie (convocation 10h00).',
            date: '2025-11-18',
            author: nurseAuthor,
          },
        ],
        comments: [
          {
            id: 'comm-stu2-a',
            type: 'suivi',
            content:
              "Bonne compréhension globale, mais doit s'entraîner davantage à la rédaction d'arguments.",
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
        attendance: { totalClasses: 150, absentCount: 1 },
        contacts: [
          {
            id: 'ct-3a',
            name: 'Claire Lemaire',
            relation: 'Mère',
            email: 'claire.lemaire@example.com',
            phone: '06 22 33 44 55',
          },
          {
            id: 'ct-3b',
            name: 'Jean Lemaire',
            relation: 'Père',
            email: 'jean.lemaire@example.com',
            phone: '06 22 33 44 56',
          },
        ],
        events: [
          {
            id: 'evt-stu3-1',
            type: 'vie-scolaire',
            title: 'Photo de classe',
            content: 'Photo de groupe prévue dans la cour à 14h00.',
            date: '2025-11-28',
            author: adminAuthor,
          },
        ],
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
    isFavorite: true,
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
        attendance: { totalClasses: 145, absentCount: 2 },
        contacts: [
          {
            id: 'ct-4a',
            name: 'Julie Leroy',
            relation: 'Mère',
            email: 'julie.leroy@example.com',
            phone: '06 55 66 77 88',
          },
          {
            id: 'ct-4b',
            name: 'Marc Leroy',
            relation: 'Père',
            email: 'marc.leroy@example.com',
            phone: '06 55 66 77 89',
          },
        ],
        events: [
          {
            id: 'evt-stu4-1',
            type: 'apc',
            title: 'APC Lecture',
            content: 'Session de rattrapage lecture suite à absence.',
            date: '2025-11-19',
            author: secondAuthor,
          },
        ],
        comments: [
          {
            id: 'comment-1',
            type: 'comportement',
            content:
              'Noah a été très actif en classe et a posé des questions pertinentes.',
            subject: 'Mathématiques',
            date: '2025-01-01',
            author: mainAuthor,
          },
        ],
        assessments: [
          {
            id: 'assessment-1',
            type: 'Contrôle sur les fractions',
            score: 15,
            date: '2025-01-01',
            author: mainAuthor,
          },
        ],
      },
      {
        id: 'stu-5',
        name: 'Inès Robert',
        average: '15.7',
        email: 'ines.robert@example.com',
        attendance: { totalClasses: 145, absentCount: 0 },
        contacts: [
          {
            id: 'ct-5a',
            name: 'Valérie Robert',
            relation: 'Mère',
            email: 'valerie.robert@example.com',
            phone: '06 99 88 77 66',
          },
          {
            id: 'ct-5b',
            name: 'Alain Robert',
            relation: 'Père',
            email: 'alain.robert@example.com',
            phone: '06 99 88 77 65',
          },
        ],
        events: [
          {
            id: 'evt-stu5-1',
            type: 'vie-scolaire',
            title: 'Élections délégués',
            content: 'Dépouillement des votes en salle B12.',
            date: '2025-10-15',
            author: adminAuthor,
          },
        ],
        comments: [
          {
            id: 'comm-stu5-a',
            type: 'suivi',
            content:
              'Résultats satisfaisants. Doit veiller à la qualité de sa calligraphie lors des copies.',
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
        attendance: { totalClasses: 145, absentCount: 0 },
        contacts: [
          {
            id: 'ct-6a',
            name: 'Nathalie Colin',
            relation: 'Mère',
            email: 'nathalie.colin@example.com',
            phone: '06 12 34 56 78',
          },
          {
            id: 'ct-6b',
            name: 'Antoine Colin',
            relation: 'Père',
            email: 'antoine.colin@example.com',
            phone: '06 12 34 56 79',
          },
        ],
        events: [
          {
            id: 'evt-stu6-1',
            type: 'administratif',
            title: "Attestation d'assurance",
            content: 'Rappel : document manquant à fournir au secrétariat.',
            date: '2025-11-05',
            author: adminAuthor,
          },
          {
            id: 'evt-stu6-2',
            type: 'rdv-parents',
            title: 'RDV Prof Principale',
            content: "Discussion sur l'orientation future.",
            date: '2025-12-02',
            author: mainAuthor,
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

// --- UTILS ---

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

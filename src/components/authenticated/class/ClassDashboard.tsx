import { useMemo } from 'react'
import { useParams } from '@tanstack/react-router'

import { BookPlus, CalendarPlus, PlusCircle } from 'lucide-react'

import { PerformanceCard } from '../dashboard/performance-card'
import { RecentActivityCard } from '../dashboard/recent-activity-card'
import { StatCard } from '../dashboard/stat-card'
import { ClassDashboardHeader } from './components/ClassDashboardHeader'
import { CustomTable } from './CustomTable'
import type { ActivityItem } from '../dashboard/recent-activity-card'
import type { TableColumn } from './CustomTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type ClassInsight = {
  displayName: string
  stats: Array<{ title: string; value: string }>
  students: Array<{
    id: string
    name: string
    email: string
    average: string
  }>
  activities: Array<ActivityItem>
}

const classInsights: Partial<Record<string, ClassInsight>> = {
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

const studentColumns: Array<
  TableColumn<{ id: string; fullName: string; email: string; average: string }>
> = [
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
]

export default function ClassDashboard() {
  const { className } = useParams({
    from: '/_authenticated/classes/$className',
  })

  const classData = useMemo(() => {
    return (
      classInsights[className] ?? {
        displayName: className.replace(/-/g, ' '),
        stats: [
          { title: 'Élèves', value: '0' },
          { title: 'Évaluations', value: '-' },
          { title: 'Présence moyenne', value: '-' },
        ],
        students: [],
        activities: [],
      }
    )
  }, [className])

  return (
    <div className="flex min-h-full flex-col justify-center space-y-6 py-12">
      <ClassDashboardHeader
        title={classData.displayName}
        actions={[
          {
            label: 'Ajouter un élève',
            href: '/eleves/creer-eleve',
            icon: PlusCircle,
          },
          {
            label: 'Nouvelle évaluation',
            href: '/assessments/new',
            variant: 'outline',
            icon: BookPlus,
          },
          {
            label: 'Nouvel évènement',
            href: '/calendrier/evenements',
            variant: 'outline',
            icon: CalendarPlus,
          },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classData.stats.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <PerformanceCard className="col-span-4" />
        <RecentActivityCard
          activities={classData.activities}
          className="col-span-4 md:col-span-3"
          title="Activités de la classe"
          description="Dernières activités pour cette classe"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Élèves de la classe</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <CustomTable
            columns={studentColumns}
            rows={classData.students.map((student) => ({
              id: student.id,
              fullName: student.name,
              email: student.email,
              average: student.average,
            }))}
            rowKey="id"
          />
        </CardContent>
      </Card>
    </div>
  )
}

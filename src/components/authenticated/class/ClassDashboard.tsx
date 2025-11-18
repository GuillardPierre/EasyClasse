import { useNavigate } from '@tanstack/react-router'

import { BookPlus, CalendarPlus, PlusCircle } from 'lucide-react'
import { CustomTable } from '../../commons/CustomTable'

import { PerformanceCard } from '../dashboard/performance-card'
import { RecentActivityCard } from '../dashboard/recent-activity-card'
import { DashboardHeader } from './commons/ClassDashboardHeader'
import { StatCard } from './commons/StatsCard'
import { studentNameToSlug } from './classMockData'
import type { ClassData } from './classMockData'
import type { TableColumn } from '../../commons/CustomTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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

type ClassDashboardProps = {
  classData: ClassData
}

export default function ClassDashboard({ classData }: ClassDashboardProps) {
  const navigate = useNavigate()
  const classSlug = classData.slug

  return (
    <div className="flex min-h-full flex-col justify-center space-y-6 py-12">
      <DashboardHeader
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
            onRowClick={(student) => {
              navigate({
                to: '/classes/$className/$studentName',
                params: {
                  className: classSlug,
                  studentName: studentNameToSlug(student.fullName),
                },
              })
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

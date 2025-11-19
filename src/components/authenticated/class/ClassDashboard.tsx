import { useNavigate } from '@tanstack/react-router'
import { CalendarPlus, Star } from 'lucide-react'

import { CustomTable } from '../../commons/CustomTable'

import { PerformanceCard } from '../dashboard/performance-card'
import { RecentActivityCard } from '../dashboard/recent-activity-card'
import { ClassEventDialog } from './components/ClassEventDialog'
import { DashboardHeader } from './commons/ClassDashboardHeader'
import { StatCard } from './commons/StatsCard'
import { studentNameToSlug } from './classMockData'
import { useClassDashboard } from './hooks/useClassDashboard'
import { useClassEvents } from './hooks/useClassEvents'
import type { ClassActivity } from './hooks/useClassEvents'
import type { ClassData } from './classMockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type ClassDashboardProps = {
  classData: ClassData
}

export default function ClassDashboard({ classData }: ClassDashboardProps) {
  const navigate = useNavigate()

  const {
    studentColumns,
    classSlug,
    isFavorite,
    handleToggleFavorite,
    actions,
    favoriteButtonLabel,
    favoriteAriaLabel,
  } = useClassDashboard({ classData })

  const {
    activities,
    openCreateDialog: openClassEventDialog,
    openEditDialog: openEditClassEventDialog,
    dialog: classEventDialog,
  } = useClassEvents({ initialActivities: classData.activities })

  return (
    <div className="flex min-h-full flex-col justify-center space-y-6 py-12">
      <DashboardHeader
        title={classData.displayName}
        customActions={
          <>
            <Button
              type="button"
              variant="ghost"
              onClick={handleToggleFavorite}
              aria-pressed={isFavorite}
              aria-label={favoriteAriaLabel}
              className="gap-2"
            >
              <Star
                className="size-4 text-amber-500"
                fill={isFavorite ? 'currentColor' : 'none'}
              />
              {favoriteButtonLabel}
            </Button>
            <Button
              type="button"
              variant="default"
              className="gap-2"
              onClick={openClassEventDialog}
            >
              <CalendarPlus className="size-4" />
              Ajouter un évènement
            </Button>
          </>
        }
        actions={actions}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classData.stats.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <PerformanceCard className="col-span-4" />
        <RecentActivityCard
          activities={activities}
          className="col-span-4 md:col-span-3"
          title="Activités de la classe"
          description="Dernières activités pour cette classe"
          onEdit={(activity) =>
            openEditClassEventDialog(activity as ClassActivity)
          }
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

      <ClassEventDialog dialog={classEventDialog} />
    </div>
  )
}

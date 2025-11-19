import { BookPlus, CalendarPlus, PlusCircle } from 'lucide-react'

import { DashboardHeader } from '../class/commons/ClassDashboardHeader'
import { StatCard } from '../class/commons/StatsCard'
import { AssessmentTable } from './components/AssessmentTable'
import { BehaviorTimeline } from './components/BehaviorTimeline'
import { CommentDialog } from './components/CommentDialog'
import { CommentsList } from './components/CommentsList'
import { EventDialog } from './components/EventDialog'
import { StudentOverviewCard } from './components/StudentOverviewCard'
import { useStudentComments } from './hooks/useStudentComments'
import { useStudentEvents } from './hooks/useStudentEvents'
import type {
  ClassData,
  ClassStudent,
} from '@/components/authenticated/class/classMockData'
import { slugToDisplayName } from '@/components/authenticated/class/classMockData'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

type StudentDashboardProps = {
  classData: ClassData
  student: ClassStudent | null
  studentSlug: string
}

export default function StudentDashboard({
  classData,
  student,
  studentSlug,
}: StudentDashboardProps) {
  const studentDisplayName = student?.name ?? slugToDisplayName(studentSlug)

  if (!student) {
    return (
      <div className="flex min-h-full flex-col space-y-6 py-12">
        <DashboardHeader
          title={studentDisplayName}
          subtitle={classData.displayName}
          actions={[]}
        />

        <Card>
          <CardHeader>
            <CardTitle>Élève introuvable</CardTitle>
            <CardDescription>
              Impossible de charger les informations de l&apos;élève demandé.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Vérifiez que le lien est correct ou sélectionnez un élève depuis
              la liste de la classe.
            </p>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  const studentStats = [
    {
      title: 'Moyenne générale',
      value: `${student.average ? student.average : '—'}/20`,
      description: 'Évolution sur les évaluations enregistrées',
    },
    {
      title: 'Absences',
      value: student.attendance.absentCount
        ? student.attendance.absentCount
        : 0,
      description: `${student.attendance.totalClasses} cours suivis`,
    },
  ]

  const {
    comments,
    openCreateDialog: openCommentDialog,
    openEditDialog: openEditCommentDialog,
    dialog: commentDialog,
  } = useStudentComments({
    initialComments: student.comments,
  })

  const {
    events,
    openCreateDialog: openEventDialog,
    openEditDialog: openEditEventDialog,
    dialog: eventDialog,
  } = useStudentEvents({
    initialEvents: student.events,
  })

  return (
    <div className="flex min-h-full flex-col space-y-6 py-12">
      <DashboardHeader
        title={studentDisplayName}
        subtitle={classData.displayName}
        actions={[
          {
            label: 'Ajouter une évaluation',
            href: '/eleves/creer-eleve',
            icon: BookPlus,
            variant: 'outline',
          },
        ]}
        customActions={
          <>
            <Button onClick={openCommentDialog} className="gap-2">
              <PlusCircle className="size-4" />
              Ajouter un commentaire
            </Button>
            <Button
              variant="outline"
              onClick={openEventDialog}
              className="gap-2"
            >
              <CalendarPlus className="size-4" />
              Ajouter un évènement
            </Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {studentStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
        <StudentOverviewCard className="col-span-2" student={student} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <BehaviorTimeline
          items={events}
          onEdit={openEditEventDialog}
          className="lg:col-span-2 max-h-[400px] overflow-y-auto"
        />
        <CommentsList
          items={comments}
          onEdit={openEditCommentDialog}
          className="max-h-[400px] overflow-y-auto"
        />
      </div>

      <AssessmentTable assessments={student.assessments} />

      <CommentDialog studentName={studentDisplayName} dialog={commentDialog} />
      <EventDialog studentName={studentDisplayName} dialog={eventDialog} />
    </div>
  )
}

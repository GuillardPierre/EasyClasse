import { BookPlus, PlusCircle } from 'lucide-react'

import { DashboardHeader } from '../class/commons/ClassDashboardHeader'
import { StatCard } from '../class/commons/StatsCard'
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
import { Skeleton } from '@/components/ui/skeleton'

import { AssessmentTable } from './components/AssessmentTable'
import { BehaviorTimeline } from './components/BehaviorTimeline'
import { CommentsList } from './components/CommentsList'
import { StudentOverviewCard } from './components/StudentOverviewCard'

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
      value: `${student.average ?? '—'}/20`,
      description: 'Évolution sur les évaluations enregistrées',
    },
    {
      title: 'Absences',
      value: student.attendance.absentCount ?? 0,
      description: `${student.attendance.totalClasses} cours suivis`,
    },
  ]

  return (
    <div className="flex min-h-full flex-col space-y-6 py-12">
      <DashboardHeader
        title={studentDisplayName}
        subtitle={classData.displayName}
        actions={[
          {
            label: 'Ajouter un commentaire',
            href: '/eleves/creer-eleve',
            icon: PlusCircle,
          },
          {
            label: 'Ajouter une évaluation',
            href: '/eleves/creer-eleve',
            icon: BookPlus,
            variant: 'outline',
          },
          {
            label: 'Ajouter un évènement',
            href: '/eleves/creer-eleve',
            icon: BookPlus,
            variant: 'outline',
          },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {studentStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
        <StudentOverviewCard className="col-span-2" student={student} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <BehaviorTimeline
          items={student.behaviorLog}
          className="lg:col-span-2 max-h-[400px] overflow-y-auto"
        />
        <CommentsList
          items={student.comments}
          className="max-h-[400px] overflow-y-auto"
        />
      </div>

      <AssessmentTable assessments={student.assessments} />
    </div>
  )
}

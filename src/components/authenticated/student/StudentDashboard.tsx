import { BookPlus, PlusCircle } from 'lucide-react'
import { DashboardHeader } from '../class/commons/ClassDashboardHeader'
import type {
  ClassData,
  ClassStudent,
} from '@/components/authenticated/class/classMockData'
import { slugToDisplayName } from '@/components/authenticated/class/classMockData'

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

  return (
    <>
      <div className="flex min-h-full flex-col justify-center space-y-6 py-12">
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
      </div>
    </>
  )
}

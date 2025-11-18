import { createFileRoute } from '@tanstack/react-router'
import { Route as ClassRoute } from '../$className'
import StudentDashboard from '@/components/authenticated/student/StudentDashboard'
import { findStudentBySlug } from '@/components/authenticated/class/classMockData'

export const Route = createFileRoute(
  '/_authenticated/classes/$className/$studentName',
)({
  component: StudentDashboardRoute,
})

function StudentDashboardRoute() {
  const { studentName } = Route.useParams()
  const { classData } = ClassRoute.useLoaderData()
  const student = findStudentBySlug(classData, studentName)

  return (
    <StudentDashboard
      classData={classData}
      student={student}
      studentSlug={studentName}
    />
  )
}

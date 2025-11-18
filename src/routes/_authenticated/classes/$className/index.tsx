import { createFileRoute } from '@tanstack/react-router'
import { Route as ClassRoute } from '../$className'
import ClassDashboard from '@/components/authenticated/class/ClassDashboard'

export const Route = createFileRoute('/_authenticated/classes/$className/')({
  component: ClassDashboardRoute,
})

function ClassDashboardRoute() {
  const { classData } = ClassRoute.useLoaderData()

  return <ClassDashboard classData={classData} />
}

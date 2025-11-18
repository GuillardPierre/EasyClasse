import { Outlet, createFileRoute } from '@tanstack/react-router'
import { getClassData } from '@/components/authenticated/class/classMockData'

export const Route = createFileRoute('/_authenticated/classes/$className')({
  loader: ({ params }) => ({
    classData: getClassData(params.className),
  }),
  component: ClassLayout,
})

function ClassLayout() {
  return <Outlet />
}

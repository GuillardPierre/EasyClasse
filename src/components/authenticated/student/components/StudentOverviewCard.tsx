import type { ClassStudent } from '@/components/authenticated/class/classMockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { InfoRow } from './InfoRow'

type StudentOverviewCardProps = {
  student: ClassStudent
  className?: string
}

export function StudentOverviewCard({
  student,
  className,
}: StudentOverviewCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Résumé de l&apos;élève</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <InfoRow label="Email" value={student.email} />
        <InfoRow label="Identifiant" value={student.id} />
      </CardContent>
    </Card>
  )
}

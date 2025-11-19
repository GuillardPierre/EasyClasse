import { InfoRow } from './InfoRow'
import type { ClassStudent } from '@/components/authenticated/class/classMockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
        <CardTitle>Contacts de l&apos;élève</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {student.contacts.map((contact) => (
          <InfoRow
            key={contact.id}
            label={contact.name}
            value={`${contact.relation} - ${contact.phone} - ${contact.email}`}
          />
        ))}
      </CardContent>
    </Card>
  )
}

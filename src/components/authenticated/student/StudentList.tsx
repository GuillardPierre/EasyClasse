import { Plus } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'

import type {
  TableColumn,
  TableRowData,
} from '@/components/commons/CustomTable'
import { CustomTable } from '@/components/commons/CustomTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { studentNameToSlug } from '@/components/authenticated/class/classMockData'

type StudentRow = TableRowData & {
  id: string
  fullName: string
  classSlug: string
  classLevel: string
  email: string
  status: string
}

const columns: Array<TableColumn<StudentRow>> = [
  { key: 'fullName', label: 'Élève', align: 'center' },
  { key: 'classLevel', label: 'Classe', align: 'center' },
  { key: 'email', label: 'Email', align: 'center' },
  { key: 'status', label: 'Statut', align: 'center' },
]

const mockStudents: Array<StudentRow> = [
  {
    id: 'stu-1',
    fullName: 'Camille Dupuis',
    classSlug: 'classe-rouge',
    classLevel: 'CM2',
    email: 'camille.dupuis@example.com',
    status: 'Actif',
  },
  {
    id: 'stu-2',
    fullName: 'Jules Martin',
    classSlug: 'classe-rouge',
    classLevel: 'CM1',
    email: 'jules.martin@example.com',
    status: 'Actif',
  },
  {
    id: 'stu-3',
    fullName: 'Sofia Lemaire',
    classSlug: 'classe-rouge',
    classLevel: '6ème',
    email: 'sofia.lemaire@example.com',
    status: 'Actif',
  },
  {
    id: 'stu-4',
    fullName: 'Noah Leroy',
    classSlug: 'classe-bleue',
    classLevel: '5ème',
    email: 'noah.leroy@example.com',
    status: 'Actif',
  },
]

export function StudentList() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center">
      <div className="w-full max-w-full space-y-4 md:max-w-[75%]">
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <h2 className="text-2xl font-semibold">Élèves enregistrés</h2>
        </div>
        <Card>
          <CardContent className="overflow-x-auto p-0">
            <CustomTable
              columns={columns}
              rows={mockStudents}
              rowKey="id"
              onRowClick={(student) => {
                navigate({
                  to: '/classes/$className/$studentName',
                  params: {
                    className: student.classSlug,
                    studentName: studentNameToSlug(student.fullName),
                  },
                })
              }}
            />
          </CardContent>
        </Card>
        <Button asChild>
          <Link to="/eleves/creer-eleve" className="flex items-center gap-2">
            <Plus className="size-4" />
            Ajouter un élève
          </Link>
        </Button>
      </div>
    </div>
  )
}

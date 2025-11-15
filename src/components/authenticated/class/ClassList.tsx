import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { CustomTable, type TableColumn, type TableRowData } from './CustomTable'

type PrimaryClassRow = TableRowData & {
  id: string
  name: string
  level: string
  studentsCount: number
  year: string
  assessmentsCount: number
}

const columns: TableColumn<PrimaryClassRow>[] = [
  { key: 'name', label: 'Nom de la classe', align: 'center' },
  { key: 'level', label: 'Classe', align: 'center' },
  { key: 'studentsCount', label: 'Élèves', align: 'center' },
  { key: 'year', label: 'Année scolaire', align: 'center' },
  { key: 'assessmentsCount', label: 'Évaluations', align: 'center' },
]

const mockClasses: PrimaryClassRow[] = [
  {
    id: '1',
    name: 'Classe Rouge',
    level: 'CM2',
    studentsCount: 28,
    year: '2024',
    assessmentsCount: 10,
  },
  {
    id: '2',
    name: 'Classe Bleue',
    level: 'CM1',
    studentsCount: 26,
    year: '2024',
    assessmentsCount: 10,
  },
  {
    id: '3',
    name: 'Classe Verte',
    level: 'CE2',
    studentsCount: 24,
    year: '2024',
    assessmentsCount: 10,
  },
  {
    id: '4',
    name: 'Classe Jaune',
    level: 'CE1',
    studentsCount: 22,
    year: '2024',
    assessmentsCount: 10,
  },
]

export default function ClassList() {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center">
      <div className="space-y-4 w-full max-w-full md:max-w-[75%]">
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <h2 className="text-2xl font-semibold">Classes enregistrées</h2>
        </div>
        <Card>
          <CardContent className="overflow-x-auto p-0">
            <CustomTable columns={columns} rows={mockClasses} rowKey="id" />
          </CardContent>
        </Card>
        <Button asChild>
          <a
            href="/classes/creer-une-classe"
            className="flex items-center gap-2"
          >
            <Plus className="size-4" />
            Ajouter une classe
          </a>
        </Button>
      </div>
    </div>
  )
}

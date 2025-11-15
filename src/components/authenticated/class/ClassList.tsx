import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { CustomTable, type TableColumn, type TableRowData } from './CustomTable'

type PrimaryClassRow = TableRowData & {
  id: string
  name: string
  level: string
  studentsCount: number
  updatedAt: string
}

const columns: TableColumn<PrimaryClassRow>[] = [
  { key: 'name', label: 'Nom de la classe' },
  { key: 'level', label: 'Classe' },
  { key: 'studentsCount', label: 'Élèves', align: 'right' },
  { key: 'updatedAt', label: 'Mise à jour' },
]

const mockClasses: PrimaryClassRow[] = [
  {
    id: '1',
    name: 'Classe Rouge',
    level: 'CM2',
    studentsCount: 28,
    updatedAt: '12 nov. 2024',
  },
  {
    id: '2',
    name: 'Classe Bleue',
    level: 'CM1',
    studentsCount: 26,
    updatedAt: '08 nov. 2024',
  },
  {
    id: '3',
    name: 'Classe Verte',
    level: 'CE2',
    studentsCount: 24,
    updatedAt: '02 nov. 2024',
  },
  {
    id: '4',
    name: 'Classe Jaune',
    level: 'CE1',
    studentsCount: 22,
    updatedAt: '15 oct. 2024',
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

import type { ClassStudent } from '@/components/authenticated/class/classMockData'
import {
  CustomTable,
  type TableColumn,
  type TableRowData,
} from '@/components/commons/CustomTable'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { EmptyState } from './EmptyState'
import { formatDate } from '@/lib/utils'

type AssessmentRow = TableRowData & {
  id: string
  evaluation: string
  date: string
  score: string
  author: string
}

const assessmentColumns: Array<TableColumn<AssessmentRow>> = [
  { key: 'evaluation', label: 'Évaluation' },
  { key: 'date', label: 'Date', className: 'min-w-[120px]' },
  { key: 'score', label: 'Score', align: 'right' },
  { key: 'author', label: 'Ajouté par' },
]

type AssessmentTableProps = {
  assessments: ClassStudent['assessments']
}

export function AssessmentTable({ assessments }: AssessmentTableProps) {
  const rows: Array<AssessmentRow> = assessments.map((assessment) => ({
    id: assessment.id,
    evaluation: assessment.type,
    date: formatDate(assessment.date),
    score: `${assessment.score}/20`,
    author: assessment.author.name,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Évaluations & résultats</CardTitle>
        <CardDescription>
          Liste des évaluations enregistrées pour l'élève
        </CardDescription>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <EmptyState
            title="Aucune évaluation disponible"
            description="Appuyez sur le bouton 'Ajouter une évaluation' en haut de la page."
            skeletonLines={4}
          />
        ) : (
          <CustomTable columns={assessmentColumns} rows={rows} rowKey="id" />
        )}
      </CardContent>
    </Card>
  )
}

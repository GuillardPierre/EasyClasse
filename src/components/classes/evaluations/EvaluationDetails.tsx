import { useState } from 'react'
import { CustomTable, TableColumn } from '@/components/commons/CustomTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit, TrendingUp, Users } from 'lucide-react'
import { StudentResultDialog } from './StudentResultDialog'

export interface StudentResult {
  id: string
  studentName: string
  grade: number | null
  status: string | null
  comment: string
}

interface EvaluationDetailsProps {
  evaluation: {
    id: string
    title: string
    type: 'numeric' | 'competence'
    totalStudents: number
  }
}

// Mock data for student results
const INITIAL_RESULTS: StudentResult[] = Array.from({ length: 30 }, (_, i) => ({
  id: `student-${i + 1}`,
  studentName: `Élève ${i + 1}`,
  grade: Math.random() > 0.2 ? Math.floor(Math.random() * 10) + 10 : null,
  status: null,
  comment: Math.random() > 0.7 ? 'Bon travail !' : '',
}))

interface StudentResultRow extends Omit<StudentResult, 'grade'> {
  grade: React.ReactNode
  actions: React.ReactNode
  [key: string]: React.ReactNode | string | number | null
}

export function EvaluationDetails({ evaluation }: EvaluationDetailsProps) {
  const [results, setResults] = useState<StudentResult[]>(INITIAL_RESULTS)
  const [selectedStudent, setSelectedStudent] = useState<StudentResult | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const completedCount = results.filter(r => r.grade !== null || r.status !== null).length
  const average = results.reduce((acc, curr) => acc + (curr.grade || 0), 0) / (completedCount || 1)
  const successRate = (results.filter(r => (r.grade || 0) >= 10).length / (completedCount || 1)) * 100

  const handleEditClick = (student: StudentResult) => {
    setSelectedStudent(student)
    setDialogOpen(true)
  }

  const handleSaveResult = (updatedResult: StudentResult) => {
    setResults(prev => prev.map(r => r.id === updatedResult.id ? updatedResult : r))
  }

  const columns: TableColumn<StudentResultRow>[] = [
    { key: 'studentName', label: 'Élève' },
    { 
      key: 'grade', 
      label: 'Résultat',
      align: 'center',
    },
    { key: 'comment', label: 'Commentaire' },
    { 
      key: 'actions', 
      label: 'Actions', 
      align: 'right',
      className: 'w-[100px]'
    },
  ]

  // Transform data for CustomTable
  const tableRows: StudentResultRow[] = results.map(student => ({
    ...student,
    grade: evaluation.type === 'numeric' 
      ? (student.grade !== null ? `${student.grade}/20` : '-') 
      : (student.status ? formatStatus(student.status) : '-'),
    actions: (
      <Button variant="ghost" size="sm" onClick={() => handleEditClick(student)}>
        <Edit className="h-4 w-4" />
        <span className="sr-only">Modifier</span>
      </Button>
    )
  }))

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyenne de la classe</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{average.toFixed(1)}/20</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de réussite</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              Élèves ayant la moyenne
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participation</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}/{evaluation.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Élèves évalués
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-md">
        <CustomTable
          columns={columns}
          rows={tableRows}
          rowKey="id"
        />
      </div>

      <StudentResultDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        student={selectedStudent}
        onSave={handleSaveResult}
        evaluationType={evaluation.type}
      />
    </div>
  )
}

function formatStatus(status: string) {
  switch (status) {
    case 'acquis': return <Badge className="bg-green-500">Acquis</Badge>
    case 'partiellement_acquis': return <Badge className="bg-yellow-500">Partiellement acquis</Badge>
    case 'en_cours': return <Badge className="bg-orange-500">En cours</Badge>
    case 'non_acquis': return <Badge className="bg-red-500">Non acquis</Badge>
    default: return status
  }
}

import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Users, BarChart3 } from 'lucide-react'

// Mock data for evaluations
const MOCK_EVALUATIONS = [
  {
    id: 'eval-1',
    title: 'Contrôle de Mathématiques - Chapitre 1',
    date: '2023-10-15',
    subject: 'Mathématiques',
    status: 'completed',
    average: 14.5,
    completedCount: 28,
    totalStudents: 30,
  },
  {
    id: 'eval-2',
    title: 'Dictée préparée n°3',
    date: '2023-10-22',
    subject: 'Français',
    status: 'completed',
    average: 12.8,
    completedCount: 30,
    totalStudents: 30,
  },
  {
    id: 'eval-3',
    title: 'Histoire - La Révolution Française',
    date: '2023-11-05',
    subject: 'Histoire-Géo',
    status: 'draft',
    average: null,
    completedCount: 0,
    totalStudents: 30,
  },
]

interface EvaluationListProps {
  className: string
}

export function EvaluationList({ className }: EvaluationListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {MOCK_EVALUATIONS.map((evaluation) => (
        <Link
          key={evaluation.id}
          to={`/classes/${className}/evaluation/${evaluation.id}`}
          className="block transition-transform hover:scale-[1.02]"
        >
          <Card className="h-full cursor-pointer hover:border-primary/50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start gap-2">
                <Badge variant={evaluation.status === 'completed' ? 'default' : 'secondary'}>
                  {evaluation.status === 'completed' ? 'Terminée' : 'Brouillon'}
                </Badge>
                {evaluation.average && (
                  <Badge variant="outline" className="ml-auto">
                    Moy: {evaluation.average}/20
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg mt-2 line-clamp-2">{evaluation.title}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                {new Date(evaluation.date).toLocaleDateString('fr-FR')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>
                    {evaluation.completedCount}/{evaluation.totalStudents} élèves
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  <span>Détails</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

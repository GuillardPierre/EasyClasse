import { createFileRoute } from '@tanstack/react-router'
import { EvaluationDetails } from '@/components/classes/evaluations/EvaluationDetails'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/classes/$className/evaluation/$evaluationName')({
  component: EvaluationDetailsPage,
})

function EvaluationDetailsPage() {
  const { className, evaluationName } = Route.useParams()

  // Mock fetching evaluation details based on ID (evaluationName)
  const evaluation = {
    id: evaluationName,
    title: evaluationName === 'eval-1' ? 'Contrôle de Mathématiques - Chapitre 1' : 'Évaluation',
    type: 'numeric' as const, // or 'competence'
    totalStudents: 30,
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4">
        <Link 
          to="/classes/$className/evaluation"
          params={{ className }}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux évaluations
        </Link>
        
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {evaluation.title}
          </h1>
          <p className="text-muted-foreground">
            Classe : {className}
          </p>
        </div>
      </div>
      
      <Separator />
      
      <EvaluationDetails evaluation={evaluation} />
    </div>
  )
}

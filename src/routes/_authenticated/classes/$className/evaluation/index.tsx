import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { EvaluationList } from '@/components/classes/evaluations/EvaluationList'
import { EvaluationSelector } from '@/components/classes/evaluations/EvaluationSelector'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/classes/$className/evaluation/')({
  component: ClassEvaluationsPage,
})

function ClassEvaluationsPage() {
  const { className } = Route.useParams()
  const [selectorOpen, setSelectorOpen] = useState(false)

  const handleSelectEvaluation = (file: any) => {
    console.log('Selected evaluation:', file)
    // TODO: Add logic to link the selected evaluation file to this class
    // For now we just log it, as the backend is mocked
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Évaluations - {className}
          </h1>
          <p className="text-muted-foreground">
            Gérez les évaluations et consultez les résultats de la classe.
          </p>
        </div>
        <Button onClick={() => setSelectorOpen(true)} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Ajouter une évaluation
        </Button>
      </div>
      
      <Separator />
      
      <EvaluationList className={className} />

      <EvaluationSelector
        open={selectorOpen}
        onOpenChange={setSelectorOpen}
        onSelect={handleSelectEvaluation}
      />
    </div>
  )
}

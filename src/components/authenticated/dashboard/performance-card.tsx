import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type PerformanceCardProps = {
  title?: string
  description?: string
  placeholder?: string
  className?: string
}

export function PerformanceCard({
  title = 'Aperçu des Performances',
  description = 'Graphique des performances à venir',
  placeholder = 'TODO : Implémenter le graphique des performances',
  className,
}: PerformanceCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[200px] items-center justify-center text-muted-foreground">
          {placeholder}
        </div>
      </CardContent>
    </Card>
  )
}

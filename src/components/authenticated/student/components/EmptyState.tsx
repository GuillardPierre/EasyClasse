import { Skeleton } from '@/components/ui/skeleton'

type EmptyStateProps = {
  title: string
  description: string
  skeletonLines?: number
}

export function EmptyState({
  title,
  description,
  skeletonLines = 0,
}: EmptyStateProps) {
  return (
    <div className="space-y-3 rounded-md border border-dashed p-6 text-center">
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {Array.from({ length: skeletonLines }).map((_, index) => (
        <Skeleton key={index} className="mx-auto h-3 w-3/4" />
      ))}
    </div>
  )
}

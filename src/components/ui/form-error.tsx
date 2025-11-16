import { cn } from '@/lib/utils'

interface FormErrorProps {
  message?: string
  className?: string
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) {
    return null
  }

  return (
    <p className={cn('text-xs text-destructive mt-0', className)} role="alert">
      {message}
    </p>
  )
}

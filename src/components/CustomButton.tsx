import { Button } from '@/components/ui/button'

export default function CustomButton({
  children,
  variant = 'outline',
  onClick,
}: {
  children: React.ReactNode
  variant?:
    | 'outline'
    | 'default'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'destructive'
  onClick?: () => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant={variant} onClick={onClick}>
        {children}
      </Button>
    </div>
  )
}

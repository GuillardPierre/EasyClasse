type InfoRowProps = {
  label: string
  value?: string | number | null
}

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="break-all text-sm font-medium text-foreground">
        {value ?? '—'}
      </p>
    </div>
  )
}

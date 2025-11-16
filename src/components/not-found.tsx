import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div>
        <p className="text-sm uppercase tracking-wide text-muted-foreground">
          Erreur 404
        </p>
        <h1 className="text-3xl font-bold mt-2">Page introuvable</h1>
        <p className="text-muted-foreground mt-2">
          Désolé, la page que vous recherchez n&rsquo;existe pas encore.
        </p>
      </div>
      <Button asChild>
        <Link to="/dashboard">Revenir au tableau de bord</Link>
      </Button>
    </div>
  )
}

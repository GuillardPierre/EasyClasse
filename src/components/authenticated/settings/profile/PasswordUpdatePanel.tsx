import { KeyRound } from 'lucide-react'
import { formatDate } from './utils'
import { usePasswordUpdatePanel } from './usePasswordUpdatePanel'
import type { PasswordFormValues } from './types'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type PasswordUpdatePanelProps = {
  lastUpdated: string
  onUpdatePassword?: (values: PasswordFormValues) => Promise<void> | void
}

export default function PasswordUpdatePanel({
  lastUpdated,
  onUpdatePassword,
}: PasswordUpdatePanelProps) {
  const {
    isFormVisible,
    toggleFormVisibility,
    formValues,
    handleChange,
    handleSubmit,
    handleCancel,
    canSubmit,
    status,
    errorMessage,
    passwordsMatch,
  } = usePasswordUpdatePanel({ onUpdatePassword })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Mot de passe</CardTitle>
            <CardDescription>
              Dernière mise à jour le {formatDate(lastUpdated)}
            </CardDescription>
          </div>
          <Badge variant="outline" className="gap-2 text-xs font-semibold">
            <KeyRound className="size-3.5" aria-hidden />
            Sécurité
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant={isFormVisible ? 'secondary' : 'default'}
          onClick={toggleFormVisibility}
          className="w-full sm:w-auto"
        >
          {isFormVisible ? 'Fermer le formulaire' : 'Modifier le mot de passe'}
        </Button>

        {isFormVisible && (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-lg border border-border/60 bg-muted/10 p-4"
          >
            <div className="space-y-2">
              <Label htmlFor="current-password">Mot de passe actuel</Label>
              <Input
                id="current-password"
                type="password"
                autoComplete="current-password"
                value={formValues.currentPassword}
                onChange={handleChange('currentPassword')}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <Input
                id="new-password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                value={formValues.newPassword}
                onChange={handleChange('newPassword')}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">
                Confirmer le nouveau mot de passe
              </Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                value={formValues.confirmPassword}
                onChange={handleChange('confirmPassword')}
                required
              />
              {formValues.confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-sm text-destructive">
                  Les mots de passe ne correspondent pas.
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" disabled={!canSubmit}>
                {status === 'loading' ? 'Sauvegarde...' : 'Enregistrer'}
              </Button>
              <Button type="button" variant="ghost" onClick={handleCancel}>
                Annuler
              </Button>
            </div>
            {errorMessage && (
              <p className="text-sm text-destructive">{errorMessage}</p>
            )}
            {status === 'success' && (
              <p className="text-sm text-emerald-600">
                Mot de passe mis à jour avec succès (simulation).
              </p>
            )}
          </form>
        )}
      </CardContent>
    </Card>
  )
}

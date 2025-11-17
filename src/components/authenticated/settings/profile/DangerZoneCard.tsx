import { useState } from 'react'
import { Trash2 } from 'lucide-react'

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

type DangerZoneCardProps = {
  onDeleteAccount?: () => Promise<void> | void
}

export default function DangerZoneCard({
  onDeleteAccount,
}: DangerZoneCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [confirmationValue, setConfirmationValue] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const resetDialogState = () => {
    setConfirmationValue('')
    setIsDeleting(false)
  }

  const handleDelete = async () => {
    if (confirmationValue !== 'SUPPRIMER') return

    setIsDeleting(true)
    try {
      await onDeleteAccount?.()
      setIsDialogOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="border-destructive/40">
      <CardHeader>
        <CardTitle>Zone dangereuse</CardTitle>
        <CardDescription>
          La suppression de votre compte est définitive et supprime toutes vos
          données.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="rounded-full bg-destructive/10 p-2 text-destructive">
            <Trash2 className="size-5" aria-hidden />
          </span>
          <div>
            <p className="font-medium">Supprimer mon compte</p>
            <p className="text-sm text-muted-foreground">
              Cette action ne peut pas être annulée. Pensez à exporter vos
              données avant de continuer.
            </p>
          </div>
        </div>
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Supprimer mon compte</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Tapez <strong>SUPPRIMER</strong> en majuscules pour confirmer
                l&apos;action.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-2">
              <Label htmlFor="delete-confirmation">
                Saisissez &quot;SUPPRIMER&quot;
              </Label>
              <Input
                id="delete-confirmation"
                value={confirmationValue}
                onChange={(event) => setConfirmationValue(event.target.value)}
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={resetDialogState}>
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-white hover:bg-destructive/90"
                disabled={confirmationValue !== 'SUPPRIMER' || isDeleting}
                onClick={async (event) => {
                  event.preventDefault()
                  await handleDelete()
                  resetDialogState()
                }}
              >
                {isDeleting ? 'Suppression...' : 'Confirmer'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}

import { useState } from 'react'

import { useCreateStudentForm } from './useCreateStudentForm'
import type { CreateStudentFormValues } from './student-schema'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { FormError } from '@/components/ui/form-error'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export function CreateStudent() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    availableClasses,
    selectedClass,
    formState: { errors },
  } = useCreateStudentForm()

  const [queuedStudents, setQueuedStudents] = useState<
    Array<CreateStudentFormValues>
  >([])

  const createQueuedStudent = (data: CreateStudentFormValues) => ({
    firstName: data.firstName,
    lastName: data.lastName,
    classLevel: data.classLevel,
    birthDate: data.birthDate,
    email: data.email,
    notes: data.notes,
  })

  const handleAddAnother = handleSubmit((data) => {
    setQueuedStudents((prev) => [...prev, createQueuedStudent(data)])
    reset({
      firstName: '',
      lastName: '',
      birthDate: '',
      classLevel: data.classLevel ?? '',
      email: '',
      notes: '',
    })
  })

  const handleFinalSubmit = handleSubmit((data) => {
    const allStudents = [...queuedStudents, createQueuedStudent(data)]
    console.log('Élèves à enregistrer :', allStudents)
    setQueuedStudents([])
    reset({
      firstName: '',
      lastName: '',
      birthDate: '',
      classLevel: data.classLevel ?? '',
      email: '',
      notes: '',
    })
  })

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center">
      <div className="w-full max-w-full space-y-4 md:max-w-[75%]">
        <h2 className="text-2xl font-semibold">Ajouter un élève</h2>
        <Card>
          <CardContent>
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <FieldGroup className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel>Prénom</FieldLabel>
                  <Input
                    {...register('firstName')}
                    placeholder=""
                    aria-invalid={Boolean(errors.firstName)}
                  />
                  <FormError message={errors.firstName?.message} />
                </Field>
                <Field>
                  <FieldLabel>Nom</FieldLabel>
                  <Input
                    {...register('lastName')}
                    placeholder=""
                    aria-invalid={Boolean(errors.lastName)}
                  />
                  <FormError message={errors.lastName?.message} />
                </Field>
                <Field>
                  <FieldLabel>Date de naissance (optionnel)</FieldLabel>
                  <Input
                    type="date"
                    {...register('birthDate')}
                    aria-invalid={Boolean(errors.birthDate)}
                  />
                  <FormError message={errors.birthDate?.message} />
                </Field>
                <div>
                  <FieldLabel>Classes disponibles</FieldLabel>
                  <div className="grid gap-2 md:grid-cols-2 mt-3">
                    {availableClasses.map((classe) => (
                      <button
                        type="button"
                        key={classe.id}
                        onClick={() =>
                          setValue('classLevel', classe.id, {
                            shouldDirty: true,
                          })
                        }
                        className={cn(
                          'rounded-lg border p-3 text-left transition-colors cursor-pointer flex gap-2',
                          selectedClass === classe.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary',
                        )}
                      >
                        <p className="text-sm font-semibold">{classe.name}</p>
                        <p className="text-xs text-muted-foreground mt-0">
                          {classe.level}
                        </p>
                      </button>
                    ))}
                  </div>
                  <FormError message={errors.classLevel?.message} />
                </div>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel>Email (optionnel)</FieldLabel>
                  <Input
                    type="email"
                    {...register('email')}
                    placeholder=""
                    aria-invalid={Boolean(errors.email)}
                  />
                  <FormError message={errors.email?.message} />
                </Field>
              </FieldGroup>
              <Field>
                <FieldLabel>Notes (optionnel)</FieldLabel>
                <Textarea
                  {...register('notes')}
                  placeholder="Informations complémentaires"
                />
                <FormError message={errors.notes?.message} />
              </Field>
              {queuedStudents.length ? (
                <div className="rounded-lg border p-3 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">
                    Élèves en attente ({queuedStudents.length})
                  </p>
                  <ul className="mt-2 list-disc pl-4">
                    {queuedStudents.map((student, index) => {
                      const classInfo = availableClasses.find(
                        (classe) => classe.id === student.classLevel,
                      )
                      return (
                        <li
                          key={`${student.firstName}-${student.lastName}-${index}`}
                        >
                          {student.firstName} {student.lastName}
                          {classInfo ? ` • ${classInfo.name}` : null}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : null}

              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 md:flex-row">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={handleAddAnother}
                  >
                    Ajouter un autre élève
                  </Button>
                  {queuedStudents.length ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        const previous =
                          queuedStudents[queuedStudents.length - 1]
                        reset({
                          firstName: previous.firstName,
                          lastName: previous.lastName,
                          birthDate: previous.birthDate ?? '',
                          classLevel: previous.classLevel ?? '',
                          email: previous.email ?? '',
                          notes: previous.notes ?? '',
                        })
                        setQueuedStudents((prev) => prev.slice(0, -1))
                      }}
                    >
                      Annuler cet élève
                    </Button>
                  ) : null}
                </div>
                <Button type="submit" className="w-full">
                  {queuedStudents.length
                    ? `Enregistrer ${queuedStudents.length + 1} élèves`
                    : "Enregistrer l'élève"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

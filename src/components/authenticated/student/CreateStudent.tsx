import { StudentClassSelect } from './StudentClassSelect'
import { useCreateStudentForm } from './useCreateStudentForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { FormError } from '@/components/ui/form-error'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function CreateStudent() {
  const {
    register,
    handleSubmit,
    setValue,
    availableClasses,
    selectedClass,
    formState: { errors },
  } = useCreateStudentForm()

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center">
      <div className="w-full max-w-full space-y-4 md:max-w-[75%]">
        <h2 className="text-2xl font-semibold">Ajouter un élève</h2>
        <Card>
          <CardContent>
            <form
              onSubmit={handleSubmit((data) => {
                console.log(data)
              })}
              className="space-y-6"
            >
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
                  <FieldLabel>Date de naissance</FieldLabel>
                  <Input
                    type="date"
                    {...register('birthDate')}
                    aria-invalid={Boolean(errors.birthDate)}
                  />
                  <FormError message={errors.birthDate?.message} />
                </Field>
                <StudentClassSelect
                  value={selectedClass}
                  options={availableClasses}
                  error={errors.classLevel?.message}
                  onChange={(value) => setValue('classLevel', value)}
                />
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
              <Button type="submit" className="w-full">
                Enregistrer l&apos;élève
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

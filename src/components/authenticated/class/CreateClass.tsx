import { ClassLevelSelect } from './ClassLevelSelect'
import { SchoolYearSelect } from './SchoolYearSelect'
import { StudentsPicker } from './StudentsPicker'
import { useCreateClassForm } from './useCreateClassForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { FormError } from '@/components/ui/form-error'
import { Input } from '@/components/ui/input'

export function CreateClass() {
  const {
    register,
    handleSubmit,
    setValue,
    schoolYears,
    availableStudents,
    selectedLevel,
    selectedYear,
    formState: { errors },
  } = useCreateClassForm()

  const studentsRegistration = register('students')

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center mt-12">
      <div className="w-full max-w-full space-y-4 md:max-w-[75%]">
        <h2 className="text-2xl font-semibold">Créer une classe</h2>
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
                  <FieldLabel>Nom de la classe</FieldLabel>
                  <Input
                    {...register('name')}
                    placeholder="ex : 5ème A"
                    aria-invalid={Boolean(errors.name)}
                  />
                  <FormError message={errors.name?.message} />
                </Field>
                <ClassLevelSelect
                  value={selectedLevel}
                  error={errors.level?.message}
                  onChange={(value) =>
                    setValue('level', value, { shouldDirty: true })
                  }
                />
                <SchoolYearSelect
                  value={selectedYear}
                  years={schoolYears}
                  error={errors.year?.message}
                  onChange={(value) =>
                    setValue('year', value, { shouldDirty: true })
                  }
                />
              </FieldGroup>
              <StudentsPicker
                students={availableStudents}
                registration={studentsRegistration}
                error={errors.students?.message}
              />
              <Button type="submit" className="w-full">
                Créer la classe
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

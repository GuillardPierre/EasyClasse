import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function LoginForm() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="w-full max-w-[95%] sm:max-w-[75%] md:max-w-[50%] min-w-[310px] mx-auto">
        <CardHeader>
          <CardTitle>Connectez-vous à votre compte</CardTitle>
          <CardDescription>
            Entrez votre email ci-dessous pour vous connecter à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Se connecter</Button>
                <Button variant="outline" type="button">
                  Se connecter avec Google
                </Button>
                <FieldDescription className="text-center">
                  Vous n&apos;avez pas de compte ?{' '}
                  <a href="#">S&apos;inscrire</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

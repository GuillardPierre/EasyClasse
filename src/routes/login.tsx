import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/components/login-form'

export const Route = createFileRoute('/login')({ component: Login })

function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <LoginForm />
    </div>
  )
}

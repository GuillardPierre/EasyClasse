import { Outlet, createFileRoute } from '@tanstack/react-router'
import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-1">
        <div className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-5xl">
            <Outlet />
          </div>
        </div>
        <FloatingSidebarTrigger />
      </SidebarInset>
    </SidebarProvider>
  )
}

function FloatingSidebarTrigger() {
  const { state, isMobile } = useSidebar()
  const expandedLeft = isMobile
    ? '1rem'
    : 'calc(var(--sidebar-width) + var(--spacing, 1rem))'
  const collapsedLeft = '1rem'

  return (
    <SidebarTrigger
      className="fixed z-50 rounded-full border border-border bg-background/90 shadow-lg backdrop-blur transition-[left,top] duration-200 ease-linear"
      style={{
        left: state === 'collapsed' ? collapsedLeft : expandedLeft,
        top: isMobile ? '1rem' : '1.2rem',
      }}
    />
  )
}

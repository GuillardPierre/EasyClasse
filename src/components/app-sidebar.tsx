import * as React from 'react'
import { BookOpen, Moon, Sun } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleTheme } from '@/store/themeSlice'

// Navigation pour ClassEasy
const data = {
  navMain: [
    {
      title: 'Tableau de Bord',
      url: '/dashboard',
      items: [],
    },
    {
      title: 'Gestion des Classes',
      url: '/classes/mes-classes',
      items: [
        {
          title: 'Mes Classes',
          url: '/classes/mes-classes',
          isActive: false,
        },
        {
          title: 'Créer une Classe',
          url: '/classes/creer-une-classe',
          isActive: false,
        },
        // {
        //   title: 'Archives',
        //   url: '/classes/archives',
        //   isActive: false,
        // },
      ],
    },
    {
      title: 'Élèves',
      url: '#',
      items: [
        {
          title: 'Tous les élèves',
          url: '/eleves/mes-eleves',
          isActive: false,
        },
        {
          title: 'Ajouter un Élève',
          url: '/eleves/creer-eleve',
          isActive: false,
        },
      ],
    },
    {
      title: 'Évaluations',
      url: '#',
      items: [
        {
          title: 'Créer une Évaluation',
          url: '/assessments/new',
          isActive: false,
        },
        {
          title: 'Modèles',
          url: '/assessments/templates',
          isActive: false,
        },
      ],
    },
    {
      title: 'Paramètres',
      url: '#',
      items: [
        {
          title: 'Profil',
          url: '/settings/profile',
          isActive: false,
        },
        {
          title: 'Préférences',
          url: '/settings/preferences',
          isActive: false,
        },
      ],
    },
  ],
}

const currentUser = {
  name: 'Camille Durand',
  initials: 'CD',
  avatarUrl: '',
  profileUrl: '/settings/profile',
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.theme.mode)
  const isDark = mode === 'dark'

  React.useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const handleToggleTheme = React.useCallback(() => {
    dispatch(toggleTheme())
  }, [dispatch])

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link to="/">
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <BookOpen className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-medium">EasyClasse</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 rounded-full border border-border"
            aria-pressed={isDark}
            onClick={handleToggleTheme}
          >
            {isDark ? (
              <Sun aria-hidden className="size-4" />
            ) : (
              <Moon aria-hidden className="size-4" />
            )}
            <span className="sr-only">
              {isDark ? 'Activer le mode clair' : 'Activer le mode nuit'}
            </span>
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="justify-center">
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const hasLink = item.url && item.url !== '#'
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild={!!hasLink}>
                    {hasLink ? (
                      <Link to={item.url} className="font-medium">
                        {item.title}
                      </Link>
                    ) : (
                      <span className="font-medium">{item.title}</span>
                    )}
                  </SidebarMenuButton>
                  {item.items.length ? (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItem.isActive}
                          >
                            <Link to={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/premium"
                className="flex items-center justify-between gap-2 py-5"
              >
                <div className="flex flex-col text-left p-1">
                  <span className="text-sm font-medium">Passer en Premium</span>
                  <span className="text-xs text-muted-foreground">
                    Débloquer l&apos;accès complet
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to={currentUser.profileUrl}
                className="flex items-center gap-3"
              >
                <Avatar className="size-9">
                  <AvatarImage
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                  />
                  <AvatarFallback>{currentUser.initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold">
                    {currentUser.name}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

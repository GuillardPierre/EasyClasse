import * as React from 'react'
import { BookOpen } from 'lucide-react'

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
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
      url: '#',
      items: [
        {
          title: 'Mes Classes',
          url: '/classes',
          isActive: false,
        },
        {
          title: 'Créer une Classe',
          url: '/classes/new',
          isActive: false,
        },
        {
          title: 'Archives',
          url: '/classes/archive',
          isActive: false,
        },
      ],
    },
    {
      title: 'Élèves',
      url: '#',
      items: [
        {
          title: 'Tous les Élèves',
          url: '/students',
          isActive: false,
        },
        {
          title: 'Ajouter un Élève',
          url: '/students/new',
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
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <BookOpen className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">EasyClasse</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="justify-center">
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items.length ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={subItem.isActive}
                        >
                          <a href={subItem.url}>{subItem.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a
                href="/premium"
                className="flex items-center justify-between gap-2"
              >
                <div className="flex flex-col text-left p-1">
                  <span className="text-sm font-medium">Passer en Premium</span>
                  <span className="text-xs text-muted-foreground">
                    Débloquer l&apos;accès complet
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a
                href={currentUser.profileUrl}
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
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

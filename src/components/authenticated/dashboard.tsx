import { InfoListCard } from './dashboard/info-list-card'
import { RecentActivityCard } from './dashboard/recent-activity-card'
import { StatCard } from './class/commons/StatsCard'
import type { ActivityItem } from './dashboard/recent-activity-card'

const statCards = [
  {
    title: 'Total Élèves',
    value: '60',
  },
  {
    title: 'Classes',
    value: '5',
  },
  {
    title: 'Évaluations',
    value: '10',
  },
]

const recentActivities: Array<ActivityItem> = [
  {
    title: 'Nouvelle évaluation ajoutée',
    description: 'Evaluation de mathématiques - il y a 2h',
    color: 'bg-blue-500',
    href: '/classes/classe-rouge',
  },
  {
    title: 'Élève inscrit',
    description: 'Marie Dupont - il y a 4h',
    color: 'bg-green-500',
    href: '/eleves/mes-eleves',
  },
  {
    title: 'Classe créée',
    description: 'Français 6ème A - il y a 1j',
    color: 'bg-orange-500',
    href: '/classes/classe-verte',
  },
]

const featuredClasses = [
  {
    primary: 'Classe Rouge',
    secondary: 'CM2 • 28 élèves',
    meta: 'Dernière évaluation : 2j',
    href: '/classes/classe-rouge',
  },
  {
    primary: 'Classe Bleue',
    secondary: 'CM1 • 26 élèves',
    meta: 'Dernière évaluation : 4j',
    href: '/classes/classe-bleue',
  },
  {
    primary: 'Classe Verte',
    secondary: 'CE2 • 24 élèves',
    meta: 'Dernière évaluation : 1j',
    href: '/classes/classe-verte',
  },
]

export function Dashboard() {
  return (
    <div className="flex min-h-full flex-col justify-center space-y-6 py-12">
      <div>
        <h2>Dashboard</h2>
        <p className="text-muted-foreground mt-0">
          Bienvenue sur votre tableau de bord EasyClasse
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* <PerformanceCard className="col-span-4" /> */}
        <InfoListCard
          className="col-span-4"
          title="Classes favorites"
          description="Ajoute des classes favorites pour y accéder rapidement"
          items={featuredClasses}
        />
        <RecentActivityCard
          activities={recentActivities}
          className="col-span-4 md:col-span-3"
        />
      </div>
    </div>
  )
}

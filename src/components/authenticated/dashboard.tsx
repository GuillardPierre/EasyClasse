import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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

const recentActivities = [
  {
    title: 'Nouvelle évaluation ajoutée',
    description: 'Evaluation de mathématiques - il y a 2h',
    color: 'bg-blue-500',
  },
  {
    title: 'Élève inscrit',
    description: 'Marie Dupont - il y a 4h',
    color: 'bg-green-500',
  },
  {
    title: 'Classe créée',
    description: 'Français 6ème A - il y a 1j',
    color: 'bg-orange-500',
  },
]

export function Dashboard() {
  return (
    <div className="flex min-h-full flex-col justify-center space-y-6 py-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenue sur votre tableau de bord ClassEasy
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Aperçu des Performances</CardTitle>
            <CardDescription>
              Graphique des performances à venir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center text-muted-foreground">
              TODO : Implémenter le graphique des performances
            </div>
          </CardContent>
        </Card>

        <RecentActivityCard
          activities={recentActivities}
          className="col-span-4 md:col-span-3"
        />
      </div>
    </div>
  )
}

type StatCardProps = (typeof statCards)[number]

function StatCard({ title, value }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

type RecentActivity = (typeof recentActivities)[number]

function RecentActivityCard({
  activities,
  className,
}: {
  activities: Array<RecentActivity>
  className?: string
}) {
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Activités Récentes</CardTitle>
          <CardDescription>Suivi des dernières actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="flex items-center gap-4 rounded-md border border-transparent p-2 hover:border-border"
            >
              <span
                className={`h-2 w-2 rounded-full ${activity.color}`}
                aria-hidden
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground mt-0">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

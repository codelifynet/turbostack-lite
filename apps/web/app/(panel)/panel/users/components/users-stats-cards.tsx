import { Card, CardContent, CardHeader, CardTitle } from "@repo/shadcn-ui/card";
import type { UsersStats } from "@repo/types";
import { statsCards } from "@/mocks/users.mock";

export function UsersStatsCards({ stats }: { stats: UsersStats }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((stat) => {
        const Icon = stat.icon;
        const value = stats[stat.key];

        return (
          <Card
            key={stat.key as string}
            className={`relative overflow-hidden bg-linear-to-br ${stat.gradient} border-0 shadow-sm`}
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-linear-to-br from-white/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                <Icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

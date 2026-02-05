import { Card, CardContent, CardHeader, CardTitle } from "@repo/shadcn-ui/card";
import { Images, HardDrive, FileImage, File } from "lucide-react";
import type { MediaStats } from "@repo/types";

interface MediaStatsCardsProps {
  stats: MediaStats;
  formatFileSize: (bytes: number) => string;
}

const statsCards = [
  {
    key: "totalFiles" as const,
    title: "Total Files",
    icon: Images,
    gradient: "from-blue-500/10 to-cyan-500/5",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/20",
    isSize: false,
  },
  {
    key: "totalSize" as const,
    title: "Total Size",
    icon: HardDrive,
    gradient: "from-purple-500/10 to-pink-500/5",
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/20",
    isSize: true,
  },
  {
    key: "imageFiles" as const,
    title: "Images",
    icon: FileImage,
    gradient: "from-green-500/10 to-emerald-500/5",
    iconColor: "text-green-500",
    iconBg: "bg-green-500/20",
    isSize: false,
  },
  {
    key: "otherFiles" as const,
    title: "Other Files",
    icon: File,
    gradient: "from-orange-500/10 to-yellow-500/5",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/20",
    isSize: false,
  },
];

export function MediaStatsCards({
  stats,
  formatFileSize,
}: MediaStatsCardsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((stat) => {
        const Icon = stat.icon;
        const value = stat.isSize
          ? formatFileSize(stats.totalSize)
          : stat.key === "totalFiles"
            ? stats.totalFiles
            : stat.key === "imageFiles"
              ? stats.imageFiles
              : stats.otherFiles;

        return (
          <Card
            key={stat.key}
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

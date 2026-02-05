import { Settings } from "lucide-react";

interface SettingsPageHeaderProps {
  title?: string;
  description?: string;
}

export function SettingsPageHeader({
  title = "Settings",
  description = "Manage your application settings and preferences",
}: SettingsPageHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5 ring-1 ring-primary/10">
          <Settings className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

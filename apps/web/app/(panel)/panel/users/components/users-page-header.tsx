import { Button } from "@repo/shadcn-ui/button";
import { Plus, Users, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface UsersPageHeaderProps {
  loading: boolean;
  onCreateClick: () => void;
  onRefresh: () => void;
}

export function UsersPageHeader({
  loading,
  onCreateClick,
  onRefresh,
}: UsersPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5 ring-1 ring-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Users
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage user accounts and permissions
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onRefresh} disabled={loading}>
          <RefreshCw
            className={cn("h-4 w-4 mr-2", loading && "animate-spin")}
          />
          Refresh
        </Button>
        <Button onClick={onCreateClick}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
    </div>
  );
}

import { Button } from "@repo/shadcn-ui/button";
import { UserCircle, Download, Sparkles } from "lucide-react";

interface CustomersPageHeaderProps {
  totalCustomers: number;
}

export function CustomersPageHeader({
  totalCustomers,
}: CustomersPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary/80 text-white shadow-lg shadow-primary/25">
          <UserCircle className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Customers
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and view customer information
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Stats */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {totalCustomers} total customers
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-200 dark:border-zinc-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
}

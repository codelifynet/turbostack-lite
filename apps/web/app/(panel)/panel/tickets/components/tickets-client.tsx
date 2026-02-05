"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/ui/card";
import { Button } from "@repo/shadcn-ui/ui/button";
import { Input } from "@repo/shadcn-ui/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/shadcn-ui/ui/table";
import { Badge } from "@repo/shadcn-ui/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/shadcn-ui/ui/select";
import { useId, useState } from "react";
import {
  Plus,
  Ticket,
  Search,
  Filter,
  ChevronRight,
  Loader2,
  RefreshCw,
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
  Archive,
  Share2,
} from "lucide-react";
import {
  mockTickets as initialMockTickets,
  ticketStats,
} from "@/mocks/tickets.mock";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@repo/shadcn-ui/ui/dialog";
import { Label } from "@repo/shadcn-ui/ui/label";
import { Textarea } from "@repo/shadcn-ui/ui/textarea";
import { toast } from "sonner";
import { ActionsDropdown, ActionItem } from "@/components/actions-dropdown";

const statusColors: Record<string, { bg: string; text: string; dot: string }> =
  {
    open: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-400",
      dot: "bg-blue-500",
    },
    pending: {
      bg: "bg-amber-100 dark:bg-amber-900/30",
      text: "text-amber-700 dark:text-amber-400",
      dot: "bg-amber-500",
    },
    resolved: {
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      text: "text-emerald-700 dark:text-emerald-400",
      dot: "bg-emerald-500",
    },
  };

const priorityColors: Record<string, string> = {
  high: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
  medium:
    "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  low: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
};

// Simulate loading delay
const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function TicketsClient() {
  const [tickets, setTickets] = useState(initialMockTickets);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    priority: "medium" as "high" | "medium" | "low",
  });

  const subjectId = useId();
  const descriptionId = useId();
  const priorityId = useId();

  const filteredTickets = tickets.filter((ticket: (typeof tickets)[0]) => {
    const statusMatch =
      statusFilter === "all" || ticket.status === statusFilter;
    const priorityMatch =
      priorityFilter === "all" || ticket.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const handleCreateTicket = async () => {
    if (!newTicket.subject.trim()) return;

    setIsSubmitting(true);
    try {
      await simulateDelay(1000);

      const ticket = {
        id: `TICKET-${Date.now()}`,
        subject: newTicket.subject,
        description: newTicket.description,
        status: "open" as const,
        priority: newTicket.priority,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      };

      setTickets((prev) => [ticket, ...prev]);
      setIsCreateDialogOpen(false);
      setNewTicket({ subject: "", description: "", priority: "medium" });
      toast.success(`Ticket "${newTicket.subject}" created successfully`);
    } catch {
      toast.error("Failed to create ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await simulateDelay(800);
      setTickets(initialMockTickets);
      toast.success("Tickets refreshed successfully");
    } catch {
      toast.error("Failed to refresh tickets");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5 ring-1 ring-primary/10">
              <Ticket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Tickets
              </h1>
              <p className="text-muted-foreground text-sm">
                Manage your support tickets and track their status
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-125">
              <DialogHeader>
                <DialogTitle>Create New Ticket</DialogTitle>
                <DialogDescription>
                  Submit a new support ticket. Fill in the details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor={subjectId}>Subject</Label>
                  <Input
                    id={subjectId}
                    placeholder="Brief summary of the issue"
                    value={newTicket.subject}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, subject: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={descriptionId}>Description</Label>
                  <Textarea
                    id={descriptionId}
                    placeholder="Detailed description of the issue..."
                    rows={4}
                    value={newTicket.description}
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={priorityId}>Priority</Label>
                  <Select
                    value={newTicket.priority}
                    onValueChange={(value: "high" | "medium" | "low") =>
                      setNewTicket({ ...newTicket, priority: value })
                    }
                  >
                    <SelectTrigger id={priorityId}>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateTicket}
                  disabled={!newTicket.subject.trim() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Ticket"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {ticketStats.map((stat) => {
          const Icon = stat.icon;
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
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Tickets</CardTitle>
          <CardDescription>
            Manage and track your support tickets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets by ID or subject..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 min-w-max">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold">Ticket</TableHead>
                  <TableHead className="font-semibold">Subject</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Priority</TableHead>
                  <TableHead className="font-semibold">Created</TableHead>
                  <TableHead className="text-right font-semibold">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => {
                  const statusColor = statusColors[ticket.status];
                  const priorityColor = priorityColors[ticket.priority];
                  if (!statusColor) return null;
                  return (
                    <TableRow
                      key={ticket.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-semibold text-sm">
                        {ticket.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <p className="font-medium text-sm">
                            {ticket.subject}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {ticket.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-2 w-2 rounded-full ${statusColor.dot}`}
                          />
                          <Badge
                            variant="secondary"
                            className={`capitalize ${statusColor.bg} ${statusColor.text} border-0`}
                          >
                            {ticket.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`capitalize border ${priorityColor}`}
                        >
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(ticket.created).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <ActionsDropdown
                          item={ticket}
                          actions={[
                            {
                              label: "View",
                              icon: Eye,
                              onClick: (item) =>
                                toast.info(`Viewing ticket ${item.id}...`),
                            },
                            {
                              label: "Edit",
                              icon: Pencil,
                              onClick: (item) =>
                                toast.info(`Editing ticket ${item.id}...`),
                            },
                            {
                              label: "Mark as Resolved",
                              icon: CheckCircle,
                              variant: "success",
                              onClick: (item) =>
                                toast.success(
                                  `Ticket ${item.id} marked as resolved`,
                                ),
                            },
                            {
                              label: "Archive",
                              icon: Archive,
                              variant: "warning",
                              onClick: (item) =>
                                toast.warning(`Archiving ticket ${item.id}...`),
                            },
                            {
                              label: "Delete",
                              icon: Trash2,
                              variant: "destructive",
                              separator: true,
                              onClick: (item) =>
                                toast.error(`Deleting ticket ${item.id}...`),
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredTickets.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Ticket className="h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                No tickets found
              </p>
              <p className="text-xs text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

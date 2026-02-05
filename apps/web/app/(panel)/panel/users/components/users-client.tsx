"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  UserCheck,
  UserX,
  Loader2,
  Users,
  Crown,
  Shield,
  Mail,
  Calendar,
  Sparkles,
  KeyRound,
  RefreshCw,
  Eye,
  EyeOff,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { Button } from "@repo/shadcn-ui/button";
import { Input } from "@repo/shadcn-ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/shadcn-ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/shadcn-ui/select";
import { Label } from "@repo/shadcn-ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/shadcn-ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/shadcn-ui/avatar";
import { ImageZoom } from "@repo/shadcn-ui/image-zoom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/card";
import { Badge } from "@repo/shadcn-ui/badge";
import type { User } from "@/services";

import {
  DataTable,
  type Column,
  type DataTableAction,
  type BulkAction,
} from "@/components/data-table";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { UserFormData } from "@repo/types";
import { mockUsers } from "@/mocks/users.mock";

// Role badge component
function RoleBadge({ role }: { role: string }) {
  const defaultConfig = {
    icon: Shield,
    label: "User",
    className:
      "bg-gray-100 dark:bg-zinc-700/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-zinc-600",
  };

  const config: Record<
    string,
    { icon: typeof Crown; label: string; className: string }
  > = {
    ADMIN: {
      icon: Crown,
      label: "Admin",
      className:
        "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
    },
    USER: defaultConfig,
  };

  const roleConfig = config[role] ?? defaultConfig;
  const Icon = roleConfig.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border",
        roleConfig.className,
      )}
    >
      <Icon className="h-3 w-3" />
      {roleConfig.label}
    </span>
  );
}

// Status badge component
function StatusBadge({
  verified,
  verifiedAt,
}: {
  verified: boolean;
  verifiedAt?: string | null;
}) {
  if (verified) {
    return (
      <div className="flex flex-col gap-0.5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
          <UserCheck className="h-3 w-3" />
          Verified
        </span>
        {verifiedAt && (
          <span className="text-[10px] text-gray-400 dark:text-gray-500 ml-1">
            {new Date(verifiedAt).toLocaleDateString()}
          </span>
        )}
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
      <UserX className="h-3 w-3" />
      Pending
    </span>
  );
}

interface UsersClientProps {
  initialUsers?: User[];
  initialStats?: {
    totalUsers: number;
    adminUsers: number;
    regularUsers: number;
    verifiedUsers: number;
    unverifiedUsers: number;
  };
}

// Simulate loading delay
const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function UsersClient({ initialUsers, initialStats }: UsersClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers || []);
  const [loading, setLoading] = useState(!initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    role: "USER",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isGeneratingPassword, setIsGeneratingPassword] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(initialUsers?.length || 0);

  const loadUsers = useCallback(async () => {
    if (initialUsers && !isRefreshing) {
      setUsers(initialUsers);
      setTotal(initialUsers.length);
      setTotalPages(Math.ceil(initialUsers.length / pageSize));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      await simulateDelay(800); // Simulate API delay
      setUsers(mockUsers);
      setTotal(mockUsers.length);
      setTotalPages(Math.ceil(mockUsers.length / pageSize));
      if (isRefreshing) {
        toast.success("Users refreshed successfully");
      }
    } catch (error) {
      console.error("Failed to load users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [currentPage, pageSize, initialUsers, isRefreshing]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const validateForm = (isCreate = false) => {
    const errors: Record<string, string> = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Invalid email format";

    if (isCreate) {
      if (!formData.password) errors.password = "Password is required";
      else if (formData.password.length < 8)
        errors.password = "Password must be at least 8 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGeneratePassword = async () => {
    setIsGeneratingPassword(true);
    try {
      await simulateDelay(500);
      const generatedPassword = Math.random().toString(36).slice(-12) + "A1!";
      setFormData({ ...formData, password: generatedPassword });
      setShowPassword(true);
      toast.success("Password generated successfully");
    } catch {
      toast.error("Failed to generate password");
    } finally {
      setIsGeneratingPassword(false);
    }
  };

  const handleCreate = async () => {
    if (!validateForm(true)) return;

    try {
      setIsSubmitting(true);
      await simulateDelay(1000); // Simulate API delay

      const newUser: User = {
        id: `usr_${Date.now()}`,
        email: formData.email,
        name: formData.name,
        role: formData.role as "USER" | "ADMIN",
        image: null,
        emailVerified: false,
        emailVerifiedAt: null,
        bio: null,
        skills: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setUsers((prev) => [newUser, ...prev]);
      setTotal((prev) => prev + 1);
      setIsCreateDialogOpen(false);
      setFormData({ name: "", email: "", role: "USER", password: "" });
      setShowPassword(false);
      toast.success(`User "${formData.name}" created successfully`);
    } catch {
      setFormErrors({ submit: "An unexpected error occurred" });
      toast.error("Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendPasswordReset = async (user: User) => {
    try {
      await simulateDelay(600);
      toast.success(`Password reset email sent to ${user.email}`);
    } catch {
      toast.error("Failed to send password reset email");
    }
  };

  const handleVerifyEmail = async (user: User) => {
    try {
      await simulateDelay(500);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? {
                ...u,
                emailVerified: true,
                emailVerifiedAt: new Date().toISOString(),
              }
            : u,
        ),
      );
      toast.success(`Email verified for ${user.name}`);
    } catch {
      toast.error("Failed to verify email");
    }
  };

  const handleUnverifyEmail = async (user: User) => {
    try {
      await simulateDelay(500);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? { ...u, emailVerified: false, emailVerifiedAt: null }
            : u,
        ),
      );
      toast.success(`Email unverified for ${user.name}`);
    } catch {
      toast.error("Failed to unverify email");
    }
  };

  const closeCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setFormData({ name: "", email: "", role: "USER", password: "" });
    setShowPassword(false);
    setFormErrors({});
  };

  const handleEdit = async () => {
    if (!selectedUser || !validateForm()) return;

    try {
      setIsSubmitting(true);
      await simulateDelay(800);

      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? {
                ...u,
                name: formData.name,
                email: formData.email,
                role: formData.role as "USER" | "ADMIN",
                updatedAt: new Date().toISOString(),
              }
            : u,
        ),
      );

      setIsEditDialogOpen(false);
      toast.success(`User "${formData.name}" updated successfully`);
    } catch {
      setFormErrors({ submit: "An unexpected error occurred" });
      toast.error("Failed to update user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      setIsSubmitting(true);
      await simulateDelay(600);

      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setTotal((prev) => prev - 1);
      setIsDeleteDialogOpen(false);
      toast.success(`User "${selectedUser.name}" deleted successfully`);
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = useCallback((user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email,
      role: user.role as "USER" | "ADMIN",
      password: "",
    });
    setFormErrors({});
    setIsEditDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback((user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  }, []);

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    const term = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term),
    );
  }, [users, searchTerm]);

  // Stats calculations
  const stats = useMemo(() => {
    if (initialStats) {
      return {
        totalUsers: initialStats.totalUsers,
        adminUsers: initialStats.adminUsers,
        regularUsers: initialStats.regularUsers,
        verifiedUsers: initialStats.verifiedUsers,
      };
    }

    const totalUsers = total;
    const adminUsers = users.filter((u) => u.role === "ADMIN").length;
    const regularUsers = users.filter((u) => u.role === "USER").length;
    const verifiedUsers = users.filter((u) => u.emailVerified).length;

    return {
      totalUsers,
      adminUsers,
      regularUsers,
      verifiedUsers,
    };
  }, [users, total, initialStats]);

  // Table columns
  const columns: Column<User>[] = useMemo(
    () => [
      {
        key: "name",
        header: "User",
        sortable: true,
        cell: (user) => (
          <div className="flex items-center gap-3">
            {user.image ? (
              <ImageZoom>
                <Avatar className="h-10 w-10 border-2 border-white dark:border-zinc-800 shadow-sm cursor-zoom-in">
                  <AvatarImage
                    src={user.image}
                    alt={user.name || "User avatar"}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-linear-to-br from-primary to-primary/80 text-white text-sm font-semibold">
                    {(user.name || user.email)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </ImageZoom>
            ) : (
              <Avatar className="h-10 w-10 border-2 border-white dark:border-zinc-800 shadow-sm">
                <AvatarFallback className="bg-linear-to-br from-primary to-primary/80 text-white text-sm font-semibold">
                  {(user.name || user.email)
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-white">
                {user.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {user.email}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: "role",
        header: "Role",
        sortable: true,
        cell: (user) => <RoleBadge role={user.role || "USER"} />,
      },
      {
        key: "status",
        header: "Status",
        cell: (user) => (
          <StatusBadge verified={user.emailVerified} verifiedAt={null} />
        ),
      },
      {
        key: "createdAt",
        header: "Joined",
        sortable: true,
        cell: (user) => (
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        ),
      },
    ],
    [],
  );

  // Table actions
  const actions: DataTableAction<User>[] = [
    {
      label: "Edit User",
      icon: <Pencil className="h-4 w-4" />,
      onClick: (user: User) => openEditDialog(user),
    },
    {
      label: "Send Password Reset",
      icon: <KeyRound className="h-4 w-4" />,
      onClick: (user: User) => handleSendPasswordReset(user),
    },
    {
      label: (user: User) =>
        user.emailVerified ? "Unverify Email" : "Verify Email",
      icon: <UserCheck className="h-4 w-4" />,
      onClick: (user: User) =>
        user.emailVerified
          ? handleUnverifyEmail(user)
          : handleVerifyEmail(user),
    },
    {
      label: "Delete User",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (user: User) => openDeleteDialog(user),
      variant: "destructive",
    },
  ];

  // Bulk actions
  const handleBulkDelete = async (selectedUsers: User[]) => {
    if (
      !confirm(
        `Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      await simulateDelay(800);
      const ids = selectedUsers.map((u) => u.id);
      setUsers((prev) => prev.filter((u) => !ids.includes(u.id)));
      setTotal((prev) => prev - selectedUsers.length);
      setSelectedRows([]);
      toast.success(`${selectedUsers.length} users deleted successfully`);
    } catch {
      toast.error("Failed to delete users");
    }
  };

  const handleBulkVerify = async (selectedUsers: User[]) => {
    try {
      await simulateDelay(600);
      const ids = selectedUsers.map((u) => u.id);
      setUsers((prev) =>
        prev.map((u) =>
          ids.includes(u.id)
            ? {
                ...u,
                emailVerified: true,
                emailVerifiedAt: new Date().toISOString(),
              }
            : u,
        ),
      );
      setSelectedRows([]);
      toast.success(`${selectedUsers.length} users verified successfully`);
    } catch {
      toast.error("Failed to verify users");
    }
  };

  const handleBulkUnverify = async (selectedUsers: User[]) => {
    try {
      await simulateDelay(600);
      const ids = selectedUsers.map((u) => u.id);
      setUsers((prev) =>
        prev.map((u) =>
          ids.includes(u.id)
            ? { ...u, emailVerified: false, emailVerifiedAt: null }
            : u,
        ),
      );
      setSelectedRows([]);
      toast.success(`${selectedUsers.length} users unverified successfully`);
    } catch {
      toast.error("Failed to unverify users");
    }
  };

  const bulkActions: BulkAction<User>[] = [
    {
      label: "Verify All",
      icon: <UserCheck className="h-4 w-4" />,
      onClick: handleBulkVerify,
      variant: "default",
    },
    {
      label: "Deactivate All",
      icon: <UserX className="h-4 w-4" />,
      onClick: handleBulkUnverify,
      variant: "warning",
    },
    {
      label: "Delete All",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: handleBulkDelete,
      variant: "destructive",
    },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadUsers();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary/80 text-white shadow-lg shadow-primary/25">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Users
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage user accounts and permissions
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Stats */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {total} total users
            </span>
          </div>
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
          <Button
            onClick={() => {
              setFormData({ name: "", email: "", role: "USER", password: "" });
              setShowPassword(false);
              setFormErrors({});
              setIsCreateDialogOpen(true);
            }}
            className="shadow-lg shadow-primary/25"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Grid - First Row */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden bg-linear-to-br from-blue-500/10 to-cyan-500/5 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-linear-to-br from-white/5 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalUsers}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant="default"
                className="text-xs bg-green-500/10 text-green-600 hover:bg-green-500/20"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                +12%
              </Badge>
              <span className="text-xs text-muted-foreground">
                vs last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden bg-linear-to-br from-green-500/10 to-emerald-500/5 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-linear-to-br from-white/5 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Admins
            </CardTitle>
            <div className="p-2 rounded-lg bg-green-500/20">
              <Crown className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.adminUsers}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant="default"
                className="text-xs bg-green-500/10 text-green-600 hover:bg-green-500/20"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                +18%
              </Badge>
              <span className="text-xs text-muted-foreground">
                vs last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden bg-linear-to-br from-emerald-500/10 to-teal-500/5 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-linear-to-br from-white/5 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Verified
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <UserCheck className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.verifiedUsers}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant="default"
                className="text-xs bg-green-500/10 text-green-600 hover:bg-green-500/20"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                +8%
              </Badge>
              <span className="text-xs text-muted-foreground">
                vs last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden bg-linear-to-br from-purple-500/10 to-pink-500/5 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-linear-to-br from-white/5 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Regular Users
            </CardTitle>
            <div className="p-2 rounded-lg bg-purple-500/20">
              <UserPlus className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.regularUsers}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant="default"
                className="text-xs bg-green-500/10 text-green-600 hover:bg-green-500/20"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                +5%
              </Badge>
              <span className="text-xs text-muted-foreground">
                vs last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            {total} user{total === 1 ? "" : "s"} total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredUsers}
            columns={columns}
            actions={actions}
            bulkActions={bulkActions}
            loading={loading}
            loadingText="Loading users..."
            emptyIcon={<Users className="h-8 w-8 text-gray-400" />}
            emptyTitle="No users found"
            emptyDescription="Get started by adding your first user."
            searchable
            searchPlaceholder="Search by name or email..."
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={total}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            selectable
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
            getRowId={(user) => user.id}
            onRefresh={handleRefresh}
          />
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog
        open={isCreateDialogOpen}
        onOpenChange={(open) => !open && closeCreateDialog()}
      >
        <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-gray-900 dark:text-white">
                  Create New User
                </DialogTitle>
                <DialogDescription className="text-gray-500 dark:text-gray-400">
                  Add a new user to the system.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="create-name"
                className="text-gray-700 dark:text-gray-300"
              >
                Full Name
              </Label>
              <Input
                id="create-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-primary"
              />
              {formErrors.name && (
                <p className="text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="create-email"
                className="text-gray-700 dark:text-gray-300"
              >
                Email Address
              </Label>
              <Input
                id="create-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
                className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-primary"
              />
              {formErrors.email && (
                <p className="text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="create-role"
                className="text-gray-700 dark:text-gray-300"
              >
                Role
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value: "USER" | "ADMIN") =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger
                  id="create-role"
                  className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
                  <SelectItem value="USER">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-gray-500" />
                      User
                    </div>
                  </SelectItem>
                  <SelectItem value="ADMIN">
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-amber-500" />
                      Admin
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="create-password"
                className="text-gray-700 dark:text-gray-300"
              >
                Password
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="create-password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Enter password or generate"
                    className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGeneratePassword}
                  disabled={isGeneratingPassword}
                  className="shrink-0 border-gray-200 dark:border-zinc-700"
                >
                  {isGeneratingPassword ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {formErrors.password && (
                <p className="text-sm text-red-500">{formErrors.password}</p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Minimum 8 characters. User will receive login credentials via
                email.
              </p>
            </div>

            {formErrors.submit && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {formErrors.submit}
                </p>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={closeCreateDialog}
              disabled={isSubmitting}
              className="border-gray-200 dark:border-zinc-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={isSubmitting}
              className="shadow-lg shadow-primary/25"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create User
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20">
                <Pencil className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <DialogTitle className="text-gray-900 dark:text-white">
                  Edit User
                </DialogTitle>
                <DialogDescription className="text-gray-500 dark:text-gray-400">
                  Update user information and permissions.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="edit-name"
                className="text-gray-700 dark:text-gray-300"
              >
                Full Name
              </Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-primary"
              />
              {formErrors.name && (
                <p className="text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="edit-email"
                className="text-gray-700 dark:text-gray-300"
              >
                Email Address
              </Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-primary"
              />
              {formErrors.email && (
                <p className="text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="edit-role"
                className="text-gray-700 dark:text-gray-300"
              >
                Role
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value: "USER" | "ADMIN") =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger
                  id="edit-role"
                  className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
                  <SelectItem value="USER">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-gray-500" />
                      User
                    </div>
                  </SelectItem>
                  <SelectItem value="ADMIN">
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-amber-500" />
                      Admin
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formErrors.submit && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {formErrors.submit}
                </p>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              disabled={isSubmitting}
              className="border-gray-200 dark:border-zinc-700"
            >
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-100 dark:bg-red-500/20">
                <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <AlertDialogTitle className="text-gray-900 dark:text-white">
                Delete User
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
              This will permanently delete{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedUser?.name}
              </span>
              &apos;s account and all associated data. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel
              disabled={isSubmitting}
              className="border-gray-200 dark:border-zinc-700 bg-transparent"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete User
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

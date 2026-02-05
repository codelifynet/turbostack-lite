"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/card";
import { Button } from "@repo/shadcn-ui/button";
import { Input } from "@repo/shadcn-ui/input";
import { Badge } from "@repo/shadcn-ui/badge";
import { Separator } from "@repo/shadcn-ui/separator";
import {
  Loader2,
  Plug,
  Github,
  Mail,
  Key,
  Trash2,
  Plus,
  Copy,
  Eye,
  EyeOff,
} from "lucide-react";

interface OAuthConnection {
  id: string;
  provider: string;
  email: string;
  connectedAt: string;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
}

export function IntegrationsTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [oauthConnections, setOauthConnections] = useState<OAuthConnection[]>(
    [],
  );
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    void loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      setIsLoading(true);
      // Mock data
      setOauthConnections([
        {
          id: "1",
          provider: "GitHub",
          email: "user@example.com",
          connectedAt: "Jan 15, 2026",
        },
        {
          id: "2",
          provider: "Google",
          email: "user@gmail.com",
          connectedAt: "Jan 10, 2026",
        },
      ]);

      setApiKeys([
        {
          id: "1",
          name: "Production API",
          key: "tk_live_1234567890abcdef",
          createdAt: "Jan 20, 2026",
          lastUsed: "2 hours ago",
        },
        {
          id: "2",
          name: "Development",
          key: "tk_dev_abcdef1234567890",
          createdAt: "Jan 15, 2026",
          lastUsed: "3 days ago",
        },
      ]);
    } catch (error) {
      console.error("Failed to load integrations:", error);
      toast.error("Failed to load integrations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnectOAuth = async (id: string) => {
    try {
      // TODO: API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOauthConnections((prev) => prev.filter((c) => c.id !== id));
      toast.success("Connection removed successfully");
    } catch (error) {
      console.error("Failed to disconnect:", error);
      toast.error("Failed to disconnect");
    }
  };

  const handleCreateApiKey = async () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a key name");
      return;
    }

    try {
      setIsCreatingKey(true);
      // TODO: API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newKey: ApiKey = {
        id: Date.now().toString(),
        name: newKeyName,
        key: `tk_${Math.random().toString(36).substring(2, 15)}`,
        createdAt: "Just now",
        lastUsed: "Never",
      };
      setApiKeys((prev) => [newKey, ...prev]);
      setNewKeyName("");
      toast.success("API key created successfully");
    } catch (error) {
      console.error("Failed to create API key:", error);
      toast.error("Failed to create API key");
    } finally {
      setIsCreatingKey(false);
    }
  };

  const handleDeleteApiKey = async (id: string) => {
    try {
      // TODO: API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setApiKeys((prev) => prev.filter((k) => k.id !== id));
      toast.success("API key deleted successfully");
    } catch (error) {
      console.error("Failed to delete API key:", error);
      toast.error("Failed to delete API key");
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("API key copied to clipboard");
  };

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return `${key.substring(0, 8)}${"•".repeat(key.length - 12)}${key.substring(key.length - 4)}`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* OAuth Connections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plug className="h-5 w-5" />
            Connected Accounts
          </CardTitle>
          <CardDescription>
            Manage OAuth connections to third-party services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {oauthConnections.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No connected accounts
            </p>
          ) : (
            oauthConnections.map((connection) => (
              <div
                key={connection.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {connection.provider === "GitHub" ? (
                    <Github className="h-5 w-5" />
                  ) : (
                    <Mail className="h-5 w-5" />
                  )}
                  <div>
                    <p className="font-medium">{connection.provider}</p>
                    <p className="text-sm text-muted-foreground">
                      {connection.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-xs">
                    Connected {connection.connectedAt}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDisconnectOAuth(connection.id)}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            ))
          )}

          <Separator />

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Github className="h-4 w-4 mr-2" />
              Connect GitHub
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Connect Google
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys
          </CardTitle>
          <CardDescription>
            Create and manage API keys for programmatic access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Create New Key */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Key name (e.g., Production API)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    void handleCreateApiKey();
                  }
                }}
              />
            </div>
            <Button
              onClick={handleCreateApiKey}
              disabled={isCreatingKey || !newKeyName.trim()}
            >
              {isCreatingKey ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                </>
              )}
            </Button>
          </div>

          <Separator />

          {/* Existing Keys */}
          <div className="space-y-3">
            {apiKeys.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No API keys created yet
              </p>
            ) : (
              apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="p-4 border rounded-lg space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{apiKey.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Created {apiKey.createdAt} • Last used {apiKey.lastUsed}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteApiKey(apiKey.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-muted rounded text-sm font-mono">
                      {visibleKeys.has(apiKey.id)
                        ? apiKey.key
                        : maskApiKey(apiKey.key)}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                    >
                      {visibleKeys.has(apiKey.id) ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyKey(apiKey.key)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

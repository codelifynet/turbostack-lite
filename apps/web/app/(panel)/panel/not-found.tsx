"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@repo/shadcn-ui/ui/button";
import { Card, CardContent } from "@repo/shadcn-ui/ui/card";
import { 
  ArrowLeft, 
  FileQuestion,
  LayoutDashboard,
  User,
  Settings,
  HelpCircle
} from "lucide-react";

export default function PanelNotFound() {
  const router = useRouter();
  
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-2xl w-full">
        <Card className="border-2 border-dashed">
          <CardContent className="pt-12 pb-12 text-center">
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                  <FileQuestion className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <span className="text-2xl font-bold">404</span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
              <p className="text-lg text-muted-foreground mb-2">
                The panel page you're looking for doesn't exist.
              </p>
              <p className="text-sm text-muted-foreground">
                It may have been moved, deleted, or the URL might be incorrect.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Button asChild>
                <Link href="/panel">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Quick Links */}
            <div className="pt-8 border-t">
              <p className="text-sm text-muted-foreground mb-4 font-medium">
                Quick Links
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/panel">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/panel/profile">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/panel/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/panel/support">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Support
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

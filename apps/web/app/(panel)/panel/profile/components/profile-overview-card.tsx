import { Card, CardContent } from "@repo/shadcn-ui/card";
import { Button } from "@repo/shadcn-ui/button";
import { Badge } from "@repo/shadcn-ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/shadcn-ui/avatar";
import {
  Camera,
  Loader2,
  Trash2,
  Shield,
  Check,
  Briefcase,
} from "lucide-react";
import type { User as UserType } from "@/services";

interface ProfileOverviewCardProps {
  profile: UserType | null;
  profileForm: {
    name: string;
    email: string;
    bio: string;
    skills: string[];
  };
  isUploadingAvatar: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteAvatar: () => void;
}

export function ProfileOverviewCard({
  profile,
  profileForm,
  isUploadingAvatar,
  fileInputRef,
  onFileSelect,
  onDeleteAvatar,
}: ProfileOverviewCardProps) {
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <Card className="overflow-hidden p-0">
        <div className="h-32 bg-linear-to-br from-primary via-primary/80 to-primary/60" />
        <CardContent className="relative pt-0 -mt-24 text-center">
          <div className="relative inline-block">
            <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
              <AvatarImage
                src={profile?.image || undefined}
                className="object-cover"
              />
              <AvatarFallback className="text-3xl bg-linear-to-br from-primary/20 to-primary/10 text-primary">
                {getInitials(profile?.name || null)}
              </AvatarFallback>
            </Avatar>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="hidden"
              onChange={onFileSelect}
            />
            <Button
              size="icon"
              variant="default"
              className="absolute bottom-0 right-0 h-10 w-10 rounded-full shadow-lg cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingAvatar}
            >
              {isUploadingAvatar ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Camera className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="mt-4 space-y-1">
            <h2 className="text-xl font-bold text-foreground">
              {profile?.name || "No Name"}
            </h2>
            <p className="text-sm text-muted-foreground">{profile?.email}</p>
          </div>

          <div className="flex items-center justify-center gap-2 mt-3">
            <Badge variant="outline" className="capitalize">
              <Shield className="h-3 w-3 mr-1" />
              {profile?.role?.toLowerCase() || "user"}
            </Badge>
            {profile?.emailVerified && (
              <Badge
                variant="default"
                className="bg-green-500/10 text-green-600 border-green-500/30"
              >
                <Check className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          {profile?.bio && (
            <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
              {profile.bio}
            </p>
          )}

          <div className="mt-6 pt-6 border-t border-border">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {profile?.skills?.length || 0}
                </p>
                <p className="text-xs text-muted-foreground">Skills</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).getFullYear()
                    : "-"}
                </p>
                <p className="text-xs text-muted-foreground">Member Since</p>
              </div>
            </div>
          </div>

          {profile?.image && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDeleteAvatar}
              disabled={isUploadingAvatar}
              className="mt-4 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Photo
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-base flex items-center gap-2 font-semibold mb-4">
            <Briefcase className="h-4 w-4 text-primary" />
            Skills
          </div>
          {profileForm.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profileForm.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1.5">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No skills added yet
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}

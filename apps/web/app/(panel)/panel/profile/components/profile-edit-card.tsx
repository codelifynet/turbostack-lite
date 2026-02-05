import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/card";
import { Button } from "@repo/shadcn-ui/button";
import { Input } from "@repo/shadcn-ui/input";
import { Label } from "@repo/shadcn-ui/label";
import { Badge } from "@repo/shadcn-ui/badge";
import { Separator } from "@repo/shadcn-ui/separator";
import { User, Plus, X, Loader2 } from "lucide-react";
import { useState } from "react";

interface ProfileEditCardProps {
  profileForm: {
    name: string;
    email: string;
    bio: string;
    skills: string[];
  };
  setProfileForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      bio: string;
      skills: string[];
    }>
  >;
  isSavingProfile: boolean;
  onSaveProfile: () => void;
}

export function ProfileEditCard({
  profileForm,
  setProfileForm,
  isSavingProfile,
  onSaveProfile,
}: ProfileEditCardProps) {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (!skill) return;
    if (profileForm.skills.includes(skill)) return;
    setProfileForm((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfileForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Edit Profile
        </CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={profileForm.name}
              onChange={(e) =>
                setProfileForm({ ...profileForm, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={profileForm.email}
              onChange={(e) =>
                setProfileForm({ ...profileForm, email: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <textarea
            id="bio"
            className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            placeholder="Tell us about yourself..."
            value={profileForm.bio}
            onChange={(e) =>
              setProfileForm({ ...profileForm, bio: e.target.value })
            }
          />
          <p className="text-xs text-muted-foreground">
            Brief description for your profile. Maximum 500 characters.
          </p>
        </div>

        <div className="space-y-3">
          <Label>Skills</Label>
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {profileForm.skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-3 py-1 gap-1"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-1 hover:text-destructive transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            <Button type="button" variant="outline" onClick={handleAddSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Press Enter or click + to add a skill
          </p>
        </div>

        <Separator />

        <div className="flex justify-end">
          <Button onClick={onSaveProfile} disabled={isSavingProfile}>
            {isSavingProfile ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

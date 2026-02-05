"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { Loader2, User as UserIcon } from "lucide-react";
import type { User as UserType } from "@/services";
import { userService } from "@/services";
import { ImageCropper } from "@/components/image-cropper";
import { useAuthStore } from "@/stores/auth-store";
import { ProfileOverviewCard } from "./profile-overview-card";
import { ProfileEditCard } from "./profile-edit-card";
import { ProfilePasswordCard } from "./profile-password-card";
import { ProfileDangerZone } from "./profile-danger-zone";

export function ProfileClient() {
  // Profile state
  const [profile, setProfile] = useState<UserType | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    bio: "",
    skills: [] as string[],
  });
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Image cropper state
  const [cropperOpen, setCropperOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Auth store for session update
  const updateUser = useAuthStore((state) => state.updateUser);

  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [isCheckingPassword, setIsCheckingPassword] = useState(true);

  // Load profile on mount
  const loadProfile = useCallback(async () => {
    setIsLoadingProfile(true);
    try {
      const response = await userService.getProfile();
      if (response.success && response.data) {
        setProfile(response.data);
        setProfileForm({
          name: response.data.name || "",
          email: response.data.email || "",
          bio: response.data.bio || "",
          skills: response.data.skills || [],
        });
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
      toast.error("Failed to load profile");
    } finally {
      setIsLoadingProfile(false);
    }
  }, []);

  // Check if user has password
  const checkHasPassword = useCallback(async () => {
    setIsCheckingPassword(true);
    try {
      const response = await userService.hasPassword();
      if (response.success && response.data) {
        setHasPassword(response.data.hasPassword);
      }
    } catch (err) {
      console.error("Failed to check password status:", err);
    } finally {
      setIsCheckingPassword(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
    checkHasPassword();
  }, [loadProfile, checkHasPassword]);

  // Profile handlers
  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
      const response = await userService.updateProfile({
        name: profileForm.name,
        email: profileForm.email,
        bio: profileForm.bio || null,
        skills: profileForm.skills,
      });

      if (response.success && response.data) {
        toast.success("Profile updated successfully");
        setProfile(response.data);
        updateUser({
          name: response.data.name || null,
          email: response.data.email,
        });
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPEG, PNG, GIF, and WebP images are allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setCropperOpen(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
    }

    setIsUploadingAvatar(true);
    try {
      // Dummy upload - just create a blob URL and simulate upload
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate upload delay

      const newImageUrl = URL.createObjectURL(croppedBlob);
      toast.success("Avatar uploaded successfully");
      setProfile((prev) => (prev ? { ...prev, image: newImageUrl } : null));
      updateUser({ image: newImageUrl });
    } catch {
      toast.error("Failed to upload avatar");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleCropperClose = (open: boolean) => {
    if (!open && selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
    }
    setCropperOpen(open);
  };

  const handleDeleteAvatar = async () => {
    if (!profile?.image) return;

    setIsUploadingAvatar(true);
    try {
      // Dummy delete - just simulate removal
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delete delay

      // Revoke blob URL if it's a blob URL
      if (profile.image.startsWith("blob:")) {
        URL.revokeObjectURL(profile.image);
      }

      toast.success("Avatar removed successfully");
      setProfile((prev) => (prev ? { ...prev, image: null } : null));
      updateUser({ image: null });
    } catch {
      toast.error("Failed to remove avatar");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleChangePassword = async () => {
    if (hasPassword && !passwordForm.currentPassword) {
      toast.error("Current password is required");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setIsChangingPassword(true);
    try {
      let response;
      if (hasPassword) {
        response = await userService.changePassword(
          passwordForm.currentPassword,
          passwordForm.newPassword
        );
      } else {
        response = await userService.setPassword(passwordForm.newPassword);
      }

      if (response.success) {
        toast.success(
          hasPassword
            ? "Password changed successfully"
            : "Password set successfully"
        );
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setHasPassword(true);
      } else {
        toast.error(response.message || "Failed to update password");
      }
    } catch {
      toast.error("Failed to update password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5 ring-1 ring-primary/10">
              <UserIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Profile
              </h1>
              <p className="text-muted-foreground text-sm">
                Manage your personal information and account settings
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <ProfileOverviewCard
            profile={profile}
            profileForm={profileForm}
            isUploadingAvatar={isUploadingAvatar}
            fileInputRef={fileInputRef}
            onFileSelect={handleFileSelect}
            onDeleteAvatar={handleDeleteAvatar}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <ProfileEditCard
            profileForm={profileForm}
            setProfileForm={setProfileForm}
            isSavingProfile={isSavingProfile}
            onSaveProfile={handleSaveProfile}
          />

          <ProfilePasswordCard
            hasPassword={hasPassword}
            isCheckingPassword={isCheckingPassword}
            passwordForm={passwordForm}
            setPasswordForm={setPasswordForm}
            showPasswords={showPasswords}
            setShowPasswords={setShowPasswords}
            isChangingPassword={isChangingPassword}
            onChangePassword={handleChangePassword}
          />

          <ProfileDangerZone />
        </div>
      </div>

      {selectedImage && (
        <ImageCropper
          open={cropperOpen}
          onOpenChange={handleCropperClose}
          imageSrc={selectedImage}
          onCropComplete={handleCropComplete}
          aspectRatio={1}
          cropShape="round"
          title="Crop Profile Picture"
        />
      )}
    </div>
  );
}

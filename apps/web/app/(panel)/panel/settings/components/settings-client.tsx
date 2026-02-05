"use client";

import { useState } from "react";
import { SettingsPageHeader } from "./settings-page-header";
import { SettingsNavigation, type SettingsTab } from "./settings-navigation";
import { ProfileTab } from "./profile-tab";
import { AccountTab } from "./account-tab";
import { NotificationsTab } from "./notifications-tab";
import { PrivacyTab } from "./privacy-tab";
import { AppearanceTab } from "./appearance-tab";
import { BillingTab } from "./billing-tab";
import { UsageTab } from "./usage-tab";
import { IntegrationsTab } from "./integrations-tab";
import { DataManagementTab } from "./data-management-tab";
import { MediaTab } from "./media-tab";
import { useSession, type UserWithRole } from "@/lib/auth-client";

export function SettingsClient() {
  const { data: session } = useSession();
  const user = session?.user as UserWithRole | undefined;
  const userRole = user?.role || "USER";
  
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "account":
        return <AccountTab />;
      case "notifications":
        return <NotificationsTab />;
      case "privacy":
        return <PrivacyTab />;
      case "appearance":
        return <AppearanceTab />;
      case "billing":
        return <BillingTab userRole={userRole} />;
      case "usage":
        return <UsageTab />;
      case "integrations":
        return <IntegrationsTab />;
      case "data":
        return <DataManagementTab />;
      case "media":
        return <MediaTab userRole={userRole} />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="space-y-6">
      <SettingsPageHeader />

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
        <SettingsNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          userRole={userRole}
        />

        <div className="lg:col-span-3 space-y-6">{renderTabContent()}</div>
      </div>
    </div>
  );
}

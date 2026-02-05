import { Suspense } from "react";
import { Metadata } from "next";
import {
  OAuthCallbackContent,
  OAuthCallbackFallback,
} from "./components/oauth-callback-content";

export const metadata: Metadata = {
  title: "OAuth Callback - TurboStack",
  description: "Complete your authentication",
};

export default function OAuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<OAuthCallbackFallback />}>
        <OAuthCallbackContent />
      </Suspense>
    </div>
  );
}

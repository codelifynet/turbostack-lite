import { Metadata } from "next";
import { mockMediaFiles } from "@/mocks/media.mock";
import { MediaClient } from "./components/media-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Media Library | TurboStack",
  description:
    "Upload and manage your media files with drag & drop, optimization, and cropping features.",
  openGraph: {
    title: "Media Library | TurboStack",
    description:
      "Upload and manage your media files with drag & drop, optimization, and cropping features.",
  },
};

async function getMediaFiles() {
  // Return mock data for development
  return mockMediaFiles;
}

export default async function MediaPage() {
  const initialFiles = await getMediaFiles();

  return <MediaClient initialFiles={initialFiles} />;
}

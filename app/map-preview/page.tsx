import type { Metadata } from "next";
import { HcmcMapboxBase } from "@/components/map/hcmc-mapbox-base";

// Internal Phase 1 Mapbox validation route — not linked from navigation.
export const metadata: Metadata = {
  title: "Map Preview (internal)",
  robots: { follow: false, index: false },
};

export default function MapPreviewPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-8">
      <h1 className="mb-4 text-lg font-semibold text-[#1F2937]">Mapbox base — Phase 1 validation</h1>
      <HcmcMapboxBase />
    </main>
  );
}

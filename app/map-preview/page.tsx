import type { Metadata } from "next";
import { HcmcMapboxBase } from "@/components/map/hcmc-mapbox-base";

// Internal Mapbox preview route — not linked from navigation.
export const metadata: Metadata = {
  title: "Map Preview (internal)",
  robots: { follow: false, index: false },
};

export default function MapPreviewPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B8923A]">
        Internal preview
      </p>
      <h1 className="mb-5 font-serif text-2xl font-medium text-[#123C35]">
        Cinematic map foundation
      </h1>
      <HcmcMapboxBase />
    </main>
  );
}

import type { Metadata } from "next";
import { SplineSceneBasic } from "@/components/ui/demo";

// Internal component showcase — not linked from site navigation.
export const metadata: Metadata = {
  title: "Spline Scene Demo (internal)",
  robots: { follow: false, index: false },
};

export default function SplineDemoPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <SplineSceneBasic />
    </main>
  );
}

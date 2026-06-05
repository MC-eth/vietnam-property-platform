"use client";

import { useState } from "react";
import { FeaturedResidencesStrip } from "@/components/featured-residences-strip";
import { HomepageAdvisorCard } from "@/components/homepage-advisor-card";
import { HomepageMapPlaceholder } from "@/components/homepage-map-placeholder";
import { InfrastructureProgressCard } from "@/components/infrastructure-progress-card";
import { useAppPreferences } from "@/context/app-preferences-context";
import type { Project } from "@/types/project";

export function HomepageInvestmentDiscovery({ projects }: { projects: Project[] }) {
  const { t } = useAppPreferences();
  const [activeLayer, setActiveLayer] = useState("all");

  return (
    <section className="bg-[#FFFDF8] px-5 py-6 sm:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <HomepageMapPlaceholder activeLayer={activeLayer} onLayerChange={setActiveLayer} />
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
          <FeaturedResidencesStrip projects={projects} />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
            <InfrastructureProgressCard />
            <HomepageAdvisorCard />
          </div>
        </div>

        <p className="mt-3 max-w-4xl text-xs leading-6 text-[#6B7280]">
          {t("investmentDiscoveryDisclaimer")}
        </p>
      </div>
    </section>
  );
}

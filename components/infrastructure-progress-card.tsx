"use client";

import { useAppPreferences } from "@/context/app-preferences-context";

const infrastructureItems = [
  "Metro Line 2",
  "Ring Road 3",
  "Long Thanh International Airport",
];

export function InfrastructureProgressCard() {
  const { t, td } = useAppPreferences();

  return (
    <article className="rounded-2xl border border-[#ECE7DA] bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-[#1F2937]">{t("keyInfrastructurePipeline")}</h3>
      <div className="mt-3 grid gap-2.5">
        {infrastructureItems.map((item) => (
          <div className="flex items-center gap-3" key={item}>
            <span className="h-2 w-2 rounded-full bg-[#F5C84C]" />
            <p className="text-sm font-medium text-[#4B5563]">{td(item)}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

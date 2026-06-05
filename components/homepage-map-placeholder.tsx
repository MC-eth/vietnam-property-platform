"use client";

import Link from "next/link";
import { useAppPreferences } from "@/context/app-preferences-context";

type HomepageMapPlaceholderProps = {
  activeLayer: string;
  onLayerChange: (layer: string) => void;
};

const layers = [
  { id: "all", label: "allLocations" },
  { id: "projects", label: "residentialProjects" },
  { id: "landmarks", label: "landmarks" },
  { id: "infrastructure", label: "infrastructure" },
] as const;

const bestFor = ["capitalGrowth", "premiumRental", "overseasBuyers"] as const;
const residences = ["Empire City", "The Metropole"];

export function HomepageMapPlaceholder({ activeLayer, onLayerChange }: HomepageMapPlaceholderProps) {
  const { t, td } = useAppPreferences();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#ECE7DA] bg-white p-2 shadow-[0_22px_64px_rgba(31,41,55,0.10)] sm:p-3">
      <div className="relative min-h-[540px] overflow-hidden rounded-xl bg-[#FFF8E8] md:min-h-[500px] lg:min-h-[520px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_28%,rgba(245,200,76,0.28),transparent_30%),radial-gradient(circle_at_20%_72%,rgba(184,202,199,0.28),transparent_30%),linear-gradient(135deg,#FFFDF8_0%,#F7EFE0_42%,#EEF3F0_100%)]" />
        <div className="absolute inset-0 opacity-55">
          <div className="absolute left-[-8%] top-[28%] h-px w-[115%] rotate-[-9deg] bg-[#D8CDAF]" />
          <div className="absolute left-[-10%] top-[54%] h-px w-[120%] rotate-[7deg] bg-[#D8CDAF]" />
          <div className="absolute left-[18%] top-[-20%] h-[130%] w-px rotate-[15deg] bg-[#D8CDAF]" />
          <div className="absolute left-[62%] top-[-15%] h-[130%] w-px rotate-[-18deg] bg-[#D8CDAF]" />
          <div className="absolute bottom-[-18%] right-[12%] h-72 w-72 rounded-full border border-[#D8CDAF]/70" />
        </div>

        <div className="relative z-10 flex min-h-[540px] flex-col justify-between gap-3 p-3 md:min-h-[500px] md:p-4 lg:min-h-[520px]">
          <div className="grid gap-4 lg:grid-cols-[170px_1fr_300px] lg:items-start xl:grid-cols-[190px_1fr_340px]">
            <nav className="flex gap-2 overflow-x-auto rounded-full border border-white/70 bg-white/88 p-2 shadow-sm backdrop-blur lg:flex-col lg:rounded-2xl">
              {layers.map((layer) => (
                <button
                  className={`premium-focus-ring min-h-11 shrink-0 rounded-full px-4 text-left text-sm font-semibold transition lg:w-full ${
                    activeLayer === layer.id
                      ? "bg-[#F5C84C] text-[#1F2937]"
                      : "bg-white text-[#4B5563] hover:bg-[#FFF8E8] hover:text-[#1F2937]"
                  }`}
                  key={layer.id}
                  onClick={() => onLayerChange(layer.id)}
                  type="button"
                >
                  {t(layer.label)}
                </button>
              ))}
            </nav>

            <div className="flex min-h-[220px] items-center justify-center px-2 py-6 text-center lg:min-h-[390px]">
              <div className="max-w-md rounded-2xl border border-white/70 bg-white/80 px-6 py-7 shadow-[0_18px_60px_rgba(31,41,55,0.08)] backdrop-blur">
                <h3 className="text-3xl font-semibold leading-tight text-[#1F2937]">
                  {t("hcmcMapPreviewTitle")}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#6B7280]">
                  {t("hcmcMapPreviewHelper")}
                </p>
              </div>
            </div>

            <aside className="rounded-2xl border border-[#ECE7DA] bg-white/94 p-5 shadow-[0_18px_60px_rgba(31,41,55,0.10)] backdrop-blur">
              <div>
                <h3 className="text-2xl font-semibold leading-tight text-[#1F2937]">
                  <TD value="Thu Thiem (District 2)" />
                </h3>
                <span className="mt-3 inline-flex rounded-full bg-[#FFF8E8] px-3 py-1 text-xs font-semibold text-[#A9851D] ring-1 ring-[#F5C84C]/35">
                  {t("premiumGrowthHub")}
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
                  <TD value="Eastern Zone / Thu Duc City" />
                </p>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#4B5563]">
                {t("thuThiemMapPositioning")}
              </p>

              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">{t("bestFor")}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {bestFor.map((item) => (
                    <span className="rounded-full border border-[#ECE7DA] bg-[#FFFDF8] px-3 py-1 text-xs font-semibold text-[#1F2937]" key={item}>
                      {t(item)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">{t("marketSnapshot")}</p>
                <div className="mt-2">
                  <Metric label={t("rentalDemand")} value={td("High")} />
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-[#ECE7DA] bg-[#FFFDF8] p-3">
                <p className="text-sm font-semibold text-[#1F2937]">{t("twoResidencesAvailable")}</p>
                <p className="mt-1 text-sm text-[#6B7280]">
                  {residences.map((item) => (
                    <span key={item}>
                      <TD value={item} />
                      {item === residences[residences.length - 1] ? "" : " · "}
                    </span>
                  ))}
                </p>
              </div>

              <div className="mt-4 grid gap-2">
                <Link
                  className="premium-focus-ring inline-flex min-h-10 w-full items-center justify-center rounded-full bg-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
                  href="/districts/thu-thiem"
                >
                  {t("viewDistrictInsights")}
                </Link>
                <Link
                  className="premium-focus-ring inline-flex min-h-10 w-full items-center justify-center rounded-full border border-[#D8CDAF] bg-white px-5 text-sm font-semibold text-[#1F2937] transition hover:border-[#E7B93D] hover:bg-[#FFF8E8]"
                  href="/properties?district=thu-thiem"
                >
                  {t("exploreResidences")}
                </Link>
              </div>
            </aside>
          </div>

          <div className="flex justify-center">
            <div className="inline-flex rounded-full border border-white/75 bg-white/85 p-1 shadow-sm backdrop-blur">
              <span className="rounded-full bg-[#F5C84C] px-4 py-2 text-xs font-semibold text-[#1F2937]">2D</span>
              <span className="px-4 py-2 text-xs font-semibold text-[#6B7280]">3D</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#FFFDF8] p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B7280]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#1F2937]">{value}</p>
    </div>
  );
}

function TD({ value }: { value: string }) {
  const { td } = useAppPreferences();
  return <>{td(value)}</>;
}

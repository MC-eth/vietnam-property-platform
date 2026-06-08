import { TD } from "@/components/localized-text";
import type { DistrictFutureAdvantage, DistrictGrowthDriver } from "@/types/district";

type FutureAdvantageCardsProps = {
  advantages: DistrictFutureAdvantage[];
};

export function FutureAdvantageCards({ advantages }: FutureAdvantageCardsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {advantages.map((advantage) => (
        <article
          className="group rounded-2xl border border-[#ECE7DA] bg-white/92 p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#E7B93D]/70 hover:shadow-[0_18px_46px_rgba(31,41,55,0.08)] sm:p-6"
          key={advantage.title}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E7B93D]/45 bg-[#FFF7DB] text-[#B88A18] transition group-hover:bg-[#F5C84C]/25">
            <AdvantageIcon icon={advantage.icon} />
          </div>
          <h3 className="mt-5 text-lg font-semibold leading-tight text-[#1F2937]">
            <TD value={advantage.title} />
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#6B7280]">
            <TD value={advantage.description} />
          </p>
        </article>
      ))}
    </div>
  );
}

type GrowthDriverCardsProps = {
  drivers: DistrictGrowthDriver[];
};

export function GrowthDriverCards({ drivers }: GrowthDriverCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {drivers.map((driver) => (
        <article
          className="group flex min-h-full flex-col rounded-2xl border border-[#ECE7DA] bg-white/94 p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#E7B93D]/70 hover:shadow-[0_18px_46px_rgba(31,41,55,0.08)]"
          key={driver.id}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E7B93D]/45 bg-[#FFF7DB] text-[#B88A18] transition group-hover:bg-[#F5C84C]/25">
            <AdvantageIcon icon={driver.icon} />
          </div>
          <h3 className="mt-5 text-lg font-semibold leading-tight text-[#1F2937]">
            <TD value={driver.title} />
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#6B7280]">
            <TD value={driver.introduction ?? driver.description ?? ""} />
          </p>
          <ul className="mt-4 grid gap-2 text-xs font-medium leading-5 text-[#4B5563]">
            {(driver.examples ?? driver.bullets ?? []).map((bullet) => {
              const example = typeof bullet === "string" ? { status: undefined, text: bullet } : bullet;

              return (
                <li className="flex gap-2" key={example.text}>
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#B88A18]" />
                  <span>
                    <TD value={example.text} />
                  </span>
                </li>
              );
            })}
          </ul>
          {driver.statusNote ? (
            <p className="mt-4 border-t border-[#ECE7DA] pt-3 text-[11px] font-medium leading-5 text-[#8A7B58]">
              <TD value={driver.statusNote} />
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function AdvantageIcon({ icon }: { icon?: DistrictFutureAdvantage["icon"] | DistrictGrowthDriver["icon"] }) {
  const commonProps = {
    "aria-hidden": true,
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  switch (icon) {
    case "train":
      return (
        <svg {...commonProps}>
          <path d="M6 4h12a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2Z" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="M8 22l2-4" />
          <path d="M16 18l2 4" />
        </svg>
      );
    case "trees":
      return (
        <svg {...commonProps}>
          <path d="M6 20v-5" />
          <path d="M18 20v-4" />
          <path d="M6 15a4 4 0 0 1-2.5-7.1A5 5 0 0 1 13 7.5" />
          <path d="M18 16a4 4 0 1 0-3.7-5.6" />
          <path d="M3 20h18" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...commonProps}>
          <path d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
          <path d="M4 8h16v12H4z" />
          <path d="M4 13h16" />
          <path d="M10 13v2h4v-2" />
        </svg>
      );
    case "network":
      return (
        <svg {...commonProps}>
          <circle cx="6" cy="7" r="2" />
          <circle cx="18" cy="7" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M8 8.5 11 16" />
          <path d="M16 8.5 13 16" />
          <path d="M8 7h8" />
        </svg>
      );
    case "bridge":
    case "route":
      return (
        <svg {...commonProps}>
          <path d="M4 16c2.4-5.3 13.6-5.3 16 0" />
          <path d="M4 16h16" />
          <path d="M7 16v-3.2" />
          <path d="M12 16v-4.5" />
          <path d="M17 16v-3.2" />
          <path d="M5 20h14" />
        </svg>
      );
    case "users":
      return (
        <svg {...commonProps}>
          <path d="M16 19c0-2.2-1.8-4-4-4s-4 1.8-4 4" />
          <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M20 19c0-1.7-1.1-3.1-2.6-3.7" />
          <path d="M17 5.3a2.7 2.7 0 0 1 0 5.4" />
        </svg>
      );
    case "waves":
      return (
        <svg {...commonProps}>
          <path d="M4 9c2 1.3 4 1.3 6 0s4-1.3 6 0 4 1.3 6 0" />
          <path d="M4 14c2 1.3 4 1.3 6 0s4-1.3 6 0 4 1.3 6 0" />
          <path d="M4 19c2 1.3 4 1.3 6 0s4-1.3 6 0 4 1.3 6 0" />
        </svg>
      );
    case "compass":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="8" />
          <path d="m15.5 8.5-2.2 5.8-5.8 2.2 2.2-5.8 5.8-2.2Z" />
        </svg>
      );
    case "building":
    default:
      return (
        <svg {...commonProps}>
          <path d="M5 20V8l7-4 7 4v12" />
          <path d="M9 20v-7h6v7" />
          <path d="M9 9h.01" />
          <path d="M12 9h.01" />
          <path d="M15 9h.01" />
        </svg>
      );
  }
}

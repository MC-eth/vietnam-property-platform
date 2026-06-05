"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAppPreferences } from "@/context/app-preferences-context";
import { formatCurrencyFromUsd } from "@/lib/formatters";
import type { TranslationKey } from "@/constants/translations";
import type { Project } from "@/types/project";

type ResidenceSummary = {
  district: string;
  heroImage: string;
  projectName: string;
  slug: string;
  startingPriceUsd: number;
};

const featuredResidences: ResidenceSummary[] = [
  {
    district: "Thu Thiem",
    heroImage: "/mock-images/projects/empire-city-riverside-hero.png",
    projectName: "Empire City",
    slug: "empire-city",
    startingPriceUsd: 468000,
  },
  {
    district: "Thu Thiem",
    heroImage: "/mock-images/projects/hcmc-skyline-exterior.svg",
    projectName: "The Metropole Thu Thiem",
    slug: "the-metropole-thu-thiem",
    startingPriceUsd: 492000,
  },
  {
    district: "Thao Dien",
    heroImage: "/mock-images/projects/thu-thiem-river-residence.jpg",
    projectName: "Masteri Thao Dien",
    slug: "masteri-thao-dien",
    startingPriceUsd: 285000,
  },
  {
    district: "District 1",
    heroImage: "/mock-images/projects/hcmc-sky-view.png",
    projectName: "Vinhomes Golden River",
    slug: "vinhomes-golden-river",
    startingPriceUsd: 520000,
  },
  {
    district: "Thu Duc City",
    heroImage: "/mock-images/projects/night-skyline.svg",
    projectName: "Vinhomes Grand Park",
    slug: "vinhomes-grand-park",
    startingPriceUsd: 138000,
  },
];

export function FeaturedResidencesStrip({ projects }: { projects: Project[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const residences = featuredResidences.map((residence) => {
    const project = projects.find((item) => item.slug === residence.slug);

    if (!project) return residence;

    return {
      district: project.district,
      heroImage: project.heroImage,
      projectName: project.projectName,
      slug: project.slug,
      startingPriceUsd: Math.min(...project.availableUnits.map((unit) => unit.priceUsd)),
    };
  });

  const updateScrollState = () => {
    const carousel = scrollRef.current;
    if (!carousel) return;

    setCanScrollLeft(carousel.scrollLeft > 4);
    setCanScrollRight(
      carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 4
    );
  };

  useEffect(() => {
    const carousel = scrollRef.current;
    if (!carousel) return;

    updateScrollState();
    carousel.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      carousel.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [residences.length]);

  const scrollCarousel = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "right" ? 320 : -320,
      behavior: "smooth",
    });
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-[#ECE7DA] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-[#1F2937]">
          <T k="featuredResidencesHcmc" />
        </h3>
        <div className="flex items-center gap-2">
          <CarouselArrow
            ariaLabel="Previous featured residences"
            disabled={!canScrollLeft}
            direction="left"
            onClick={() => scrollCarousel("left")}
          />
          <CarouselArrow
            ariaLabel="Next featured residences"
            disabled={!canScrollRight}
            direction="right"
            onClick={() => scrollCarousel("right")}
          />
        </div>
      </div>
      <div
        className="flex snap-x gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        ref={scrollRef}
      >
        {residences.map((residence) => (
          <FeaturedResidenceCard key={residence.slug} residence={residence} />
        ))}
      </div>
    </section>
  );
}

function CarouselArrow({
  ariaLabel,
  disabled,
  direction,
  onClick,
}: {
  ariaLabel: string;
  disabled: boolean;
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      aria-label={ariaLabel}
      className={`premium-focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-semibold shadow-sm transition ${
        disabled
          ? "border border-[#ECE7DA] bg-white text-[#B6B0A3]"
          : "bg-[#F5C84C] text-[#1F2937] hover:bg-[#E7B93D]"
      }`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {direction === "left" ? "←" : "→"}
    </button>
  );
}

function FeaturedResidenceCard({ residence }: { residence: ResidenceSummary }) {
  const { currency, t, td } = useAppPreferences();

  return (
    <Link
      className="group min-w-[230px] snap-start overflow-hidden rounded-xl border border-[#ECE7DA] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E7B93D] hover:shadow-[0_18px_46px_rgba(31,41,55,0.10)] sm:min-w-[250px] lg:min-w-[236px] xl:min-w-[226px]"
      href={residence.slug === "vinhomes-golden-river" ? "/properties" : `/properties/${residence.slug}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-[1.04]"
          style={{ backgroundImage: `url('${residence.heroImage}')` }}
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#1F2937] backdrop-blur">
          {td(formatHomepageDistrict(residence))}
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-base font-semibold leading-tight text-[#1F2937]">{td(residence.projectName)}</h4>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#6B7280]">{t("startingPrice")}</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="text-base font-semibold text-[#1F2937]">{formatCurrencyFromUsd(residence.startingPriceUsd, currency)}</p>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5C84C] text-base font-semibold text-[#1F2937] transition group-hover:bg-[#E7B93D]">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function formatHomepageDistrict(residence: ResidenceSummary) {
  if (residence.slug === "empire-city" || residence.slug === "the-metropole-thu-thiem") {
    return "Thu Thiem (District 2)";
  }

  if (residence.slug === "masteri-thao-dien") {
    return "Thao Dien (District 2)";
  }

  if (residence.slug === "vinhomes-golden-river") {
    return "District 1 (CBD)";
  }

  if (residence.slug === "vinhomes-grand-park") {
    return "Thu Duc City / District 9 Growth Corridor";
  }

  if (residence.district === "District 7") {
    return "District 7 / Phu My Hung";
  }

  if (residence.district === "Binh Thanh") {
    return "Binh Thanh District";
  }

  return residence.district;
}

function T({ k }: { k: TranslationKey }) {
  const { t } = useAppPreferences();
  return <>{t(k)}</>;
}

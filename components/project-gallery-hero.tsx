"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { T, TD } from "@/components/localized-text";
import type { Project } from "@/types/project";
import type { TouchEvent } from "react";

type ProjectGalleryHeroProps = {
  project: Project;
};

export function ProjectGalleryHero({ project }: ProjectGalleryHeroProps) {
  const images = useMemo(
    () => Array.from(new Set([project.heroImage, ...project.galleryImages])),
    [project.galleryImages, project.heroImage],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const activeImage = images[activeIndex] ?? project.heroImage;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [images.length]);

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % images.length);
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) return;

    const distance = touchStartX - event.changedTouches[0].clientX;

    if (Math.abs(distance) > 40) {
      if (distance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    setTouchStartX(null);
  }

  return (
    <section className="relative overflow-hidden bg-[#FFFDF8]">
      <div
        className="relative min-h-[620px] sm:min-h-[720px]"
        onTouchEnd={handleTouchEnd}
        onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
      >
        <div
          className="hero-ken-burns absolute inset-0 bg-cover bg-center transition-[background-image] duration-500"
          style={{ backgroundImage: `url('${activeImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/50 via-[#1F2937]/14 to-[#FFFDF8]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F2937]/24 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl flex-col justify-end px-5 pb-8 pt-24 sm:min-h-[720px] sm:px-8 sm:pb-12 lg:pb-16">
          <div className="max-w-3xl">
            <h1 className="flex flex-wrap items-center gap-3 text-4xl font-semibold leading-tight text-white drop-shadow-sm sm:text-6xl">
              <span>
                <TD value={project.projectName} />
              </span>
              <VerifiedProjectTick />
            </h1>
            <p className="mt-4 text-base font-semibold text-white/90">
              <TD value={project.district} /> · <TD value={project.city} />
            </p>
            <p className="mt-4 max-w-xl text-lg leading-7 text-white/92">
              <T k={getHeroShortLine(project.district)} />
            </p>
            <div className="mt-6 flex max-w-2xl flex-wrap gap-2">
              {getHeroPositioningTags(project.district).map((tag) => (
                <span
                  className="rounded-full border border-white/25 bg-white/16 px-3 py-2 text-xs font-semibold text-white shadow-sm backdrop-blur-md"
                  key={tag}
                >
                  <T k={tag} />
                </span>
              ))}
            </div>

            <Link
              className="premium-focus-ring mt-8 inline-flex min-h-12 items-center justify-center rounded-sm bg-[#F5C84C] px-6 text-sm font-semibold text-[#1F2937] shadow-lg shadow-[#1F2937]/10 hover:bg-[#E7B93D]"
              href={`/enquiry?project=${project.slug}`}
            >
              <T k="bookInvestorConsultation" />
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {images.map((image, index) => (
                <button
                  aria-label={`Show image ${index + 1}`}
                  className={`h-1.5 rounded-full transition ${
                    index === activeIndex ? "w-9 bg-[#F5C84C]" : "w-5 bg-white/75 hover:bg-white"
                  }`}
                  key={image}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                aria-label="Previous image"
                className="flex h-12 w-12 items-center justify-center rounded-sm border border-white/70 bg-white/88 text-xl text-[#1F2937] shadow-sm transition hover:bg-white"
                onClick={goToPrevious}
                type="button"
              >
                ←
              </button>
              <button
                aria-label="Next image"
                className="flex h-12 w-12 items-center justify-center rounded-sm border border-white/70 bg-white/88 text-xl text-[#1F2937] shadow-sm transition hover:bg-white"
                onClick={goToNext}
                type="button"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getHeroShortLine(district: string) {
  if (district === "Thu Thiem") {
    return "premiumRiversideResidenceThuThiem" as const;
  }

  if (district === "Thao Dien") {
    return "premiumRiversideResidenceThaoDien" as const;
  }

  if (district === "Tay Ho") {
    return "premiumLakesideResidenceTayHo" as const;
  }

  return "premiumUrbanResidenceVietnam" as const;
}

function getHeroPositioningTags(district: string) {
  if (district === "Thu Thiem") {
    return ["cbdExposure", "riversideLifestyle", "expatRentalDemand", "primeDistrictPositioning"] as const;
  }

  if (district === "Thao Dien") {
    return ["riversideLifestyle", "metroAccess", "expatRentalDemand", "lifestyleDistrict"] as const;
  }

  if (district === "Tay Ho") {
    return ["lakeLifestyle", "expatRentalDemand", "diplomaticDistrict", "stableRentalBase"] as const;
  }

  return ["districtGrowth", "professionalTenantDemand", "infrastructureGrowth", "remoteOwnership"] as const;
}

function VerifiedProjectTick() {
  return (
    <span className="group relative inline-flex">
      <span
        aria-label="Verified project"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-lg shadow-[#1F2937]/20 ring-2 ring-white/80 sm:h-9 sm:w-9"
        tabIndex={0}
      >
        <svg aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
          <path
            d="m7.5 12 3 3 6-7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.4"
          />
        </svg>
      </span>
      <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 -translate-x-1/2 whitespace-nowrap rounded-sm border border-white/20 bg-[#1F2937]/96 px-3 py-2 text-xs font-semibold leading-5 text-white opacity-0 shadow-xl shadow-[#1F2937]/20 backdrop-blur transition group-hover:opacity-100 group-focus-within:opacity-100">
        <T k="verifiedProject" />
      </span>
    </span>
  );
}

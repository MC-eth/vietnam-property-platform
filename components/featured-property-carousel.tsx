"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { useAppPreferences } from "@/context/app-preferences-context";

const slides = [
  {
    image: "/mock-images/projects/hcmc-skyline-exterior.svg",
    name: "Empire City",
    district: "Thu Thiem",
    yield: "4.8% - 5.4%",
    positioning: "Strong rental demand from expat professionals",
  },
  {
    image: "/mock-images/units/saigon-river-view.svg",
    name: "Masteri Thao Dien",
    district: "Thao Dien / District 2",
    yield: "5.0% - 5.8%",
    positioning: "Riverfront lifestyle with deep international tenant demand",
  },
  {
    image: "/mock-images/units/premium-living-room.svg",
    name: "Heritage West Lake",
    district: "Tay Ho",
    yield: "4.4% - 5.0%",
    positioning: "Premium rental profile for embassy and executive tenants",
  },
  {
    image: "/mock-images/units/rooftop-pool.svg",
    name: "Vinhomes Grand Park",
    district: "Thu Duc",
    yield: "5.2% - 6.0%",
    positioning: "Family-focused rental demand near schools and amenities",
  },
  {
    image: "/mock-images/units/luxury-lobby.svg",
    name: "Lumi Hanoi",
    district: "Nam Tu Liem",
    yield: "5.0% - 5.7%",
    positioning: "Business district access for long-stay professional tenants",
  },
  {
    image: "/mock-images/projects/night-skyline.svg",
    name: "The Metropole Thu Thiem",
    district: "Thu Thiem",
    yield: "4.6% - 5.2%",
    positioning: "Infrastructure-led growth with improving exit liquidity",
  },
] as const;

const rotationMs = 5600;

export function FeaturedPropertyCarousel() {
  const { t, td } = useAppPreferences();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, rotationMs);

    return () => window.clearInterval(interval);
  }, []);

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % slides.length);
  }

  return (
    <section className="relative overflow-hidden bg-[#FFFDF8] px-5 py-8 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative min-h-[620px] overflow-hidden rounded-sm border border-[#ECE7DA] bg-white shadow-[0_24px_80px_rgba(31,41,55,0.10)]">
          {slides.map((slide, index) => (
            <div
              className={`absolute inset-0 transition duration-700 ease-out ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
              key={slide.name}
            >
              <Image
                alt={slide.name}
                className={`object-cover ${index === activeIndex ? "hero-ken-burns" : ""}`}
                fill
                priority={index === 0}
                sizes="100vw"
                src={slide.image}
                unoptimized
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF8]/96 via-[#FFFDF8]/82 to-[#FFFDF8]/16" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1F2937]/16 to-transparent" />

          <div className="relative z-10 flex min-h-[620px] flex-col justify-between p-6 sm:p-8 lg:p-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                {t("verifiedProject")}
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#1F2937] sm:text-5xl lg:text-6xl">
                {td(activeSlide.name)}
              </h1>
              <p className="mt-4 text-base font-semibold text-[#1F2937]">
                {td(activeSlide.district)}
              </p>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#6B7280] sm:text-lg">
                {td(activeSlide.positioning)}
              </p>

              <div className="mt-8 max-w-[23rem]">
                <Metric label={t("estimatedRentalYield")} value={activeSlide.yield} />
              </div>

              <Link
                className="premium-focus-ring mt-8 inline-flex min-h-12 items-center justify-center rounded-sm bg-[#E7B93D] px-6 text-sm font-semibold text-[#1F2937] hover:bg-[#D8AA2F]"
                href="/enquiry"
              >
                {t("bookInvestorConsultation")}
              </Link>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex gap-2">
                {slides.map((slide, index) => (
                  <button
                    aria-label={`${t("selected")} ${index + 1}`}
                    className={`h-1.5 rounded-full transition ${
                      index === activeIndex ? "w-10 bg-[#E7B93D]" : "w-5 bg-white/80"
                    }`}
                    key={slide.name}
                    onClick={() => setActiveIndex(index)}
                    type="button"
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <CarouselButton label="Previous featured project" onClick={goToPrevious}>
                  ←
                </CarouselButton>
                <CarouselButton label="Next featured project" onClick={goToNext}>
                  →
                </CarouselButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-white/70 bg-white/82 p-4 backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-[#1F2937]">{value}</p>
    </div>
  );
}

function CarouselButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="premium-focus-ring flex h-11 w-11 items-center justify-center rounded-sm border border-white/70 bg-white/84 text-lg font-semibold text-[#1F2937] backdrop-blur hover:border-[#D8CDAF] hover:bg-white"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

"use client";

import { T, TD } from "@/components/localized-text";
import { useAppPreferences } from "@/context/app-preferences-context";

const searchOptions = ["Ho Chi Minh City", "Hanoi", "Thu Thiem", "Tay Ho"];

export function Hero() {
  const { t, td } = useAppPreferences();

  return (
    <section className="relative min-h-dvh overflow-hidden bg-[#FFFDF8] text-[#1F2937]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=2200&q=85')",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#FFFDF8]/76" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FFFDF8] to-transparent" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <a href="#" className="flex items-center gap-3" aria-label="VietInvest home">
          <span className="flex h-10 w-10 items-center justify-center bg-[#F5C84C] text-sm font-semibold text-[#1F2937]">
            AE
          </span>
          <span className="text-lg font-semibold">Annam Estates</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#6B7280] md:flex">
          <a href="#cities"><T k="districts" /></a>
          <a href="#properties"><T k="properties" /></a>
          <a href="#journey"><T k="investorJourney" /></a>
          <a href="#management"><T k="rentalManagement" /></a>
        </nav>
        <a
          href="#properties"
          className="hidden border border-[#F5C84C] px-5 py-3 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F5C84C] sm:inline-flex"
        >
          <T k="shortlist" />
        </a>
      </header>

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-96px)] max-w-7xl items-center px-5 pb-16 pt-10 sm:px-8 lg:pb-24">
        <div className="grid w-full gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1F2937]">
              <T k="heroEyebrow" />
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] sm:text-6xl lg:text-7xl">
              <TD value="Invest in Vietnam's most resilient urban property markets." />
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6B7280]">
              <TD value="Curated Ho Chi Minh City and Hanoi residences for foreign buyers, with acquisition guidance, rental setup, and ongoing asset care." />
            </p>
          </div>

          <div className="border border-[#ECE7DA] bg-white p-4 text-[#1F2937] shadow-lg sm:p-5">
            <form className="grid gap-3" aria-label={t("investmentFilters")}>
              <label className="text-sm font-semibold text-[#49534d]" htmlFor="location">
                <T k="hcmcOrHanoi" />
              </label>
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  id="location"
                  className="min-h-14 border border-[#d8ccbb] bg-white px-4 text-base outline-none transition placeholder:text-[#878078] focus:border-[#1F2937] focus:ring-2 focus:ring-[#1F2937]/15"
                  placeholder={td("Try Thu Thiem, Tay Ho, District 1")}
                  type="search"
                />
                <button
                  className="min-h-14 bg-[#F5C84C] px-7 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
                  type="button"
                >
                  <T k="browseInvestmentCases" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {searchOptions.map((option) => (
                  <button
                    className="border border-[#ded4c3] bg-[#f6efe3] px-3 py-2 text-sm text-[#49534d] transition hover:border-[#1F2937] hover:text-[#1F2937]"
                    key={option}
                    type="button"
                  >
                    {td(option)}
                  </button>
                ))}
              </div>
            </form>

            <div className="mt-5 grid grid-cols-3 border-t border-[#e2d8ca] pt-5 text-center">
              <div>
                <p className="text-2xl font-semibold">2</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#777067]">
                  <T k="districts" />
                </p>
              </div>
              <div className="border-x border-[#e2d8ca]">
                <p className="text-2xl font-semibold">5%+</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#777067]">
                  <T k="yield" />
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold">24h</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#777067]">
                  <T k="shortlist" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

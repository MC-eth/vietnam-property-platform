"use client";

import { useMemo, useState } from "react";
import { T } from "@/components/localized-text";
import { useAppPreferences } from "@/context/app-preferences-context";
import { useAuth } from "@/context/auth-context";
import { convertUsdToCurrency, formatCurrency } from "@/lib/formatters";
import { FORECAST_YEARS, MARKET_FORECAST_ASSUMPTIONS } from "@/data/market-assumptions";
import { generateMarketForecast } from "@/lib/market-forecast";
import type { DistrictPriceHistoryPoint } from "@/data/district-price-history";

type DistrictPriceChartProps = {
  history: DistrictPriceHistoryPoint[];
};

const CHART_WIDTH = 720;
const CHART_HEIGHT = 300;
const PADDING = {
  bottom: 42,
  left: 70,
  right: 24,
  top: 24,
};

export function DistrictPriceChart({ history }: DistrictPriceChartProps) {
  const { currency, t } = useAppPreferences();
  const { isLoggedIn, openLoginModal } = useAuth();
  const [activeIndex, setActiveIndex] = useState(history.length - 1);
  const historicalData = useMemo(
    () =>
      history.map((point) => ({
        ...point,
        price: convertUsdToCurrency(point.pricePerSqmUsd, currency),
        series: "historical" as const,
      })),
    [currency, history],
  );
  const projectionData = useMemo(
    () =>
      generateMarketForecast(history, FORECAST_YEARS, MARKET_FORECAST_ASSUMPTIONS).map(
        (point, index) => {
          // Currency (FX) adjustment is applied only on the HKD view, compounding per
          // projected year, to reflect the assumed VND/currency movement for foreign buyers.
          const fxFactor =
            currency === "HKD"
              ? (1 + MARKET_FORECAST_ASSUMPTIONS.assumedAnnualFxAdjustment) ** (index + 1)
              : 1;

          return {
            year: point.year,
            price: convertUsdToCurrency(point.projectedPricePerSqmUsd, currency) * fxFactor,
            series: "projection" as const,
          };
        },
      ),
    [currency, history],
  );
  const inflationPct = `${Math.round(MARKET_FORECAST_ASSUMPTIONS.assumedAnnualInflationRate * 100)}%`;
  const fxPct = `${Math.round(MARKET_FORECAST_ASSUMPTIONS.assumedAnnualFxAdjustment * 100)}%`;
  const chartData = [...historicalData, ...projectionData];
  const values = chartData.map((point) => point.price);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const yMin = minValue * 0.92;
  const yMax = maxValue * 1.06;
  const activePoint = chartData[activeIndex] ?? chartData[chartData.length - 1];
  const historicalReference =
    historicalData.find((point) => point.year === 2022) ??
    historicalData[historicalData.length - 1];
  const points = chartData.map((point, index) => {
    const x = PADDING.left + (index / (chartData.length - 1)) * (CHART_WIDTH - PADDING.left - PADDING.right);
    const y = PADDING.top + ((yMax - point.price) / (yMax - yMin)) * (CHART_HEIGHT - PADDING.top - PADDING.bottom);

    return { ...point, x, y };
  });
  const historicalPoints = points.slice(0, historicalData.length);
  const projectionPoints = points.slice(Math.max(0, historicalData.length - 1));
  const historicalLinePath = makeLinePath(historicalPoints);
  const projectionLinePath = makeLinePath(projectionPoints);
  const areaPath = `${historicalLinePath} L ${historicalPoints[historicalPoints.length - 1].x} ${CHART_HEIGHT - PADDING.bottom} L ${historicalPoints[0].x} ${CHART_HEIGHT - PADDING.bottom} Z`;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => yMin + (yMax - yMin) * ratio);
  const activePosition = points[activeIndex] ?? points[points.length - 1];
  const tooltipX = Math.min(
    Math.max(activePosition.x - 82, PADDING.left),
    CHART_WIDTH - PADDING.right - 174,
  );
  const tooltipY = Math.max(activePosition.y - 56, 6);

  return (
    <section className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
            <T k="membersOnlyMarketInsight" />
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B7280]">
            <T k="districtPriceTrendSubtitle" />
          </p>
        </div>
        <div className="rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] px-3 py-2 text-xs font-semibold text-[#6B7280]">
          {currency === "HKD" ? t("hkdPerSqm") : t("usdPerSqm")}
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] p-4">
        <div className={isLoggedIn ? "" : "pointer-events-none blur-[2px]"}>
          <svg
            aria-label={t("districtPriceTrendProjection")}
            className="h-auto w-full"
            role="img"
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          >
            <defs>
              <linearGradient id="districtPriceArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#F5C84C" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#F5C84C" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {yTicks.map((tick) => {
              const y = PADDING.top + ((yMax - tick) / (yMax - yMin)) * (CHART_HEIGHT - PADDING.top - PADDING.bottom);

              return (
                <g key={tick}>
                  <line stroke="#ECE7DA" strokeDasharray="4 6" x1={PADDING.left} x2={CHART_WIDTH - PADDING.right} y1={y} y2={y} />
                  <text fill="#6B7280" fontSize="11" x={PADDING.left - 12} y={y + 4} textAnchor="end">
                    {formatPricePerSqm(tick, currency)}
                  </text>
                </g>
              );
            })}

            <path d={areaPath} fill="url(#districtPriceArea)" />
            <path d={historicalLinePath} fill="none" stroke="#E7B93D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
            <path
              d={projectionLinePath}
              fill="none"
              stroke="#D8B75B"
              strokeDasharray="6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />

            {points.map((point, index) => (
              <g key={point.year}>
                <line
                  className="cursor-pointer"
                  opacity="0"
                  stroke="transparent"
                  strokeWidth="32"
                  x1={point.x}
                  x2={point.x}
                  y1={PADDING.top}
                  y2={CHART_HEIGHT - PADDING.bottom}
                  onMouseEnter={() => setActiveIndex(index)}
                />
                <circle
                  className="cursor-pointer"
                  cx={point.x}
                  cy={point.y}
                  fill={index === activeIndex ? "#1F2937" : "#FFFDF8"}
                  r={index === activeIndex ? 5 : 3.5}
                  stroke={point.series === "projection" ? "#D8B75B" : "#E7B93D"}
                  strokeWidth="3"
                  onMouseEnter={() => setActiveIndex(index)}
                />
              </g>
            ))}

            {points.map((point, index) => (
              index % 2 === 0 || index === points.length - 1 ? (
                <text fill="#6B7280" fontSize="11" key={point.year} textAnchor="middle" x={point.x} y={CHART_HEIGHT - 14}>
                  {point.year}
                </text>
              ) : null
            ))}

            <g pointerEvents="none" transform={`translate(${tooltipX} ${tooltipY})`}>
              <rect fill="#FFFFFF" height="45" rx="3" stroke="#ECE7DA" width="174" />
              <text fill="#6B7280" fontSize="10" fontWeight="600" x="10" y="17">
                {activePoint.series === "projection" ? t("indicativeProjection") : t("historical")}
              </text>
              <text fill="#1F2937" fontSize="11" fontWeight="700" x="10" y="34">
                {activePoint.year}: {formatPricePerSqm(activePoint.price, currency)}
              </text>
            </g>
          </svg>
        </div>

        <div className="mt-4 flex flex-col gap-4 border-t border-[#ECE7DA] pt-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                <T k="historicalReference" />
              </p>
              <p className="mt-1 text-sm font-semibold text-[#1F2937]">
                {historicalReference.year}: {formatPricePerSqm(historicalReference.price, currency)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                <T k="forecastInflationLabel" />
              </p>
              <p className="mt-1 text-sm font-semibold text-[#1F2937]">{inflationPct}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#6B7280]">
            <LegendItem label={t("historical")} />
            <LegendItem isProjection label={t("indicativeProjection")} />
          </div>
        </div>
        <div className="mt-4 border-t border-[#ECE7DA] pt-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
              {activePoint.series === "projection" ? (
                <T k="indicativeProjection" />
              ) : (
                <T k="historical" />
              )}
            </p>
            <p className="mt-1 text-lg font-semibold text-[#1F2937]">
              {activePoint.year}: {formatPricePerSqm(activePoint.price, currency)}
            </p>
          </div>
        </div>
        <p className="mt-4 rounded-sm border border-[#ECE7DA] bg-white px-4 py-3 text-sm leading-6 text-[#6B7280]">
          <T k="districtPriceInterpretation" />
        </p>
        <p className="mt-3 text-xs leading-5 text-[#6B7280]">
          <T k="forecastAssumptionsNote" replacements={{ fx: fxPct, inflation: inflationPct }} />
        </p>

        {!isLoggedIn ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 p-5 backdrop-blur-sm">
            <div className="max-w-md rounded-sm border border-[#ECE7DA] bg-white p-5 text-center shadow-xl">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF8E8] text-[#1F2937] ring-1 ring-[#F5C84C]/50">
                <LockIcon />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#1F2937]">
                <T k="membersOnlyMarketInsight" />
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                <T k="membersOnlyPriceTrendDescription" />
              </p>
              <button
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-sm bg-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
                onClick={() => openLoginModal()}
                type="button"
              >
                <T k="signInToViewPriceTrend" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function makeLinePath(points: { x: number; y: number }[]) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
}

function LegendItem({ isProjection = false, label }: { isProjection?: boolean; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className={`block w-8 border-t-2 ${
          isProjection ? "border-dashed border-[#D8B75B]" : "border-[#E7B93D]"
        }`}
      />
      {label}
    </span>
  );
}

function formatPricePerSqm(value: number, currency: "USD" | "HKD") {
  return `${formatCurrency(value, currency, {
    locale: currency === "HKD" ? "en-HK" : "en-US",
    maximumFractionDigits: 0,
  })}/sqm`;
}

function LockIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2m-9 0h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

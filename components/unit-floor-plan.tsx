"use client";

import Image from "next/image";
import { useState } from "react";
import { T } from "@/components/localized-text";

type UnitFloorPlanProps = {
  floorPlanImage?: string;
  floorPlan3DImage?: string;
};

export function UnitFloorPlan({ floorPlanImage, floorPlan3DImage }: UnitFloorPlanProps) {
  const [view, setView] = useState<"2d" | "3d">("3d");
  const activeImage =
    view === "3d"
      ? floorPlan3DImage ?? floorPlanImage
      : floorPlanImage ?? floorPlan3DImage;

  return (
    <section className="rounded-sm border border-[#ECE7DA] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A9851D]">
            <T k="illustrativeFloorPlan" />
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#1F2937]">
            <T k="threeDFloorPlan" />
          </h2>
        </div>
        <div className="inline-flex w-fit rounded-full border border-[#ECE7DA] bg-[#FFFDF8] p-1">
          {(["2d", "3d"] as const).map((option) => (
            <button
              className={`min-h-10 rounded-full px-4 text-sm font-semibold transition ${
                view === option ? "bg-[#F5C84C] text-[#1F2937]" : "text-[#6B7280] hover:bg-white"
              }`}
              key={option}
              onClick={() => setView(option)}
              type="button"
            >
              {option.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-sm border border-[#ECE7DA] bg-[#FFFDF8]">
        {activeImage ? (
          <Image
            alt="Illustrative floor plan"
            className="h-auto w-full"
            height={820}
            src={activeImage}
            width={1200}
          />
        ) : (
          <div className="flex min-h-[320px] items-center justify-center px-6 text-center text-sm text-[#6B7280]">
            <T k="illustrativeFloorPlan" />
          </div>
        )}
      </div>
    </section>
  );
}

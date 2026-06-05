"use client";

import Image from "next/image";
import { useState } from "react";
import { T, TD } from "@/components/localized-text";
import { useAuth } from "@/hooks/use-auth";
import type { Project, ProjectUnit } from "@/types/project";
import type { TranslationKey } from "@/constants/translations";

type ExploreTab = "photos" | "floorPlan" | "vrTour";

type ExploreUnitSectionProps = {
  images: string[];
  project: Project;
  unit: ProjectUnit;
};

const tabs = [
  { id: "photos", label: "photos" },
  { id: "floorPlan", label: "threeDFloorPlan" },
  { id: "vrTour", label: "vrTour" },
] satisfies { id: ExploreTab; label: TranslationKey }[];

export function ExploreUnitSection({ images, project, unit }: ExploreUnitSectionProps) {
  const [activeTab, setActiveTab] = useState<ExploreTab>("photos");

  return (
    <section className="rounded-sm border border-[#ECE7DA] bg-white p-4 shadow-[0_18px_50px_rgba(31,41,55,0.05)] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A9851D]">
            <T k="unitDetails" />
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#1F2937] sm:text-3xl">
            <T k="exploreUnit" />
          </h2>
        </div>
        <div className="grid grid-cols-3 rounded-full border border-[#ECE7DA] bg-[#FFFDF8] p-1">
          {tabs.map((tab) => (
            <button
              className={`min-h-10 rounded-full px-3 text-sm font-semibold transition duration-200 sm:px-5 ${
                activeTab === tab.id
                  ? "bg-[#F5C84C] text-[#1F2937] shadow-sm"
                  : "text-[#6B7280] hover:bg-white hover:text-[#1F2937]"
              }`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              <T k={tab.label} />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        {activeTab === "photos" ? <PhotosTab images={images} unitName={getUnitName(unit)} /> : null}
        {activeTab === "floorPlan" ? <FloorPlanTab unit={unit} /> : null}
        {activeTab === "vrTour" ? <VrTourTab project={project} unit={unit} /> : null}
      </div>
    </section>
  );
}

function PhotosTab({ images, unitName }: { images: string[]; unitName: string }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>
      <div className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-[#ECE7DA] sm:aspect-[16/9]">
        <Image alt={unitName} className="premium-image object-cover" fill priority sizes="(min-width: 1024px) 760px, 100vw" src={selectedImage} />
        <button className="premium-focus-ring absolute bottom-4 right-4 rounded-sm bg-white/92 px-4 py-2 text-sm font-semibold text-[#1F2937] shadow-sm backdrop-blur hover:bg-white">
          <T k="viewAllPhotos" />
        </button>
      </div>
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              aria-label={`Photo ${index + 1}`}
              className={`premium-focus-ring relative h-20 w-28 shrink-0 overflow-hidden rounded-sm border ${
                selectedImage === image ? "border-[#F5C84C] ring-2 ring-[#F5C84C]/30" : "border-[#ECE7DA]"
              }`}
              key={`${image}-${index}`}
              onClick={() => setSelectedImage(image)}
              type="button"
            >
              <Image alt={unitName} className="object-cover" fill sizes="112px" src={image} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FloorPlanTab({ unit }: { unit: ProjectUnit }) {
  const [view, setView] = useState<"2d" | "3d">("3d");
  const activeImage =
    view === "3d"
      ? unit.floorPlan3DImage ?? unit.floorPlanImage
      : unit.floorPlanImage ?? unit.floorPlan3DImage;

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-[#6B7280]">
          <T k="floorPlanHelper" />
        </p>
        <div className="inline-flex w-fit rounded-full border border-[#ECE7DA] bg-[#FFFDF8] p-1">
          {(["2d", "3d"] as const).map((option) => (
            <button
              className={`min-h-10 rounded-full px-4 text-sm font-semibold transition duration-200 ${
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
      <div className="overflow-hidden rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
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
    </div>
  );
}

function VrTourTab({ project, unit }: { project: Project; unit: ProjectUnit }) {
  const { isLoggedIn, openLoginModal } = useAuth();
  const [showDemoNote, setShowDemoNote] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[360px] items-center justify-center rounded-sm border border-[#ECE7DA] bg-[linear-gradient(135deg,#FFFDF8,#FFF8E8)] p-6 text-center">
        <div className="max-w-md">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#A9851D] ring-1 ring-[#F5C84C]/35">
            <LockIcon />
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-[#1F2937]">
            <T k="membersOnlyVirtualViewing" />
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#6B7280]">
            <T k="membersOnlyVirtualViewingDescription" />
          </p>
          <button
            className="premium-focus-ring mt-6 inline-flex min-h-11 items-center justify-center rounded-sm bg-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] hover:bg-[#E7B93D]"
            onClick={() => openLoginModal()}
            type="button"
          >
            <T k="signInToViewVrTour" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-[#ECE7DA] bg-[linear-gradient(135deg,#FFFDF8,#FFF8E8)] p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#A9851D] ring-1 ring-[#F5C84C]/35">
            <VrIcon />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A9851D]">
              <TD value={project.projectName} />
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-[#1F2937]">
              <T k="vrTour" />
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B7280]">
              <T k="unlockedVrPlaceholder" />
            </p>
          </div>
        </div>
        <button
          className="premium-focus-ring inline-flex min-h-11 items-center justify-center rounded-sm border border-[#D8CDAF] bg-white px-5 text-sm font-semibold text-[#1F2937] hover:border-[#E7B93D] hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          disabled={!unit.vrTourUrl || unit.vrTourUrl === "#"}
          onClick={() => setShowDemoNote(true)}
          type="button"
        >
          <T k="launchVrTour" />
        </button>
      </div>
      {showDemoNote || !unit.vrTourUrl || unit.vrTourUrl === "#" ? (
        <p className="mt-4 rounded-sm border border-[#ECE7DA] bg-white px-4 py-3 text-sm leading-6 text-[#6B7280]">
          <T k="vrTourPlaceholder" />
        </p>
      ) : null}
    </div>
  );
}

function getUnitName(unit: ProjectUnit) {
  return unit.unitName ?? unit.unitType;
}

function LockIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2m-11 0h12v10H6V10Zm6 4v2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function VrIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 9h16v7a2 2 0 0 1-2 2h-3l-2-3h-2l-2 3H6a2 2 0 0 1-2-2V9Zm4 4h2m4 0h2M7 9l1-3h8l1 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

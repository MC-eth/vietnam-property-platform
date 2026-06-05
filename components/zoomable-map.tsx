"use client";

import Image from "next/image";
import { useState } from "react";

type ZoomableMapProps = {
  alt: string;
  src: string;
};

export function ZoomableMap({ alt, src }: ZoomableMapProps) {
  const [zoom, setZoom] = useState(1);

  const zoomIn = () => setZoom((value) => Math.min(2, Number((value + 0.25).toFixed(2))));
  const zoomOut = () => setZoom((value) => Math.max(1, Number((value - 0.25).toFixed(2))));

  return (
    <div className="relative overflow-hidden bg-[#FFF8E8]">
      <div
        className="origin-center transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoom})` }}
      >
        <Image
          alt={alt}
          className="h-auto w-full select-none"
          draggable={false}
          height={900}
          priority={false}
          src={src}
          width={1600}
        />
      </div>

      <div className="absolute right-3 top-3 z-10 flex overflow-hidden rounded-full border border-[#ECE7DA] bg-white/90 shadow-sm backdrop-blur">
        <button
          aria-label="Zoom out map"
          className="flex h-10 w-10 items-center justify-center text-[#1F2937] transition hover:bg-[#FFF8E8] disabled:cursor-not-allowed disabled:text-[#9CA3AF]"
          disabled={zoom <= 1}
          onClick={zoomOut}
          type="button"
        >
          <span className="text-xl leading-none">-</span>
        </button>
        <div className="h-10 w-px bg-[#ECE7DA]" />
        <button
          aria-label="Zoom in map"
          className="flex h-10 w-10 items-center justify-center text-[#1F2937] transition hover:bg-[#FFF8E8] disabled:cursor-not-allowed disabled:text-[#9CA3AF]"
          disabled={zoom >= 2}
          onClick={zoomIn}
          type="button"
        >
          <span className="text-xl leading-none">+</span>
        </button>
      </div>
    </div>
  );
}

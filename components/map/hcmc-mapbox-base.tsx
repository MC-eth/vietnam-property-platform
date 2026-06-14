"use client";

import { useState } from "react";
import Map, { NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

// Public, browser-exposed token (NEXT_PUBLIC_ prefix). Never hard-coded.
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// Phase 1 base view — Ho Chi Minh City. Not the final cinematic camera.
const INITIAL_VIEW_STATE = {
  longitude: 106.7009,
  latitude: 10.7769,
  zoom: 11.5,
  pitch: 0,
  bearing: 0,
};

type HcmcMapboxBaseProps = {
  className?: string;
};

export function HcmcMapboxBase({ className = "h-[70vh] min-h-[420px] w-full" }: HcmcMapboxBaseProps) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Safe fallback if the token is unexpectedly unavailable at runtime.
  if (!MAPBOX_TOKEN) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg border border-[#ECE7DA] bg-[#FBF7EE] p-6 text-center text-sm text-[#6B7280] ${className}`}
        role="status"
      >
        Map is unavailable in this environment.
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg border border-[#ECE7DA] ${className}`}>
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        onError={() => setHasError(true)}
        onLoad={() => setLoaded(true)}
        reuseMaps
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" />
      </Map>

      {!loaded && !hasError ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#FBF7EE]/80 text-xs font-medium uppercase tracking-[2px] text-[#6B7280]"
          role="status"
        >
          Loading map…
        </div>
      ) : null}

      {hasError ? (
        <div
          className="absolute inset-0 flex items-center justify-center bg-[#FBF7EE] p-6 text-center text-sm text-[#6B7280]"
          role="alert"
        >
          The map failed to load. Please try again.
        </div>
      ) : null}
    </div>
  );
}

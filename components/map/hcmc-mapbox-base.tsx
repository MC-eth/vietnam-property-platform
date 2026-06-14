"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Map, { NavigationControl, type MapRef } from "react-map-gl/mapbox";
import type { FogSpecification } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Public, browser-exposed token (NEXT_PUBLIC_ prefix). Never hard-coded.
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// Mapbox Standard basemap — monochrome, editorial. 3D buildings are native to
// this style, so no manual fill-extrusion layer is required.
const MAP_STYLE = "mapbox://styles/mapbox/standard";

type Composition = {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
};

// Quiet opening frame, shared by every viewport so SSR and first client paint
// agree (no hydration mismatch). The cinematic target is applied after load.
const OPENING: Composition = {
  longitude: 106.7009,
  latitude: 10.7769,
  zoom: 11.4,
  pitch: 15,
  bearing: 0,
};

// Cinematic composition framing the Saigon River curve, District 1 CBD and
// Thu Thiem. Tuned for desktop/tablet.
const DESKTOP_3D: Composition = {
  longitude: 106.7105,
  latitude: 10.7828,
  zoom: 13.1,
  pitch: 56,
  bearing: -22,
};

// Calmer composition for small screens — lower pitch, gentler bearing, pulled
// back so the river still reads without feeling cramped.
const MOBILE_3D: Composition = {
  longitude: 106.7105,
  latitude: 10.7828,
  zoom: 12.3,
  pitch: 40,
  bearing: -12,
};

// Very light warm haze near the horizon blending into a muted sage upper
// atmosphere. No stars, no fantasy sky — just enough depth to feel the skyline.
const FOG: FogSpecification = {
  range: [1.5, 11],
  color: "#EDE3D0",
  "high-color": "#AAB6A6",
  "space-color": "#C6CCC6",
  "horizon-blend": 0.16,
  "star-intensity": 0,
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function isMobileViewport() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 640px)").matches
  );
}

function flatten(view: Composition): Composition {
  return { ...view, pitch: 0, bearing: 0 };
}

// react-map-gl's view-state shape uses longitude/latitude; the imperative
// mapbox-gl camera API (flyTo/jumpTo) expects a `center` tuple. Convert here.
function toCamera(view: Composition) {
  return {
    center: [view.longitude, view.latitude] as [number, number],
    zoom: view.zoom,
    pitch: view.pitch,
    bearing: view.bearing,
  };
}

type ViewMode = "2D" | "3D";

type HcmcMapboxBaseProps = {
  className?: string;
};

export function HcmcMapboxBase({
  className = "h-[560px] sm:h-[640px] lg:h-[720px] w-full",
}: HcmcMapboxBaseProps) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [mode, setMode] = useState<ViewMode>("3D");

  const mapRef = useRef<MapRef | null>(null);
  // Guards the one-time opening so it never replays (including React's
  // development double-invoke of effects/handlers).
  const hasOpenedRef = useRef(false);

  const handleLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    // Standard basemap: monochrome theme, with commercial noise dialled down.
    map.setConfigProperty("basemap", "theme", "monochrome");
    map.setConfigProperty("basemap", "showPointOfInterestLabels", false);
    map.setConfigProperty("basemap", "showTransitLabels", false);

    // Restrained atmospheric depth.
    map.setFog(FOG);

    setLoaded(true);
  }, []);

  // One-time cinematic opening. Driven from an effect (not directly inside the
  // load handler) so it runs after the `loaded` re-render commits — otherwise
  // react-map-gl reconciles the camera back to the initial view state and
  // cancels the move. A ref guard ensures it never replays.
  useEffect(() => {
    if (!loaded || hasOpenedRef.current) return;
    hasOpenedRef.current = true;

    const map = mapRef.current?.getMap();
    if (!map) return;

    const target = toCamera(isMobileViewport() ? MOBILE_3D : DESKTOP_3D);

    // Defer one frame so any pending view-state reconciliation settles first.
    const raf = requestAnimationFrame(() => {
      if (prefersReducedMotion()) {
        map.jumpTo(target);
      } else {
        map.flyTo({ ...target, duration: 2100, curve: 1.42 });
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [loaded]);

  const applyMode = useCallback((nextMode: ViewMode) => {
    setMode(nextMode);
    const map = mapRef.current?.getMap();
    if (!map) return;

    const base = isMobileViewport() ? MOBILE_3D : DESKTOP_3D;
    const target = toCamera(nextMode === "2D" ? flatten(base) : base);

    // Defer past the setMode re-render so react-map-gl's view-state
    // reconciliation doesn't cancel the camera move.
    requestAnimationFrame(() => {
      map.flyTo({ ...target, duration: prefersReducedMotion() ? 0 : 750 });
    });
  }, []);

  // Safe fallback if the token is unexpectedly unavailable at runtime.
  if (!MAPBOX_TOKEN) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border border-[#ECE7DA] bg-[#FBF7EE] p-6 text-center text-sm text-[#6B7280] ${className}`}
        role="status"
      >
        The map is being prepared and will be available shortly.
      </div>
    );
  }

  return (
    <div
      className={`hcmc-map relative overflow-hidden rounded-xl border border-[#ECE7DA] shadow-[0_24px_70px_rgba(31,41,55,0.12)] ${className}`}
    >
      <Map
        ref={mapRef}
        initialViewState={OPENING}
        mapStyle={MAP_STYLE}
        mapboxAccessToken={MAPBOX_TOKEN}
        antialias
        fog={FOG}
        onError={() => setHasError(true)}
        onLoad={handleLoad}
        reuseMaps
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" visualizePitch />
      </Map>

      {/* Editorial title overlay (top-left). Capped narrow on mobile so it
          clears the navigation controls (top-right). */}
      <div className="pointer-events-none absolute left-4 top-4 z-20 max-w-[15rem] sm:max-w-[360px]">
        <div className="rounded-xl border border-[#E7E0CF] bg-[#FFFDF8]/80 px-4 py-3 shadow-[0_12px_34px_rgba(31,41,55,0.10)] backdrop-blur-md sm:px-5 sm:py-4">
          <p className="text-[9px] font-semibold uppercase leading-[1.5] tracking-[0.2em] text-[#B8923A] sm:text-[10px] sm:tracking-[0.22em]">
            Vietnam Investment Intelligence
          </p>
          <h2 className="mt-1.5 font-serif text-xl font-medium leading-tight text-[#123C35] sm:text-3xl">
            Ho Chi Minh City
          </h2>
          <p className="mt-1.5 hidden text-sm leading-relaxed text-[#5A6058] sm:block">
            Explore districts, infrastructure and residences across the city.
          </p>
        </div>
      </div>

      {/* 2D / 3D toggle (bottom-centre, clear of controls and attribution). */}
      <div
        className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2"
        role="group"
        aria-label="Map perspective"
      >
        <div className="flex items-center gap-1 rounded-full border border-[#E7E0CF] bg-[#FFFDF8]/85 p-1 shadow-[0_10px_28px_rgba(31,41,55,0.12)] backdrop-blur-md">
          {(["2D", "3D"] as const).map((option) => {
            const active = mode === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => applyMode(option)}
                className={`min-h-9 min-w-12 rounded-full px-4 text-xs font-semibold tracking-[0.12em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E7B93D] focus-visible:ring-offset-1 focus-visible:ring-offset-[#FFFDF8] ${
                  active
                    ? "bg-[#123C35] text-[#FFFDF8] shadow-sm"
                    : "bg-transparent text-[#123C35] hover:bg-[#F1E9D7]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Restrained edge treatments — never block interaction. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#1F2937]/12 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-xl shadow-[inset_0_0_120px_rgba(31,41,55,0.10)]"
        aria-hidden
      />

      {/* Loading state — quiet, no large spinner. */}
      {!loaded && !hasError ? (
        <div
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-[#FBF7EE]/85 text-[11px] font-medium uppercase tracking-[0.28em] text-[#8A8475]"
          role="status"
        >
          Composing the city view
          <span className="hcmc-map-progress" aria-hidden />
        </div>
      ) : null}

      {/* Map-error state — no technical detail exposed. */}
      {hasError ? (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center bg-[#FBF7EE] p-6 text-center text-sm text-[#6B7280]"
          role="alert"
        >
          The map could not be displayed right now. Please try again shortly.
        </div>
      ) : null}
    </div>
  );
}

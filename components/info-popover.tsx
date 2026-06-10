"use client";

import { useEffect, useId, useRef, useState } from "react";

type InfoPopoverProps = {
  // Accessible label for the trigger button and the popover content.
  label: string;
  // Disclosure text shown in the popover.
  content: string;
};

// Small accessible information popover. Supports mouse hover, keyboard focus,
// tap/click, Escape to close, a visible focus ring and ARIA wiring.
export function InfoPopover({ label, content }: InfoPopoverProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      ref={containerRef}
    >
      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={label}
        className="premium-focus-ring flex h-5 w-5 items-center justify-center rounded-full border border-[#D8CDAF] bg-white text-[10px] font-semibold text-[#A9851D] transition hover:border-[#E7B93D] hover:bg-[#FFF8E8]"
        onClick={() => setOpen((current) => !current)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        type="button"
      >
        i
      </button>
      {open ? (
        <span
          className="absolute right-0 top-7 z-20 w-64 rounded-sm border border-[#ECE7DA] bg-white p-3 text-xs font-normal normal-case leading-5 tracking-normal text-[#4B5563] shadow-xl"
          id={panelId}
          role="tooltip"
        >
          {content}
        </span>
      ) : null}
    </span>
  );
}

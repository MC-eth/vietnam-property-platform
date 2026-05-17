export function WhatsAppButton() {
  return (
    <a
      aria-label="Contact advisor on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#123c2b] px-5 text-sm font-semibold text-white shadow-xl shadow-[#123c2b]/25 transition hover:bg-[#0d2d20]"
      href="https://wa.me/85200000000?text=I%20would%20like%20to%20discuss%20Vietnam%20property%20investment"
      rel="noreferrer"
      target="_blank"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-[#123c2b]">
        W
      </span>
      WhatsApp
    </a>
  );
}

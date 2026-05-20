import Link from "next/link";
import { CURRENCIES } from "@/constants";

const navItems = [
  { href: "/properties", label: "Properties" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/services", label: "Services" },
  { href: "/learn", label: "Learn" },
  { href: "/enquiry", label: "Enquiry" },
  { href: "/owner-portal", label: "Owner Portal" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e6e0d6] bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link className="flex items-center gap-3" href="/" aria-label="VietInvest home">
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#123c2b] text-sm font-semibold text-white">
            VI
          </span>
          <span className="text-base font-semibold text-[#16231d] sm:text-lg">
            VietInvest Property
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-[#5b645f] xl:flex">
          {navItems.map((item) => (
            <Link className="transition hover:text-[#123c2b]" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Toggle label="EN" active />
          <Toggle label="繁" />
          <span className="mx-1 h-6 w-px bg-[#e1dbd0]" />
          {CURRENCIES.map((currency) => (
            <Toggle active={currency === "USD"} key={currency} label={currency} />
          ))}
        </div>

        <Link
          className="inline-flex min-h-11 items-center rounded-sm bg-[#ffdb4d] px-4 text-sm font-semibold text-[#17231d] transition hover:bg-[#f1c936]"
          href="/enquiry"
        >
          Advisor
        </Link>
      </div>
    </header>
  );
}

function Toggle({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      className={`min-h-9 rounded-sm px-3 text-xs font-semibold transition ${
        active
          ? "bg-[#123c2b] text-white"
          : "border border-[#e1dbd0] bg-white text-[#5b645f] hover:text-[#123c2b]"
      }`}
      type="button"
    >
      {label}
    </button>
  );
}

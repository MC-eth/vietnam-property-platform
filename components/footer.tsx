import Link from "next/link";

const footerLinks = [
  {
    group: "Platform",
    links: [
      { href: "/properties", label: "Browse properties" },
      { href: "/services", label: "Services" },
      { href: "/learn", label: "Learn" },
      { href: "/enquiry", label: "Buyer enquiry" },
    ],
  },
  {
    group: "Markets",
    links: [
      { href: "/properties", label: "Ho Chi Minh City" },
      { href: "/properties", label: "Hanoi" },
      { href: "/owner-portal", label: "Owner portal" },
    ],
  },
  {
    group: "Internal",
    links: [
      { href: "/admin", label: "Admin dashboard" },
      { href: "/services", label: "Agent matching" },
      { href: "/services", label: "Rental management" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#e6e0d6] bg-[#101c16] px-5 py-12 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3" aria-label="VietInvest home">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/35 text-sm font-semibold">
              VI
            </span>
            <span className="text-lg font-semibold">VietInvest Property</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/62">
            A front-end MVP for international buyers exploring residential
            investments in Ho Chi Minh City and Hanoi.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerLinks.map(({ group, links }) => (
            <div key={group}>
              <h2 className="text-sm font-semibold text-[#d7bd7d]">{group}</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/66">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link className="transition hover:text-white" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/48 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 VietInvest Property. All rights reserved.</p>
        <p>Mock platform only. No backend, CRM, or authentication connected.</p>
      </div>
    </footer>
  );
}

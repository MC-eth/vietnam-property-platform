export function RentalManagementCta() {
  return (
    <section className="px-5 pb-20 sm:px-8 lg:pb-28" id="management">
      <div className="mx-auto max-w-7xl overflow-hidden bg-[#143b2c] text-white">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div
            className="min-h-80 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80')",
            }}
            role="img"
            aria-label="Premium managed apartment interior"
          />
          <div className="p-8 sm:p-10 lg:p-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d7bd7d]">
              Rental management
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Turn ownership into a professionally managed asset.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78">
              From furnishing and tenant placement to monthly owner reporting,
              the management layer is built for overseas investors who need
              visibility without day-to-day involvement.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Tenant sourcing", "Owner statements", "Maintenance care"].map(
                (item) => (
                  <div className="border border-white/18 p-4" key={item}>
                    <p className="text-sm font-semibold">{item}</p>
                  </div>
                ),
              )}
            </div>
            <a
              className="mt-8 inline-flex min-h-12 items-center bg-[#fbf7ef] px-6 text-sm font-semibold text-[#143b2c] transition hover:bg-white"
              href="#"
            >
              Plan rental strategy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const dealSteps = [
  { title: "Enquiry received", status: "Complete" },
  { title: "Advisor qualification", status: "Complete" },
  { title: "Property shortlist", status: "In progress" },
  { title: "Legal and quota review", status: "Next" },
  { title: "Reservation and payment", status: "Next" },
  { title: "Rental setup", status: "Future" },
];

export function DealProgressTracker() {
  return (
    <section className="rounded-sm border border-[#e1dbd0] bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a47d32]">
        Buyer deal tracker
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-[#16231d]">
        Mock progress view for overseas buyers.
      </h2>
      <div className="mt-6 grid gap-3">
        {dealSteps.map((step, index) => (
          <div
            className="flex items-center gap-4 rounded-sm border border-[#eee8de] bg-[#fbfaf7] p-4"
            key={step.title}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                step.status === "Complete"
                  ? "bg-[#123c2b] text-white"
                  : step.status === "In progress"
                    ? "bg-[#d7bd7d] text-[#16231d]"
                    : "bg-white text-[#6d746f]"
              }`}
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-[#16231d]">{step.title}</p>
              <p className="mt-1 text-sm text-[#6d746f]">{step.status}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

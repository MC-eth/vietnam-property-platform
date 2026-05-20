import {
  BUDGET_RANGES,
  BUYER_TIMELINES,
  CITIES,
  FUNDING_SOURCES,
  INVESTMENT_GOALS,
  RENTAL_MANAGEMENT_OPTIONS,
} from "@/constants";

export function EnquiryForm() {
  return (
    <form className="grid gap-5 rounded-sm border border-[#e1dbd0] bg-white p-5 shadow-sm sm:p-8">
      {/* Connect this form to a CRM, email workflow, or API route when the backend is ready. */}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" name="fullName" />
        <Field label="Email" name="email" type="email" />
        <Field label="WhatsApp / phone" name="phone" type="tel" />
        <Field label="Country of residence" name="country" />
        <Select
          label="Budget range"
          name="budget"
          options={BUDGET_RANGES}
        />
        <Select
          label="Target city"
          name="city"
          options={[...CITIES, "Both cities"]}
        />
        <Select
          label="Investment goal"
          name="goal"
          options={INVESTMENT_GOALS}
        />
        <Select
          label="Timeline to buy"
          name="timeline"
          options={BUYER_TIMELINES}
        />
        <Select
          label="Funding source"
          name="fundingSource"
          options={FUNDING_SOURCES}
        />
        <Select
          label="Need rental management?"
          name="rentalManagement"
          options={RENTAL_MANAGEMENT_OPTIONS}
        />
      </div>
      <label className="grid gap-2 text-sm font-semibold text-[#4f5a54]">
        Message
        <textarea
          className="min-h-32 rounded-sm border border-[#d8d1c5] bg-white px-3 py-3 font-normal outline-none focus:border-[#123c2b] focus:ring-2 focus:ring-[#123c2b]/15"
          name="message"
          placeholder="Tell us about your target location, budget, and investment plans."
        />
      </label>
      <button
        className="min-h-12 rounded-sm bg-[#123c2b] px-6 text-sm font-semibold text-white transition hover:bg-[#0d2d20] sm:w-fit"
        type="button"
      >
        Submit Enquiry
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#4f5a54]">
      {label}
      <input
        className="min-h-11 rounded-sm border border-[#d8d1c5] bg-white px-3 font-normal outline-none focus:border-[#123c2b] focus:ring-2 focus:ring-[#123c2b]/15"
        name={name}
        type={type}
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: readonly string[];
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#4f5a54]">
      {label}
      <select
        className="min-h-11 rounded-sm border border-[#d8d1c5] bg-white px-3 font-normal outline-none focus:border-[#123c2b] focus:ring-2 focus:ring-[#123c2b]/15"
        name={name}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

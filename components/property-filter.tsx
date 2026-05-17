export function PropertyFilter() {
  return (
    <form className="grid gap-3 rounded-sm border border-[#e1dbd0] bg-white p-4 shadow-sm md:grid-cols-4">
      <label className="grid gap-2 text-sm font-semibold text-[#4f5a54]">
        City
        <select className="min-h-11 rounded-sm border border-[#d8d1c5] bg-white px-3 font-normal">
          <option>All cities</option>
          <option>Ho Chi Minh City</option>
          <option>Hanoi</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[#4f5a54]">
        Budget
        <select className="min-h-11 rounded-sm border border-[#d8d1c5] bg-white px-3 font-normal">
          <option>Any budget</option>
          <option>Under USD 200k</option>
          <option>USD 200k - 400k</option>
          <option>USD 400k+</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[#4f5a54]">
        Status
        <select className="min-h-11 rounded-sm border border-[#d8d1c5] bg-white px-3 font-normal">
          <option>Any status</option>
          <option>Completed</option>
          <option>Under construction</option>
          <option>Off-plan</option>
        </select>
      </label>
      <button
        className="min-h-11 self-end rounded-sm bg-[#123c2b] px-4 text-sm font-semibold text-white transition hover:bg-[#0d2d20]"
        type="button"
      >
        Filter Properties
      </button>
    </form>
  );
}

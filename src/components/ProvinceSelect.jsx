import { PROVINCES } from "../data/locations";

/**
 * Province selector used at SEARCH level (Home + top search bar on Find Jobs).
 * This defines the search scope — a separate, narrower City filter is used
 * later to refine results. Do not confuse the two.
 */
export default function ProvinceSelect({ value, onChange, className = "", id = "province-select" }) {
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">
        Province
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-full w-full cursor-pointer appearance-none rounded-lg border border-border-default bg-white pl-3.5 pr-9 py-3 text-sm font-medium text-navy-800 hover:border-navy-400 focus-visible:border-accent-500 transition-colors"
      >
        {PROVINCES.map((province) => (
          <option key={province} value={province}>
            {province}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy-500"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

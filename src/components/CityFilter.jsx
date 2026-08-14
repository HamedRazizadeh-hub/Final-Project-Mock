import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, MapPin, Search } from "lucide-react";
import { ALL_NETHERLANDS } from "../data/locations";

/**
 * City refinement filter. City is a RESULT filter, distinct from Province
 * (the search scope selected on the search bar). When the search scope was
 * a single province, this only lists that province's cities. When the scope
 * was "All Netherlands", the list covers every Dutch city and is searchable.
 *
 * Renders as an absolute overlay so opening it never pushes the results
 * below it down the page.
 */
export default function CityFilter({ province, city, cities, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef(null);
  const inputRef = useRef(null);

  const scopedToProvince = province !== ALL_NETHERLANDS;
  const allCitiesLabel = scopedToProvince ? `All cities in ${province}` : "All cities";

  const filteredCities = useMemo(() => {
    if (!query.trim()) return cities;
    const q = query.trim().toLowerCase();
    return cities.filter((c) => c.toLowerCase().includes(q));
  }, [cities, query]);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    if (!scopedToProvince) {
      // searchable dropdown — focus the search input on open
      requestAnimationFrame(() => inputRef.current?.focus());
    }
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, scopedToProvince]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const isActive = Boolean(city);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "border-accent-200 bg-accent-50 text-accent-700"
            : "border-border-default bg-white text-navy-700 hover:border-navy-400"
        }`}
      >
        <MapPin size={14} className={isActive ? "text-accent-600" : "text-navy-500"} />
        <span className="text-navy-500 font-normal">City:</span>
        {city || allCitiesLabel}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 w-72 rounded-xl border border-border-subtle bg-white shadow-popover">
          {!scopedToProvince && (
            <div className="border-b border-border-subtle p-2">
              <div className="relative">
                <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search city..."
                  className="w-full rounded-lg border border-border-subtle bg-surface-muted py-2 pl-8 pr-3 text-sm text-navy-900 placeholder:text-navy-400 focus-visible:border-accent-500"
                />
              </div>
            </div>
          )}

          <div role="listbox" className="max-h-64 overflow-y-auto scrollbar-thin p-1.5">
            <button
              type="button"
              role="option"
              aria-selected={!isActive}
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium text-navy-800 hover:bg-surface-alt"
            >
              {allCitiesLabel}
            </button>

            {filteredCities.length === 0 && (
              <p className="px-3 py-4 text-center text-sm text-navy-500">No cities match "{query}"</p>
            )}

            {filteredCities.map((c) => (
              <button
                key={c}
                type="button"
                role="option"
                aria-selected={city === c}
                onClick={() => {
                  onChange(c);
                  setOpen(false);
                }}
                className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm hover:bg-surface-alt ${
                  city === c ? "bg-accent-50 text-accent-700 font-medium" : "text-navy-800"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

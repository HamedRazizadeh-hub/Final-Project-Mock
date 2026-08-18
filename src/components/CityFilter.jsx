import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, MapPin, Search } from "lucide-react";
import { ALL_LOCATIONS } from "../data/locations";

export default function CityFilter({ location, locations, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef(null);
  const inputRef = useRef(null);

  const filteredLocations = useMemo(() => {
    if (!query.trim()) return locations;
    const q = query.trim().toLowerCase();
    return locations.filter((item) => item.toLowerCase().includes(q));
  }, [locations, query]);

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
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const isActive = Boolean(location);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "border-accent-200 bg-accent-50 text-accent-700"
            : "border-border-default bg-white text-navy-700 hover:border-accent-300"
        }`}
      >
        <MapPin size={14} className={isActive ? "text-accent-600" : "text-navy-500"} />
        <span className="font-normal text-navy-500">Location:</span>
        {location || ALL_LOCATIONS}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 w-72 rounded-xl border border-border-subtle bg-white shadow-popover">
          <div className="border-b border-border-subtle p-2">
            <div className="relative">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city or location"
                className="w-full rounded-lg border border-border-subtle bg-surface-muted py-2 pl-8 pr-3 text-sm text-navy-900 placeholder:text-navy-400 focus-visible:border-accent-500"
              />
            </div>
          </div>

          <div role="listbox" className="max-h-64 overflow-y-auto p-1.5 scrollbar-thin">
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
              {ALL_LOCATIONS}
            </button>

            {filteredLocations.length === 0 && (
              <p className="px-3 py-4 text-center text-sm text-navy-500">No locations match "{query}"</p>
            )}

            {filteredLocations.map((item) => (
              <button
                key={item}
                type="button"
                role="option"
                aria-selected={location === item}
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                }}
                className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm hover:bg-surface-alt ${
                  location === item ? "bg-accent-50 font-medium text-accent-700" : "text-navy-800"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

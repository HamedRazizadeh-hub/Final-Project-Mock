import { MapPin, Search } from "lucide-react";
import { LOCATIONS } from "../data/locations";

export default function SearchBar({
  keyword,
  onKeywordChange,
  location,
  onLocationChange,
  onSubmit,
  size = "lg",
  showLocation = true,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const isLarge = size === "lg";

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col gap-2.5 rounded-3xl border border-white/70 bg-white/95 shadow-[0_24px_60px_-30px_rgb(15_23_42/0.45)] ring-1 ring-accent-100/70 backdrop-blur md:flex-row md:items-center md:gap-2 ${
        isLarge ? "p-3" : "p-2"
      }`}
      role="search"
      aria-label="Job search"
    >
      <SearchField
        id="job-keyword"
        icon={Search}
        label="Job title, keyword or skill"
        value={keyword}
        onChange={onKeywordChange}
        placeholder="Job title, keyword or skill"
        isLarge={isLarge}
      />

      {showLocation && (
        <>
          <div className="h-px w-full bg-border-subtle md:h-10 md:w-px" aria-hidden="true" />

          <SearchField
            id="job-location"
            icon={MapPin}
            label="City or location"
            value={location}
            onChange={onLocationChange}
            placeholder="City or location"
            isLarge={isLarge}
            list="jobmatch-location-suggestions"
          />

          <datalist id="jobmatch-location-suggestions">
            {LOCATIONS.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
        </>
      )}

      <button
        type="submit"
        className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-600 font-semibold text-white shadow-[0_14px_30px_-16px_rgb(31_86_196/0.9)] transition-colors hover:bg-accent-700 active:bg-accent-600 ${
          isLarge ? "px-6 py-3.5 text-base" : "px-5 py-2.5 text-sm"
        }`}
      >
        <Search size={16} />
        Search Jobs
      </button>
    </form>
  );
}

function SearchField({
  id,
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  isLarge,
  list,
}) {
  return (
    <div className="relative flex-1">
      <Icon
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-accent-600"
      />
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        list={list}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-2xl border border-transparent bg-surface-muted pl-11 pr-3 text-navy-900 outline-none transition-colors placeholder:text-navy-400 focus-visible:border-accent-500 focus-visible:bg-white ${
          isLarge ? "py-3.5 text-base" : "py-2.5 text-sm"
        }`}
      />
    </div>
  );
}

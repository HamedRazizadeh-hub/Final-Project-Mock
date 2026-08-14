import { Search } from "lucide-react";
import ProvinceSelect from "./ProvinceSelect";

/**
 * Primary search control: keyword + Province (search scope) + Search button.
 * Used on the Home hero and, in compact form, at the top of Find Jobs.
 */
export default function SearchBar({
  keyword,
  onKeywordChange,
  province,
  onProvinceChange,
  onSubmit,
  size = "lg",
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const isLarge = size === "lg";

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col gap-2.5 rounded-2xl border border-border-subtle bg-white shadow-card md:flex-row md:items-center md:gap-2 ${
        isLarge ? "p-2.5" : "p-2"
      }`}
      role="search"
      aria-label="Job search"
    >
      <div className="relative flex-1">
        <Search
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400"
        />
        <label htmlFor="job-keyword" className="sr-only">
          Job title, skill or keyword
        </label>
        <input
          id="job-keyword"
          type="text"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="Job title, skill or keyword"
          className={`w-full rounded-xl border border-transparent bg-surface-muted pl-10 pr-3 text-navy-900 placeholder:text-navy-400 focus-visible:border-accent-500 focus-visible:bg-white transition-colors ${
            isLarge ? "py-3.5 text-base" : "py-2.5 text-sm"
          }`}
        />
      </div>

      <div className="h-px w-full bg-border-subtle md:h-9 md:w-px" aria-hidden="true" />

      <ProvinceSelect
        value={province}
        onChange={onProvinceChange}
        className={`md:w-56 ${isLarge ? "" : "text-sm"}`}
      />

      <button
        type="submit"
        className={`inline-flex items-center justify-center gap-2 rounded-xl bg-navy-900 font-semibold text-white transition-colors hover:bg-navy-800 active:bg-navy-900 ${
          isLarge ? "px-6 py-3.5 text-base" : "px-5 py-2.5 text-sm"
        }`}
      >
        <Search size={16} className="md:hidden" />
        Search Jobs
      </button>
    </form>
  );
}

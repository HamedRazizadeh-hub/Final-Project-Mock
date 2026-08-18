import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RotateCcw, SlidersHorizontal, AlertTriangle, SearchX, ChevronDown } from "lucide-react";
import SearchBar from "../components/SearchBar";
import CityFilter from "../components/CityFilter";
import FilterDropdown from "../components/FilterDropdown";
import JobList from "../components/JobList";
import JobPreview from "../components/JobPreview";
import MatchExplanation from "../components/MatchExplanation";
import EmptyState from "../components/EmptyState";
import { JobListSkeleton } from "../components/LoadingSkeleton";
import { JOBS } from "../data/jobs";
import { LOCATIONS } from "../data/locations";
import { JOB_TYPES, WORK_MODES, EXPERIENCE_LEVELS, SORT_OPTIONS } from "../data/filters";
import { searchJobs } from "../utils/searchJobs";
import { useApp } from "../context/AppContext";

const ALL = "All";

export default function FindJobs() {
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useApp();

  const [keyword, setKeyword] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || searchParams.get("city") || "");
  const [jobType, setJobType] = useState(ALL);
  const [workMode, setWorkMode] = useState(ALL);
  const [experienceLevel, setExperienceLevel] = useState(ALL);
  const [sort, setSort] = useState("relevant");
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [explainJob, setExplainJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [demoState, setDemoState] = useState("normal");
  const [demoOpen, setDemoOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const PAGE_SIZE = 10;

  const sortRef = useRef(null);
  const demoRef = useRef(null);

  useEffect(() => {
    setKeyword(searchParams.get("q") || "");
    setLocation(searchParams.get("location") || searchParams.get("city") || "");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    setVisibleCount(PAGE_SIZE);
    const t = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(t);
  }, [keyword, location, jobType, workMode, experienceLevel, sort]);

  useEffect(() => {
    if (!sortOpen && !demoOpen) return;
    const onClick = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
      if (demoRef.current && !demoRef.current.contains(e.target)) setDemoOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [sortOpen, demoOpen]);

  const results = useMemo(
    () => searchJobs(JOBS, { keyword, location, jobType, workMode, experienceLevel, sort }),
    [keyword, location, jobType, workMode, experienceLevel, sort],
  );

  useEffect(() => {
    if (results.length === 0) {
      setSelectedJobId(null);
      return;
    }
    if (!results.some((job) => job.id === selectedJobId)) {
      setSelectedJobId(results[0].id);
    }
  }, [results, selectedJobId]);

  const selectedJob = results.find((job) => job.id === selectedJobId) || null;
  const hasActiveFilters = Boolean(location) || jobType !== ALL || workMode !== ALL || experienceLevel !== ALL;

  const clearFilters = () => {
    setLocation("");
    setJobType(ALL);
    setWorkMode(ALL);
    setExperienceLevel(ALL);
  };

  const locationLabel = location || "your selected location";
  const effectiveState = demoState !== "normal" ? demoState : isLoading ? "loading" : results.length === 0 ? "empty" : "ready";

  return (
    <div className="bg-[linear-gradient(180deg,#eef6ff_0%,#f7f9fc_280px,#f7f9fc_100%)]">
      <div className="container-app py-8">
        <SearchBar
          keyword={keyword}
          onKeywordChange={setKeyword}
          location={location}
          onLocationChange={setLocation}
          onSubmit={() => {}}
          size="sm"
        />

        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <span className="hidden items-center gap-1.5 text-sm font-medium text-navy-500 sm:inline-flex">
            <SlidersHorizontal size={14} />
            Filters:
          </span>
          <CityFilter location={location} locations={LOCATIONS} onChange={setLocation} />
          <FilterDropdown label="Work type" value={workMode} options={WORK_MODES} onChange={setWorkMode} allLabel={ALL} />
          <FilterDropdown
            label="Experience"
            value={experienceLevel}
            options={EXPERIENCE_LEVELS}
            onChange={setExperienceLevel}
            allLabel={ALL}
          />
          <FilterDropdown label="Job type" value={jobType} options={JOB_TYPES} onChange={setJobType} allLabel={ALL} />
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-500 transition-colors hover:bg-white/70 hover:text-navy-900"
            >
              <RotateCcw size={14} />
              Clear filters
            </button>
          )}

          <div className="relative ml-auto" ref={demoRef}>
            <button
              type="button"
              onClick={() => setDemoOpen((o) => !o)}
              className="inline-flex items-center gap-1 rounded-lg border border-dashed border-border-default bg-white/60 px-2.5 py-1.5 text-xs font-medium text-navy-400 hover:text-navy-600"
            >
              Preview state
              <ChevronDown size={12} />
            </button>
            {demoOpen && (
              <div className="absolute right-0 top-full z-30 mt-1.5 w-40 rounded-lg border border-border-subtle bg-white p-1 shadow-popover">
                {[
                  ["normal", "Normal"],
                  ["loading", "Loading"],
                  ["empty", "No results"],
                  ["error", "Error"],
                ].map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setDemoState(val);
                      setDemoOpen(false);
                    }}
                    className={`block w-full rounded-md px-2.5 py-1.5 text-left text-xs ${
                      demoState === val ? "bg-accent-50 text-accent-700" : "text-navy-600 hover:bg-surface-alt"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-700">
              {isAuthenticated ? "Personalized search" : "Public job search"}
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-navy-900">Find jobs</h1>
            <p className="mt-1 text-sm text-navy-600">
              {effectiveState === "ready" || effectiveState === "loading"
                ? `${results.length} job${results.length === 1 ? "" : "s"} found`
                : "Search by keyword, skill, title, or city."}
            </p>
          </div>
          <div className="relative" ref={sortRef}>
            <button
              type="button"
              onClick={() => setSortOpen((o) => !o)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-700 hover:text-navy-900"
            >
              Sort by: <span className="text-navy-900">{SORT_OPTIONS.find((o) => o.value === sort)?.label}</span>
              <ChevronDown size={14} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full z-30 mt-2 w-48 rounded-xl border border-border-subtle bg-white p-1.5 shadow-popover">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setSort(opt.value);
                      setSortOpen(false);
                    }}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                      sort === opt.value ? "bg-accent-50 font-medium text-accent-700" : "text-navy-800 hover:bg-surface-alt"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <div>
            {effectiveState === "loading" && <JobListSkeleton count={5} />}

            {effectiveState === "error" && (
              <EmptyState
                icon={AlertTriangle}
                tone="error"
                title="We couldn't load jobs right now."
                description="Something went wrong on our end. Try again in a moment."
                actions={
                  <button
                    type="button"
                    onClick={() => setDemoState("normal")}
                    className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
                  >
                    Try again
                  </button>
                }
              />
            )}

            {effectiveState === "empty" && (
              <EmptyState
                icon={SearchX}
                title="No jobs match your current filters."
                description={`We couldn't find jobs matching ${locationLabel}. Try a different city, broader keyword, or fewer filters.`}
                actions={
                  <>
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
                    >
                      Clear filters
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocation("")}
                      className="rounded-lg border border-border-default bg-white px-4 py-2 text-sm font-semibold text-navy-700 hover:bg-surface-alt"
                    >
                      Search all locations
                    </button>
                  </>
                }
              />
            )}

            {effectiveState === "ready" && (
              <>
                <JobList
                  jobs={results.slice(0, visibleCount)}
                  selectedId={selectedJobId}
                  onSelect={(job) => setSelectedJobId(job.id)}
                />
                {visibleCount < results.length && (
                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                      className="rounded-lg border border-border-default bg-white px-5 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-surface-alt"
                    >
                      Load more jobs ({results.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div>
            {effectiveState === "ready" && selectedJob && (
              <JobPreview job={selectedJob} onWhyThisMatch={setExplainJob} />
            )}
          </div>
        </div>

        {explainJob && isAuthenticated && <MatchExplanation job={explainJob} onClose={() => setExplainJob(null)} />}
      </div>
    </div>
  );
}

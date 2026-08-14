import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Search, RotateCcw } from "lucide-react";
import JobCard from "../components/JobCard";
import EmptyState from "../components/EmptyState";
import FilterDropdown from "../components/FilterDropdown";
import ApplicationStatusControl from "../components/ApplicationStatusControl";
import { useApp, APPLICATION_STATUS_LABELS } from "../context/AppContext";
import { JOBS } from "../data/jobs";
import { JOB_TYPES } from "../data/filters";

const ALL = "All";
const STATUS_OPTIONS = Object.values(APPLICATION_STATUS_LABELS); // ["Not applied", "Applied", "Rejected"]
const SORT_OPTIONS = ["Recently saved", "Recently posted"];
const SORT_ALL_LABEL = "Best match";

export default function SavedJobs() {
  const navigate = useNavigate();
  const { savedIds, getApplicationStatus, setApplicationStatus, getSavedAt } = useApp();

  // These filters live in local component state; there's no need to persist
  // them across visits — Saved Jobs is meant to be re-triaged fresh each time.
  const [statusFilter, setStatusFilter] = useState(ALL);
  const [jobTypeFilter, setJobTypeFilter] = useState(ALL);
  const [sort, setSort] = useState(SORT_ALL_LABEL);

  const savedJobs = JOBS.filter((job) => savedIds.includes(job.id));

  const filtered = useMemo(() => {
    let list = savedJobs;

    if (statusFilter !== ALL) {
      list = list.filter((job) => APPLICATION_STATUS_LABELS[getApplicationStatus(job.id)] === statusFilter);
    }
    if (jobTypeFilter !== ALL) {
      list = list.filter((job) => job.employmentType === jobTypeFilter);
    }

    const sorted = [...list];
    if (sort === "Recently saved") {
      sorted.sort((a, b) => new Date(getSavedAt(b.id) || 0) - new Date(getSavedAt(a.id) || 0));
    } else if (sort === "Recently posted") {
      sorted.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    } else {
      // Best match (default)
      sorted.sort((a, b) => (b.matchScore ?? -1) - (a.matchScore ?? -1));
    }
    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedJobs, statusFilter, jobTypeFilter, sort]);

  const hasActiveFilters = statusFilter !== ALL || jobTypeFilter !== ALL;
  const clearFilters = () => {
    setStatusFilter(ALL);
    setJobTypeFilter(ALL);
  };

  return (
    <div className="container-app py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-navy-900">Saved Jobs</h1>
          <p className="mt-1 text-sm text-navy-600">
            {savedJobs.length > 0
              ? `You have ${savedJobs.length} saved job${savedJobs.length === 1 ? "" : "s"}.`
              : "Jobs you save will show up here so you can compare them later."}
          </p>
        </div>
      </div>

      {savedJobs.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={Bookmark}
            title="No saved jobs yet"
            description="Browse jobs and tap Save on any listing to keep it here for later — nothing gets lost between sessions."
            actions={
              <button
                type="button"
                onClick={() => navigate("/jobs")}
                className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
              >
                <Search size={15} />
                Find jobs
              </button>
            }
          />
        </div>
      ) : (
        <>
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <FilterDropdown
              label="Status"
              value={statusFilter}
              options={STATUS_OPTIONS}
              onChange={setStatusFilter}
              allLabel={ALL}
            />
            <FilterDropdown
              label="Job type"
              value={jobTypeFilter}
              options={JOB_TYPES}
              onChange={setJobTypeFilter}
              allLabel={ALL}
            />
            <FilterDropdown
              label="Sort by"
              value={sort}
              options={SORT_OPTIONS}
              onChange={setSort}
              allLabel={SORT_ALL_LABEL}
            />
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-500 hover:text-navy-900 hover:bg-surface-alt transition-colors"
              >
                <RotateCcw size={14} />
                Clear filters
              </button>
            )}
            <span className="ml-auto text-sm text-navy-500">
              {filtered.length} of {savedJobs.length} shown
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                title="No saved jobs match these filters."
                description="Try a different status or job type, or clear your filters."
                actions={
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
                  >
                    Clear filters
                  </button>
                }
              />
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {filtered.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  variant="list"
                  onSelect={() => navigate(`/jobs/${job.id}`)}
                  footer={
                    <ApplicationStatusControl
                      status={getApplicationStatus(job.id)}
                      onChange={(status) => setApplicationStatus(job.id, status)}
                    />
                  }
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import MatchScore from "./MatchScore";
import JobTags from "./JobTags";
import SaveButton from "./SaveButton";
import SourceFreshness from "./SourceFreshness";
import { useApp } from "../context/AppContext";

export default function JobCard({ job, variant = "list", selected = false, onSelect, footer }) {
  const navigate = useNavigate();
  const { isAuthenticated, isSaved, toggleSaved } = useApp();
  const saved = isSaved(job.id);

  const meta = `${job.employmentType} - ${job.workMode}`;
  const matchUnavailable = (
    <span className="rounded-full bg-surface-alt px-2.5 py-1 text-xs font-medium text-navy-500">
      Match available after login
    </span>
  );

  const handleSave = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: `/jobs/${job.id}` } } });
      return;
    }

    toggleSaved(job.id);
  };

  if (variant === "wide") {
    return (
      <article
        className="group flex cursor-pointer flex-col rounded-2xl border border-border-subtle bg-white p-6 shadow-card transition-all duration-150 hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-card-hover"
        onClick={() => navigate(`/jobs/${job.id}`)}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-navy-900 transition-colors group-hover:text-accent-600">
              {job.title}
            </h3>
            <p className="mt-0.5 text-sm text-navy-600">{job.company}</p>
          </div>
          {isAuthenticated ? (
            <MatchScore score={job.matchScore} size="sm" showLabel={false} />
          ) : (
            matchUnavailable
          )}
        </div>

        <p className="mt-3 text-sm text-navy-600">
          {job.city}, Netherlands
          <span className="mx-1.5 text-navy-300">-</span>
          {meta}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <SourceFreshness postedAt={job.postedAt} updatedAt={job.updatedAt} source={job.source} showTrust />
          <SaveButton
            saved={isAuthenticated && saved}
            onToggle={handleSave}
            size="sm"
            variant="ghost"
            label={isAuthenticated ? undefined : "Log in to save"}
          />
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onSelect?.(job)}
      aria-selected={selected}
      className={`group cursor-pointer rounded-2xl border bg-white p-5 transition-all duration-150 ${
        selected
          ? "border-accent-400 shadow-card-hover ring-2 ring-accent-100"
          : "border-border-subtle hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-card"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold text-navy-900 transition-colors group-hover:text-accent-600">
            {job.title}
          </h3>
          <p className="mt-0.5 text-sm text-navy-600">{job.company}</p>
          <p className="mt-1 text-sm text-navy-500">
            {job.city}, Netherlands
            <span className="mx-1.5 text-navy-300">-</span>
            {meta}
          </p>
          <div className="mt-2.5">
            <JobTags tags={job.skills} />
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          {isAuthenticated ? (
            <MatchScore score={job.matchScore} size="sm" showLabel={false} />
          ) : (
            matchUnavailable
          )}
          <SaveButton
            saved={isAuthenticated && saved}
            onToggle={handleSave}
            size="sm"
            label={isAuthenticated ? undefined : "Log in to save"}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-3">
        <SourceFreshness postedAt={job.postedAt} updatedAt={job.updatedAt} source={job.source} showTrust />
      </div>

      {footer && <div className="mt-3">{footer}</div>}
    </article>
  );
}

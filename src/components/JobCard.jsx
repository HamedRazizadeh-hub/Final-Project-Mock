import { useNavigate } from "react-router-dom";
import MatchScore from "./MatchScore";
import JobTags from "./JobTags";
import SaveButton from "./SaveButton";
import SourceFreshness from "./SourceFreshness";
import { useApp } from "../context/AppContext";

/**
 * Core job card, used across Home (variant="wide"), Find Jobs results
 * (variant="list") and Saved Jobs (variant="list"). Keeping one component
 * avoids visual drift between pages.
 */
export default function JobCard({ job, variant = "list", selected = false, onSelect, footer }) {
  const navigate = useNavigate();
  const { isSaved, toggleSaved } = useApp();
  const saved = isSaved(job.id);

  const meta = `${job.employmentType} · ${job.workMode}`;

  if (variant === "wide") {
    return (
      <article
        className="group flex flex-col rounded-xl border border-border-subtle bg-white p-6 shadow-card transition-shadow duration-150 hover:shadow-card-hover cursor-pointer"
        onClick={() => navigate(`/jobs/${job.id}`)}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-navy-900 group-hover:text-accent-600 transition-colors">
              {job.title}
            </h3>
            <p className="mt-0.5 text-sm text-navy-600">{job.company}</p>
          </div>
          <MatchScore score={job.matchScore} size="sm" showLabel={false} />
        </div>

        <p className="mt-3 text-sm text-navy-600">
          {job.city}, Netherlands
          <span className="mx-1.5 text-navy-300">·</span>
          {meta}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <SourceFreshness postedAt={job.postedAt} updatedAt={job.updatedAt} source={job.source} />
          <SaveButton
            saved={saved}
            onToggle={() => toggleSaved(job.id)}
            size="sm"
            variant="ghost"
          />
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onSelect?.(job)}
      aria-selected={selected}
      className={`group cursor-pointer rounded-xl border bg-white p-5 transition-all duration-150 ${
        selected
          ? "border-accent-400 shadow-card ring-1 ring-accent-100"
          : "border-border-subtle hover:border-navy-300 hover:shadow-card"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold text-navy-900 group-hover:text-accent-600 transition-colors">
            {job.title}
          </h3>
          <p className="mt-0.5 text-sm text-navy-600">{job.company}</p>
          <p className="mt-1 text-sm text-navy-500">
            {job.city}, Netherlands
            <span className="mx-1.5 text-navy-300">·</span>
            {meta}
          </p>
          <div className="mt-2.5">
            <JobTags tags={job.skills} />
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <MatchScore score={job.matchScore} size="sm" showLabel={false} />
          <SaveButton saved={saved} onToggle={() => toggleSaved(job.id)} size="sm" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-3">
        <SourceFreshness postedAt={job.postedAt} updatedAt={job.updatedAt} source={job.source} />
      </div>

      {footer && <div className="mt-3">{footer}</div>}
    </article>
  );
}

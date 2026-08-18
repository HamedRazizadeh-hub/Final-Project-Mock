import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, MessageSquare } from "lucide-react";
import MatchScore from "./MatchScore";
import JobTags from "./JobTags";
import SaveButton from "./SaveButton";
import StarRating from "./StarRating";
import LockedFeature from "./LockedFeature";
import { useApp } from "../context/AppContext";

export default function JobPreview({ job, onWhyThisMatch }) {
  const navigate = useNavigate();
  const { isAuthenticated, isSaved, toggleSaved, getComments } = useApp();

  const reviews = useMemo(() => (job ? getComments(job.company) : []), [job, getComments]);
  const averageQuality = useMemo(() => {
    if (!reviews.length) return null;
    return reviews.reduce((sum, r) => sum + r.quality, 0) / reviews.length;
  }, [reviews]);

  if (!job) return null;

  const saved = isSaved(job.id);

  const handleSave = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: `/jobs/${job.id}` } } });
      return;
    }

    toggleSaved(job.id);
  };

  return (
    <div className="rounded-2xl border border-border-subtle bg-white p-6 shadow-card lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold text-navy-900">{job.title}</h2>
      <p className="mt-0.5 text-sm text-navy-600">{job.company}</p>
      <p className="mt-1 text-sm text-navy-500">
        {job.city}, Netherlands - {job.employmentType} - {job.workMode}
      </p>

      <div className="mt-2.5">
        {isAuthenticated ? (
          <MatchScore score={job.matchScore} size="md" />
        ) : (
          <LockedFeature
            title="Match available after login"
            message="Log in or create an account to see your match."
            compact
          />
        )}
      </div>

      <div className="mt-4 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => navigate(`/jobs/${job.id}`)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          View job
          <ArrowRight size={15} />
        </button>
        <SaveButton
          saved={isAuthenticated && saved}
          onToggle={handleSave}
          label={isAuthenticated ? undefined : "Log in"}
        />
      </div>

      {isAuthenticated ? (
        <button
          type="button"
          onClick={() => onWhyThisMatch(job)}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 hover:text-accent-700"
        >
          <Sparkles size={14} />
          Why this match?
        </button>
      ) : (
        <p className="mt-3 text-xs font-medium text-navy-500">
          Personalized match details unlock after login.
        </p>
      )}

      <div className="mt-5 border-t border-border-subtle pt-4">
        <h3 className="text-sm font-semibold text-navy-900">About the job</h3>
        <p className="mt-1.5 line-clamp-3 text-sm text-navy-600">{job.description}</p>
      </div>

      {job.requirements?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-navy-900">Requirements</h3>
          <ul className="mt-1.5 space-y-1">
            {job.requirements.slice(0, 4).map((req) => (
              <li key={req} className="flex items-start gap-2 text-sm text-navy-600">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-navy-400" />
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      {job.skills?.length > 0 && (
        <div className="mt-4">
          <JobTags tags={job.skills} max={5} />
        </div>
      )}

      <button
        type="button"
        onClick={() => navigate(`/jobs/${job.id}#reviews`)}
        className="mt-5 flex w-full items-center justify-between rounded-lg border border-border-subtle bg-surface-muted px-3.5 py-2.5 text-left transition-colors hover:bg-surface-alt"
      >
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-700">
          <MessageSquare size={14} />
          Company reviews
        </span>
        {isAuthenticated && averageQuality !== null ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-navy-600">
            <StarRating value={Math.round(averageQuality)} size={12} />
            {averageQuality.toFixed(1)} ({reviews.length})
          </span>
        ) : (
          <span className="text-xs text-navy-400">
            {isAuthenticated ? "No reviews yet" : "Locked"}
          </span>
        )}
      </button>
    </div>
  );
}

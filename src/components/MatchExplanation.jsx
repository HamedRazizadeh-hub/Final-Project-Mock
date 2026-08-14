import { useEffect, useRef } from "react";
import { X, Check, AlertTriangle } from "lucide-react";
import MatchScore from "./MatchScore";

const BREAKDOWN_LABELS = {
  skills: "Skills",
  experience: "Experience",
  language: "Language",
  location: "Location",
};

/**
 * "Why this match?" modal/drawer. Explains the match score transparently:
 * strong matches, possible gaps, and an optional numeric breakdown.
 * This is intentionally simple — a rubric, not a black-box AI score.
 */
export default function MatchExplanation({ job, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!job) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/50 p-0 sm:items-center sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="match-explanation-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-2xl sm:rounded-2xl bg-white p-6 shadow-popover outline-none max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-navy-500">Why this match?</p>
            <div id="match-explanation-title" className="mt-1">
              <MatchScore score={job.matchScore} size="lg" />
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-navy-500 hover:bg-surface-alt hover:text-navy-900"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-3 text-sm text-navy-600">
          This is an estimated compatibility score based on your profile and this job's requirements — not a
          guarantee. Update your profile to improve match accuracy.
        </p>

        {job.matchStrengths?.length > 0 && (
          <div className="mt-5">
            <h4 className="flex items-center gap-1.5 text-sm font-semibold text-navy-900">
              <Check size={15} className="text-success-600" />
              Strong matches
            </h4>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {job.matchStrengths.map((item) => (
                <li key={item} className="rounded-md bg-success-50 px-2.5 py-1 text-xs font-medium text-success-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {job.matchGaps?.length > 0 && (
          <div className="mt-4">
            <h4 className="flex items-center gap-1.5 text-sm font-semibold text-navy-900">
              <AlertTriangle size={15} className="text-warning-600" />
              Possible gaps
            </h4>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {job.matchGaps.map((item) => (
                <li key={item} className="rounded-md bg-warning-50 px-2.5 py-1 text-xs font-medium text-warning-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {job.matchBreakdown && (
          <div className="mt-5 border-t border-border-subtle pt-4">
            <h4 className="text-sm font-semibold text-navy-900">Match breakdown</h4>
            <div className="mt-3 space-y-2.5">
              {Object.entries(job.matchBreakdown).map(([key, value]) => (
                <div key={key}>
                  <div className="flex items-center justify-between text-xs text-navy-600">
                    <span>{BREAKDOWN_LABELS[key] || key}</span>
                    <span className="font-medium text-navy-900">{value}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-surface-alt">
                    <div
                      className="h-1.5 rounded-full bg-accent-500"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-navy-900 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

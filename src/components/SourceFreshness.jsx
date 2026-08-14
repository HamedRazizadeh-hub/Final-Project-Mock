import { Clock } from "lucide-react";

function timeAgo(isoString) {
  const then = new Date(isoString).getTime();
  const now = new Date("2026-08-13T09:00:00Z").getTime();
  const diffMs = Math.max(0, now - then);
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

/**
 * Shows "Posted X ago · Source" plus, optionally, a freshness/trust
 * indicator based on how recently the listing was updated.
 */
export default function SourceFreshness({ postedAt, updatedAt, source, showTrust = false, className = "" }) {
  const updatedHours = (new Date("2026-08-13T09:00:00Z") - new Date(updatedAt)) / (1000 * 60 * 60);
  let trust = { label: "Recently verified", tone: "success" };
  if (updatedHours > 72) trust = { label: "Not recently verified", tone: "warning" };
  else if (updatedHours > 24) trust = { label: "Verified this week", tone: "neutral" };

  const toneClasses = {
    success: "text-success-600 bg-success-50",
    warning: "text-warning-600 bg-warning-50",
    neutral: "text-navy-600 bg-surface-alt",
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 text-xs text-navy-600/80 ${className}`}>
      <span className="inline-flex items-center gap-1">
        <Clock size={13} />
        Posted {timeAgo(postedAt)} · {source}
      </span>
      {showTrust && (
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${toneClasses[trust.tone]}`}>
          {trust.label}
        </span>
      )}
    </div>
  );
}

export { timeAgo };

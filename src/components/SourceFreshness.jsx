import { Clock, ShieldCheck } from "lucide-react";

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

export default function SourceFreshness({ postedAt, updatedAt, source, showTrust = false, className = "" }) {
  const updatedHours = (new Date("2026-08-13T09:00:00Z") - new Date(updatedAt)) / (1000 * 60 * 60);
  let trust = { label: "Active listing", tone: "success" };
  if (updatedHours > 72) trust = { label: "Verify before applying", tone: "warning" };
  else if (updatedHours > 24) trust = { label: "Verified this week", tone: "neutral" };

  const toneClasses = {
    success: "text-success-600 bg-success-50 ring-success-600/15",
    warning: "text-warning-600 bg-warning-50 ring-warning-600/15",
    neutral: "text-navy-600 bg-surface-alt ring-border-subtle",
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 text-xs text-navy-600 ${className}`}>
      <span className="inline-flex items-center gap-1 rounded-full bg-surface-alt px-2 py-1">
        <Clock size={13} />
        Posted {timeAgo(postedAt)}
      </span>
      <span className="inline-flex items-center rounded-full bg-white px-2 py-1 font-medium ring-1 ring-border-subtle">
        Source: {source}
      </span>
      {showTrust && (
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium ring-1 ${toneClasses[trust.tone]}`}>
          <ShieldCheck size={12} />
          {trust.label}
        </span>
      )}
    </div>
  );
}

export { timeAgo };

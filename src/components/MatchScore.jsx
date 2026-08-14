/**
 * Circular/inline match percentage indicator. `size` controls the visual
 * weight so the same component reads well on a dense card or a details hero.
 * Falls back to a "Match unavailable" state when matchScore is missing.
 */
export default function MatchScore({ score, size = "md", showLabel = true }) {
  if (score === null || score === undefined) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-500">
        <span className="h-2 w-2 rounded-full bg-navy-300" aria-hidden="true" />
        Match unavailable
      </span>
    );
  }

  const tone = score >= 85 ? "high" : score >= 65 ? "mid" : "low";
  const toneClasses = {
    high: "text-success-600",
    mid: "text-accent-600",
    low: "text-navy-500",
  };
  const dotClasses = {
    high: "bg-success-600",
    mid: "bg-accent-500",
    low: "bg-navy-400",
  };

  const sizeClasses = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base";

  return (
    <span className={`inline-flex items-baseline gap-1.5 font-semibold ${toneClasses[tone]} ${sizeClasses}`}>
      <span className={`inline-block h-2 w-2 rounded-full ${dotClasses[tone]}`} aria-hidden="true" />
      {score}%{showLabel && <span className="font-medium text-navy-500 text-[0.7em]">Match</span>}
    </span>
  );
}

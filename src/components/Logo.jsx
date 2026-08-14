/**
 * JobMatch mark — two overlapping "job card" tiles (the job listing in navy,
 * your profile in accent blue), with a confirmed-match dot exactly where
 * they overlap. This isn't a metaphor bolted onto the brand after the
 * fact: the tile shape is literally the rounded-rectangle JobCard used
 * throughout the product, and the overlap *is* what "match %" means —
 * where your profile and a listing intersect. The green checkmark reuses
 * the same success color the app already uses for "high match" and
 * "still active" signals, so the mark and the product speak one visual
 * language. See the design-process writeup for the discarded alternatives
 * (briefcase, location pin, puzzle piece, target) and why each lost out.
 */
export default function Logo({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 88 88"
      className={className}
      role="img"
      aria-label="JobMatch logo"
    >
      {/* Colors are hardcoded to mirror the theme tokens in src/index.css
          (navy-900 / accent-500 / success-600) so this mark renders
          correctly even outside the Tailwind build (e.g. copied elsewhere). */}
      <rect x="12" y="12" width="42" height="42" rx="11" fill="#0d1220" />
      <rect x="34" y="34" width="42" height="42" rx="11" fill="#2f6feb" />
      <circle cx="44" cy="44" r="15" fill="#ffffff" />
      <path
        d="M37.5 44.5l4.5 4.5 8.5-8.5"
        fill="none"
        stroke="#12875a"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

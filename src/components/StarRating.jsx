import { Star } from "lucide-react";

/**
 * Star rating — read-only display (used on review cards / averages) or
 * interactive (used in the "Add a review" form when onChange is passed).
 */
export default function StarRating({ value = 0, onChange, size = 15, max = 5 }) {
  const interactive = Boolean(onChange);
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className={`inline-flex items-center gap-0.5 ${interactive ? "" : "pointer-events-none"}`} role={interactive ? "radiogroup" : undefined} aria-label={interactive ? "Company quality rating" : undefined}>
      {stars.map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          tabIndex={interactive ? 0 : -1}
          aria-label={interactive ? `${star} star${star === 1 ? "" : "s"}` : undefined}
          aria-pressed={interactive ? star <= value : undefined}
          onClick={interactive ? () => onChange(star) : undefined}
          className={interactive ? "cursor-pointer p-0.5 -m-0.5" : ""}
        >
          <Star
            size={size}
            className={star <= value ? "text-amber-500" : "text-navy-200"}
            fill={star <= value ? "currentColor" : "none"}
            strokeWidth={1.75}
          />
        </button>
      ))}
    </div>
  );
}

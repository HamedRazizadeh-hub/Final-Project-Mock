/**
 * Small pill list for job skills/technologies. Caps how many render inline
 * and shows a "+N" overflow indicator to keep cards visually consistent.
 */
export default function JobTags({ tags = [], max = 3, size = "sm" }) {
  if (!tags.length) return null;
  const visible = tags.slice(0, max);
  const remaining = tags.length - visible.length;

  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1";

  return (
    <ul className="flex flex-wrap items-center gap-1.5" aria-label="Relevant skills">
      {visible.map((tag) => (
        <li
          key={tag}
          className={`rounded-md bg-accent-50 text-accent-700 font-medium border border-accent-100 ${sizeClasses}`}
        >
          {tag}
        </li>
      ))}
      {remaining > 0 && (
        <li className={`rounded-md bg-surface-alt text-navy-600 font-medium border border-border-subtle ${sizeClasses}`}>
          +{remaining}
        </li>
      )}
    </ul>
  );
}

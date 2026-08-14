import { Bookmark } from "lucide-react";

/**
 * Reusable save/bookmark toggle used on job cards, the preview panel and the
 * job details page. Keeps a consistent visual + a11y contract everywhere.
 */
export default function SaveButton({ saved, onToggle, size = "md", variant = "default", className = "" }) {
  const sizes = {
    sm: "text-xs gap-1 px-2.5 py-1.5",
    md: "text-sm gap-1.5 px-3 py-2",
  };

  const base =
    "inline-flex items-center rounded-lg font-medium transition-colors duration-150 border cursor-pointer select-none";

  const variants = {
    default: saved
      ? "bg-accent-50 border-accent-200 text-accent-700 hover:bg-accent-100"
      : "bg-white border-border-default text-navy-700 hover:bg-surface-alt",
    ghost: saved
      ? "bg-accent-50 border-transparent text-accent-700 hover:bg-accent-100"
      : "bg-transparent border-transparent text-navy-600 hover:bg-surface-alt",
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved jobs" : "Save job"}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      <Bookmark size={size === "sm" ? 14 : 16} strokeWidth={2} fill={saved ? "currentColor" : "none"} />
      {saved ? "Saved" : "Save"}
    </button>
  );
}

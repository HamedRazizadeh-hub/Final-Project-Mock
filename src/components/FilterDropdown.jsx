import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

/**
 * Generic single-select filter dropdown (Job type, Work mode, Experience
 * level). Renders as an absolutely-positioned overlay so opening it never
 * shifts the results below.
 */
export default function FilterDropdown({ label, value, options, onChange, allLabel = "All" }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = value !== null && value !== undefined && value !== allLabel;
  const displayLabel = isActive ? value : allLabel;

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "border-accent-200 bg-accent-50 text-accent-700"
            : "border-border-default bg-white text-navy-700 hover:border-navy-400"
        }`}
      >
        <span className="text-navy-500 font-normal">{label}:</span>
        {displayLabel}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-full z-30 mt-2 w-56 rounded-xl border border-border-subtle bg-white p-1.5 shadow-popover"
        >
          <button
            type="button"
            role="option"
            aria-selected={!isActive}
            onClick={() => {
              onChange(allLabel);
              setOpen(false);
            }}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-navy-800 hover:bg-surface-alt"
          >
            {allLabel}
            {!isActive && <Check size={14} className="text-accent-600" />}
          </button>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={value === option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-navy-800 hover:bg-surface-alt"
            >
              {option}
              {value === option && <Check size={14} className="text-accent-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

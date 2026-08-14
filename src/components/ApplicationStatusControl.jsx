import { Circle, CheckCircle2, XCircle } from "lucide-react";
import { APPLICATION_STATUS_LABELS } from "../context/AppContext";

const OPTIONS = [
  { value: "not_applied", icon: Circle },
  { value: "applied", icon: CheckCircle2 },
  { value: "rejected", icon: XCircle },
];

const ACTIVE_CLASSES = {
  not_applied: "bg-navy-100 text-navy-700 border-navy-200",
  applied: "bg-success-50 text-success-600 border-success-600/30",
  rejected: "bg-warning-50 text-warning-600 border-warning-600/30",
};

/**
 * Segmented control letting the user mark a saved job's application
 * status. This is user-tracked state only — JobMatch never sees or
 * verifies whether an application actually happened on the employer site.
 */
export default function ApplicationStatusControl({ status, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="Application status"
      className="inline-flex items-center gap-1 rounded-lg border border-border-subtle bg-surface-muted p-1"
      onClick={(e) => e.stopPropagation()}
    >
      {OPTIONS.map(({ value, icon: Icon }) => {
        const active = status === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(value)}
            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
              active ? ACTIVE_CLASSES[value] : "border-transparent text-navy-500 hover:bg-white"
            }`}
          >
            <Icon size={13} />
            {APPLICATION_STATUS_LABELS[value]}
          </button>
        );
      })}
    </div>
  );
}

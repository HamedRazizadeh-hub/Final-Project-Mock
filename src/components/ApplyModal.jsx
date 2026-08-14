import { useEffect, useRef } from "react";
import { ExternalLink, X } from "lucide-react";

/**
 * MVP apply flow: JobMatch never hosts an application form. This confirms
 * the user is leaving the platform, then "continues" to a mock external
 * company page for the prototype.
 */
export default function ApplyModal({ job, onClose, onContinue }) {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-popover outline-none"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-50 text-accent-600">
            <ExternalLink size={18} />
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

        <h2 id="apply-modal-title" className="mt-4 text-lg font-semibold text-navy-900">
          You're leaving JobMatch
        </h2>
        <p className="mt-2 text-sm text-navy-600">
          You'll continue your application for <span className="font-medium text-navy-900">{job.title}</span> at{" "}
          <span className="font-medium text-navy-900">{job.company}</span> on the employer's website.
        </p>

        <div className="mt-6 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onContinue}
            className="w-full rounded-lg bg-navy-900 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
          >
            Continue to company site
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-border-default bg-white py-2.5 text-sm font-semibold text-navy-700 hover:bg-surface-alt transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

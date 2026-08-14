/**
 * Generic empty/error state block used across Find Jobs, Saved Jobs, etc.
 * Pass an icon component, a title, description, and up to two actions.
 */
export default function EmptyState({ icon: Icon, title, description, actions, tone = "neutral" }) {
  const iconTone = tone === "error" ? "bg-warning-50 text-warning-600" : "bg-surface-alt text-navy-500";

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-xl border border-dashed border-border-default bg-white">
      {Icon && (
        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${iconTone}`}>
          <Icon size={22} />
        </div>
      )}
      <h3 className="text-base font-semibold text-navy-900">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-navy-600">{description}</p>}
      {actions && <div className="mt-5 flex items-center gap-3">{actions}</div>}
    </div>
  );
}

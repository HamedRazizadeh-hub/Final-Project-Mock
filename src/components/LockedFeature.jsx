import { Lock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function LockedFeature({
  title,
  message,
  cta = "Log in or create an account",
  children,
  compact = false,
}) {
  const location = useLocation();

  return (
    <div className="relative overflow-hidden rounded-xl border border-border-subtle bg-surface-muted">
      {children && (
        <div className="pointer-events-none select-none opacity-45 blur-[2px]">
          {children}
        </div>
      )}

      <div className={`${children ? "absolute inset-0" : ""} flex items-center justify-center bg-white/75 p-4 backdrop-blur-[1px]`}>
        <div className={`max-w-sm text-center ${compact ? "space-y-2" : "space-y-3"}`}>
          <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-accent-50 text-accent-700">
            <Lock size={17} />
          </span>
          <div>
            <p className="text-sm font-semibold text-navy-900">{title}</p>
            {message && (
              <p className="mt-1 text-xs leading-5 text-navy-600">{message}</p>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              to="/login"
              state={{ from: location }}
              className="rounded-lg bg-navy-900 px-3 py-2 text-xs font-semibold text-white hover:bg-navy-800"
            >
              {cta}
            </Link>
            <Link
              to="/register"
              state={{ from: location }}
              className="rounded-lg border border-border-default bg-white px-3 py-2 text-xs font-semibold text-navy-700 hover:bg-surface-alt"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

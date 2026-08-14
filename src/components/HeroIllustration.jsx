import { Search, MapPin, CheckCircle2 } from "lucide-react";

/**
 * Hand-built hero graphic for the Home page — no stock photography, just a
 * composition of the product's own UI language (search bar, job rows,
 * match badge, location pin) so it reinforces the brand rather than
 * feeling like generic decoration.
 */
export default function HeroIllustration() {
  return (
    <div className="relative mx-auto h-[340px] w-full max-w-md sm:h-[400px]" aria-hidden="true">
      {/* Soft background blobs */}
      <div className="absolute -top-10 -right-6 h-56 w-56 rounded-full bg-accent-100 opacity-70 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-navy-100 opacity-60 blur-3xl" />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-6 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-navy-600) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Main "product" card */}
      <div className="absolute left-1/2 top-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 -rotate-2 rounded-2xl border border-border-subtle bg-white p-4 shadow-popover sm:w-[330px]">
        <div className="flex items-center gap-2 rounded-lg bg-surface-muted px-3 py-2.5">
          <Search size={14} className="text-navy-400" />
          <span className="text-xs text-navy-500">Frontend Developer</span>
        </div>

        <div className="mt-3 space-y-2.5">
          <MiniJobRow title="Frontend Developer" company="Tech Company · Utrecht" match={92} />
          <MiniJobRow title="UX Designer" company="Creative Studio · Amsterdam" match={85} />
          <MiniJobRow title="Data Analyst" company="FinTech Company · Rotterdam" match={78} />
        </div>
      </div>

      {/* Floating match badge */}
      <div className="absolute right-1 top-4 flex items-center gap-2 rounded-xl border border-border-subtle bg-white px-3.5 py-2.5 shadow-popover rotate-3 sm:right-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success-50 text-success-600">
          <CheckCircle2 size={17} />
        </span>
        <div>
          <p className="text-sm font-semibold leading-none text-navy-900">92%</p>
          <p className="text-[11px] leading-none text-navy-500 mt-0.5">Match</p>
        </div>
      </div>

      {/* Floating location pill */}
      <div className="absolute bottom-6 left-0 flex items-center gap-2 rounded-full border border-border-subtle bg-white px-3.5 py-2 shadow-popover sm:left-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-50 text-accent-600">
          <MapPin size={13} />
        </span>
        <span className="text-xs font-medium text-navy-700">Utrecht province</span>
      </div>
    </div>
  );
}

function MiniJobRow({ title, company, match }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border-subtle px-3 py-2.5">
      <div className="min-w-0">
        <p className="truncate text-[13px] font-medium text-navy-900">{title}</p>
        <p className="truncate text-[11px] text-navy-500">{company}</p>
      </div>
      <span className="shrink-0 rounded-md bg-success-50 px-1.5 py-0.5 text-[11px] font-semibold text-success-600">
        {match}%
      </span>
    </div>
  );
}

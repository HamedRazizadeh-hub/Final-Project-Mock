import { BriefcaseBusiness, CheckCircle2, Clock3, MapPin, Search, Sparkles, UserRound } from "lucide-react";

export default function HeroIllustration() {
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[460px] sm:h-[420px]" aria-hidden="true">
      <div className="absolute inset-4 rounded-[2rem] border border-white/70 bg-white/50 shadow-[0_30px_80px_-45px_rgb(15_23_42/0.55)]" />
      <div
        className="absolute inset-8 rounded-[1.75rem] opacity-60"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(31,86,196,0.22) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="absolute left-4 top-12 w-[220px] rounded-2xl border border-border-subtle bg-white p-4 shadow-popover sm:left-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-50 text-accent-700">
            <UserRound size={20} />
          </span>
          <div>
            <p className="text-sm font-semibold text-navy-950">Candidate profile</p>
            <p className="text-xs text-navy-500">React, UX, Remote</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {["React", "TypeScript", "Figma"].map((skill) => (
            <span key={skill} className="rounded-full bg-accent-50 px-2 py-1 text-[11px] font-semibold text-accent-700">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute right-2 top-6 rounded-2xl border border-success-600/15 bg-white px-4 py-3 shadow-popover sm:right-8">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-success-50 text-success-600">
            <CheckCircle2 size={20} />
          </span>
          <div>
            <p className="text-2xl font-semibold leading-none text-success-600">82%</p>
            <p className="mt-0.5 text-xs font-medium text-navy-500">Strong Match</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 w-[310px] -translate-x-1/2 rounded-3xl border border-border-subtle bg-white p-4 shadow-popover sm:w-[340px]">
        <div className="flex items-center gap-2 rounded-2xl bg-surface-muted px-3 py-2.5">
          <Search size={15} className="text-accent-600" />
          <span className="text-xs font-medium text-navy-600">Frontend Developer in Utrecht</span>
        </div>

        <div className="mt-4 rounded-2xl border border-accent-100 bg-accent-50/60 p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-navy-950">Frontend Developer</p>
              <p className="mt-0.5 truncate text-xs text-navy-500">Tech Company</p>
            </div>
            <span className="rounded-full bg-success-50 px-2.5 py-1 text-xs font-semibold text-success-600">
              82% Match
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium">
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-navy-600">
              <MapPin size={11} />
              Utrecht
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-navy-600">
              <BriefcaseBusiness size={11} />
              Hybrid
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-success-600">
              <Clock3 size={11} />
              Fresh listing
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 right-5 rounded-full border border-border-subtle bg-white px-3 py-2 text-xs font-semibold text-navy-700 shadow-card sm:right-10">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles size={13} className="text-accent-600" />
          Matched skills
        </span>
      </div>
    </div>
  );
}

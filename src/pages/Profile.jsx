import { Pencil, Lock } from "lucide-react";
import { PROFILE, COMING_LATER } from "../data/profile";

export default function Profile() {
  return (
    <div className="container-app py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-navy-900">Profile</h1>
          <p className="mt-1 text-sm text-navy-600">
            This information helps JobMatch calculate a transparent match % for every job.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border-default bg-white px-3.5 py-2 text-sm font-medium text-navy-700 hover:bg-surface-alt"
        >
          <Pencil size={14} />
          Edit profile
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-border-subtle bg-white p-7">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-100 text-lg font-semibold text-accent-700">
              {PROFILE.initials}
            </span>
            <div>
              <p className="text-base font-semibold text-navy-900">{PROFILE.name}</p>
              <p className="text-sm text-navy-500">{PROFILE.email}</p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <ProfileField label="Preferred roles" items={PROFILE.preferredRoles} />
            <ProfileField label="Experience level" items={[PROFILE.experienceLevel]} />
            <ProfileField label="Skills" items={PROFILE.skills} />
            <ProfileField label="Preferred work mode" items={PROFILE.preferredWorkMode} />
            <ProfileField label="Preferred provinces" items={PROFILE.preferredProvinces} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">Language skills</p>
              <ul className="mt-2 space-y-1.5">
                {PROFILE.languages.map((l) => (
                  <li key={l.language} className="flex items-center justify-between text-sm">
                    <span className="text-navy-800">{l.language}</span>
                    <span className="rounded-full bg-surface-alt px-2 py-0.5 text-xs font-medium text-navy-600">
                      {l.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside>
          <div className="rounded-2xl border border-border-subtle bg-white p-6">
            <h2 className="text-sm font-semibold text-navy-900">Coming later</h2>
            <p className="mt-1 text-xs text-navy-500">A preview of what's planned beyond the MVP.</p>
            <div className="mt-4 space-y-3">
              {COMING_LATER.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-dashed border-border-default bg-surface-muted p-4 opacity-80"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-navy-700">{item.title}</p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-navy-500 border border-border-subtle">
                      <Lock size={10} />
                      Coming soon
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-navy-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ProfileField({ label, items }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">{label}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-md bg-accent-50 px-2.5 py-1 text-xs font-medium text-accent-700 border border-accent-100"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

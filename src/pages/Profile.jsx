import { useState } from "react";
import { CheckCircle2, FileText, Lock, Pencil } from "lucide-react";
import { COMING_LATER } from "../data/profile";
import EditProfileModal from "../components/EditProfileModal";
import { useApp } from "../context/AppContext";

function formatFileSize(size) {
  if (!size) return "";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Profile() {
  const {
    profile,
    updateProfile,
    saveCvMetadata,
    removeCv,
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  function handleSave(updates) {
    updateProfile(updates);
    setShowSavedMessage(true);

    window.setTimeout(() => {
      setShowSavedMessage(false);
    }, 2500);
  }

  return (
    <div className="container-app py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-navy-900">Profile</h1>
          <p className="mt-1 max-w-2xl text-sm text-navy-600">
            This information helps JobMatch calculate a transparent match % for every job.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border-default bg-white px-3.5 py-2 text-sm font-medium text-navy-700 hover:bg-surface-alt"
        >
          <Pencil size={14} />
          Edit profile
        </button>
      </div>

      {showSavedMessage && (
        <div
          className="mt-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
          role="status"
        >
          <CheckCircle2 size={16} />
          Profile updated successfully.
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border-subtle bg-white p-7">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-100 text-lg font-semibold text-accent-700">
                {profile.initials}
              </span>

              <div>
                <p className="text-base font-semibold text-navy-900">
                  {profile.name}
                </p>
                <p className="text-sm text-navy-500">{profile.email}</p>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <ProfileField
                label="Preferred roles"
                items={profile.preferredRoles}
              />
              <ProfileField
                label="Experience level"
                items={[profile.experienceLevel]}
              />
              <ProfileField label="Skills" items={profile.skills} />
              <ProfileField
                label="Preferred work mode"
                items={profile.preferredWorkMode}
              />
              <ProfileField
                label="Preferred provinces"
                items={profile.preferredProvinces}
              />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
                  Language skills
                </p>

                {profile.languages.length > 0 ? (
                  <ul className="mt-2 space-y-1.5">
                    {profile.languages.map((language) => (
                      <li
                        key={`${language.language}-${language.level}`}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-navy-800">
                          {language.language}
                        </span>
                        <span className="rounded-full bg-surface-alt px-2 py-0.5 text-xs font-medium text-navy-600">
                          {language.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-navy-400">
                    No languages added yet.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-white p-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-700">
                <FileText size={18} />
              </span>

              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold text-navy-900">
                  CV / Resume
                </h2>

                {profile.cv ? (
                  <>
                    <p className="mt-2 truncate text-sm font-medium text-navy-800">
                      {profile.cv.name}
                    </p>
                    <p className="mt-1 text-xs text-navy-500">
                      {formatFileSize(profile.cv.size)}
                      {profile.cv.uploadedAt
                        ? ` · Added ${new Date(profile.cv.uploadedAt).toLocaleDateString()}`
                        : ""}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-navy-500">
                      The mock currently stores CV metadata only. Later, the backend can store the file and AI can extract profile information and skills from it.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-1 text-sm text-navy-600">
                      No CV uploaded yet.
                    </p>
                    <p className="mt-2 text-xs leading-5 text-navy-500">
                      Add a CV from Edit profile. In a later version it can help enrich your profile and improve matching.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <aside>
          <div className="rounded-2xl border border-border-subtle bg-white p-6">
            <h2 className="text-sm font-semibold text-navy-900">
              Coming later
            </h2>

            <p className="mt-1 text-xs text-navy-500">
              A preview of what's planned beyond the MVP.
            </p>

            <div className="mt-4 space-y-3">
              {COMING_LATER.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-dashed border-border-default bg-surface-muted p-4 opacity-80"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-navy-700">
                      {item.title}
                    </p>

                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border-subtle bg-white px-2 py-0.5 text-[11px] font-medium text-navy-500">
                      <Lock size={10} />
                      Coming soon
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-navy-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <EditProfileModal
        open={isEditing}
        profile={profile}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        onSaveCv={saveCvMetadata}
        onRemoveCv={removeCv}
      />
    </div>
  );
}

function ProfileField({ label, items }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
        {label}
      </p>

      {items.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-md border border-accent-100 bg-accent-50 px-2.5 py-1 text-xs font-medium text-accent-700"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-sm text-navy-400">Not added yet.</p>
      )}
    </div>
  );
}

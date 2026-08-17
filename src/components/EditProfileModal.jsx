import { useEffect, useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";

const WORK_MODES = ["On-site", "Hybrid", "Remote"];
const EXPERIENCE_LEVELS = ["Entry-level", "Mid-level", "Senior"];
const ACCEPTED_CV_TYPES = ".pdf,.doc,.docx";

function toCommaSeparated(items) {
  return Array.isArray(items) ? items.join(", ") : "";
}

function fromCommaSeparated(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatFileSize(size) {
  if (!size) return "";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function EditProfileModal({
  open,
  profile,
  onClose,
  onSave,
  onSaveCv,
  onRemoveCv,
}) {
  const fileInputRef = useRef(null);
  const [form, setForm] = useState(null);
  const [cvError, setCvError] = useState("");

  useEffect(() => {
    if (!open) return;

    setForm({
      name: profile.name || "",
      email: profile.email || "",
      preferredRoles: toCommaSeparated(profile.preferredRoles),
      skills: toCommaSeparated(profile.skills),
      experienceLevel: profile.experienceLevel || "Mid-level",
      preferredWorkMode: profile.preferredWorkMode || [],
      preferredProvinces: toCommaSeparated(profile.preferredProvinces),
      languages: profile.languages || [],
    });

    setCvError("");
  }, [open, profile]);

  if (!open || !form) return null;

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleWorkMode(mode) {
    setForm((prev) => {
      const exists = prev.preferredWorkMode.includes(mode);

      return {
        ...prev,
        preferredWorkMode: exists
          ? prev.preferredWorkMode.filter((item) => item !== mode)
          : [...prev.preferredWorkMode, mode],
      };
    });
  }

  function updateLanguage(index, field, value) {
    setForm((prev) => ({
      ...prev,
      languages: prev.languages.map((language, currentIndex) =>
        currentIndex === index
          ? { ...language, [field]: value }
          : language,
      ),
    }));
  }

  function addLanguage() {
    setForm((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        { language: "", level: "Basic" },
      ],
    }));
  }

  function removeLanguage(index) {
    setForm((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, currentIndex) => currentIndex !== index),
    }));
  }

  function handleCvChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setCvError("");

    const extension = file.name.split(".").pop()?.toLowerCase();
    const allowedExtensions = ["pdf", "doc", "docx"];

    if (!extension || !allowedExtensions.includes(extension)) {
      setCvError("Please choose a PDF, DOC, or DOCX file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setCvError("Please choose a CV smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    onSaveCv(file);
    event.target.value = "";
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      name: form.name.trim(),
      email: form.email.trim(),
      preferredRoles: fromCommaSeparated(form.preferredRoles),
      skills: fromCommaSeparated(form.skills),
      experienceLevel: form.experienceLevel,
      preferredWorkMode: form.preferredWorkMode,
      preferredProvinces: fromCommaSeparated(form.preferredProvinces),
      languages: form.languages
        .map((language) => ({
          language: language.language.trim(),
          level: language.level,
        }))
        .filter((language) => language.language),
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/40 p-4">
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border-subtle bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-border-subtle bg-white px-6 py-5">
          <div>
            <h2 id="edit-profile-title" className="text-lg font-semibold text-navy-900">
              Edit profile
            </h2>
            <p className="mt-1 text-sm text-navy-500">
              Keep your profile accurate so JobMatch can explain your job match.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-navy-500 hover:bg-surface-alt hover:text-navy-900"
            aria-label="Close edit profile"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Full name"
              value={form.name}
              onChange={(value) => setField("name", value)}
              required
            />

            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) => setField("email", value)}
              required
            />
          </div>

          <section className="rounded-2xl border border-border-subtle bg-surface-muted p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <FileText size={17} className="text-accent-700" />
                  <h3 className="text-sm font-semibold text-navy-900">
                    CV / Resume
                  </h3>
                </div>

                <p className="mt-1 text-xs leading-5 text-navy-500">
                  Upload your CV for future profile enrichment and smarter matching.
                  AI parsing is not active in this mock yet.
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_CV_TYPES}
                onChange={handleCvChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border-default bg-white px-3 py-2 text-xs font-medium text-navy-700 hover:bg-surface-alt"
              >
                <Upload size={14} />
                {profile.cv ? "Replace CV" : "Upload CV"}
              </button>
            </div>

            {profile.cv ? (
              <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border-subtle bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy-800">
                    {profile.cv.name}
                  </p>
                  <p className="mt-1 text-xs text-navy-500">
                    {formatFileSize(profile.cv.size)}
                    {profile.cv.uploadedAt
                      ? ` · Added ${new Date(profile.cv.uploadedAt).toLocaleDateString()}`
                      : ""}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onRemoveCv}
                  className="self-start rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 sm:self-auto"
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="mt-3 text-xs text-navy-500">
                Accepted formats: PDF, DOC, DOCX · Maximum 5 MB
              </p>
            )}

            {cvError && (
              <p className="mt-3 text-xs font-medium text-red-600" role="alert">
                {cvError}
              </p>
            )}
          </section>

          <TextField
            label="Preferred roles"
            helperText="Separate multiple roles with commas."
            value={form.preferredRoles}
            onChange={(value) => setField("preferredRoles", value)}
            placeholder="Frontend Developer, UX Designer"
          />

          <TextField
            label="Skills"
            helperText="Separate skills with commas."
            value={form.skills}
            onChange={(value) => setField("skills", value)}
            placeholder="React, JavaScript, TypeScript"
          />

          <div>
            <label className="text-sm font-medium text-navy-800">
              Experience level
            </label>

            <select
              value={form.experienceLevel}
              onChange={(event) => setField("experienceLevel", event.target.value)}
              className="mt-2 w-full rounded-xl border border-border-default bg-white px-3.5 py-3 text-sm text-navy-900 outline-none focus:border-accent-500"
            >
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-sm font-medium text-navy-800">
              Preferred work mode
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {WORK_MODES.map((mode) => {
                const selected = form.preferredWorkMode.includes(mode);

                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => toggleWorkMode(mode)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      selected
                        ? "border-accent-300 bg-accent-50 text-accent-700"
                        : "border-border-default bg-white text-navy-600 hover:bg-surface-alt"
                    }`}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>
          </div>

          <TextField
            label="Preferred provinces"
            helperText="Separate provinces with commas."
            value={form.preferredProvinces}
            onChange={(value) => setField("preferredProvinces", value)}
            placeholder="Utrecht, Noord-Holland"
          />

          <div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-navy-800">
                  Language skills
                </p>
                <p className="mt-1 text-xs text-navy-500">
                  Add languages that may be relevant to matching.
                </p>
              </div>

              <button
                type="button"
                onClick={addLanguage}
                className="rounded-lg border border-border-default bg-white px-3 py-2 text-xs font-medium text-navy-700 hover:bg-surface-alt"
              >
                Add language
              </button>
            </div>

            <div className="mt-3 space-y-3">
              {form.languages.map((language, index) => (
                <div
                  key={`${language.language}-${index}`}
                  className="grid gap-2 rounded-xl bg-surface-muted p-3 sm:grid-cols-[1fr_140px_auto]"
                >
                  <input
                    type="text"
                    value={language.language}
                    onChange={(event) =>
                      updateLanguage(index, "language", event.target.value)
                    }
                    placeholder="Language"
                    className="rounded-lg border border-border-default bg-white px-3 py-2 text-sm text-navy-900 outline-none focus:border-accent-500"
                  />

                  <select
                    value={language.level}
                    onChange={(event) =>
                      updateLanguage(index, "level", event.target.value)
                    }
                    className="rounded-lg border border-border-default bg-white px-3 py-2 text-sm text-navy-900 outline-none focus:border-accent-500"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native">Native</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border-subtle pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border-default bg-white px-4 py-2.5 text-sm font-medium text-navy-700 hover:bg-surface-alt"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-accent-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-700"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TextField({
  label,
  helperText,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="text-sm font-medium text-navy-800">{label}</label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-border-default bg-white px-3.5 py-3 text-sm text-navy-900 outline-none focus:border-accent-500"
      />

      {helperText && (
        <p className="mt-1.5 text-xs text-navy-500">{helperText}</p>
      )}
    </div>
  );
}

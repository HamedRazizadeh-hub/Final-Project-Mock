import { useEffect, useState } from "react";
import { X } from "lucide-react";

const WORK_MODES = ["On-site", "Hybrid", "Remote"];
const EXPERIENCE_LEVELS = ["Entry-level", "Mid-level", "Senior"];

function toCommaSeparated(items) {
  return Array.isArray(items) ? items.join(", ") : "";
}

function fromCommaSeparated(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function EditProfileModal({
  open,
  profile,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!open) return;

    setForm({
      name: profile.name || "",
      email: profile.email || "",
      preferredRoles: toCommaSeparated(profile.preferredRoles),
      skills: toCommaSeparated(profile.skills),
      experienceLevel: profile.experienceLevel || "Mid-level",
      preferredWorkMode: profile.preferredWorkMode || [],
      preferredLocations: toCommaSeparated(profile.preferredLocations),
      languages: profile.languages || [],
    });
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

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      name: form.name.trim(),
      email: form.email.trim(),
      preferredRoles: fromCommaSeparated(form.preferredRoles),
      skills: fromCommaSeparated(form.skills),
      experienceLevel: form.experienceLevel,
      preferredWorkMode: form.preferredWorkMode,
      preferredLocations: fromCommaSeparated(form.preferredLocations),
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
              V1 profile setup is manual. CV upload and AI parsing are coming later.
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
            label="Preferred locations"
            helperText="Separate cities, locations, or Remote with commas."
            value={form.preferredLocations}
            onChange={(value) => setField("preferredLocations", value)}
            placeholder="Utrecht, Amsterdam, Remote"
          />

          <div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-navy-800">
                  Languages
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

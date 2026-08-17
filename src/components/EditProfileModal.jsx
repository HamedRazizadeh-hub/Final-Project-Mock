import { useEffect, useState } from "react";
import { X } from "lucide-react";

const WORK_MODES = ["On-site", "Hybrid", "Remote"];
const EXPERIENCE_LEVELS = ["Entry-level", "Mid-level", "Senior"];

const toText = (items) => (Array.isArray(items) ? items.join(", ") : "");
const toArray = (value) => value.split(",").map((item) => item.trim()).filter(Boolean);

export default function EditProfileModal({ open, profile, onClose, onSave }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!open) return;
    setForm({
      name: profile.name || "",
      email: profile.email || "",
      preferredRoles: toText(profile.preferredRoles),
      skills: toText(profile.skills),
      experienceLevel: profile.experienceLevel || "Mid-level",
      preferredWorkMode: profile.preferredWorkMode || [],
      preferredProvinces: toText(profile.preferredProvinces),
      languages: profile.languages || [],
    });
  }, [open, profile]);

  if (!open || !form) return null;

  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  function toggleWorkMode(mode) {
    setForm((prev) => ({
      ...prev,
      preferredWorkMode: prev.preferredWorkMode.includes(mode)
        ? prev.preferredWorkMode.filter((item) => item !== mode)
        : [...prev.preferredWorkMode, mode],
    }));
  }

  function updateLanguage(index, field, value) {
    setForm((prev) => ({
      ...prev,
      languages: prev.languages.map((language, currentIndex) =>
        currentIndex === index ? { ...language, [field]: value } : language
      ),
    }));
  }

  function addLanguage() {
    setForm((prev) => ({
      ...prev,
      languages: [...prev.languages, { language: "", level: "Basic" }],
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
      preferredRoles: toArray(form.preferredRoles),
      skills: toArray(form.skills),
      experienceLevel: form.experienceLevel,
      preferredWorkMode: form.preferredWorkMode,
      preferredProvinces: toArray(form.preferredProvinces),
      languages: form.languages
        .map((item) => ({ language: item.language.trim(), level: item.level }))
        .filter((item) => item.language),
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border-subtle bg-white shadow-xl" role="dialog" aria-modal="true" aria-labelledby="edit-profile-title">
        <div className="sticky top-0 flex items-start justify-between border-b border-border-subtle bg-white px-6 py-5">
          <div>
            <h2 id="edit-profile-title" className="text-lg font-semibold text-navy-900">Edit profile</h2>
            <p className="mt-1 text-sm text-navy-500">Keep your profile accurate so JobMatch can explain your job match.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-navy-500 hover:bg-surface-alt hover:text-navy-900" aria-label="Close edit profile">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Full name" value={form.name} onChange={(v) => setField("name", v)} required />
            <TextField label="Email" type="email" value={form.email} onChange={(v) => setField("email", v)} required />
          </div>

          <TextField label="Preferred roles" helperText="Separate multiple roles with commas." value={form.preferredRoles} onChange={(v) => setField("preferredRoles", v)} placeholder="Frontend Developer, UX Designer" />
          <TextField label="Skills" helperText="Separate skills with commas." value={form.skills} onChange={(v) => setField("skills", v)} placeholder="React, JavaScript, TypeScript" />

          <div>
            <label className="text-sm font-medium text-navy-800">Experience level</label>
            <select value={form.experienceLevel} onChange={(e) => setField("experienceLevel", e.target.value)} className="mt-2 w-full rounded-xl border border-border-default bg-white px-3.5 py-3 text-sm text-navy-900 outline-none focus:border-accent-500">
              {EXPERIENCE_LEVELS.map((level) => <option key={level}>{level}</option>)}
            </select>
          </div>

          <div>
            <p className="text-sm font-medium text-navy-800">Preferred work mode</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {WORK_MODES.map((mode) => {
                const selected = form.preferredWorkMode.includes(mode);
                return (
                  <button key={mode} type="button" onClick={() => toggleWorkMode(mode)} className={`rounded-lg border px-3 py-2 text-sm font-medium ${selected ? "border-accent-300 bg-accent-50 text-accent-700" : "border-border-default bg-white text-navy-600 hover:bg-surface-alt"}`}>
                    {mode}
                  </button>
                );
              })}
            </div>
          </div>

          <TextField label="Preferred provinces" helperText="Separate provinces with commas." value={form.preferredProvinces} onChange={(v) => setField("preferredProvinces", v)} placeholder="Utrecht, Noord-Holland" />

          <div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-navy-800">Language skills</p>
                <p className="mt-1 text-xs text-navy-500">Add languages relevant to job matching.</p>
              </div>
              <button type="button" onClick={addLanguage} className="rounded-lg border border-border-default bg-white px-3 py-2 text-xs font-medium text-navy-700 hover:bg-surface-alt">Add language</button>
            </div>

            <div className="mt-3 space-y-3">
              {form.languages.map((language, index) => (
                <div key={`${language.language}-${index}`} className="grid gap-2 rounded-xl bg-surface-muted p-3 sm:grid-cols-[1fr_140px_auto]">
                  <input type="text" value={language.language} onChange={(e) => updateLanguage(index, "language", e.target.value)} placeholder="Language" className="rounded-lg border border-border-default bg-white px-3 py-2 text-sm text-navy-900 outline-none focus:border-accent-500" />
                  <select value={language.level} onChange={(e) => updateLanguage(index, "level", e.target.value)} className="rounded-lg border border-border-default bg-white px-3 py-2 text-sm text-navy-900 outline-none focus:border-accent-500">
                    <option>Basic</option><option>Intermediate</option><option>Fluent</option><option>Native</option>
                  </select>
                  <button type="button" onClick={() => removeLanguage(index)} className="rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50">Remove</button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border-subtle pt-5">
            <button type="button" onClick={onClose} className="rounded-lg border border-border-default bg-white px-4 py-2.5 text-sm font-medium text-navy-700 hover:bg-surface-alt">Cancel</button>
            <button type="submit" className="rounded-lg bg-accent-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-700">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TextField({ label, helperText, value, onChange, type = "text", placeholder, required = false }) {
  return (
    <div>
      <label className="text-sm font-medium text-navy-800">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} className="mt-2 w-full rounded-xl border border-border-default bg-white px-3.5 py-3 text-sm text-navy-900 outline-none focus:border-accent-500" />
      {helperText && <p className="mt-1.5 text-xs text-navy-500">{helperText}</p>}
    </div>
  );
}

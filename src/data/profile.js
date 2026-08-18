// Mock profile data. In a future version this feeds the match-scoring
// engine through Backend/Data, not frontend calculation.
export const PROFILE = {
  name: "Hamed Razizadeh",
  email: "hamed.razizadeh@gmail.com",
  initials: "HR",
  preferredRoles: ["Frontend Developer", "UX Designer"],
  skills: ["React", "JavaScript", "TypeScript", "Git", "Figma"],
  experienceLevel: "Mid-level",
  preferredWorkMode: ["Hybrid", "Remote"],
  preferredLocations: ["Utrecht", "Amsterdam", "Remote"],
  languages: [
    { language: "English", level: "Fluent" },
    { language: "Dutch", level: "Basic" },
  ],
};

export const COMING_LATER = [
  {
    title: "CV Upload and AI Parsing",
    description:
      "Upload a resume and let AI extract profile details automatically in a later version.",
  },
  {
    title: "Full Application Tracker",
    description:
      "Timeline, notes, reminders, and richer application stages beyond the simple V1 status tag.",
  },
  {
    title: "Smart Notifications",
    description: "Get notified the moment a strong new match appears.",
  },
  {
    title: "Interview Tools",
    description: "Prep guides and practice questions tailored to each job.",
  },
];

// Mock profile data. In a future version this feeds the match-scoring
// engine (skills, experience level, languages, location preferences).
export const PROFILE = {
  name: "Hamed Razizadeh",
  email: "hamed.razizadeh@gmail.com",
  initials: "HR",
  preferredRoles: ["Frontend Developer", "UX Designer"],
  skills: ["React", "JavaScript", "TypeScript", "Git", "Figma"],
  experienceLevel: "Mid-level",
  preferredWorkMode: ["Hybrid", "Remote"],
  preferredProvinces: ["Utrecht", "Noord-Holland"],
  languages: [
    { language: "English", level: "Fluent" },
    { language: "Dutch", level: "Basic" },
  ],
};

export const COMING_LATER = [
  {
    title: "Full Application Tracker",
    description:
      "Timeline, notes and reminders per application — beyond the simple status tag on Saved Jobs today.",
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

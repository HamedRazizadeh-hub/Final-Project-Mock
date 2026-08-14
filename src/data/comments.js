// Seed "company review" comments — mock data only. In a future version
// these would be user-generated and moderated server-side; for the
// prototype, user-added reviews are merged in on top of this seed list and
// persisted to localStorage (see AppContext).

export const SALARY_OPINIONS = ["Below market", "At market", "Above market", "Not sure"];

function daysAgo(n, base = new Date("2026-08-13T09:00:00Z")) {
  const d = new Date(base);
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const SEED_COMMENTS = [
  {
    id: "seed-1",
    company: "Tech Company",
    authorLabel: "Former Frontend Developer",
    tenure: "Worked here 1.5 years (2023–2024)",
    quality: 4,
    salaryOpinion: "At market",
    comment:
      "Solid engineering culture and a genuinely supportive team. Onboarding took a while to get productive, but code review quality was consistently high.",
    createdAt: daysAgo(18),
    isSeed: true,
  },
  {
    id: "seed-2",
    company: "Tech Company",
    authorLabel: "Current employee",
    tenure: "6 months so far",
    quality: 5,
    salaryOpinion: "Above market",
    comment: "Salary negotiation was straightforward and transparent. Hybrid schedule is flexible in practice, not just on paper.",
    createdAt: daysAgo(4),
    isSeed: true,
  },
  {
    id: "seed-3",
    company: "Creative Studio",
    authorLabel: "Former UX Designer",
    tenure: "Worked here 2 years (2021–2023)",
    quality: 3,
    salaryOpinion: "Below market",
    comment:
      "Great portfolio-building experience and interesting client work, but pay lagged behind similar agencies. Left mainly over compensation.",
    createdAt: daysAgo(40),
    isSeed: true,
  },
  {
    id: "seed-4",
    company: "FinTech Company",
    authorLabel: "Current employee",
    tenure: "1 year so far",
    quality: 4,
    salaryOpinion: "At market",
    comment: "Data team is well-organized and management actually uses the dashboards we build. Part-time roles are treated fairly, not as second-class.",
    createdAt: daysAgo(9),
    isSeed: true,
  },
  {
    id: "seed-5",
    company: "CloudWorks BV",
    authorLabel: "Former Backend Developer",
    tenure: "Worked here 3 years (2020–2023)",
    quality: 5,
    salaryOpinion: "Above market",
    comment: "Remote-first was real, not a slogan. Senior engineers get genuine ownership over architecture decisions.",
    createdAt: daysAgo(60),
    isSeed: true,
  },
];

export function seedCommentsForCompany(company) {
  return SEED_COMMENTS.filter((c) => c.company === company);
}

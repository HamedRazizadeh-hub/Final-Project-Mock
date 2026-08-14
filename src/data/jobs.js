import { CITIES_BY_PROVINCE, provinceForCity } from "./locations";

// ---------------------------------------------------------------------------
// Mock job data.
//
// Field shape mirrors what a future Adzuna / Jooble integration is expected
// to provide, plus JobMatch-specific fields (matchScore, matchBreakdown,
// matchStrengths/matchGaps). Coordinates are included so a future map view
// or "distance to city center" feature can be added without a schema change.
//
// Shape:
// {
//   id, title, company, description, requirements[], skills[],
//   city, province, latitude, longitude,
//   employmentType, workMode, experienceLevel,
//   matchScore, matchBreakdown: { skills, experience, language, location },
//   matchStrengths[], matchGaps[],
//   postedAt (ISO), updatedAt (ISO), source, externalUrl,
// }
// ---------------------------------------------------------------------------

const CITY_COORDS = {
  Utrecht: [52.0907, 5.1214],
  Nieuwegein: [52.0296, 5.0913],
  Amersfoort: [52.1561, 5.3878],
  Houten: [52.0339, 5.1686],
  Zeist: [52.0894, 5.2317],
  Amsterdam: [52.3676, 4.9041],
  Haarlem: [52.3874, 4.6462],
  Zaanstad: [52.4389, 4.8262],
  Alkmaar: [52.6324, 4.7534],
  Hilversum: [52.2292, 5.1669],
  Rotterdam: [51.9244, 4.4777],
  "Den Haag": [52.0705, 4.3007],
  Leiden: [52.1601, 4.497],
  Delft: [52.0116, 4.3571],
  Dordrecht: [51.8133, 4.6901],
  Gouda: [52.0115, 4.7104],
  Eindhoven: [51.4416, 5.4697],
  Tilburg: [51.5555, 5.0913],
  Breda: [51.5719, 4.7683],
  "'s-Hertogenbosch": [51.6978, 5.3037],
  Helmond: [51.4793, 5.6567],
  Arnhem: [51.9851, 5.8987],
  Nijmegen: [51.8425, 5.8528],
  Apeldoorn: [52.2112, 5.9699],
  Ede: [52.0475, 5.6694],
  Doetinchem: [51.9647, 6.2886],
  Zwolle: [52.5168, 6.0830],
  Enschede: [52.2215, 6.8937],
  Deventer: [52.2551, 6.1639],
  Hengelo: [52.2659, 6.7931],
  Assen: [52.9959, 6.5625],
  Emmen: [52.7850, 6.9042],
  Hoogeveen: [52.7225, 6.4791],
  Meppel: [52.6958, 6.1936],
  Almere: [52.3508, 5.2647],
  Lelystad: [52.5185, 5.4714],
  Dronten: [52.5253, 5.7186],
  Emmeloord: [52.7108, 5.7458],
  Leeuwarden: [53.2012, 5.7999],
  Drachten: [53.1128, 6.0989],
  Sneek: [53.0330, 5.6580],
  Heerenveen: [52.9598, 5.9204],
  Groningen: [53.2194, 6.5665],
  Hoogezand: [53.1594, 6.7605],
  Winschoten: [53.1425, 7.0392],
  Veendam: [53.1000, 6.8697],
  Maastricht: [50.8514, 5.6910],
  Venlo: [51.3704, 6.1725],
  Sittard: [50.9986, 5.8698],
  Roermond: [51.1942, 5.9877],
  Heerlen: [50.8882, 5.9795],
  Middelburg: [51.4988, 3.6096],
  Vlissingen: [51.4426, 3.5736],
  Goes: [51.5044, 3.8877],
  Terneuzen: [51.3347, 3.8305],
};

function coordsFor(city) {
  return CITY_COORDS[city] || [52.1326, 5.2913];
}

let idCounter = 1;
function nextId() {
  return `job-${idCounter++}`;
}

function makeJob(overrides) {
  const city = overrides.city;
  const province = overrides.province || provinceForCity(city) || "Utrecht";
  const [latitude, longitude] = coordsFor(city);
  return {
    id: nextId(),
    requirements: [],
    skills: [],
    employmentType: "Full-time",
    workMode: "Hybrid",
    experienceLevel: "Mid-level",
    matchScore: null,
    matchBreakdown: null,
    matchStrengths: [],
    matchGaps: [],
    source: "Adzuna",
    externalUrl: "https://example.com/apply",
    latitude,
    longitude,
    province,
    ...overrides,
  };
}

function daysAgo(n, base = new Date("2026-08-13T09:00:00Z")) {
  const d = new Date(base);
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function hoursAgo(n, base = new Date("2026-08-13T09:00:00Z")) {
  const d = new Date(base);
  d.setHours(d.getHours() - n);
  return d.toISOString();
}

// ---------------------------------------------------------------------------
// Hand-curated "hero" jobs — fully written descriptions, requirements and
// transparent match breakdowns. These anchor the demo narrative.
// ---------------------------------------------------------------------------

export const HERO_JOBS = [
  makeJob({
    title: "Frontend Developer",
    company: "Tech Company",
    city: "Utrecht",
    employmentType: "Full-time",
    workMode: "Hybrid",
    experienceLevel: "Mid-level",
    description:
      "We're looking for a Frontend Developer to join our product team in Utrecht. You'll build and maintain customer-facing features in our React application, working closely with design and backend engineers to ship reliable, accessible interfaces used by thousands of people every day.",
    requirements: [
      "2+ years frontend development experience",
      "Strong React and TypeScript knowledge",
      "Git experience",
      "REST APIs",
      "Responsive/accessibility knowledge",
      "Good English communication",
    ],
    skills: ["React", "TypeScript", "JavaScript", "Git", "REST APIs"],
    matchScore: 92,
    matchBreakdown: { skills: 90, experience: 80, language: 90, location: 100 },
    matchStrengths: ["React", "TypeScript", "Git/GitHub", "REST APIs", "English"],
    matchGaps: ["GraphQL experience", "Dutch language preference"],
    postedAt: daysAgo(2),
    updatedAt: hoursAgo(6),
    source: "Adzuna",
    externalUrl: "https://techcompany.example.com/careers/frontend-developer",
  }),
  makeJob({
    title: "UX Designer",
    company: "Creative Studio",
    city: "Amsterdam",
    employmentType: "Full-time",
    workMode: "Hybrid",
    experienceLevel: "Mid-level",
    description:
      "Creative Studio is hiring a UX Designer to shape end-to-end user experiences for our clients' digital products. You'll run research, build wireframes and prototypes, and collaborate directly with developers to bring your designs to life.",
    requirements: [
      "3+ years product/UX design experience",
      "Strong portfolio with case studies",
      "Figma proficiency",
      "User research fundamentals",
      "Comfortable presenting to clients",
      "Good English communication",
    ],
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    matchScore: 85,
    matchBreakdown: { skills: 82, experience: 85, language: 90, location: 85 },
    matchStrengths: ["Figma", "Prototyping", "User Research", "English"],
    matchGaps: ["Client-facing workshops experience"],
    postedAt: daysAgo(3),
    updatedAt: hoursAgo(10),
    source: "Adzuna",
    externalUrl: "https://creativestudio.example.com/jobs/ux-designer",
  }),
  makeJob({
    title: "Data Analyst",
    company: "FinTech Company",
    city: "Rotterdam",
    employmentType: "Part-time",
    workMode: "Hybrid",
    experienceLevel: "Junior",
    description:
      "As a Data Analyst at our Rotterdam office, you'll turn transaction and customer data into clear, actionable insight for product and risk teams. This is a part-time role well suited to someone early in their analytics career who wants real ownership.",
    requirements: [
      "1+ years experience with SQL",
      "Experience with dashboards (Looker, Power BI or similar)",
      "Comfortable with statistics fundamentals",
      "Python for data manipulation is a plus",
      "Good English communication",
    ],
    skills: ["SQL", "Power BI", "Python", "Excel"],
    matchScore: 78,
    matchBreakdown: { skills: 74, experience: 70, language: 90, location: 85 },
    matchStrengths: ["SQL", "Excel", "English"],
    matchGaps: ["Power BI dashboard experience", "Python data libraries"],
    postedAt: daysAgo(5),
    updatedAt: hoursAgo(20),
    source: "Jooble",
    externalUrl: "https://fintechcompany.example.com/careers/data-analyst",
  }),
  makeJob({
    title: "Frontend Developer",
    company: "Tech Company",
    city: "Nieuwegein",
    employmentType: "Full-time",
    workMode: "Hybrid",
    experienceLevel: "Mid-level",
    description:
      "Our Nieuwegein team is growing. We're looking for a Frontend Developer to help modernize our design system and build new self-service features for our SME customers, using React and TypeScript across a component-driven codebase.",
    requirements: [
      "2+ years frontend development experience",
      "Strong React and TypeScript knowledge",
      "Git experience",
      "REST APIs",
      "Responsive/accessibility knowledge",
      "Good English communication",
    ],
    skills: ["React", "TypeScript", "Git"],
    matchScore: 92,
    matchBreakdown: { skills: 90, experience: 80, language: 90, location: 100 },
    matchStrengths: ["React", "TypeScript", "Git/GitHub", "REST APIs", "English"],
    matchGaps: ["GraphQL experience", "Dutch language preference"],
    postedAt: daysAgo(2),
    updatedAt: hoursAgo(3),
    source: "Adzuna",
    externalUrl: "https://techcompany.example.com/careers/frontend-developer-nieuwegein",
  }),
  makeJob({
    title: "Backend Developer",
    company: "CloudWorks BV",
    city: "Nieuwegein",
    employmentType: "Full-time",
    workMode: "Remote",
    experienceLevel: "Senior",
    description:
      "CloudWorks BV is looking for a Senior Backend Developer to design and scale the services behind our logistics platform. You'll work in a small, senior team with a strong ownership culture and a fully remote-first setup.",
    requirements: [
      "5+ years backend development experience",
      "Node.js or similar backend stack",
      "Experience with PostgreSQL",
      "Comfortable designing REST/GraphQL APIs",
      "Experience with CI/CD pipelines",
    ],
    skills: ["Node.js", "PostgreSQL", "Docker", "AWS"],
    matchScore: 64,
    matchBreakdown: { skills: 55, experience: 70, language: 80, location: 100 },
    matchStrengths: ["Node.js", "REST APIs", "English"],
    matchGaps: ["PostgreSQL at scale", "AWS infrastructure experience"],
    postedAt: daysAgo(6),
    updatedAt: hoursAgo(30),
    source: "Adzuna",
    externalUrl: "https://cloudworks.example.com/vacancies/senior-backend-developer",
  }),
  makeJob({
    title: "Product Designer",
    company: "Noord Digital",
    city: "Utrecht",
    employmentType: "Full-time",
    workMode: "Hybrid",
    experienceLevel: "Mid-level",
    description:
      "Noord Digital is a product studio building tools for the Dutch public sector. We're hiring a Product Designer to own design for a new citizen-facing service, from early research through to final UI.",
    requirements: [
      "3+ years product design experience",
      "Comfortable working with accessibility (WCAG) requirements",
      "Figma proficiency",
      "Experience working with government or regulated clients is a plus",
    ],
    skills: ["Figma", "Accessibility", "Design Systems", "User Research"],
    matchScore: 71,
    matchBreakdown: { skills: 68, experience: 65, language: 80, location: 100 },
    matchStrengths: ["Figma", "Design Systems", "English"],
    matchGaps: ["WCAG accessibility depth", "Public sector experience"],
    postedAt: daysAgo(4),
    updatedAt: hoursAgo(14),
    source: "Jooble",
    externalUrl: "https://noorddigital.example.com/careers/product-designer",
  }),
];

// ---------------------------------------------------------------------------
// Generated filler jobs — realistic breadth across provinces/cities so
// filtering (province at search time, city/type/mode as refinement filters)
// produces believable, consistent counts everywhere in the app.
// ---------------------------------------------------------------------------

const TITLE_TEMPLATES = [
  { title: "Software Engineer", skills: ["JavaScript", "Node.js", "Git"], exp: "Mid-level" },
  { title: "Full-Stack Developer", skills: ["React", "Node.js", "SQL"], exp: "Mid-level" },
  { title: "Backend Developer", skills: ["Java", "Spring Boot", "PostgreSQL"], exp: "Senior" },
  { title: "QA Engineer", skills: ["Test Automation", "Selenium", "CI/CD"], exp: "Mid-level" },
  { title: "DevOps Engineer", skills: ["Docker", "Kubernetes", "AWS"], exp: "Senior" },
  { title: "Product Manager", skills: ["Roadmapping", "Stakeholder Management", "Agile"], exp: "Senior" },
  { title: "Data Scientist", skills: ["Python", "Machine Learning", "SQL"], exp: "Mid-level" },
  { title: "Marketing Specialist", skills: ["SEO", "Content Strategy", "Analytics"], exp: "Junior" },
  { title: "Customer Success Manager", skills: ["Account Management", "CRM", "English"], exp: "Mid-level" },
  { title: "Sales Representative", skills: ["B2B Sales", "Negotiation", "CRM"], exp: "Junior" },
  { title: "UI Designer", skills: ["Figma", "Design Systems", "Prototyping"], exp: "Junior" },
  { title: "Mobile Developer (iOS)", skills: ["Swift", "iOS SDK", "Git"], exp: "Mid-level" },
  { title: "Mobile Developer (Android)", skills: ["Kotlin", "Android SDK", "Git"], exp: "Mid-level" },
  { title: "Business Analyst", skills: ["SQL", "Requirements Analysis", "Excel"], exp: "Mid-level" },
  { title: "Project Manager", skills: ["Agile", "Risk Management", "Stakeholder Management"], exp: "Senior" },
  { title: "HR Advisor", skills: ["Recruitment", "Labor Law", "Dutch"], exp: "Mid-level" },
  { title: "Financial Analyst", skills: ["Excel", "Forecasting", "SAP"], exp: "Mid-level" },
  { title: "Data Analyst", skills: ["SQL", "Power BI", "Excel"], exp: "Junior" },
  { title: "Frontend Developer", skills: ["React", "TypeScript", "CSS"], exp: "Junior" },
];

const COMPANIES = [
  "Delta Software", "BrightPath Consulting", "PixelForge Studio", "Horizon Analytics",
  "GreenGrid Energy", "Maple Logistics", "Zenith Retail Group", "Solaris Health Tech",
  "Northline Bank", "Kwadrant Media", "Vertex Robotics", "Anchor Insurance",
  "Blue Harbor Ventures", "Novachip Semiconductors", "Waterline Consultancy",
  "Amber Studio", "Ridgeback Systems", "Polderworks", "Loft Nine Agency", "Cobalt Freight",
];

const EMPLOYMENT_TYPES = ["Full-time", "Full-time", "Full-time", "Part-time", "Freelance"];
const WORK_MODES = ["Hybrid", "Hybrid", "Remote", "On-site"];
const SOURCES = ["Adzuna", "Adzuna", "Jooble"];

// City -> number of filler jobs to generate. Tuned so totals feel realistic:
// bigger cities have more listings, smaller towns fewer. Combined with the
// hero jobs above, this drives every "N jobs found" count in the app.
const FILLER_COUNTS = {
  Utrecht: 8, Nieuwegein: 4, Amersfoort: 5, Houten: 3, Zeist: 3,
  Amsterdam: 12, Haarlem: 4, Zaanstad: 3, Alkmaar: 3, Hilversum: 3,
  Rotterdam: 9, "Den Haag": 6, Leiden: 3, Delft: 3, Dordrecht: 2, Gouda: 2,
  Eindhoven: 7, Tilburg: 3, Breda: 3, "'s-Hertogenbosch": 2, Helmond: 1,
  Arnhem: 3, Nijmegen: 3, Apeldoorn: 1, Ede: 1, Doetinchem: 1,
  Zwolle: 2, Enschede: 2, Deventer: 1, Hengelo: 1,
  Assen: 1, Emmen: 1, Hoogeveen: 1, Meppel: 1,
  Almere: 2, Lelystad: 1, Dronten: 1, Emmeloord: 1,
  Leeuwarden: 2, Drachten: 1, Sneek: 1, Heerenveen: 1,
  Groningen: 3, Hoogezand: 1, Winschoten: 1, Veendam: 1,
  Maastricht: 3, Venlo: 1, Sittard: 1, Roermond: 1, Heerlen: 1,
  Middelburg: 1, Vlissingen: 1, Goes: 1, Terneuzen: 1,
};

function seededPick(list, seed) {
  return list[seed % list.length];
}

function buildFillerJobs() {
  const jobs = [];
  let seed = 7;

  for (const [city, count] of Object.entries(FILLER_COUNTS)) {
    for (let i = 0; i < count; i++) {
      seed += 13;
      const template = seededPick(TITLE_TEMPLATES, seed);
      const company = seededPick(COMPANIES, seed + 3);
      const employmentType = seededPick(EMPLOYMENT_TYPES, seed + 5);
      const workMode = seededPick(WORK_MODES, seed + 7);
      const source = seededPick(SOURCES, seed + 11);
      const matchScore = 46 + (seed % 47); // spread of 46–92
      const skillsMatch = Math.min(96, matchScore + (seed % 9) - 3);
      const experienceMatch = Math.min(96, matchScore + (seed % 7) - 4);
      const languageMatch = 70 + (seed % 4) * 10;
      const locationMatch = workMode === "Remote" ? 100 : 80 + (seed % 3) * 10;
      const postedDaysAgo = 1 + (seed % 14);

      jobs.push(
        makeJob({
          title: template.title,
          company,
          city,
          employmentType,
          workMode,
          experienceLevel: template.exp,
          description:
            `${company} is hiring a ${template.title.replace(/\s*\(.*\)$/, "")} in ${city}. ` +
            `You'll join a close-knit team, work on real customer-facing problems, and have room to grow your ${template.skills[0]} skills.`,
          requirements: [
            `Experience relevant to ${template.title}`,
            `Working knowledge of ${template.skills[0]}`,
            `Comfortable collaborating with ${template.skills[1] || "cross-functional"} teams`,
            "Good English communication",
          ],
          skills: template.skills,
          matchScore,
          matchBreakdown: {
            skills: Math.max(30, Math.min(98, skillsMatch)),
            experience: Math.max(30, Math.min(98, experienceMatch)),
            language: languageMatch,
            location: locationMatch,
          },
          matchStrengths: template.skills.slice(0, 2),
          matchGaps: template.skills.slice(2),
          postedAt: daysAgo(postedDaysAgo),
          updatedAt: hoursAgo(2 + (seed % 48)),
          source,
          externalUrl: `https://${company.toLowerCase().replace(/[^a-z0-9]+/g, "")}.example.com/careers`,
        })
      );
    }
  }
  return jobs;
}

export const JOBS = [...HERO_JOBS, ...buildFillerJobs()];

export function getJobById(id) {
  return JOBS.find((job) => job.id === id) || null;
}

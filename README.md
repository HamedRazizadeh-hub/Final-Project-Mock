# JobMatch — Frontend Prototype

A high-fidelity, fully clickable frontend prototype for **JobMatch**, a Dutch job-search platform. Built with React, React Router, and Tailwind CSS, using local mock data — no backend required.

## MVP scope

JobMatch does **not** host an internal application form. The flow is:

```
Search → Filter → Job Details → Save or Apply on the company website
```

The primary call to action everywhere is **"Apply on company site"**, which opens a confirmation before leaving JobMatch.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

To build a production bundle and preview it locally:

```bash
npm run build
npm run preview
```

The app uses `HashRouter` and a relative Vite `base`, so the production build in `dist/` can be hosted from any path or subdirectory (a plain static file host, S3/GCS bucket, GitHub Pages, etc.) without server-side rewrite rules. You still need to serve it over `http(s)://` — opening `dist/index.html` directly via `file://` will not work, because browsers block ES module scripts from loading that way. Any static file server (`npx serve dist`, `python3 -m http.server`, Netlify/Vercel, etc.) works fine.

## Project structure

```
src/
  data/            Mock data + reference tables
    jobs.js           Job listings (hand-written "hero" jobs + generated filler)
    locations.js       Province → city reference data
    filters.js         Filter option lists, popular searches
    profile.js          Mock user profile
    comments.js         Seed "company review" comments
  utils/
    searchJobs.js      Pure filter/sort logic over the jobs array
  context/
    AppContext.jsx     Saved-jobs + application-status + company-review
                       state (all persisted to localStorage)
  components/          Reusable UI building blocks (Navbar, SearchBar,
                       ProvinceSelect, CityFilter, FilterDropdown, JobCard,
                       JobList, JobPreview, MatchScore, MatchExplanation,
                       SaveButton, JobTags, SourceFreshness, EmptyState,
                       LoadingSkeleton, ApplyModal, StarRating,
                       ApplicationStatusControl, CompanyReviews)
  pages/               Home, FindJobs, JobDetails, ExternalCompany,
                       SavedJobs, Profile
```

## Data model

Each job object is shaped to make a future API integration (Adzuna, Jooble) a drop-in replacement for `src/data/jobs.js`:

```js
{
  id, title, company, description, requirements: [], skills: [],
  city, province, latitude, longitude,
  employmentType, workMode, experienceLevel,
  matchScore, matchBreakdown: { skills, experience, language, location },
  matchStrengths: [], matchGaps: [],
  postedAt, updatedAt, source, externalUrl,
}
```

`province` is included on every job so the UI never has to infer it — a
future backend can populate it from Adzuna's location hierarchy or, if
that's missing, by mapping city/coordinates to a Dutch province via PDOK
data. Saved state, application status, and company reviews are
intentionally *not* stored on the job object itself — they live in
`AppContext`, keyed by job `id` (saved state/status) or company name
(reviews), since they're user-generated rather than sourced from a job
feed.

## Saved Jobs: status tracking & filters

Each saved job can be marked **Not applied / Applied / Rejected** via the
segmented control on its card (`ApplicationStatusControl`). This is
tracked entirely client-side in `AppContext` (`savedJobs` map: `{ [jobId]:
{ savedAt, status } }`) — JobMatch has no way to verify an application
actually happened on the employer's site, so treat this as the user's own
personal tracker, not a source of truth. The Saved Jobs page filters on:

- **Status** — All / Not applied / Applied / Rejected
- **Job type** — All / Full-time / Part-time / Freelance
- **Sort by** — Best match (default) / Recently saved / Recently posted

If you want more filters here (work mode, province, etc.), follow the same
pattern: add a `FilterDropdown` and extend the `filtered` memo in
`src/pages/SavedJobs.jsx`.

## Company reviews (comments)

`CompanyReviews` lets users share what they know about a company: their
role/tenure there, a 1–5 quality rating, a salary opinion (Below/At/Above
market), and a free-text comment. Reviews are keyed by **company name**
(not job id) since the same employer can post multiple listings, and a
few seed reviews live in `src/data/comments.js` so the UI never looks
empty. Anything a user submits is appended via `addComment()` and
persisted to localStorage — it never leaves the browser.

- **Job Details** shows the full section (average rating, all reviews, the
  "Write a review" form) near the bottom of the page (`id="reviews"`).
- **Find Jobs' preview panel** shows a compact summary (average + count)
  that links to `/jobs/:id#reviews`, which auto-scrolls to the section.

This is genuinely user-generated content, not verified by JobMatch —
worth flagging that clearly in the real product (the prototype already
shows a small disclaimer under the "Company reviews" heading).

## Search vs. filter — the important distinction

- **Province** is the *search scope*, chosen alongside the keyword on the
  search bar (Home and the top of Find Jobs). Changing it re-runs the
  search.
- **City** is a *result filter*, chosen in the filters row on Find Jobs.
  Its options are constrained to the current province's cities — unless
  the scope is "All Netherlands", in which case it becomes a searchable,
  nationwide dropdown.

Switching province resets an incompatible city selection automatically.

## Demo affordance: "Preview state"

The Find Jobs filters row includes a small dashed **"Preview state"**
control that isn't part of the real product — it lets you force the
Normal / Loading / No results / Error states on demand, so you can walk a
team through every edge case live without needing real network conditions.
Remove it (`src/pages/FindJobs.jsx`) before wiring up a real backend.

## Logo & hero graphic

`src/components/Logo.jsx` is the app mark: two overlapping rounded-rectangle
tiles — a navy one (the job listing) and an accent-blue one (your profile)
— with a white dot and a green checkmark exactly where they overlap. That
overlap isn't decoration: it's a literal drawing of what "match %" means,
and the tile shape is the same rounded rectangle as the product's own
`JobCard`. The full exploration that led here (metaphors considered for
"Job" and "Match", three combined concepts, why this one won) is written
up separately — ask for `jobmatch-logo-process.html` if you want to see it
again or hand it to the team. `public/favicon.svg` mirrors the same mark,
unsimplified — its geometry (two tiles + one dot) already holds up at
16–32px.

The Home hero has no stock photography — `src/components/HeroIllustration.jsx`
is a composition built from the product's own UI language (a mock search
bar, mini job rows, a floating match badge, a floating location pill) over
a soft gradient/dot-grid background. This keeps the "graphic but still
professional/trustworthy" feel without pulling in external image assets,
and it stays on-brand since it's literally a miniature of the real UI.

## What's intentionally out of scope

Auto-apply, application tracking, chat, notifications, interview prep, and
CV management are represented only as visually secondary "Coming soon"
cards on the Profile page — they are not functional flows.

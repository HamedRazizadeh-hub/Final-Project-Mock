import { ALL_NETHERLANDS } from "../data/locations";

const ALL = "All";

/**
 * Central filtering/sorting logic for job results. Kept framework-agnostic
 * and pure so it's easy to swap the mock JOBS array for a real API response
 * later without touching the pages that call it.
 */
export function searchJobs(jobs, { keyword, province, city, jobType, workMode, experienceLevel, sort }) {
  let results = jobs;

  if (keyword && keyword.trim()) {
    const q = keyword.trim().toLowerCase();
    results = results.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q))
    );
  }

  if (province && province !== ALL_NETHERLANDS) {
    results = results.filter((job) => job.province === province);
  }

  if (city) {
    results = results.filter((job) => job.city === city);
  }

  if (jobType && jobType !== ALL) {
    results = results.filter((job) => job.employmentType === jobType);
  }

  if (workMode && workMode !== ALL) {
    results = results.filter((job) => job.workMode === workMode);
  }

  if (experienceLevel && experienceLevel !== ALL) {
    results = results.filter((job) => job.experienceLevel === experienceLevel);
  }

  const sorted = [...results];
  if (sort === "newest") {
    sorted.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  } else if (sort === "match") {
    sorted.sort((a, b) => (b.matchScore ?? -1) - (a.matchScore ?? -1));
  } else {
    // "Most relevant" — blend of match score and recency, matches score first
    sorted.sort((a, b) => {
      const scoreDiff = (b.matchScore ?? -1) - (a.matchScore ?? -1);
      if (scoreDiff !== 0) return scoreDiff;
      return new Date(b.postedAt) - new Date(a.postedAt);
    });
  }

  return sorted;
}

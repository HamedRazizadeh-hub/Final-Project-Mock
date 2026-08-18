import { normalizeLocation } from "../data/locations";

const ALL = "All";

export function searchJobs(jobs, { keyword, location, jobType, workMode, experienceLevel, sort }) {
  let results = jobs;

  if (keyword && keyword.trim()) {
    const q = keyword.trim().toLowerCase();
    results = results.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q)),
    );
  }

  if (location && location.trim()) {
    const q = normalizeLocation(location).toLowerCase();
    results = results.filter(
      (job) =>
        job.city.toLowerCase().includes(q) ||
        job.workMode.toLowerCase() === q,
    );
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
    sorted.sort((a, b) => {
      const scoreDiff = (b.matchScore ?? -1) - (a.matchScore ?? -1);
      if (scoreDiff !== 0) return scoreDiff;
      return new Date(b.postedAt) - new Date(a.postedAt);
    });
  }

  return sorted;
}

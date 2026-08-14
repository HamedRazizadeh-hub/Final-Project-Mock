import JobCard from "./JobCard";

export default function JobList({ jobs, selectedId, onSelect }) {
  return (
    <div className="flex flex-col gap-4" role="list" aria-label="Job results">
      {jobs.map((job) => (
        <div role="listitem" key={job.id}>
          <JobCard job={job} variant="list" selected={job.id === selectedId} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}

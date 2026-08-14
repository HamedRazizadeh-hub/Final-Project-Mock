export function JobCardSkeleton() {
  return (
    <div className="rounded-xl border border-border-subtle bg-white p-5" aria-hidden="true">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2.5">
          <div className="skeleton h-4 w-2/5 rounded-md" />
          <div className="skeleton h-3 w-1/3 rounded-md" />
          <div className="skeleton h-3 w-1/2 rounded-md" />
          <div className="flex gap-1.5 pt-1">
            <div className="skeleton h-5 w-16 rounded-md" />
            <div className="skeleton h-5 w-16 rounded-md" />
          </div>
        </div>
        <div className="skeleton h-6 w-16 rounded-md" />
      </div>
      <div className="mt-4 skeleton h-3 w-1/4 rounded-md" />
    </div>
  );
}

export function JobListSkeleton({ count = 5 }) {
  return (
    <div className="space-y-4" role="status" aria-label="Loading jobs">
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function WideJobCardSkeleton() {
  return (
    <div className="rounded-xl border border-border-subtle bg-white p-6" aria-hidden="true">
      <div className="flex items-start justify-between">
        <div className="skeleton h-4 w-1/2 rounded-md" />
        <div className="skeleton h-5 w-14 rounded-md" />
      </div>
      <div className="mt-3 skeleton h-3 w-1/3 rounded-md" />
      <div className="mt-2 skeleton h-3 w-2/5 rounded-md" />
      <div className="mt-5 skeleton h-3 w-1/4 rounded-md" />
    </div>
  );
}

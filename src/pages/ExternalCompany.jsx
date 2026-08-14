import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Building2 } from "lucide-react";
import { getJobById } from "../data/jobs";

/**
 * Mock external company career page. Deliberately styled differently from
 * JobMatch (different palette, layout) to reinforce that the user has left
 * the platform, per the MVP rule: JobMatch never hosts an application form.
 */
export default function ExternalCompany() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = getJobById(jobId);

  if (!job) {
    navigate("/jobs");
    return null;
  }

  return (
    <div className="min-h-[80vh] bg-[#f4f1ea]">
      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-serif text-lg font-semibold text-stone-900">
            <Building2 size={20} />
            {job.company}
          </div>
          <button
            type="button"
            onClick={() => navigate(`/jobs/${job.id}`)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-stone-800"
          >
            <ArrowLeft size={15} />
            Back to JobMatch
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Careers at {job.company}</p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-900">{job.title}</h1>
        <p className="mt-2 text-stone-600">{job.city}, Netherlands · {job.employmentType}</p>

        <div className="mt-8 rounded-lg border border-stone-300 bg-white p-8 text-center">
          <p className="text-sm text-stone-500">
            This is a placeholder for {job.company}'s own application form — outside of JobMatch. In the real
            product, this page belongs to the employer.
          </p>
          <button
            type="button"
            disabled
            className="mt-5 cursor-not-allowed rounded-md bg-stone-800 px-6 py-2.5 text-sm font-semibold text-white opacity-60"
          >
            Apply now (external site)
          </button>
        </div>
      </div>
    </div>
  );
}

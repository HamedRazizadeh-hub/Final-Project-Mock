import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { ArrowLeft, Sparkles, ExternalLink, Check, AlertTriangle, ShieldCheck } from "lucide-react";
import MatchScore from "../components/MatchScore";
import SaveButton from "../components/SaveButton";
import JobTags from "../components/JobTags";
import ApplyModal from "../components/ApplyModal";
import MatchExplanation from "../components/MatchExplanation";
import EmptyState from "../components/EmptyState";
import CompanyReviews from "../components/CompanyReviews";
import { getJobById } from "../data/jobs";
import { useApp } from "../context/AppContext";
import { timeAgo } from "../components/SourceFreshness";

export default function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isSaved, toggleSaved } = useApp();
  const [showApply, setShowApply] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

  const job = getJobById(jobId);

  useEffect(() => {
    if (location.hash === "#reviews") {
      const timer = setTimeout(() => {
        document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [location.hash, jobId]);

  if (!job) {
    return (
      <div className="container-app py-16">
        <EmptyState
          icon={AlertTriangle}
          title="Job not found"
          description="This listing may have been removed or the link is incorrect."
          actions={
            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
            >
              Back to Find Jobs
            </button>
          }
        />
      </div>
    );
  }

  const saved = isSaved(job.id);
  const updatedHours = Math.round((new Date("2026-08-13T09:00:00Z") - new Date(job.updatedAt)) / (1000 * 60 * 60));
  const isFresh = updatedHours <= 24;

  return (
    <div className="container-app py-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-800"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          {/* Top section */}
          <div className="rounded-2xl border border-border-subtle bg-white p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <h1 className="text-2xl font-semibold text-navy-900">{job.title}</h1>
                <p className="mt-1 text-base text-navy-600">{job.company}</p>
                <p className="mt-1.5 text-sm text-navy-500">
                  {job.city}, Netherlands · {job.employmentType} · {job.workMode}
                </p>
                <div className="mt-3">
                  <MatchScore score={job.matchScore} size="lg" />
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowApply(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-5 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
              >
                Apply on company site
                <ExternalLink size={15} />
              </button>
              <SaveButton saved={saved} onToggle={() => toggleSaved(job.id)} />
              <button
                type="button"
                onClick={() => setShowExplain(true)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 hover:text-accent-700"
              >
                <Sparkles size={14} />
                Why this match?
              </button>
            </div>
          </div>

          {/* About the job */}
          <Section title="About the job">
            <p className="text-sm leading-6 text-navy-700">{job.description}</p>
          </Section>

          {/* Requirements */}
          <Section title="Requirements">
            <ul className="space-y-2">
              {job.requirements.map((req) => (
                <li key={req} className="flex items-start gap-2.5 text-sm text-navy-700">
                  <Check size={15} className="mt-0.5 shrink-0 text-success-600" />
                  {req}
                </li>
              ))}
            </ul>
          </Section>

          {/* Skills & technologies */}
          <Section title="Skills & Technologies">
            <JobTags tags={job.skills} max={job.skills.length} size="md" />
          </Section>

          {/* Why you match */}
          <Section title="Why you match">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h4 className="flex items-center gap-1.5 text-sm font-semibold text-navy-900">
                  <Check size={15} className="text-success-600" />
                  Strengths
                </h4>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {job.matchStrengths.map((item) => (
                    <li key={item} className="rounded-md bg-success-50 px-2.5 py-1 text-xs font-medium text-success-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="flex items-center gap-1.5 text-sm font-semibold text-navy-900">
                  <AlertTriangle size={15} className="text-warning-600" />
                  Missing / weak requirements
                </h4>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {job.matchGaps.length > 0 ? (
                    job.matchGaps.map((item) => (
                      <li key={item} className="rounded-md bg-warning-50 px-2.5 py-1 text-xs font-medium text-warning-600">
                        {item}
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-navy-500">No significant gaps found.</li>
                  )}
                </ul>
              </div>
            </div>

            {job.matchBreakdown && (
              <div className="mt-5 border-t border-border-subtle pt-4">
                <h4 className="text-sm font-semibold text-navy-900">Match breakdown</h4>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {Object.entries(job.matchBreakdown).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between rounded-lg bg-surface-muted px-3 py-2">
                      <span className="text-xs font-medium capitalize text-navy-600">{key}</span>
                      <span className="text-sm font-semibold text-navy-900">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={() => setShowExplain(true)}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 hover:text-accent-700"
            >
              <Sparkles size={14} />
              View full match explanation
            </button>
          </Section>

          {/* Company reviews */}
          <div className="mt-6 rounded-2xl border border-border-subtle bg-white p-7">
            <CompanyReviews company={job.company} />
          </div>
        </div>

        {/* Side info */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-border-subtle bg-white p-6">
            <h3 className="text-sm font-semibold text-navy-900">Job information</h3>
            <dl className="mt-3 space-y-2.5 text-sm">
              <InfoRow label="Employment type" value={job.employmentType} />
              <InfoRow label="Work mode" value={job.workMode} />
              <InfoRow label="City" value={job.city} />
              <InfoRow label="Province" value={job.province} />
              <InfoRow label="Experience level" value={job.experienceLevel} />
            </dl>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-white p-6">
            <h3 className="text-sm font-semibold text-navy-900">Source & freshness</h3>
            <dl className="mt-3 space-y-2.5 text-sm">
              <InfoRow label="Source" value={job.source} />
              <InfoRow label="Updated" value={`${timeAgo(job.updatedAt)}`} />
            </dl>
            <div
              className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                isFresh ? "bg-success-50 text-success-600" : "bg-warning-50 text-warning-600"
              }`}
            >
              <ShieldCheck size={13} />
              {isFresh ? "Likely still active" : "Verify before applying"}
            </div>
          </div>
        </div>
      </div>

      {showApply && (
        <ApplyModal
          job={job}
          onClose={() => setShowApply(false)}
          onContinue={() => navigate(`/external/${job.id}`)}
        />
      )}
      {showExplain && <MatchExplanation job={job} onClose={() => setShowExplain(false)} />}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-6 rounded-2xl border border-border-subtle bg-white p-7">
      <h2 className="text-base font-semibold text-navy-900">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-navy-500">{label}</dt>
      <dd className="font-medium text-navy-900">{value}</dd>
    </div>
  );
}

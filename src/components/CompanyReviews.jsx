import { useMemo, useState } from "react";
import { MessageSquarePlus, User } from "lucide-react";
import StarRating from "./StarRating";
import { useApp } from "../context/AppContext";
import { SALARY_OPINIONS } from "../data/comments";
import { timeAgo } from "./SourceFreshness";

const SALARY_BADGE_CLASSES = {
  "Below market": "bg-warning-50 text-warning-600",
  "At market": "bg-surface-alt text-navy-600",
  "Above market": "bg-success-50 text-success-600",
  "Not sure": "bg-surface-alt text-navy-500",
};

/**
 * Community "company review" section: what people who've actually worked
 * there say about company quality, salary, and their own tenure. Shown on
 * Job Details (full) and summarized in the Find Jobs preview panel.
 *
 * Mock-data only for now — reviews are seeded per company and anything a
 * user adds is kept in localStorage (see AppContext), not sent anywhere.
 */
export default function CompanyReviews({ company }) {
  const { getComments, addComment } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [tenure, setTenure] = useState("");
  const [quality, setQuality] = useState(0);
  const [salaryOpinion, setSalaryOpinion] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const reviews = getComments(company);

  const average = useMemo(() => {
    if (!reviews.length) return null;
    return reviews.reduce((sum, r) => sum + r.quality, 0) / reviews.length;
  }, [reviews]);

  const resetForm = () => {
    setTenure("");
    setQuality(0);
    setSalaryOpinion("");
    setComment("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quality || !comment.trim()) {
      setError("Please add a quality rating and a short review.");
      return;
    }
    addComment(company, {
      tenure: tenure.trim() || "Prefers not to say",
      quality,
      salaryOpinion: salaryOpinion || "Not sure",
      comment: comment.trim(),
    });
    resetForm();
    setShowForm(false);
  };

  return (
    <div id="reviews">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-semibold text-navy-900">Company reviews</h2>
          {average !== null && (
            <span className="inline-flex items-center gap-1.5 text-sm text-navy-600">
              <StarRating value={Math.round(average)} />
              <span className="font-medium text-navy-900">{average.toFixed(1)}</span>
              <span className="text-navy-400">({reviews.length})</span>
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border-default bg-white px-3.5 py-2 text-sm font-medium text-navy-700 hover:bg-surface-alt transition-colors"
        >
          <MessageSquarePlus size={15} />
          {showForm ? "Cancel" : "Write a review"}
        </button>
      </div>

      <p className="mt-1.5 text-xs text-navy-500">
        Shared by people who've worked at or applied to {company}. Not verified by JobMatch — use your judgment.
      </p>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 rounded-xl border border-border-subtle bg-surface-muted p-4">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="review-tenure" className="text-xs font-medium text-navy-600">
                Your role & time at the company
              </label>
              <input
                id="review-tenure"
                type="text"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder="e.g. Frontend Developer, 2022–2024"
                className="mt-1 w-full rounded-lg border border-border-default bg-white px-3 py-2 text-sm text-navy-900 placeholder:text-navy-400 focus-visible:border-accent-500"
              />
            </div>

            <div>
              <p className="text-xs font-medium text-navy-600">Company quality</p>
              <div className="mt-1.5">
                <StarRating value={quality} onChange={setQuality} size={20} />
              </div>
            </div>

            <div>
              <label htmlFor="review-salary" className="text-xs font-medium text-navy-600">
                Salary opinion
              </label>
              <select
                id="review-salary"
                value={salaryOpinion}
                onChange={(e) => setSalaryOpinion(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border-default bg-white px-3 py-2 text-sm text-navy-900 focus-visible:border-accent-500"
              >
                <option value="">Select an opinion…</option>
                {SALARY_OPINIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="review-comment" className="text-xs font-medium text-navy-600">
                Your review
              </label>
              <textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="What should other candidates know about working here?"
                className="mt-1 w-full rounded-lg border border-border-default bg-white px-3 py-2 text-sm text-navy-900 placeholder:text-navy-400 focus-visible:border-accent-500"
              />
            </div>
          </div>

          {error && <p className="mt-2 text-xs font-medium text-warning-600">{error}</p>}

          <div className="mt-3 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-navy-500 hover:bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
            >
              Post review
            </button>
          </div>
        </form>
      )}

      <ul className="mt-5 space-y-4">
        {reviews.length === 0 && (
          <li className="text-sm text-navy-500">No reviews yet for {company}. Be the first to share your experience.</li>
        )}
        {reviews.map((review) => (
          <li key={review.id} className="rounded-xl border border-border-subtle bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-alt text-navy-500">
                  <User size={15} />
                </span>
                <div>
                  <p className="text-sm font-medium text-navy-900">
                    {review.authorLabel}
                    {review.authorLabel === "You" && (
                      <span className="ml-1.5 rounded-full bg-accent-50 px-1.5 py-0.5 text-[10px] font-semibold text-accent-700">
                        YOU
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-navy-500">{review.tenure}</p>
                </div>
              </div>
              <StarRating value={review.quality} />
            </div>
            <p className="mt-2.5 text-sm leading-6 text-navy-700">{review.comment}</p>
            <div className="mt-2.5 flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${SALARY_BADGE_CLASSES[review.salaryOpinion] || SALARY_BADGE_CLASSES["Not sure"]}`}>
                Salary: {review.salaryOpinion}
              </span>
              <span className="text-[11px] text-navy-400">{timeAgo(review.createdAt)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

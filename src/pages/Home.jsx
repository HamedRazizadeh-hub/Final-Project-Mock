import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Clock3, Sparkles } from "lucide-react";
import SearchBar from "../components/SearchBar";
import Chip from "../components/Chip";
import HeroIllustration from "../components/HeroIllustration";
import { POPULAR_SEARCHES } from "../data/filters";

export default function Home() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const goToSearch = (overrideKeyword) => {
    const params = new URLSearchParams();
    const q = overrideKeyword ?? keyword;
    if (q.trim()) params.set("q", q.trim());
    navigate(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="bg-surface-muted">
      <section className="relative overflow-hidden border-b border-accent-100 bg-[linear-gradient(135deg,#eaf4ff_0%,#f7fbff_52%,#ecfbf3_100%)]">
        <div className="container-app grid grid-cols-1 items-center gap-10 py-14 md:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-white/75 px-3 py-1.5 text-xs font-semibold text-accent-700 shadow-card">
              <Sparkles size={13} />
              Job discovery with transparent matching
            </span>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-navy-950 md:text-5xl">
              Find jobs that fit you and know which ones are worth your time.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-navy-600">
              Search relevant and fresh jobs, understand your match, and avoid wasting time on outdated listings.
            </p>

            <div className="mt-8 max-w-3xl">
              <SearchBar
                keyword={keyword}
                onKeywordChange={setKeyword}
                onSubmit={() => goToSearch()}
                size="lg"
                showLocation={false}
              />
            </div>

            <div className="mt-4 rounded-2xl border border-accent-100 bg-white/70 px-4 py-3 text-sm text-navy-600 shadow-card">
              <span className="font-semibold text-navy-900">Create a profile</span> to unlock match scores, skill insights, saved jobs, and company reviews.
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="text-sm font-medium text-navy-500">Popular searches:</span>
              {POPULAR_SEARCHES.map((term) => (
                <Chip key={term} onClick={() => goToSearch(term)}>
                  {term}
                </Chip>
              ))}
            </div>
          </div>

          <HeroIllustration />
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_100%)]">
        <div className="container-app py-14">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-700">How JobMatch helps</p>
            <h2 className="mt-1 text-2xl font-semibold text-navy-950">Less noise, clearer decisions</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <ValueCard
              icon={CheckCircle2}
              title="Relevant Results"
              description="Search by role, skill, or keyword and scan focused job cards quickly."
              tone="blue"
            />
            <ValueCard
              icon={Clock3}
              title="Fresh & Trustworthy Jobs"
              description="See source and freshness details so stale listings are easier to avoid."
              tone="navy"
            />
            <ValueCard
              icon={Sparkles}
              title="Transparent Matching"
              description="Logged-in users see match score, matched skills, gaps, and a short explanation."
              tone="green"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon: Icon, title, description, tone }) {
  const tones = {
    blue: "bg-accent-50 text-accent-700 border-accent-100",
    navy: "bg-navy-50 text-navy-700 border-navy-100",
    green: "bg-success-50 text-success-600 border-success-600/15",
  };

  return (
    <article className="rounded-2xl border border-border-subtle bg-white/85 p-6 shadow-card">
      <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${tones[tone]}`}>
        <Icon size={20} />
      </span>
      <h3 className="mt-4 text-base font-semibold text-navy-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-navy-600">{description}</p>
    </article>
  );
}

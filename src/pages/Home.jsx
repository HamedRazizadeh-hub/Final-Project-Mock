import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Chip from "../components/Chip";
import HeroIllustration from "../components/HeroIllustration";
import { ALL_NETHERLANDS } from "../data/locations";
import { POPULAR_SEARCHES } from "../data/filters";

export default function Home() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [province, setProvince] = useState(ALL_NETHERLANDS);

  const goToSearch = (overrideKeyword) => {
    const params = new URLSearchParams();
    const q = overrideKeyword ?? keyword;
    if (q.trim()) params.set("q", q.trim());
    if (province && province !== ALL_NETHERLANDS) params.set("province", province);
    navigate(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-subtle bg-white">
        <div className="container-app grid grid-cols-1 items-center gap-10 py-16 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-navy-900">
              Find the right job, faster.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-navy-600">
              Search jobs across the Netherlands and discover opportunities that match your skills and preferences.
            </p>

            <div className="mt-8 max-w-3xl">
              <SearchBar
                keyword={keyword}
                onKeywordChange={setKeyword}
                province={province}
                onProvinceChange={setProvince}
                onSubmit={() => goToSearch()}
                size="lg"
              />
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

      {/* Value proposition strip */}
      <section className="bg-white">
        <div className="container-app grid grid-cols-1 gap-8 py-14 md:grid-cols-3">
          <ValueProp
            title="Strong location filtering"
            description="Search by province, then refine down to the exact city you want to work in."
          />
          <ValueProp
            title="Explainable match %"
            description="Every match score comes with a clear breakdown — no black-box AI numbers."
          />
          <ValueProp
            title="Reliable, fresh listings"
            description="Every job shows when it was posted and last verified, so you know it's still active."
          />
        </div>
      </section>
    </div>
  );
}

function ValueProp({ title, description }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-navy-900">{title}</h3>
      <p className="mt-1.5 text-sm text-navy-600">{description}</p>
    </div>
  );
}

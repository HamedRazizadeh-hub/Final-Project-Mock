import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FindJobs from "./pages/FindJobs";
import JobDetails from "./pages/JobDetails";
import ExternalCompany from "./pages/ExternalCompany";
import SavedJobs from "./pages/SavedJobs";
import Profile from "./pages/Profile";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isExternal = pathname.startsWith("/external");

  return (
    <div className="min-h-screen bg-surface-muted">
      <ScrollToTop />
      {!isExternal && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<FindJobs />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route path="/external/:jobId" element={<ExternalCompany />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

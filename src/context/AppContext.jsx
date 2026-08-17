import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { seedCommentsForCompany } from "../data/comments";
import { PROFILE } from "../data/profile";

const AppContext = createContext(null);

const SAVED_JOBS_KEY = "jobmatch.savedJobs";
const LEGACY_SAVED_JOBS_KEY = "jobmatch.savedJobIds";
const COMMENTS_KEY = "jobmatch.companyComments";
const AUTH_USER_KEY = "jobmatch.authUser";
const PROFILE_KEY = "jobmatch.profile";

export const APPLICATION_STATUSES = ["not_applied", "applied", "rejected"];

export const APPLICATION_STATUS_LABELS = {
  not_applied: "Not applied",
  applied: "Applied",
  rejected: "Rejected",
};

function nowIso() {
  return new Date().toISOString();
}

function loadSavedJobs() {
  try {
    const raw = window.localStorage.getItem(SAVED_JOBS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
    }

    const legacyRaw = window.localStorage.getItem(LEGACY_SAVED_JOBS_KEY);
    if (legacyRaw) {
      const legacyIds = JSON.parse(legacyRaw);
      if (Array.isArray(legacyIds)) {
        const migrated = {};
        legacyIds.forEach((id) => {
          migrated[id] = { savedAt: nowIso(), status: "not_applied" };
        });
        return migrated;
      }
    }

    return {};
  } catch {
    return {};
  }
}

function loadComments() {
  try {
    const raw = window.localStorage.getItem(COMMENTS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function loadAuthUser() {
  try {
    const raw = window.localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function loadProfile() {
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) {
      return {
        ...PROFILE,
        cv: PROFILE.cv || null,
      };
    }

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? { ...PROFILE, cv: null, ...parsed }
      : { ...PROFILE, cv: null };
  } catch {
    return { ...PROFILE, cv: null };
  }
}

function getInitials(nameOrEmail) {
  const value = (nameOrEmail || "").trim();
  if (!value) return "JM";

  const nameParts = value
    .replace(/@.*/, "")
    .split(/\s+/)
    .filter(Boolean);

  return (
    nameParts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "JM"
  );
}

export function AppProvider({ children }) {
  const [savedJobs, setSavedJobs] = useState(() => loadSavedJobs());
  const [comments, setComments] = useState(() => loadComments());
  const [authUser, setAuthUser] = useState(() => loadAuthUser());
  const [profile, setProfile] = useState(() => loadProfile());

  useEffect(() => {
    try {
      window.localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));
    } catch {
      // ignore storage errors
    }
  }, [savedJobs]);

  useEffect(() => {
    try {
      window.localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
    } catch {
      // ignore storage errors
    }
  }, [comments]);

  useEffect(() => {
    try {
      if (authUser) {
        window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
      } else {
        window.localStorage.removeItem(AUTH_USER_KEY);
      }
    } catch {
      // ignore storage errors
    }
  }, [authUser]);

  useEffect(() => {
    try {
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch {
      // ignore storage errors
    }
  }, [profile]);

  const savedIds = useMemo(() => Object.keys(savedJobs), [savedJobs]);

  const isSaved = useCallback((jobId) => Boolean(savedJobs[jobId]), [savedJobs]);

  const toggleSaved = useCallback((jobId) => {
    setSavedJobs((prev) => {
      if (prev[jobId]) {
        const next = { ...prev };
        delete next[jobId];
        return next;
      }

      return {
        ...prev,
        [jobId]: { savedAt: nowIso(), status: "not_applied" },
      };
    });
  }, []);

  const getApplicationStatus = useCallback(
    (jobId) => savedJobs[jobId]?.status || "not_applied",
    [savedJobs],
  );

  const setApplicationStatus = useCallback((jobId, status) => {
    setSavedJobs((prev) => {
      if (!prev[jobId]) return prev;

      return {
        ...prev,
        [jobId]: { ...prev[jobId], status },
      };
    });
  }, []);

  const getSavedAt = useCallback(
    (jobId) => savedJobs[jobId]?.savedAt || null,
    [savedJobs],
  );

  const getComments = useCallback(
    (company) => {
      const userComments = comments[company] || [];

      return [...seedCommentsForCompany(company), ...userComments].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    },
    [comments],
  );

  const addComment = useCallback(
    (company, { tenure, quality, salaryOpinion, comment }) => {
      const entry = {
        id: `user-${Date.now()}-${Math.round(Math.random() * 1e6)}`,
        company,
        authorLabel: "You",
        tenure,
        quality,
        salaryOpinion,
        comment,
        createdAt: nowIso(),
        isSeed: false,
      };

      setComments((prev) => ({
        ...prev,
        [company]: [...(prev[company] || []), entry],
      }));

      return entry;
    },
    [],
  );

  const login = useCallback(({ email }) => {
    const normalizedEmail = email.trim();

    const mockUser = {
      id: `mock-${normalizedEmail.toLowerCase()}`,
      name: normalizedEmail.split("@")[0] || "JobMatch User",
      email: normalizedEmail,
      initials: getInitials(normalizedEmail),
      createdAt: nowIso(),
    };

    setAuthUser(mockUser);
    return mockUser;
  }, []);

  const register = useCallback(({ fullName, email }) => {
    const name = fullName.trim();
    const normalizedEmail = email.trim();

    const mockUser = {
      id: `mock-${Date.now()}`,
      name,
      email: normalizedEmail,
      initials: getInitials(name),
      createdAt: nowIso(),
    };

    setAuthUser(mockUser);
    setProfile((prev) => ({
      ...prev,
      name,
      email: normalizedEmail,
      initials: getInitials(name),
    }));

    return mockUser;
  }, []);

  const logout = useCallback(() => {
    setAuthUser(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      next.initials = getInitials(next.name || next.email);
      return next;
    });

    setAuthUser((prev) => {
      if (!prev) return prev;

      const nextName = updates.name ?? prev.name;
      const nextEmail = updates.email ?? prev.email;

      return {
        ...prev,
        name: nextName,
        email: nextEmail,
        initials: getInitials(nextName || nextEmail),
      };
    });
  }, []);

  const saveCvMetadata = useCallback((file) => {
    if (!file) return;

    setProfile((prev) => ({
      ...prev,
      cv: {
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        uploadedAt: nowIso(),
      },
    }));
  }, []);

  const removeCv = useCallback(() => {
    setProfile((prev) => ({
      ...prev,
      cv: null,
    }));
  }, []);

  const value = useMemo(
    () => ({
      authUser,
      isAuthenticated: Boolean(authUser),
      login,
      register,
      logout,
      profile,
      updateProfile,
      saveCvMetadata,
      removeCv,
      savedIds,
      isSaved,
      toggleSaved,
      getApplicationStatus,
      setApplicationStatus,
      getSavedAt,
      getComments,
      addComment,
    }),
    [
      authUser,
      login,
      register,
      logout,
      profile,
      updateProfile,
      saveCvMetadata,
      removeCv,
      savedIds,
      isSaved,
      toggleSaved,
      getApplicationStatus,
      setApplicationStatus,
      getSavedAt,
      getComments,
      addComment,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }

  return ctx;
}

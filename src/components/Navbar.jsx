import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useApp } from "../context/AppContext";

const MAIN_NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Find Jobs" },
  { to: "/saved", label: "Saved Jobs" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const { authUser, isAuthenticated, logout } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b border-accent-100 bg-white/90 backdrop-blur-md">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <NavLink
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="JobMatch home"
        >
          <Logo size={30} />
          <span className="text-lg font-semibold tracking-tight text-navy-900">
            JobMatch
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {MAIN_NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "bg-surface-alt text-navy-900"
                    : "text-navy-600 hover:bg-surface-alt hover:text-navy-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-100 text-sm font-semibold text-accent-700 ring-2 ring-white"
                aria-label="Your profile"
                title={authUser?.name || "Your profile"}
              >
                {authUser?.initials || "JM"}
              </NavLink>

              <button
                type="button"
                onClick={logout}
                className="hidden rounded-lg border border-border-default bg-white px-3.5 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-surface-alt sm:inline-flex"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-surface-alt hover:text-navy-900 sm:inline-flex"
              >
                Log in
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-lg bg-accent-600 px-3.5 py-2 text-sm font-semibold text-white shadow-card transition-colors hover:bg-accent-700"
              >
                Create account
              </NavLink>
            </>
          )}
        </div>
      </div>

      <nav
        className="flex items-center gap-1 overflow-x-auto border-t border-border-subtle px-4 py-2 md:hidden"
        aria-label="Primary mobile"
      >
        {MAIN_NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ${
                isActive ? "bg-surface-alt text-navy-900" : "text-navy-600"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}

        {!isAuthenticated && (
          <NavLink
            to="/login"
            className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-navy-600 sm:hidden"
          >
            Log in
          </NavLink>
        )}

        {isAuthenticated && (
          <button
            type="button"
            onClick={logout}
            className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-navy-600 sm:hidden"
          >
            Log out
          </button>
        )}
      </nav>
    </header>
  );
}

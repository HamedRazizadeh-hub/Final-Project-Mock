import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Find Jobs" },
  { to: "/saved", label: "Saved Jobs" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 backdrop-blur-sm">
      <div className="container-app flex h-16 items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center gap-2.5 shrink-0"
          aria-label="JobMatch home"
        >
          <Logo size={30} />
          <span className="text-lg font-semibold text-navy-900 tracking-tight">
            JobMatch
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "bg-surface-alt text-navy-900"
                    : "text-navy-600 hover:text-navy-900 hover:bg-surface-alt"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            to="/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-100 text-accent-700 text-sm font-semibold"
            aria-label="Your profile"
          >
            HR
          </NavLink>
        </div>
      </div>

      <nav
        className="md:hidden flex items-center gap-1 overflow-x-auto border-t border-border-subtle px-4 py-2"
        aria-label="Primary mobile"
      >
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                isActive ? "bg-surface-alt text-navy-900" : "text-navy-600"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

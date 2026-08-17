import { Link } from "react-router-dom";
import Logo from "./Logo";

const PRODUCT_LINKS = [
  { to: "/jobs", label: "Find Jobs" },
  { to: "/saved", label: "Saved Jobs" },
  { to: "/profile", label: "Profile" },
];

const ACCOUNT_LINKS = [
  { to: "/login", label: "Log in" },
  { to: "/register", label: "Create account" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-white">
      <div className="container-app py-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5"
              aria-label="JobMatch home"
            >
              <Logo size={30} />
              <span className="text-lg font-semibold tracking-tight text-navy-900">
                JobMatch
              </span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-navy-600">
              Find relevant jobs across the Netherlands, understand why they
              match your profile, and make better application decisions.
            </p>

            <p className="mt-4 text-xs leading-5 text-navy-500">
              Current product mock for the HackYourFuture final project.
            </p>
          </div>

          <FooterGroup title="Product">
            {PRODUCT_LINKS.map((link) => (
              <FooterLink key={link.to} to={link.to}>
                {link.label}
              </FooterLink>
            ))}
          </FooterGroup>

          <FooterGroup title="Why JobMatch">
            <span className="text-sm text-navy-600">Explainable matching</span>
            <span className="text-sm text-navy-600">Fresh job listings</span>
            <span className="text-sm text-navy-600">Reliable job discovery</span>
          </FooterGroup>

          <FooterGroup title="Account">
            {ACCOUNT_LINKS.map((link) => (
              <FooterLink key={link.to} to={link.to}>
                {link.label}
              </FooterLink>
            ))}
          </FooterGroup>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border-subtle pt-5 text-xs text-navy-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 JobMatch. All rights reserved.</p>
          <p>Built as a HackYourFuture final project mock.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, children }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-navy-900">{title}</h2>
      <div className="mt-4 flex flex-col items-start gap-3">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-sm text-navy-600 transition-colors hover:text-navy-900"
    >
      {children}
    </Link>
  );
}

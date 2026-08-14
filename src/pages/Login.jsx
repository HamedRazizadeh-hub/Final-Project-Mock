import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useApp } from "../context/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    login({ email });
    navigate(from, { replace: true });
  };

  return (
    <div className="container-app flex min-h-[calc(100vh-4rem)] items-center justify-center py-10">
      <section className="w-full max-w-md rounded-2xl border border-border-subtle bg-white p-7 shadow-card">
        <div className="flex items-center gap-2.5">
          <Logo size={32} />
          <span className="text-lg font-semibold tracking-tight text-navy-900">JobMatch</span>
        </div>

        <div className="mt-7">
          <h1 className="text-2xl font-semibold tracking-tight text-navy-900">Welcome back</h1>
          <p className="mt-2 text-sm text-navy-600">
            Log in to review saved jobs and manage your profile.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-navy-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border-default bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-300"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-navy-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border-default bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-300"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm font-medium text-warning-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
          >
            Log in
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-navy-600">
          New to JobMatch?{" "}
          <Link to="/register" className="font-semibold text-accent-700 hover:text-accent-600">
            Create account
          </Link>
        </p>

        <p className="mt-5 rounded-xl border border-border-subtle bg-surface-muted p-3 text-xs text-navy-500">
          Prototype note: this mock stores a small user object locally. Real authentication will be handled by the
          backend later, and passwords are not saved.
        </p>
      </section>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useApp } from "../context/AppContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useApp();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords must match.");
      return;
    }

    register({ fullName, email });
    navigate("/", { replace: true });
  };

  return (
    <div className="container-app flex min-h-[calc(100vh-4rem)] items-center justify-center py-10">
      <section className="w-full max-w-md rounded-2xl border border-border-subtle bg-white p-7 shadow-card">
        <div className="flex items-center gap-2.5">
          <Logo size={32} />
          <span className="text-lg font-semibold tracking-tight text-navy-900">JobMatch</span>
        </div>

        <div className="mt-7">
          <h1 className="text-2xl font-semibold tracking-tight text-navy-900">Create your account</h1>
          <p className="mt-2 text-sm text-navy-600">
            Start with the basics. Skills and preferences stay in the profile flow.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="text-sm font-medium text-navy-700">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border-default bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-300"
              placeholder="Hannah Ruiter"
              autoComplete="name"
            />
          </div>

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
              placeholder="Minimum 6 characters"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-navy-700">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border-default bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-300"
              placeholder="Repeat your password"
              autoComplete="new-password"
            />
          </div>

          {error && <p className="text-sm font-medium text-warning-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
          >
            Create account
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-navy-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-accent-700 hover:text-accent-600">
            Log in
          </Link>
        </p>
      </section>
    </div>
  );
}

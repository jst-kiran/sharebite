import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("donor");
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const ROLE_OPTIONS = [
    { id: "donor", label: "Donor", desc: "Share surplus food" },
    { id: "ngo", label: "NGO", desc: "Claim & distribute food" },
    { id: "admin", label: "Admin", desc: "Platform control center" },
    { id: "volunteer", label: "Volunteer", desc: "Coming Soon", disabled: true },
  ];

  function handleRoleSelect(roleId) {
    if (roleId === "volunteer") return;
    setSelectedRole(roleId);
    if (!form.email || form.email.includes("@")) {
      if (roleId === "admin") setForm((p) => ({ ...p, email: "admin@example.com" }));
      else if (roleId === "ngo") setForm((p) => ({ ...p, email: "ngo@example.com" }));
      else setForm((p) => ({ ...p, email: "donor@example.com" }));
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });

    try {
      const user = login(form.email, selectedRole);
      const targetRole = user.role.toLowerCase();
      setStatus({ state: "success", message: `Logged in as ${targetRole.toUpperCase()}... Redirecting` });

      setTimeout(() => {
        if (targetRole === "admin") {
          navigate("/admin/dashboard");
        } else if (targetRole === "ngo") {
          navigate("/ngo/dashboard");
        } else {
          navigate("/donor/dashboard");
        }
      }, 500);
    } catch (err) {
      setStatus({ state: "error", message: "Failed to log in. Please try again." });
    }
  }

  return (
    <section className="container-page flex min-h-[75vh] items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="eyebrow !text-forest">Welcome back</span>
          <h1 className="mt-2 text-3xl font-bold font-display text-forest-dark">Log in to ShareBite</h1>
          <p className="mt-1.5 text-xs text-ink/60">
            Select your account role to access your dedicated workspace.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="mb-6 space-y-2">
          <label className="text-xs font-bold text-forest-dark block text-left">
            Select Role:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ROLE_OPTIONS.map((r) => {
              const isSelected = selectedRole === r.id;
              return (
                <button
                  type="button"
                  key={r.id}
                  disabled={r.disabled}
                  onClick={() => handleRoleSelect(r.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    r.disabled
                      ? "opacity-50 cursor-not-allowed bg-stone/40 border-ink/10"
                      : isSelected
                      ? "bg-forest text-paper border-forest shadow-sm font-bold"
                      : "bg-white text-ink/80 border-ink/15 hover:border-forest/40"
                  }`}
                >
                  <span className="block text-xs font-bold">{r.label}</span>
                  <span className={`block text-[10px] ${isSelected ? "text-paper/80" : "text-ink/50"}`}>
                    {r.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="card !bg-white p-6 sm:p-8 space-y-5 border border-ink/10">
          <InputField
            label="Email address *"
            id="email"
            name="email"
            type="email"
            placeholder={
              selectedRole === "admin"
                ? "admin@example.com"
                : selectedRole === "ngo"
                ? "ngo@example.com"
                : "donor@example.com"
            }
            value={form.email}
            onChange={handleChange}
            required
          />

          <InputField
            label="Password *"
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />

          {status.state === "error" && (
            <p className="text-xs font-bold text-red-600">{status.message}</p>
          )}
          {status.state === "success" && (
            <p className="text-xs font-bold text-fern">{status.message}</p>
          )}

          <Button type="submit" className="w-full !py-2.5" disabled={status.state === "loading"}>
            {status.state === "loading"
              ? "Logging in..."
              : `Log in as ${selectedRole.toUpperCase()}`}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-ink/60">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-forest hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;

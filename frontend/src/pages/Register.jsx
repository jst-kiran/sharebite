import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("donor");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    organizationName: "",
  });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const ROLE_OPTIONS = [
    { id: "donor", label: "Donor", desc: "Share surplus food" },
    { id: "ngo", label: "NGO", desc: "Claim & distribute food" },
    { id: "admin", label: "Admin", desc: "Platform control center" },
    { id: "volunteer", label: "Volunteer", desc: "Coming Soon", disabled: true },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });

    try {
      const user = login(form.email, selectedRole, form.fullName || form.organizationName);
      setStatus({ state: "success", message: `Account created for ${user.role.toUpperCase()}... Redirecting` });

      setTimeout(() => {
        if (selectedRole === "admin") {
          navigate("/admin/dashboard");
        } else if (selectedRole === "ngo") {
          navigate("/ngo/dashboard");
        } else {
          navigate("/donor/dashboard");
        }
      }, 500);
    } catch (err) {
      setStatus({ state: "error", message: "Registration failed. Please try again." });
    }
  }

  return (
    <section className="container-page flex min-h-[75vh] items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="eyebrow !text-forest">Join ShareBite</span>
          <h1 className="mt-2 text-3xl font-bold font-display text-forest-dark">Create your account</h1>
          <p className="mt-1.5 text-xs text-ink/60">
            Register as a Food Donor, Partner NGO, or System Admin.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="mb-6 space-y-2">
          <label className="text-xs font-bold text-forest-dark block text-left">
            Register As:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ROLE_OPTIONS.map((r) => {
              const isSelected = selectedRole === r.id;
              return (
                <button
                  type="button"
                  key={r.id}
                  disabled={r.disabled}
                  onClick={() => setSelectedRole(r.id)}
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

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="card !bg-white p-6 sm:p-8 space-y-4 border border-ink/10">
          <InputField
            label="Full Name or Primary Contact *"
            id="fullName"
            name="fullName"
            placeholder="Jane Doe"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <InputField
            label="Organization or Business Name *"
            id="organizationName"
            name="organizationName"
            placeholder={
              selectedRole === "admin"
                ? "ShareBite Inc."
                : selectedRole === "ngo"
                ? "Helping Hands Foundation"
                : "Green Gourmet Catering"
            }
            value={form.organizationName}
            onChange={handleChange}
            required
          />

          <InputField
            label="Email address *"
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
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
              ? "Registering..."
              : `Create ${selectedRole.toUpperCase()} Account`}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-ink/60">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-forest hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;

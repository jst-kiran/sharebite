import { useState } from "react";
import { useDonor } from "../../context/DonorContext";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";

function Profile() {
  const { profile, updateProfile } = useDonor();

  const [form, setForm] = useState({
    fullName: profile.fullName || "",
    organizationName: profile.organizationName || "",
    email: profile.email || "",
    phoneNumber: profile.phoneNumber || "",
    address: profile.address || "",
    avatarUrl: profile.avatarUrl,
  });

  const [toast, setToast] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateProfile(form);
    setToast("Profile changes saved successfully!");
    setTimeout(() => setToast(null), 4000);
  }

  function handleCancel() {
    setForm({
      fullName: profile.fullName || "",
      organizationName: profile.organizationName || "",
      email: profile.email || "",
      phoneNumber: profile.phoneNumber || "",
      address: profile.address || "",
      avatarUrl: profile.avatarUrl,
    });
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-12">
      {/* Header */}
      <div>
        <span className="eyebrow !text-forest">
          Donor Settings
        </span>
        <h1 className="font-display text-3xl font-bold text-forest-dark mt-1">
          Profile Settings
        </h1>
        <p className="text-sm text-ink/60 mt-1">
          Manage your personal details and organization profile.
        </p>
      </div>

      {/* Success Toast Banner */}
      {toast && (
        <div className="rounded-xl bg-[#DCFCE7] p-4 border border-[#86EFAC] text-xs font-semibold text-[#15803D] flex items-center gap-2 animate-fadeIn">
          <svg className="h-4 w-4 shrink-0 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{toast}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="card !bg-white p-6 sm:p-8 space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-5 border-b border-ink/10 pb-6">
          <img
            src={form.avatarUrl}
            alt="Profile Preview"
            className="h-16 w-16 rounded-full object-cover border-2 border-forest/20 shadow-sm"
          />
          <div>
            <h3 className="font-display text-lg font-bold text-forest-dark">
              {form.fullName || "Jane Doe"}
            </h3>
            <p className="text-xs text-ink/50">
              {form.organizationName ? `${form.organizationName} • Registered Donor` : "Individual Donor"}
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid gap-6 sm:grid-cols-2">
          <InputField
            label="Full Name *"
            id="fullName"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <InputField
            label="Organization / Restaurant / Hotel Name (Optional)"
            id="organizationName"
            name="organizationName"
            type="text"
            placeholder="e.g. Green Gourmet Catering"
            value={form.organizationName}
            onChange={handleChange}
            helperText="Suitable for both individual donors and businesses."
          />

          <InputField
            label="Email Address *"
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <InputField
            label="Phone Number *"
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />

          <div className="sm:col-span-2">
            <InputField
              label="Primary Pickup Address *"
              id="address"
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              helperText="Default location pre-filled when posting new donations."
              required
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-ink/10">
          <button
            type="button"
            onClick={handleCancel}
            className="btn-secondary !px-5"
          >
            Cancel
          </button>
          <Button type="submit" className="!px-6">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Profile;

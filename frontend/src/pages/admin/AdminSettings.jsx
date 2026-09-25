import { useState } from "react";
import { useApp } from "../../context/AppContext";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";

function AdminSettings() {
  const { systemSettings, updateSystemSettings } = useApp();

  const [form, setForm] = useState({
    platformName: systemSettings.platformName || "",
    supportEmail: systemSettings.supportEmail || "",
    foodSafetyNotice: systemSettings.foodSafetyNotice || "",
    autoVerifyNgo: systemSettings.autoVerifyNgo ?? false,
    maxPickupRadiusKm: systemSettings.maxPickupRadiusKm || 25,
  });

  const [toast, setToast] = useState(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateSystemSettings(form);
    setToast("System configuration settings saved successfully!");
    setTimeout(() => setToast(null), 4000);
  }

  function handleReset() {
    setForm({
      platformName: systemSettings.platformName || "",
      supportEmail: systemSettings.supportEmail || "",
      foodSafetyNotice: systemSettings.foodSafetyNotice || "",
      autoVerifyNgo: systemSettings.autoVerifyNgo ?? false,
      maxPickupRadiusKm: systemSettings.maxPickupRadiusKm || 25,
    });
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <span className="eyebrow !text-purple-700">
          System Control
        </span>
        <h1 className="font-display text-3xl font-bold text-forest-dark mt-1">
          System Configuration Settings
        </h1>
        <p className="text-sm text-ink/60 mt-1">
          Manage platform identity, support contact emails, safety guidelines, and verification rules.
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
        <h2 className="font-display text-xl font-bold text-forest-dark border-b border-ink/10 pb-3">
          Platform Configuration
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <InputField
            label="Platform Title / Branding *"
            id="platformName"
            name="platformName"
            type="text"
            value={form.platformName}
            onChange={handleChange}
            helperText="Public platform display name."
            required
          />

          <InputField
            label="Official Support Email *"
            id="supportEmail"
            name="supportEmail"
            type="email"
            value={form.supportEmail}
            onChange={handleChange}
            helperText="Recipient for platform inquiries and donor help."
            required
          />

          <InputField
            label="Default NGO Pickup Radius (Km) *"
            id="maxPickupRadiusKm"
            name="maxPickupRadiusKm"
            type="number"
            min="5"
            max="100"
            value={form.maxPickupRadiusKm}
            onChange={handleChange}
            helperText="Maximum geographical matching distance."
            required
          />

          {/* Auto-Verify Checkbox Toggle */}
          <div className="flex flex-col justify-center space-y-2 p-4 rounded-xl bg-stone/40 border border-ink/5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="autoVerifyNgo"
                checked={form.autoVerifyNgo}
                onChange={handleChange}
                className="h-4 w-4 text-forest rounded border-ink/30 focus:ring-forest"
              />
              <span className="text-xs font-bold text-forest-dark">
                Auto-Verify Newly Registered NGOs
              </span>
            </label>
            <p className="text-[11px] text-ink/60 pl-7">
              If enabled, newly registered NGO accounts skip manual admin review.
            </p>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="foodSafetyNotice" className="field-label">Food Safety Guidelines Disclaimer *</label>
            <textarea
              id="foodSafetyNotice"
              name="foodSafetyNotice"
              rows="4"
              value={form.foodSafetyNotice}
              onChange={handleChange}
              className="field-input"
              required
            />
            <p className="mt-1 text-xs text-ink/50">Displayed to donors during the donation posting process.</p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-ink/10">
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary !px-5"
          >
            Reset Form
          </button>
          <Button type="submit" className="!px-6">
            Save System Settings
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminSettings;

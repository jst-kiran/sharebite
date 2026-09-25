import { useState } from "react";
import { useNgo } from "../../context/NgoContext";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";

const NGO_TYPES = [
  "Shelter & Food Bank Network",
  "Community Relief Kitchen",
  "Youth & Family Center",
  "Elderly Care Foundation",
  "Disaster Relief NGO",
];

const CATEGORIES_LIST = [
  "Cooked Meals",
  "Bakery & Surplus",
  "Packaged & Shelf Stable",
  "Fresh Produce / Vegetables",
  "Dairy & Beverages",
];

function NgoProfile() {
  const { ngoProfile, updateNgoProfile } = useNgo();

  const [form, setForm] = useState({
    ngoName: ngoProfile.ngoName || "",
    ngoType: ngoProfile.ngoType || NGO_TYPES[0],
    contactPerson: ngoProfile.contactPerson || "",
    email: ngoProfile.email || "",
    phone: ngoProfile.phone || "",
    address: ngoProfile.address || "",
    serviceArea: ngoProfile.serviceArea || "",
    categoriesAccepted: ngoProfile.categoriesAccepted || CATEGORIES_LIST.slice(0, 3),
    description: ngoProfile.description || "",
    logoUrl: ngoProfile.logoUrl,
  });

  const [toast, setToast] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCategoryToggle(cat) {
    setForm((prev) => {
      const exists = prev.categoriesAccepted.includes(cat);
      const updated = exists
        ? prev.categoriesAccepted.filter((c) => c !== cat)
        : [...prev.categoriesAccepted, cat];
      return { ...prev, categoriesAccepted: updated };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateNgoProfile(form);
    setToast("NGO profile details updated successfully!");
    setTimeout(() => setToast(null), 4000);
  }

  function handleCancel() {
    setForm({
      ngoName: ngoProfile.ngoName || "",
      ngoType: ngoProfile.ngoType || NGO_TYPES[0],
      contactPerson: ngoProfile.contactPerson || "",
      email: ngoProfile.email || "",
      phone: ngoProfile.phone || "",
      address: ngoProfile.address || "",
      serviceArea: ngoProfile.serviceArea || "",
      categoriesAccepted: ngoProfile.categoriesAccepted || CATEGORIES_LIST.slice(0, 3),
      description: ngoProfile.description || "",
      logoUrl: ngoProfile.logoUrl,
    });
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <span className="eyebrow !text-forest">
          NGO Settings
        </span>
        <h1 className="font-display text-3xl font-bold text-forest-dark mt-1">
          NGO Organization Profile
        </h1>
        <p className="text-sm text-ink/60 mt-1">
          Manage your NGO organization profile, service area, and accepted food categories.
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
        {/* NGO Avatar Header */}
        <div className="flex items-center gap-5 border-b border-ink/10 pb-6">
          <img
            src={form.logoUrl}
            alt="NGO Logo Preview"
            className="h-16 w-16 rounded-full object-cover border-2 border-forest/20 shadow-sm"
          />
          <div>
            <h3 className="font-display text-lg font-bold text-forest-dark">
              {form.ngoName || "Helping Hands Foundation"}
            </h3>
            <p className="text-xs text-ink/50">
              {form.ngoType} • Verified Non-Profit Partner
            </p>
          </div>
        </div>

        {/* Core Info */}
        <div className="grid gap-6 sm:grid-cols-2">
          <InputField
            label="NGO Organization Name *"
            id="ngoName"
            name="ngoName"
            type="text"
            value={form.ngoName}
            onChange={handleChange}
            required
          />

          <div>
            <label htmlFor="ngoType" className="field-label">NGO Type *</label>
            <select
              id="ngoType"
              name="ngoType"
              value={form.ngoType}
              onChange={handleChange}
              className="field-input"
            >
              {NGO_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <InputField
            label="Contact Person Name *"
            id="contactPerson"
            name="contactPerson"
            type="text"
            value={form.contactPerson}
            onChange={handleChange}
            required
          />

          <InputField
            label="Official Email Address *"
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <InputField
            label="Phone Number *"
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <InputField
            label="Service Area Coverage *"
            id="serviceArea"
            name="serviceArea"
            type="text"
            placeholder="e.g. Downtown Metro & East District"
            value={form.serviceArea}
            onChange={handleChange}
            helperText="Regions where your NGO distributes meals."
            required
          />

          <div className="sm:col-span-2">
            <InputField
              label="Headquarters / Dispatch Address *"
              id="address"
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Accepted Categories Selector */}
        <div className="space-y-2 border-t border-ink/10 pt-6">
          <label className="field-label">Food Categories Accepted *</label>
          <p className="text-xs text-ink/50 mb-2">
            Select food types your facility can receive and safely store.
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES_LIST.map((cat) => {
              const isSelected = form.categoriesAccepted.includes(cat);
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleCategoryToggle(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-forest text-paper shadow-sm"
                      : "bg-stone/60 text-ink/70 hover:bg-stone"
                  }`}
                >
                  {isSelected ? `✓ ${cat}` : `+ ${cat}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mission Description */}
        <div className="space-y-1 border-t border-ink/10 pt-6">
          <label htmlFor="description" className="field-label">Organization Description & Mission</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            className="field-input"
          />
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
            Save NGO Settings
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NgoProfile;

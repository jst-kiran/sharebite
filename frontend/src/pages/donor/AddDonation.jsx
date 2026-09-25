import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDonor } from "../../context/DonorContext";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import ImageUpload from "../../components/donor/ImageUpload";

const CATEGORIES = [
  "Cooked Meals",
  "Bakery & Surplus",
  "Packaged & Shelf Stable",
  "Fresh Produce / Vegetables",
  "Dairy & Beverages",
];

const STORAGE_CONDITIONS = [
  "Room Temperature (Dry Crates)",
  "Refrigerated (Chilled)",
  "Insulated Thermal Containers (Hot)",
  "Frozen Storage",
];

// Formats a Date as "YYYY-MM-DDTHH:mm" for a datetime-local input's default value.
function toDatetimeLocal(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function AddDonation() {
  const { profile, addDonation } = useDonor();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    foodName: "",
    category: CATEGORIES[0],
    quantity: "",
    estimatedMeals: "",
    isVeg: true,
    prepTime: toDatetimeLocal(new Date()),
    storageCondition: STORAGE_CONDITIONS[0],
    pickupAddress: profile.address || "",
    contactPhone: profile.phoneNumber || "",
    pickupAvailability: "Today between 4:00 PM - 7:00 PM",
    availableUntil: toDatetimeLocal(new Date(Date.now() + 4 * 3600 * 1000)),
    description: "",
    imagePreview: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleVegToggle(isVegVal) {
    setForm((prev) => ({ ...prev, isVeg: isVegVal }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addDonation(form);
    navigate("/donor/my-donations");
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Page Header */}
      <div>
        <span className="eyebrow !text-forest">
          Donation Creation
        </span>
        <h1 className="font-display text-3xl font-bold text-forest-dark mt-1">
          Post Surplus Food Donation
        </h1>
        <p className="text-sm text-ink/60 mt-1">
          Complete the four sections below to list surplus meals for verified local NGOs.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION 1: FOOD INFORMATION */}
        <div className="card !bg-white p-6 sm:p-8 space-y-6">
          <div className="border-b border-ink/10 pb-4">
            <h2 className="font-display text-xl font-bold text-forest-dark flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-paper text-xs font-bold">1</span>
              <span>Food Information</span>
            </h2>
            <p className="text-xs text-ink/60 mt-1">
              Basic details about the surplus food being donated.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <InputField
              label="Food Name / Title *"
              id="foodName"
              name="foodName"
              type="text"
              placeholder="e.g. Fresh Vegetable Meal Boxes"
              value={form.foodName}
              onChange={handleChange}
              helperText="Give a descriptive title for your food item."
              required
            />

            <div>
              <label htmlFor="category" className="field-label">Food Category *</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="field-input"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-ink/50">Categorize for NGO search convenience.</p>
            </div>

            <InputField
              label="Quantity & Unit *"
              id="quantity"
              name="quantity"
              type="text"
              placeholder="e.g. 35 Boxes or 20 Kg"
              value={form.quantity}
              onChange={handleChange}
              helperText="Specify weight, box count, or containers."
              required
            />

            <InputField
              label="Estimated Meals Provided *"
              id="estimatedMeals"
              name="estimatedMeals"
              type="number"
              min="1"
              placeholder="e.g. 35"
              value={form.estimatedMeals}
              onChange={handleChange}
              helperText="Approximate number of individual servings."
              required
            />

            {/* Veg / Non-Veg Selector */}
            <div>
              <label className="field-label">Dietary Type *</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleVegToggle(true)}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border font-bold text-xs transition-colors ${
                    form.isVeg
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                      : "border-ink/15 bg-white text-ink/70 hover:border-forest/40"
                  }`}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-[#16A34A]" />
                  <span>Vegetarian</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleVegToggle(false)}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border font-bold text-xs transition-colors ${
                    !form.isVeg
                      ? "border-red-600 bg-red-50 text-red-800"
                      : "border-ink/15 bg-white text-ink/70 hover:border-forest/40"
                  }`}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-[#DC2626]" />
                  <span>Non-Vegetarian</span>
                </button>
              </div>
            </div>

            <InputField
              label="Preparation Time *"
              id="prepTime"
              name="prepTime"
              type="datetime-local"
              value={form.prepTime}
              onChange={handleChange}
              helperText="When the food was cooked or packaged. Used to calculate rescue priority."
              required
            />

            <div className="sm:col-span-2">
              <label htmlFor="storageCondition" className="field-label">Storage Condition *</label>
              <select
                id="storageCondition"
                name="storageCondition"
                value={form.storageCondition}
                onChange={handleChange}
                className="field-input"
              >
                {STORAGE_CONDITIONS.map((cond) => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: PICKUP DETAILS */}
        <div className="card !bg-white p-6 sm:p-8 space-y-6">
          <div className="border-b border-ink/10 pb-4">
            <h2 className="font-display text-xl font-bold text-forest-dark flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-paper text-xs font-bold">2</span>
              <span>Pickup Details</span>
            </h2>
            <p className="text-xs text-ink/60 mt-1">
              Where and when NGOs can collect the donation.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <InputField
                label="Pickup Address *"
                id="pickupAddress"
                name="pickupAddress"
                type="text"
                placeholder="Full address where food is located"
                value={form.pickupAddress}
                onChange={handleChange}
                helperText="Provide full street address, floor, or loading bay instructions."
                required
              />
            </div>

            <InputField
              label="Pickup Contact Phone *"
              id="contactPhone"
              name="contactPhone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={form.contactPhone}
              onChange={handleChange}
              helperText="Number for the claiming NGO to coordinate arrival."
              required
            />

            <InputField
              label="Pickup Availability Window *"
              id="pickupAvailability"
              name="pickupAvailability"
              type="text"
              placeholder="e.g. Today between 4:00 PM - 7:00 PM"
              value={form.pickupAvailability}
              onChange={handleChange}
              helperText="Specify the time window when pickup is supported."
              required
            />

            <InputField
              label="Available Until (Pickup Deadline) *"
              id="availableUntil"
              name="availableUntil"
              type="datetime-local"
              value={form.availableUntil}
              onChange={handleChange}
              helperText="Latest time an NGO can collect this donation. Used to calculate rescue priority."
              required
            />
          </div>
        </div>

        {/* SECTION 3: ADDITIONAL INFORMATION */}
        <div className="card !bg-white p-6 sm:p-8 space-y-6">
          <div className="border-b border-ink/10 pb-4">
            <h2 className="font-display text-xl font-bold text-forest-dark flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-paper text-xs font-bold">3</span>
              <span>Additional Information</span>
            </h2>
            <p className="text-xs text-ink/60 mt-1">
              Optional description, allergens note, and food image upload.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="description" className="field-label">Special Notes & Description</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                placeholder="Include details about ingredients, packaging, or special handling notes..."
                value={form.description}
                onChange={handleChange}
                className="field-input"
              />
            </div>

            <ImageUpload
              label="Food Photo (Optional Preview)"
              onImageChange={(dataUrl) => setForm((prev) => ({ ...prev, imagePreview: dataUrl }))}
            />
          </div>
        </div>

        {/* SECTION 4: REVIEW & SUBMIT */}
        <div className="card !bg-stone/50 p-6 sm:p-8 space-y-6 border border-forest/20">
          <div className="border-b border-ink/10 pb-4">
            <h2 className="font-display text-xl font-bold text-forest-dark flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-paper text-xs font-bold">4</span>
              <span>Review & Post Donation</span>
            </h2>
            <p className="text-xs text-ink/60 mt-1">
              Verify your donation details before broadcasting to nearby NGOs.
            </p>
          </div>

          {/* Review Summary Box */}
          <div className="rounded-xl bg-white p-4 space-y-2 border border-ink/10 text-xs text-ink/80">
            <div className="flex justify-between border-b border-ink/5 pb-2">
              <span className="font-bold text-forest-dark">Food Item:</span>
              <span className="font-semibold">{form.foodName || "Not specified yet"}</span>
            </div>
            <div className="flex justify-between border-b border-ink/5 pb-2">
              <span className="font-bold text-forest-dark">Quantity & Servings:</span>
              <span>{form.quantity || "N/A"} ({form.estimatedMeals || "0"} Meals)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-forest-dark">Pickup Location:</span>
              <span className="truncate max-w-xs">{form.pickupAddress || "N/A"}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-2">
            <Link to="/donor/my-donations" className="btn-secondary w-full sm:w-auto">
              Cancel
            </Link>
            <Button type="submit" className="w-full sm:w-auto !px-8">
              Post Donation
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddDonation;

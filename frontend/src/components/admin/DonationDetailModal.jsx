import StatusBadge from "../donor/StatusBadge";
import Timeline from "../donor/Timeline";
import FoodImage from "../common/FoodImage";

/**
 * Admin Side Panel Modal for inspecting complete donation details without navigating away.
 */
function DonationDetailModal({ donation, isOpen, onClose, onStatusChange }) {
  if (!isOpen || !donation) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-forest-dark/40 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click */}
      <div className="flex-1" onClick={onClose} />

      {/* Side Drawer Content */}
      <div className="relative w-full max-w-xl bg-white h-full overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink/10 pb-4">
          <div>
            <span className="eyebrow !text-forest">
              Admin Inspection Panel
            </span>
            <h2 className="font-display text-xl font-bold text-forest-dark">
              Donation Details ({donation.id})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-stone text-ink/70 hover:bg-forest/10 hover:text-forest-dark"
          >
            ✕
          </button>
        </div>

        {/* Food Image */}
        <div className="relative">
          <FoodImage
            src={donation.image}
            alt={donation.foodName}
            aspectRatio="aspect-[16/9]"
          />
          <div className="absolute top-3 right-3 z-10">
            <StatusBadge status={donation.status} />
          </div>
        </div>

        {/* Food Name & Category */}
        <div className="space-y-1">
          <span className="eyebrow !text-fern text-[10px]">
            {donation.category}
          </span>
          <h3 className="font-display text-2xl font-bold text-forest-dark">
            {donation.foodName}
          </h3>
          <p className="text-xs text-ink/60">
            Posted: {donation.postedDate}
          </p>
        </div>

        {/* Logistics Metrics */}
        <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-stone/40 text-xs">
          <div>
            <span className="block text-ink/50 text-[10px]">Quantity</span>
            <span className="font-bold text-forest-dark">{donation.quantity}</span>
          </div>
          <div>
            <span className="block text-ink/50 text-[10px]">Est. Meals</span>
            <span className="font-bold text-forest-dark">{donation.estimatedMeals} Servings</span>
          </div>
          <div>
            <span className="block text-ink/50 text-[10px]">Type</span>
            <span className="font-bold text-forest-dark">{donation.isVeg ? "Vegetarian" : "Non-Veg"}</span>
          </div>
        </div>

        {/* Donor & NGO Parties Info */}
        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-stone/30 space-y-1 border border-ink/5">
            <span className="font-bold text-forest-dark block uppercase tracking-wider text-[10px]">Donor Party</span>
            <p className="text-ink font-semibold">{donation.donorName || "Verified Donor"}</p>
            <p className="text-ink/60 truncate">{donation.donorEmail}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-stone/30 space-y-1 border border-ink/5">
            <span className="font-bold text-forest-dark block uppercase tracking-wider text-[10px]">Claiming NGO</span>
            <p className="text-ink font-semibold">{donation.ngoName || "Awaiting Claim"}</p>
            <p className="text-ink/60">{donation.acceptedDate || "N/A"}</p>
          </div>
        </div>

        {/* Pickup Address */}
        <div className="p-3.5 rounded-xl bg-stone/30 space-y-1 text-xs border border-ink/5">
          <span className="font-bold text-forest-dark block uppercase tracking-wider text-[10px]">Pickup Location & Contact</span>
          <p className="text-ink">{donation.pickupAddress}</p>
          <p className="text-ink/60 font-semibold">{donation.contactPhone}</p>
        </div>

        {/* Admin Status Override Action */}
        <div className="p-4 rounded-xl bg-forest/5 border border-forest/15 space-y-2">
          <label className="text-xs font-bold text-forest-dark block">
            Admin Status Override
          </label>
          <div className="flex gap-2">
            {["Pending", "Accepted", "Completed"].map((st) => (
              <button
                type="button"
                key={st}
                onClick={() => onStatusChange(donation.id, st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  donation.status === st
                    ? "bg-forest text-paper shadow-sm"
                    : "bg-white text-ink/70 border border-ink/10 hover:bg-stone/60"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* 5-Step Timeline */}
        <div className="pt-2">
          <Timeline steps={donation.timeline} />
        </div>
      </div>
    </div>
  );
}

export default DonationDetailModal;

import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import FoodImage from "../common/FoodImage";

/**
 * Rich Visual Donation Card component for MyDonations & Recent Donations.
 * Uses reusable FoodImage component for consistent 4:3 ratio and onError fallback.
 */
function DonationCard({ donation, className = "" }) {
  const {
    id,
    foodName,
    category,
    quantity,
    estimatedMeals,
    isVeg,
    status,
    postedDate,
    image,
  } = donation;

  return (
    <div className={`card !bg-white overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-md ${className}`}>
      <div>
        {/* Food Image & Top Badges */}
        <div className="relative mb-4">
          <FoodImage
            src={image}
            alt={foodName}
            aspectRatio="aspect-[4/3]"
          />
          {/* Status Badge overlay */}
          <div className="absolute top-3 right-3 z-10">
            <StatusBadge status={status} />
          </div>
          {/* Veg / Non-Veg Badge overlay */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                isVeg ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#FEE2E2] text-[#B91C1C]"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${isVeg ? "bg-[#16A34A]" : "bg-[#DC2626]"}`} />
              {isVeg ? "Veg" : "Non-Veg"}
            </span>
          </div>
        </div>

        {/* Header Info */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-fern">
              {category}
            </span>
            <span className="text-xs text-ink/50">
              Posted: {postedDate}
            </span>
          </div>
          <h3 className="font-display text-lg font-bold text-forest-dark group-hover:text-forest transition-colors leading-snug">
            {foodName}
          </h3>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 my-3 p-3 rounded-xl bg-stone/40 text-xs">
          <div>
            <span className="block text-ink/50 text-[11px]">Quantity</span>
            <span className="font-bold text-forest-dark">{quantity}</span>
          </div>
          <div>
            <span className="block text-ink/50 text-[11px]">Est. Meals</span>
            <span className="font-bold text-forest-dark">{estimatedMeals} Meals</span>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="pt-3 border-t border-ink/5 flex items-center justify-between">
        <span className="text-xs text-ink/60">
          ID: <span className="font-mono">{id}</span>
        </span>
        <Link
          to={`/donor/donation/${id}`}
          className="btn-secondary !px-4 !py-1.5 text-xs font-semibold"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default DonationCard;

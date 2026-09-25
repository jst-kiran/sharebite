import { Link } from "react-router-dom";
import StatusBadge from "../donor/StatusBadge";
import FoodImage from "../common/FoodImage";

/**
 * Actionable NGO Donation Card component.
 * Uses reusable FoodImage component for uniform 4:3 ratio and onError fallback.
 */
function NgoDonationCard({ donation, onAccept, isAcceptedView = false, className = "" }) {
  const {
    id,
    foodName,
    category,
    quantity,
    estimatedMeals,
    isVeg,
    prepTime,
    distance,
    status,
    image,
    pickupAddress,
    acceptedDate,
    pickupStatus,
    priorityLevel,
  } = donation;

  const priorityStyles =
    priorityLevel === "High"
      ? "bg-[#FEE2E2] text-[#B91C1C]"
      : priorityLevel === "Medium"
      ? "bg-[#FEF3C7] text-[#92400E]"
      : "bg-[#DCFCE7] text-[#15803D]";

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
          {/* Status Badge overlay on Top-Right */}
          <div className="absolute top-3 right-3 z-10">
            <StatusBadge status={isAcceptedView ? (pickupStatus || "Accepted") : status} />
          </div>
          {/* Veg / Non-Veg Badge overlay on Top-Left */}
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
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-fern truncate">
              {category}
            </span>
            {priorityLevel && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold shrink-0 ${priorityStyles}`}>
                {priorityLevel} Priority
              </span>
            )}
            {distance && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-stone text-forest-dark shrink-0">
                📍 {distance}
              </span>
            )}
          </div>

          <h3 className="font-display text-lg font-bold text-forest-dark group-hover:text-forest transition-colors leading-snug">
            {foodName}
          </h3>

          <p className="text-xs text-ink/50">
            {isAcceptedView ? `Accepted: ${acceptedDate}` : `Prep: ${prepTime}`}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 my-3 p-3 rounded-xl bg-stone/40 text-xs">
          <div>
            <span className="block text-ink/50 text-[11px]">Quantity</span>
            <span className="font-bold text-forest-dark">{quantity}</span>
          </div>
          <div>
            <span className="block text-ink/50 text-[11px]">Est. Meals</span>
            <span className="font-bold text-forest-dark">{estimatedMeals} Servings</span>
          </div>
        </div>

        {/* Accepted View Extra Info: Pickup Address */}
        {isAcceptedView && pickupAddress && (
          <div className="my-2 p-2.5 rounded-lg bg-forest/5 text-xs">
            <span className="font-bold text-forest-dark block">Pickup Address:</span>
            <span className="text-ink/70 truncate block">{pickupAddress}</span>
          </div>
        )}
      </div>

      {/* Footer Action Buttons */}
      <div className="pt-3 border-t border-ink/5 flex items-center gap-2 justify-between">
        <Link
          to={`/ngo/donation/${id}`}
          className="btn-secondary !px-3.5 !py-1.5 text-xs font-semibold flex-1 text-center"
        >
          View Details
        </Link>

        {!isAcceptedView && onAccept && (
          <button
            type="button"
            onClick={() => onAccept(id)}
            className="btn-primary !px-4 !py-1.5 text-xs font-bold flex-1 text-center"
          >
            Accept Donation
          </button>
        )}
      </div>
    </div>
  );
}

export default NgoDonationCard;

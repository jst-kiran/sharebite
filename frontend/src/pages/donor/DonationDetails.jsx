import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useDonor } from "../../context/DonorContext";
import StatusBadge from "../../components/donor/StatusBadge";
import Timeline from "../../components/donor/Timeline";
import FoodImage from "../../components/common/FoodImage";
import AiAnalysisCard from "../../components/donor/AiAnalysisCard";

function DonationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDonationById, deleteDonation } = useDonor();

  const donation = getDonationById(id);

  if (!donation) {
    return (
      <div className="card !bg-white p-12 text-center space-y-4 max-w-xl mx-auto my-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone text-ink/40 mx-auto">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-forest-dark">
          Donation Listing Not Found
        </h2>
        <p className="text-sm text-ink/60 leading-relaxed max-w-md mx-auto">
          The requested donation ID (<span className="font-mono">{id}</span>) does not exist or has been removed.
        </p>
        <div className="pt-2">
          <Link to="/donor/my-donations" className="btn-primary">
            Back to My Donations
          </Link>
        </div>
      </div>
    );
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to remove this donation listing?")) {
      deleteDonation(id);
      navigate("/donor/my-donations");
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Back Link & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/donor/my-donations"
          className="inline-flex items-center gap-2 text-xs font-semibold text-forest hover:underline"
        >
          ← Back to My Donations
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="text-xs font-semibold text-red-600 hover:underline"
        >
          Delete Listing
        </button>
      </div>

      {/* Top Banner Hero */}
      <div className="card !bg-white p-6 sm:p-8 grid gap-8 md:grid-cols-12 items-start">
        {/* Food Image */}
        <div className="md:col-span-5 relative">
          <FoodImage
            src={donation.image}
            alt={donation.foodName}
            aspectRatio="aspect-[4/3]"
            priority={true}
          />
          <div className="absolute top-3 right-3 z-10">
            <StatusBadge status={donation.status} />
          </div>
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold ${
                donation.isVeg
                  ? "bg-[#DCFCE7] text-[#15803D]"
                  : "bg-[#FEE2E2] text-[#B91C1C]"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${donation.isVeg ? "bg-[#16A34A]" : "bg-[#DC2626]"}`} />
              {donation.isVeg ? "Vegetarian" : "Non-Vegetarian"}
            </span>
          </div>
        </div>

        {/* Essential Info */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <span className="eyebrow !text-fern">
              {donation.category}
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-forest-dark mt-2 leading-tight">
              {donation.foodName}
            </h1>
            <p className="text-xs text-ink/50 mt-1">
              Donation Reference ID: <span className="font-mono">{donation.id}</span> • Posted {donation.postedDate}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-stone/40 text-xs">
            <div>
              <span className="block text-ink/50 text-[11px]">Quantity</span>
              <span className="font-bold text-forest-dark text-sm">{donation.quantity}</span>
            </div>
            <div>
              <span className="block text-ink/50 text-[11px]">Est. Meals</span>
              <span className="font-bold text-forest-dark text-sm">{donation.estimatedMeals} Servings</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="block text-ink/50 text-[11px]">NGO Status</span>
              <span className="font-bold text-forest-dark text-sm">{donation.ngoName || "Awaiting Claim"}</span>
            </div>
          </div>

          {/* Special Notes & Description */}
          {donation.description && (
            <div className="space-y-1 pt-2">
              <h4 className="text-xs font-bold text-forest-dark uppercase tracking-wider">
                Description & Notes
              </h4>
              <p className="text-sm text-ink/70 leading-relaxed">
                {donation.description}
              </p>
            </div>
          )}
        </div>
      </div>

      <AiAnalysisCard donation={donation} />

      {/* Information Grid & 5-Step Timeline Grid */}
      <div className="grid gap-8 md:grid-cols-12">
        {/* Left Column: Logistics Grid */}
        <div className="md:col-span-7 space-y-6">
          <div className="card !bg-white p-6 sm:p-8 space-y-6">
            <h3 className="font-display text-lg font-bold text-forest-dark border-b border-ink/10 pb-3">
              Pickup & Preparation Logistics
            </h3>

            <div className="grid gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-stone/30 space-y-1">
                <span className="font-bold text-forest-dark block text-xs">Pickup Address</span>
                <p className="text-ink/70 text-sm">{donation.pickupAddress}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-stone/30 space-y-1">
                  <span className="font-bold text-forest-dark block text-xs">Contact Phone</span>
                  <p className="text-ink/70 text-sm font-semibold">{donation.contactPhone}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone/30 space-y-1">
                  <span className="font-bold text-forest-dark block text-xs">Preparation Time</span>
                  <p className="text-ink/70 text-sm">{donation.prepTime}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-stone/30 space-y-1">
                  <span className="font-bold text-forest-dark block text-xs">Storage Condition</span>
                  <p className="text-ink/70 text-sm">{donation.storageCondition}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone/30 space-y-1">
                  <span className="font-bold text-forest-dark block text-xs">Pickup Window</span>
                  <p className="text-ink/70 text-sm">{donation.pickupAvailability}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 5-Step Timeline */}
        <div className="md:col-span-5">
          <div className="card !bg-white p-6 sm:p-8">
            <Timeline steps={donation.timeline} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationDetails;

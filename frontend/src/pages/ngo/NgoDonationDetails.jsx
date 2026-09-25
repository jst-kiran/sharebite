import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useNgo } from "../../context/NgoContext";
import StatusBadge from "../../components/donor/StatusBadge";
import Timeline from "../../components/donor/Timeline";
import FoodImage from "../../components/common/FoodImage";
import AiAnalysisCard from "../../components/donor/AiAnalysisCard";

function NgoDonationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDonationById, acceptDonation } = useNgo();
  const [toast, setToast] = useState(null);

  const donation = getDonationById(id);

  if (!donation) {
    return (
      <div className="card !bg-white p-12 text-center space-y-4 max-w-xl mx-auto my-12">
        <h2 className="font-display text-2xl font-bold text-forest-dark">
          Food Listing Not Found
        </h2>
        <p className="text-sm text-ink/60">
          The requested food donation listing does not exist or has been claimed.
        </p>
        <Link to="/ngo/available-donations" className="btn-primary">
          Back to Available Donations
        </Link>
      </div>
    );
  }

  const isAvailable = donation.status === "Available";

  function handleAccept() {
    const success = acceptDonation(donation.id);
    if (success) {
      setToast("Donation claimed successfully! Redirecting to Accepted Queue...");
      setTimeout(() => {
        navigate("/ngo/accepted-donations");
      }, 1500);
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to={isAvailable ? "/ngo/available-donations" : "/ngo/accepted-donations"}
          className="inline-flex items-center gap-2 text-xs font-semibold text-forest hover:underline"
        >
          ← Back to {isAvailable ? "Available Feed" : "Accepted Queue"}
        </Link>

        {isAvailable && (
          <button
            type="button"
            onClick={handleAccept}
            className="btn-primary !px-6 !py-2 text-xs font-bold"
          >
            Accept Donation Now
          </button>
        )}
      </div>

      {/* Toast Alert */}
      {toast && (
        <div className="rounded-xl bg-[#DCFCE7] p-4 border border-[#86EFAC] text-xs font-semibold text-[#15803D] flex items-center gap-2 animate-fadeIn">
          <svg className="h-4 w-4 shrink-0 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{toast}</span>
        </div>
      )}

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
          <div className="absolute top-3 left-3 z-10 flex gap-1.5">
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

            {donation.distance && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-white/90 text-forest-dark backdrop-blur">
                📍 {donation.distance}
              </span>
            )}
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
              Donor: <span className="font-semibold text-forest-dark">{donation.donorName || "Verified Partner"}</span> • Reference ID: <span className="font-mono">{donation.id}</span>
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
              <span className="block text-ink/50 text-[11px]">Preparation</span>
              <span className="font-bold text-forest-dark text-sm">{donation.prepTime}</span>
            </div>
          </div>

          {/* Description */}
          {donation.description && (
            <div className="space-y-1 pt-2">
              <h4 className="text-xs font-bold text-forest-dark uppercase tracking-wider">
                Food Description & Allergens
              </h4>
              <p className="text-sm text-ink/70 leading-relaxed">
                {donation.description}
              </p>
            </div>
          )}
        </div>
      </div>

      <AiAnalysisCard donation={donation} />

      {/* DEDICATED PICKUP INFORMATION SECTION */}
      <div className="card !bg-white p-6 sm:p-8 space-y-6">
        <h2 className="font-display text-xl font-bold text-forest-dark border-b border-ink/10 pb-3 flex items-center gap-2">
          <svg className="h-6 w-6 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Pickup Information</span>
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div className="sm:col-span-2 p-4 rounded-xl bg-stone/40 space-y-1">
            <span className="font-bold text-forest-dark block text-xs uppercase tracking-wider">Pickup Address</span>
            <p className="text-ink text-sm font-semibold">{donation.pickupAddress}</p>
          </div>

          <div className="p-4 rounded-xl bg-stone/40 space-y-1">
            <span className="font-bold text-forest-dark block text-xs uppercase tracking-wider">Contact Number</span>
            <p className="text-forest-dark text-sm font-extrabold">{donation.contactPhone}</p>
          </div>

          <div className="p-4 rounded-xl bg-stone/40 space-y-1">
            <span className="font-bold text-forest-dark block text-xs uppercase tracking-wider">Pickup Window</span>
            <p className="text-ink text-sm font-semibold">{donation.pickupWindow}</p>
          </div>

          <div className="sm:col-span-2 p-4 rounded-xl bg-forest/5 border border-forest/15 space-y-1">
            <span className="font-bold text-forest-dark block text-xs uppercase tracking-wider">Special Instructions</span>
            <p className="text-ink/80 text-sm leading-relaxed">{donation.specialInstructions || "No special instructions specified."}</p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="card !bg-white p-6 sm:p-8">
        <Timeline steps={donation.timeline} />
      </div>
    </div>
  );
}

export default NgoDonationDetails;

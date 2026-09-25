import { Link } from "react-router-dom";
import { useNgo } from "../../context/NgoContext";
import FoodImage from "../../components/common/FoodImage";
import EmptyState from "../../components/donor/EmptyState";

function AcceptedDonations() {
  const { acceptedDonations } = useNgo();

  // Helper to render 4-stage Status Progression Bar
  function renderStatusProgression(pickupStatus) {
    const STAGES = [
      { id: "Accepted", label: "Accepted" },
      { id: "Awaiting Pickup", label: "Awaiting Pickup" },
      { id: "Picked Up", label: "Picked Up" },
      { id: "Delivered", label: "Delivered" },
    ];

    let activeIdx = 1;
    if (pickupStatus === "Accepted") activeIdx = 0;
    if (pickupStatus === "Picked Up") activeIdx = 2;
    if (pickupStatus === "Delivered" || pickupStatus === "Completed") activeIdx = 3;

    return (
      <div className="space-y-2 pt-3 border-t border-ink/10">
        <span className="text-[11px] font-bold uppercase tracking-wider text-forest-dark block">
          Pickup Lifecycle Progression:
        </span>
        <div className="grid grid-cols-4 gap-1 items-center">
          {STAGES.map((stage, idx) => {
            const isDone = idx <= activeIdx;
            const isCurrent = idx === activeIdx;

            return (
              <div key={stage.id} className="flex flex-col items-center text-center">
                <div
                  className={`h-2 w-full rounded-full transition-colors ${
                    isDone ? "bg-forest" : "bg-stone border border-ink/10"
                  } ${isCurrent ? "ring-2 ring-wheat" : ""}`}
                />
                <span
                  className={`mt-1 text-[10px] font-semibold leading-tight truncate max-w-full ${
                    isCurrent
                      ? "text-forest font-bold"
                      : isDone
                      ? "text-forest-dark"
                      : "text-ink/40"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="eyebrow !text-forest">
          NGO Rescue Queue
        </span>
        <h1 className="font-display text-3xl font-bold text-forest-dark mt-1">
          Accepted Food Donations
        </h1>
        <p className="text-sm text-ink/60 mt-1">
          Track and coordinate pickup and delivery for claimed surplus food listings.
        </p>
      </div>

      {acceptedDonations.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {acceptedDonations.map((donation) => (
            <div
              key={donation.id}
              className="card !bg-white p-6 flex flex-col justify-between space-y-4 border border-ink/10"
            >
              {/* Top Header Card */}
              <div className="flex gap-4 items-start">
                <div className="w-24 shrink-0">
                  <FoodImage
                    src={donation.image}
                    alt={donation.foodName}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <span className="eyebrow !text-fern text-[10px]">
                    {donation.category}
                  </span>
                  <h3 className="font-display text-lg font-bold text-forest-dark truncate">
                    {donation.foodName}
                  </h3>
                  <p className="text-xs text-ink/60 truncate">
                    📍 {donation.pickupAddress}
                  </p>
                </div>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-stone/40 text-xs">
                <div>
                  <span className="block text-ink/50 text-[10px]">Quantity</span>
                  <span className="font-bold text-forest-dark">{donation.quantity}</span>
                </div>
                <div>
                  <span className="block text-ink/50 text-[10px]">Est. Meals</span>
                  <span className="font-bold text-forest-dark">{donation.estimatedMeals} Meals</span>
                </div>
                <div>
                  <span className="block text-ink/50 text-[10px]">Accepted On</span>
                  <span className="font-bold text-forest-dark truncate block">{donation.acceptedDate}</span>
                </div>
              </div>

              {/* Visible Status Progression Indicator Bar */}
              {renderStatusProgression(donation.pickupStatus)}

              {/* Volunteer Assignment Future-Proof Section */}
              <div className="p-3.5 rounded-xl bg-forest/5 border border-forest/15 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-forest-dark flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Volunteer Assignment</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-stone text-ink/60 border border-ink/10">
                    Unassigned
                  </span>
                </div>
                <p className="text-xs text-ink/60">
                  {donation.volunteerAssignment?.notes || "Ready for volunteer pickup dispatch."}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="pt-2 flex justify-end">
                <Link
                  to={`/ngo/donation/${donation.id}`}
                  className="btn-secondary !px-4 !py-1.5 text-xs font-semibold"
                >
                  View Details & Pickup Info →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Accepted Donations Yet"
          description="Claim surplus meals from the available listings feed to start building your distribution queue."
          actionLabel="Browse Available Donations"
          actionLink="/ngo/available-donations"
        />
      )}
    </div>
  );
}

export default AcceptedDonations;

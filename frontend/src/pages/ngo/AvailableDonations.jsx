import { useState } from "react";
import { useNgo } from "../../context/NgoContext";
import NgoDonationCard from "../../components/ngo/NgoDonationCard";
import EmptyState from "../../components/donor/EmptyState";

function AvailableDonations() {
  const { availableDonations, acceptDonation } = useNgo();
  const [activeTab, setActiveTab] = useState("All");
  const [toast, setToast] = useState(null);

  // Filter tabs: All, Veg, Non-Veg, Recently Added
  const TABS = [
    { id: "All", label: "All Available", count: availableDonations.length },
    { id: "Veg", label: "Vegetarian", count: availableDonations.filter((d) => d.isVeg).length },
    { id: "Non-Veg", label: "Non-Veg", count: availableDonations.filter((d) => !d.isVeg).length },
    { id: "Recently Added", label: "Recently Added", count: availableDonations.length },
  ];

  const filteredDonations = availableDonations.filter((item) => {
    if (activeTab === "Veg") return item.isVeg;
    if (activeTab === "Non-Veg") return !item.isVeg;
    return true;
  });

  function handleAccept(id) {
    const success = acceptDonation(id);
    if (success) {
      setToast("Donation accepted! Moved to your Accepted Donations list.");
      setTimeout(() => setToast(null), 4000);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="eyebrow !text-forest">
          Surplus Food Feed
        </span>
        <h1 className="font-display text-3xl font-bold text-forest-dark mt-1">
          Available Food Donations
        </h1>
        <p className="text-sm text-ink/60 mt-1">
          Browse and claim surplus meals offered by local restaurants, caterers, and businesses.
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

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-ink/10 pb-4">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? "bg-forest text-paper shadow-sm"
                  : "bg-white text-ink/70 border border-ink/10 hover:bg-stone/50 hover:text-forest-dark"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive ? "bg-wheat text-forest-dark font-extrabold" : "bg-stone text-ink/60"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Actionable Available Donation Cards */}
      {filteredDonations.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDonations.map((donation) => (
            <NgoDonationCard
              key={donation.id}
              donation={donation}
              onAccept={handleAccept}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No ${activeTab === "All" ? "" : activeTab} Donations Available`}
          description="Check back shortly or view your currently accepted donations."
          actionLabel="View Accepted Donations"
          actionLink="/ngo/accepted-donations"
        />
      )}
    </div>
  );
}

export default AvailableDonations;

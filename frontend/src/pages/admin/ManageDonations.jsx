import { useState } from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/donor/StatusBadge";
import FilterTabs from "../../components/donor/FilterTabs";
import FoodImage from "../../components/common/FoodImage";
import DonationDetailModal from "../../components/admin/DonationDetailModal";
import EmptyState from "../../components/donor/EmptyState";

function ManageDonations() {
  const { donations, summaryStats, updateDonationStatus } = useApp();
  const [activeTab, setActiveTab] = useState("All");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredDonations = donations.filter((item) => {
    if (activeTab === "All") return true;
    return item.status === activeTab;
  });

  const tabCounts = {
    total: summaryStats.totalDonations,
    pending: summaryStats.pendingDonations,
    accepted: summaryStats.acceptedDonations,
    completed: summaryStats.completedDonations,
  };

  function handleInspect(item) {
    setSelectedDonation(item);
    setModalOpen(true);
  }

  function handleStatusOverride(id, newStatus) {
    updateDonationStatus(id, newStatus);
    if (selectedDonation && selectedDonation.id === id) {
      setSelectedDonation((prev) => ({ ...prev, status: newStatus }));
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="eyebrow !text-purple-700">
          Admin Management
        </span>
        <h1 className="font-display text-3xl font-bold text-forest-dark mt-1">
          Manage All Food Donations
        </h1>
        <p className="text-sm text-ink/60 mt-1">
          Inspect food listings, review donor and NGO claims, and override donation status lifecycle states.
        </p>
      </div>

      {/* Filter Tabs */}
      <FilterTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={tabCounts}
      />

      {/* Donations Table */}
      {filteredDonations.length > 0 ? (
        <div className="card !bg-white p-0 overflow-hidden border border-ink/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ink">
              <thead className="bg-stone/50 text-forest-dark uppercase font-bold border-b border-ink/10">
                <tr>
                  <th className="py-3.5 px-4">Food Item</th>
                  <th className="py-3.5 px-4">Donor Party</th>
                  <th className="py-3.5 px-4">Claiming NGO</th>
                  <th className="py-3.5 px-4">Servings</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {filteredDonations.map((item) => (
                  <tr key={item.id} className="hover:bg-stone/20 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-16 shrink-0">
                          <FoodImage src={item.image} alt={item.foodName} aspectRatio="aspect-[4/3]" />
                        </div>
                        <div>
                          <span className="font-bold text-forest-dark block text-sm">{item.foodName}</span>
                          <span className="text-[11px] text-ink/50">{item.category} • ID: {item.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-ink/80">
                      {item.donorName || "Donor Party"}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-ink/80">
                      {item.ngoName || <span className="text-ink/40 italic">Awaiting Claim</span>}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-forest-dark">
                      {item.estimatedMeals} Meals
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleInspect(item)}
                        className="btn-secondary !px-3 !py-1 text-[11px] font-bold"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title={`No ${activeTab === "All" ? "" : activeTab} Donations`}
          description="There are currently no food listings matching this filter category."
          actionLabel=""
          actionLink=""
        />
      )}

      {/* Side Panel Modal for Inspection */}
      <DonationDetailModal
        donation={selectedDonation}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onStatusChange={handleStatusOverride}
      />
    </div>
  );
}

export default ManageDonations;

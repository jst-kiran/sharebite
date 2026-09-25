import { Link } from "react-router-dom";
import { useDonor } from "../../context/DonorContext";
import FilterTabs from "../../components/donor/FilterTabs";
import DonationCard from "../../components/donor/DonationCard";
import EmptyState from "../../components/donor/EmptyState";

function MyDonations() {
  const { donations, summaryStats, statusFilter, setStatusFilter } = useDonor();

  // Filter donations based on status filter tabs
  const filteredDonations = donations.filter((item) => {
    if (statusFilter === "All") return true;
    return item.status === statusFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow !text-forest">
            My Donations
          </span>
          <h1 className="font-display text-3xl font-bold text-forest-dark mt-1">
            Donation Listings
          </h1>
          <p className="text-sm text-ink/60 mt-1">
            Manage, filter, and track all your food donations.
          </p>
        </div>

        <Link to="/donor/add-donation" className="btn-primary flex items-center gap-2 self-start sm:self-auto">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Post Donation</span>
        </Link>
      </div>

      {/* Simplified Status Filter Tabs (No Search Bar for MVP) */}
      <FilterTabs
        activeTab={statusFilter}
        onTabChange={setStatusFilter}
        counts={summaryStats}
      />

      {/* Grid of Rich Donation Cards */}
      {filteredDonations.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDonations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No ${statusFilter === "All" ? "" : statusFilter} Donations`}
          description={`There are currently no food listings under the "${statusFilter}" status filter.`}
          actionLabel="Post New Donation"
          actionLink="/donor/add-donation"
        />
      )}
    </div>
  );
}

export default MyDonations;

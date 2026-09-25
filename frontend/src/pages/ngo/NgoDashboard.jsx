import { useState } from "react";
import { Link } from "react-router-dom";
import { useNgo } from "../../context/NgoContext";
import DashboardCard from "../../components/donor/DashboardCard";
import NgoDonationCard from "../../components/ngo/NgoDonationCard";
import EmptyState from "../../components/donor/EmptyState";

function NgoDashboard() {
  const { ngoProfile, availableDonations, summaryStats, acceptDonation } = useNgo();
  const [toast, setToast] = useState(null);

  // Dynamic time-based greeting
  const currentHour = new Date().getHours();
  let timeOfDay = "Morning";
  if (currentHour >= 12 && currentHour < 17) {
    timeOfDay = "Afternoon";
  } else if (currentHour >= 17) {
    timeOfDay = "Evening";
  }

  const recentAvailable = availableDonations.slice(0, 4);

  function handleAccept(id) {
    const success = acceptDonation(id);
    if (success) {
      setToast("Donation accepted successfully! Moved to Accepted Donations.");
      setTimeout(() => setToast(null), 4000);
    }
  }

  return (
    <div className="space-y-8">
      {/* Top Greeting & Mission Impact Banner */}
      <div className="card !bg-white border border-ink/10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="eyebrow !text-forest">
            NGO Rescue Portal
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest-dark">
            Good {timeOfDay}, {ngoProfile.ngoName} 👋
          </h1>
          <p className="text-sm sm:text-base font-semibold text-forest leading-relaxed">
            You currently have <span className="underline decoration-wheat underline-offset-4">{summaryStats.availableMeals} available meals</span> waiting to be distributed to people in need.
          </p>
        </div>

        <div className="shrink-0">
          <Link to="/ngo/available-donations" className="btn-primary flex items-center gap-2">
            <span>Explore Available Food ({summaryStats.availableCount})</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
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

      {/* 4 Summary Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Available Listings"
          count={summaryStats.availableCount}
          badgeColor="bg-forest/10 text-forest"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />

        <DashboardCard
          title="Accepted Donations"
          count={summaryStats.acceptedCount}
          badgeColor="bg-[#E0F2FE] text-[#075985]"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <DashboardCard
          title="Meals to Distribute"
          count={`${summaryStats.mealsToDistribute} Servings`}
          badgeColor="bg-[#FEF3C7] text-[#92400E]"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <DashboardCard
          title="Completed Deliveries"
          count={summaryStats.completedDeliveries}
          badgeColor="bg-[#D1FAE5] text-[#065F46]"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          }
        />
      </div>

      {/* Recent Available Donations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-forest-dark">
              Recent Available Food Listings
            </h2>
            <p className="text-xs text-ink/60">
              Surplus meals posted nearby by verified food donors.
            </p>
          </div>
          {recentAvailable.length > 0 && (
            <Link
              to="/ngo/available-donations"
              className="text-xs font-semibold text-forest hover:underline"
            >
              View All Available ({availableDonations.length}) →
            </Link>
          )}
        </div>

        {recentAvailable.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recentAvailable.map((item) => (
              <NgoDonationCard
                key={item.id}
                donation={item}
                onAccept={handleAccept}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Available Food Listings"
            description="All current surplus food donations have been claimed by local NGOs."
            actionLabel="Check Accepted Donations"
            actionLink="/ngo/accepted-donations"
          />
        )}
      </div>
    </div>
  );
}

export default NgoDashboard;

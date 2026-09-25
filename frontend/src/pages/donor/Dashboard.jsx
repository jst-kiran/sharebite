import { Link } from "react-router-dom";
import { useDonor } from "../../context/DonorContext";
import DashboardCard from "../../components/donor/DashboardCard";
import DonationCard from "../../components/donor/DonationCard";
import EmptyState from "../../components/donor/EmptyState";

function Dashboard() {
  const { profile, donations, summaryStats } = useDonor();

  // Dynamic time-based greeting
  const currentHour = new Date().getHours();
  let timeOfDay = "Morning";
  if (currentHour >= 12 && currentHour < 17) {
    timeOfDay = "Afternoon";
  } else if (currentHour >= 17) {
    timeOfDay = "Evening";
  }

  const recentDonations = donations.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Top Greeting & Slogan Banner */}
      <div className="card !bg-white border border-ink/10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="eyebrow !text-forest">
            Donor Dashboard
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest-dark">
            Good {timeOfDay}, {profile.fullName.split(" ")[0]} 👋
          </h1>
          <p className="text-sm sm:text-base text-ink/70 max-w-xl leading-relaxed">
            Every donation you make helps reduce food waste and support communities.
          </p>
        </div>

        <div className="shrink-0">
          <Link to="/donor/add-donation" className="btn-primary flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Post New Donation</span>
          </Link>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Donations"
          count={summaryStats.total}
          badgeColor="bg-forest/10 text-forest"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />

        <DashboardCard
          title="Pending Claims"
          count={summaryStats.pending}
          badgeColor="bg-[#FEF3C7] text-[#92400E]"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <DashboardCard
          title="Accepted by NGO"
          count={summaryStats.accepted}
          badgeColor="bg-[#E0F2FE] text-[#075985]"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <DashboardCard
          title="Completed"
          count={summaryStats.completed}
          badgeColor="bg-[#D1FAE5] text-[#065F46]"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          }
        />
      </div>

      {/* Recent Donations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-forest-dark">
              Recent Donations
            </h2>
            <p className="text-xs text-ink/60">
              Overview of your latest food listings.
            </p>
          </div>
          {recentDonations.length > 0 && (
            <Link
              to="/donor/my-donations"
              className="text-xs font-semibold text-forest hover:underline"
            >
              View All ({donations.length}) →
            </Link>
          )}
        </div>

        {recentDonations.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recentDonations.map((item) => (
              <DonationCard key={item.id} donation={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Recent Donations"
            description="Start reducing food waste by sharing your first meal donation."
            actionLabel="Post Donation Now"
            actionLink="/donor/add-donation"
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;

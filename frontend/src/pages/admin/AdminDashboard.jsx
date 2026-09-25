import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import DashboardCard from "../../components/donor/DashboardCard";

function AdminDashboard() {
  const { summaryStats, activityLogs, ngos } = useApp();

  const unverifiedNgos = ngos.filter((n) => !n.isVerified);

  return (
    <div className="space-y-8">
      {/* Top Control Center Header */}
      <div className="card !bg-white border border-ink/10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="eyebrow !text-purple-700">
            System Overview &amp; Monitoring
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest-dark">
            Admin Control Center
          </h1>
          <p className="text-sm text-ink/70 max-w-xl leading-relaxed">
            Real-time platform monitoring, donation statistics, partner NGO verification, and system activity logs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/admin/donations" className="btn-primary flex items-center gap-2">
            <span>Manage Donations ({summaryStats.totalDonations})</span>
          </Link>
          <Link to="/admin/ngos" className="btn-secondary flex items-center gap-2">
            <span>Verify NGOs ({unverifiedNgos.length})</span>
          </Link>
        </div>
      </div>

      {/* 6 Platform Summary Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total Food Donations"
          count={summaryStats.totalDonations}
          badgeColor="bg-forest/10 text-forest"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />

        <DashboardCard
          title="Active Food Donors"
          count={summaryStats.activeDonorsCount}
          badgeColor="bg-[#DCFCE7] text-[#15803D]"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />

        <DashboardCard
          title="Registered Partner NGOs"
          count={summaryStats.registeredNgosCount}
          badgeColor="bg-[#E0F2FE] text-[#075985]"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />

        <DashboardCard
          title="Pending / Active Listings"
          count={summaryStats.pendingDonations}
          badgeColor="bg-[#FEF3C7] text-[#92400E]"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <DashboardCard
          title="Completed Rescues"
          count={summaryStats.completedDonations}
          badgeColor="bg-[#D1FAE5] text-[#065F46]"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <DashboardCard
          title="Total Meals Distributed"
          count={`${summaryStats.mealsDistributed} Servings`}
          badgeColor="bg-purple-100 text-purple-800"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
      </div>

      {/* Main Grid: Activity Feed & Verification Action Box */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Realistic Platform Activity Feed */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-forest-dark">
              Platform Activity Feed
            </h2>
            <span className="text-xs text-ink/50">
              Live Event Log
            </span>
          </div>

          <div className="card !bg-white p-6 divide-y divide-ink/10">
            {activityLogs.map((log) => (
              <div key={log.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${log.iconColor}`}>
                  ✓
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-forest-dark">{log.title}</h4>
                    <span className="text-xs text-ink/40 shrink-0">{log.timestamp}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-ink/70 leading-relaxed">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pending NGO Verifications & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card !bg-white p-6 space-y-4">
            <h3 className="font-display text-lg font-bold text-forest-dark border-b border-ink/10 pb-3 flex items-center justify-between">
              <span>NGO Verifications</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                {unverifiedNgos.length} Pending
              </span>
            </h3>

            {unverifiedNgos.length > 0 ? (
              <div className="space-y-3">
                {unverifiedNgos.map((ngo) => (
                  <div key={ngo.id} className="p-3.5 rounded-xl bg-stone/40 space-y-2 border border-ink/5">
                    <div>
                      <h4 className="text-xs font-bold text-forest-dark">{ngo.ngoName}</h4>
                      <p className="text-[11px] text-ink/60">{ngo.contactPerson} • {ngo.email}</p>
                    </div>
                    <Link
                      to="/admin/ngos"
                      className="btn-secondary !w-full text-center !py-1 text-xs font-semibold block"
                    >
                      Inspect &amp; Verify →
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-ink/60">
                All registered NGOs are currently verified.
              </div>
            )}
          </div>

          <div className="card !bg-forest/5 p-6 space-y-3 border border-forest/15">
            <h3 className="font-display text-base font-bold text-forest-dark">
              Quick Shortcuts
            </h3>
            <div className="space-y-2 text-xs">
              <Link to="/admin/users" className="block p-3 rounded-xl bg-white text-forest-dark font-bold hover:shadow-sm transition-shadow">
                👥 Manage User Accounts ({summaryStats.totalUsersCount})
              </Link>
              <Link to="/admin/analytics" className="block p-3 rounded-xl bg-white text-forest-dark font-bold hover:shadow-sm transition-shadow">
                📊 Platform Impact Analytics
              </Link>
              <Link to="/admin/settings" className="block p-3 rounded-xl bg-white text-forest-dark font-bold hover:shadow-sm transition-shadow">
                ⚙️ Configure System Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

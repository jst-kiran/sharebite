import { useApp } from "../../context/AppContext";

function AdminAnalytics() {
  const { summaryStats, donors, ngos } = useApp();

  const MONTHLY_TRENDS = [
    { month: "Mar", count: 24, height: "45%" },
    { month: "Apr", count: 32, height: "60%" },
    { month: "May", count: 28, height: "52%" },
    { month: "Jun", count: 45, height: "80%" },
    { month: "Jul", count: 52, height: "92%" },
    { month: "Aug", count: 60, height: "100%" },
  ];

  const CATEGORY_DISTRIBUTION = [
    { category: "Cooked Meals", percentage: 55, color: "bg-forest" },
    { category: "Bakery & Surplus", percentage: 22, color: "bg-wheat" },
    { category: "Fresh Produce", percentage: 15, color: "bg-fern" },
    { category: "Packaged Goods", percentage: 8, color: "bg-purple-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="eyebrow !text-purple-700">
          Impact &amp; Insights
        </span>
        <h1 className="font-display text-3xl font-bold text-forest-dark mt-1">
          Platform Analytics &amp; Impact
        </h1>
        <p className="text-sm text-ink/60 mt-1">
          Practical metrics on food waste reduction, monthly donation volume, and partner contribution leaderboards.
        </p>
      </div>

      {/* 3 Impact Hero Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card !bg-white p-6 border-l-4 border-l-forest">
          <span className="text-xs font-bold uppercase tracking-wider text-ink/50 block mb-1">Total Food Saved</span>
          <p className="font-display text-3xl font-bold text-forest-dark">14.8 Tons</p>
          <span className="text-xs text-fern font-semibold mt-1 block">↑ 18% increase from last month</span>
        </div>

        <div className="card !bg-white p-6 border-l-4 border-l-wheat">
          <span className="text-xs font-bold uppercase tracking-wider text-ink/50 block mb-1">Total Meals Served</span>
          <p className="font-display text-3xl font-bold text-forest-dark">{summaryStats.mealsDistributed}</p>
          <span className="text-xs text-amber-700 font-semibold mt-1 block">Across 14 verified shelters</span>
        </div>

        <div className="card !bg-white p-6 border-l-4 border-l-purple-600">
          <span className="text-xs font-bold uppercase tracking-wider text-ink/50 block mb-1">CO2 Emissions Avoided</span>
          <p className="font-display text-3xl font-bold text-forest-dark">8.4 Tons</p>
          <span className="text-xs text-purple-700 font-semibold mt-1 block">Calculated via EPA waste factor</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-8 md:grid-cols-12">
        {/* Monthly Donation Volume Bar Visualizer */}
        <div className="md:col-span-7 card !bg-white p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-ink/10 pb-4">
            <div>
              <h3 className="font-display text-lg font-bold text-forest-dark">
                Monthly Donation Volume
              </h3>
              <p className="text-xs text-ink/60">Number of food rescue listings posted per month.</p>
            </div>
            <span className="text-xs font-bold text-forest bg-forest/10 px-3 py-1 rounded-full">
              Growth: +25%
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {MONTHLY_TRENDS.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <span className="text-[11px] font-bold text-forest-dark group-hover:scale-110 transition-transform">
                  {item.count}
                </span>
                <div
                  className="w-full bg-forest rounded-t-lg transition-all duration-500 group-hover:bg-forest-dark"
                  style={{ height: item.height }}
                />
                <span className="text-xs font-semibold text-ink/60">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="md:col-span-5 card !bg-white p-6 sm:p-8 space-y-6">
          <div className="border-b border-ink/10 pb-4">
            <h3 className="font-display text-lg font-bold text-forest-dark">
              Food Category Distribution
            </h3>
            <p className="text-xs text-ink/60">Percentage share by donated food category.</p>
          </div>

          <div className="space-y-4">
            {CATEGORY_DISTRIBUTION.map((cat) => (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-forest-dark">
                  <span>{cat.category}</span>
                  <span>{cat.percentage}%</span>
                </div>
                <div className="h-3 w-full bg-stone/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Top Donors */}
        <div className="card !bg-white p-6 space-y-4">
          <h3 className="font-display text-lg font-bold text-forest-dark border-b border-ink/10 pb-3">
            🏆 Top Contributing Food Donors
          </h3>
          <div className="space-y-3">
            {donors.map((donor, idx) => (
              <div key={donor.id} className="flex items-center justify-between p-3 rounded-xl bg-stone/40 text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest text-paper font-bold text-[11px]">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-forest-dark block">{donor.organizationName}</span>
                    <span className="text-[11px] text-ink/50">{donor.fullName}</span>
                  </div>
                </div>
                <span className="font-extrabold text-forest text-sm">{donor.totalDonations} Listings</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top NGOs */}
        <div className="card !bg-white p-6 space-y-4">
          <h3 className="font-display text-lg font-bold text-forest-dark border-b border-ink/10 pb-3">
            🤝 Top Active NGO Partners
          </h3>
          <div className="space-y-3">
            {ngos.map((ngo, idx) => (
              <div key={ngo.id} className="flex items-center justify-between p-3 rounded-xl bg-stone/40 text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-wheat text-forest-dark font-bold text-[11px]">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-forest-dark block">{ngo.ngoName}</span>
                    <span className="text-[11px] text-ink/50">{ngo.serviceArea}</span>
                  </div>
                </div>
                <span className="font-extrabold text-forest-dark text-sm">{ngo.mealsClaimed} Meals</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;

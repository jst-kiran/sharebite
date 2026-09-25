/**
 * Reusable Metric Summary Card for the Donor Dashboard.
 */
function DashboardCard({ title, count, icon, badgeColor = "bg-forest/10 text-forest", className = "" }) {
  return (
    <div className={`card !bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink/60">
          {title}
        </span>
        {icon && (
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${badgeColor}`}>
            {icon}
          </div>
        )}
      </div>
      <p className="font-display text-3xl font-bold text-forest-dark">
        {count}
      </p>
    </div>
  );
}

export default DashboardCard;

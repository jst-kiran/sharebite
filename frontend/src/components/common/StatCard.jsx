/**
 * Statistic card component adhering strictly to original theme,
 * explicitly labeled as Demo Statistic for pre-database phase.
 */
function StatCard({
  icon,
  value = "0",
  label,
  description = "Awaiting dynamic sync",
  statusTag = "Demo Statistic",
  className = "",
}) {
  return (
    <div className={`card !bg-white ${className}`}>
      <div className="flex items-center justify-between mb-3">
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10 text-forest">
            {icon}
          </div>
        )}
        <span className="eyebrow !text-fern">
          {statusTag}
        </span>
      </div>
      <div>
        <p className="font-display text-3xl font-semibold text-forest-dark">
          {value}
        </p>
        <p className="mt-1 text-xs font-semibold text-forest-dark/80">{label}</p>
        {description && (
          <p className="mt-1 text-[11px] text-ink/50">{description}</p>
        )}
      </div>
    </div>
  );
}

export default StatCard;

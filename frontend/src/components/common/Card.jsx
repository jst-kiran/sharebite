/**
 * Generic content card matching original project layout & colors.
 */
function Card({ icon, stepNumber, title, children, badge, className = "" }) {
  return (
    <div className={`card ${className}`}>
      <div className="flex items-center justify-between mb-3">
        {stepNumber && (
          <span className="font-display text-2xl font-semibold text-wheat">
            {stepNumber}
          </span>
        )}
        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest/10 text-forest">
            {icon}
          </div>
        )}
        {badge && (
          <span className="eyebrow">
            {badge}
          </span>
        )}
      </div>
      {title && <h3 className="mb-2 text-lg font-semibold text-forest-dark">{title}</h3>}
      <div className="text-sm leading-relaxed text-ink/70">{children}</div>
    </div>
  );
}

export default Card;

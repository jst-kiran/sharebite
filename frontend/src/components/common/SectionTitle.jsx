/**
 * Reusable Section Title component matching original design hierarchy.
 */
function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}) {
  const alignClasses =
    align === "center"
      ? "text-center mx-auto"
      : align === "right"
      ? "text-right ml-auto"
      : "text-left";

  return (
    <div className={`max-w-2xl ${alignClasses} ${className}`}>
      {eyebrow && (
        <div className="mb-2">
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      {title && (
        <h2 className="text-3xl font-semibold leading-tight text-forest-dark sm:text-4xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-3 text-sm text-ink/70 leading-relaxed sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;

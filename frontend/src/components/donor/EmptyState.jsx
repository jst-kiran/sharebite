import { Link } from "react-router-dom";

/**
 * Reusable Empty State component.
 */
function EmptyState({
  title = "No Donations Found",
  description = "You haven't posted any food donations in this category yet.",
  actionLabel = "Post First Donation",
  actionLink = "/donor/add-donation",
  className = "",
}) {
  return (
    <div className={`card !bg-white p-12 text-center flex flex-col items-center justify-center border-dashed border-2 border-ink/15 ${className}`}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest/10 text-forest mb-4">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>

      <h3 className="font-display text-xl font-bold text-forest-dark mb-2">
        {title}
      </h3>

      <p className="max-w-md text-sm text-ink/60 leading-relaxed mb-6">
        {description}
      </p>

      {actionLabel && actionLink && (
        <Link to={actionLink} className="btn-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;

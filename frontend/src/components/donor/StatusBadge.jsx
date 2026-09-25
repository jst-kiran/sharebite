/**
 * Reusable Status Badge component for donation lifecycle states across Donor & NGO modules.
 * Available: Emerald Green
 * Pending / Awaiting: Amber/Yellow
 * Accepted: Blue/Teal
 * Ready for Pickup: Soft Purple/Indigo
 * Completed: Dark Green
 */
function StatusBadge({ status, className = "" }) {
  let badgeStyles = "bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]"; // Default Pending

  if (status === "Available") {
    badgeStyles = "bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]";
  } else if (status === "Accepted") {
    badgeStyles = "bg-[#E0F2FE] text-[#075985] border-[#7DD3FC]";
  } else if (status === "Ready for Pickup" || status === "Awaiting Pickup") {
    badgeStyles = "bg-[#F3E8FF] text-[#6B21A8] border-[#D8B4FE]";
  } else if (status === "Completed" || status === "Delivered") {
    badgeStyles = "bg-[#D1FAE5] text-[#065F46] border-[#6EE7B7]";
  } else if (status === "Cancelled") {
    badgeStyles = "bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badgeStyles} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full fill-current" />
      {status}
    </span>
  );
}

export default StatusBadge;

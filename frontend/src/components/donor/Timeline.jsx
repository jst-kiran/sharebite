/**
 * Expanded 5-Step Donation Lifecycle Timeline component.
 * Steps:
 * 1. Donation Posted
 * 2. Awaiting NGO Acceptance
 * 3. NGO Accepted
 * 4. Ready for Pickup
 * 5. Completed
 */
function Timeline({ steps = [], className = "" }) {
  const DEFAULT_STEPS = [
    { step: 1, label: "Donation Posted", status: "completed", timestamp: "Today, 1:15 PM" },
    { step: 2, label: "Awaiting NGO Acceptance", status: "completed", timestamp: "Today, 1:15 PM" },
    { step: 3, label: "NGO Accepted", status: "current", timestamp: "In progress" },
    { step: 4, label: "Ready for Pickup", status: "upcoming", timestamp: "Pending NGO scheduling" },
    { step: 5, label: "Completed", status: "upcoming", timestamp: "Pending collection" },
  ];

  const timelineSteps = steps.length > 0 ? steps : DEFAULT_STEPS;

  return (
    <div className={`space-y-6 ${className}`}>
      <h3 className="font-display text-lg font-bold text-forest-dark mb-4">
        Donation Progress Timeline
      </h3>

      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-forest/15">
        {timelineSteps.map((stepItem, idx) => {
          const isCompleted = stepItem.status === "completed";
          const isCurrent = stepItem.status === "current";

          return (
            <div key={idx} className="relative flex items-start gap-4">
              {/* Step Circle Node */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  isCompleted
                    ? "bg-forest text-paper ring-4 ring-forest/10"
                    : isCurrent
                    ? "bg-wheat text-forest-dark ring-4 ring-wheat/20 animate-pulse"
                    : "bg-stone text-ink/40 border border-ink/10"
                }`}
              >
                {isCompleted ? "✓" : stepItem.step}
              </div>

              {/* Step Content */}
              <div className="flex-1 rounded-xl bg-stone/40 p-3.5 border border-ink/5">
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`text-sm font-bold ${
                      isCompleted || isCurrent ? "text-forest-dark" : "text-ink/60"
                    }`}
                  >
                    {stepItem.label}
                  </h4>
                  {isCurrent && (
                    <span className="eyebrow !text-wheat text-[10px]">
                      Active Step
                    </span>
                  )}
                </div>
                {stepItem.timestamp && (
                  <p className="mt-1 text-xs text-ink/60">{stepItem.timestamp}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;

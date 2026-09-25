/**
 * Displays AI Food Analysis and Rescue Priority for a donation.
 * Renders nothing if the donation has no AI results yet (e.g. analysis
 * unavailable), so it never shows misleading placeholder data.
 */
function AiAnalysisCard({ donation }) {
  const {
    aiCategory,
    aiFoodType,
    aiPerishability,
    aiStorageRecommendation,
    priorityScore,
    priorityLevel,
    priorityReason,
  } = donation;

  const hasAnalysis = aiCategory || aiFoodType || aiPerishability;
  const hasPriority = priorityScore != null && priorityLevel;

  if (!hasAnalysis && !hasPriority) {
    return null;
  }

  const priorityStyles =
    priorityLevel === "High"
      ? "bg-[#FEE2E2] text-[#B91C1C] border-[#FCA5A5]"
      : priorityLevel === "Medium"
      ? "bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]"
      : "bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {hasAnalysis && (
        <div className="card !bg-white p-5 space-y-3">
          <h3 className="font-display text-sm font-bold text-forest-dark flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest/10 text-forest text-xs">✦</span>
            AI Food Analysis
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {aiCategory && (
              <div>
                <span className="block text-ink/50 text-[11px]">Category</span>
                <span className="font-semibold text-forest-dark">{aiCategory}</span>
              </div>
            )}
            {aiFoodType && (
              <div>
                <span className="block text-ink/50 text-[11px]">Food Type</span>
                <span className="font-semibold text-forest-dark">{aiFoodType}</span>
              </div>
            )}
            {aiPerishability && (
              <div>
                <span className="block text-ink/50 text-[11px]">Perishability</span>
                <span className="font-semibold text-forest-dark">{aiPerishability}</span>
              </div>
            )}
            {aiStorageRecommendation && (
              <div className="col-span-2">
                <span className="block text-ink/50 text-[11px]">Storage</span>
                <span className="font-semibold text-forest-dark">{aiStorageRecommendation}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {hasPriority && (
        <div className="card !bg-white p-5 space-y-3">
          <h3 className="font-display text-sm font-bold text-forest-dark flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest/10 text-forest text-xs">⚡</span>
            Rescue Priority
          </h3>
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl font-bold text-forest-dark">{priorityScore}/100</span>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${priorityStyles}`}>
              {priorityLevel} Priority
            </span>
          </div>
          {priorityReason && (
            <p className="text-xs text-ink/70 leading-relaxed">{priorityReason}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AiAnalysisCard;

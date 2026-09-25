/**
 * Reusable Status Filter Tabs component for My Donations page.
 */
function FilterTabs({ activeTab, onTabChange, counts = {}, className = "" }) {
  const TABS = [
    { id: "All", label: "All Donations", count: counts.total },
    { id: "Pending", label: "Pending", count: counts.pending },
    { id: "Accepted", label: "Accepted", count: counts.accepted },
    { id: "Completed", label: "Completed", count: counts.completed },
  ];

  return (
    <div className={`flex flex-wrap items-center gap-2 border-b border-ink/10 pb-4 ${className}`}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            type="button"
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              isActive
                ? "bg-forest text-paper shadow-sm"
                : "bg-white text-ink/70 border border-ink/10 hover:bg-stone/50 hover:text-forest-dark"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive ? "bg-wheat text-forest-dark font-extrabold" : "bg-stone text-ink/60"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default FilterTabs;

import { useNgo } from "../../context/NgoContext";

/**
 * Top Navbar for the NGO Module.
 */
function NgoNavbar({ onMobileMenuToggle }) {
  const { ngoProfile } = useNgo();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink/10 bg-paper/90 px-6 backdrop-blur">
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-white text-forest-dark lg:hidden"
          aria-label="Toggle Navigation Drawer"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="eyebrow hidden sm:inline-block !text-forest">
          NGO Rescue Portal
        </span>
      </div>

      {/* Right: NGO Organization Avatar & Quick Info */}
      <div className="flex items-center gap-4">
        {/* Notification Bell Icon */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink/70 border border-ink/10 hover:text-forest-dark transition-colors"
          aria-label="Notifications"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
        </button>

        {/* NGO Greeting & Logo */}
        <div className="flex items-center gap-3 border-l border-ink/10 pl-4">
          <img
            src={ngoProfile.logoUrl}
            alt={ngoProfile.ngoName}
            className="h-9 w-9 rounded-full object-cover border border-forest/20 shadow-sm"
          />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-forest-dark leading-tight">
              {ngoProfile.ngoName}
            </span>
            <span className="text-[11px] text-ink/50">
              Verified Partner
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NgoNavbar;

import { NavLink } from "react-router-dom";
import Logo from "../common/Logo";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    to: "/ngo/dashboard",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    label: "Available Donations",
    to: "/ngo/available-donations",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    label: "Accepted Donations",
    to: "/ngo/accepted-donations",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "NGO Profile",
    to: "/ngo/profile",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

function NgoSidebar({ onItemClick, onLogoutClick, className = "" }) {
  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
      isActive
        ? "bg-forest text-paper shadow-sm"
        : "text-ink/70 hover:bg-forest/5 hover:text-forest-dark"
    }`;

  return (
    <aside className={`flex flex-col justify-between h-full bg-paper border-r border-ink/10 p-6 ${className}`}>
      <div className="space-y-8">
        {/* Brand Logo */}
        <div className="px-2">
          <Logo />
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          <p className="px-4 text-[10px] font-bold uppercase tracking-wider text-ink/40 mb-2">
            NGO Portal
          </p>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={navLinkStyle}
              end={item.to === "/ngo/dashboard"}
              onClick={onItemClick}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="pt-6 border-t border-ink/10">
        <button
          type="button"
          onClick={onLogoutClick}
          className="flex w-full items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-red-700 hover:bg-red-50 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default NgoSidebar;

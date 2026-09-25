import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import { useAuth } from "../../context/AuthContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const linkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 ${
      isActive ? "text-forest-dark font-semibold" : "text-ink/70 hover:text-forest-dark"
    }`;

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  // Render role badge style
  function renderBadge() {
    if (!currentUser) return null;
    const role = currentUser.role.toLowerCase();
    let badgeStyle = "bg-emerald-100 text-emerald-800 border-emerald-300";
    if (role === "ngo") badgeStyle = "bg-blue-100 text-blue-800 border-blue-300";
    if (role === "admin") badgeStyle = "bg-purple-100 text-purple-800 border-purple-300";

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${badgeStyle}`}>
        <span className="h-1.5 w-1.5 rounded-full fill-current" />
        {role.toUpperCase()} SESSION
      </span>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <nav className="container-page flex items-center justify-between py-4">
        {/* Left Logo */}
        <Logo />

        {/* Center Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses} end>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right Desktop Auth / Session Bar */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated && currentUser ? (
            <div className="flex items-center gap-3">
              {renderBadge()}

              <NavLink
                to={`/${currentUser.role}/dashboard`}
                className="btn-primary !px-4 !py-2 text-xs font-bold flex items-center gap-1.5"
              >
                <span>Dashboard →</span>
              </NavLink>

              <button
                type="button"
                onClick={handleLogout}
                className="btn-secondary !px-3 !py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="btn-secondary !px-5 !py-2.5">
                Log in
              </NavLink>
              <NavLink to="/register" className="btn-primary !px-5 !py-2.5">
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-forest-dark md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-ink/10 bg-paper md:hidden">
          <div className="container-page flex flex-col gap-4 py-5">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClasses}
                end
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              {isAuthenticated && currentUser ? (
                <>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs text-ink/60 font-semibold">{currentUser.name}</span>
                    {renderBadge()}
                  </div>
                  <NavLink
                    to={`/${currentUser.role}/dashboard`}
                    className="btn-primary w-full text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Go to {currentUser.role.toUpperCase()} Dashboard
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="btn-secondary w-full text-center text-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="btn-secondary w-full" onClick={() => setIsOpen(false)}>
                    Log in
                  </NavLink>
                  <NavLink to="/register" className="btn-primary w-full" onClick={() => setIsOpen(false)}>
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

import { Link } from "react-router-dom";
import Logo from "../common/Logo";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-dark text-paper/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand & Mission */}
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
            ShareBite connects surplus food from donors with NGOs on the ground, so good food reaches people instead of landfills.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <p className="eyebrow !text-wheat">Platform</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/" className="transition-colors hover:text-paper">Home</Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-paper">About</Link>
            </li>
            <li>
              <Link to="/register" className="transition-colors hover:text-paper">Join as Donor</Link>
            </li>
            <li>
              <Link to="/register" className="transition-colors hover:text-paper">Join as NGO</Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <p className="eyebrow !text-wheat">Account</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/login" className="transition-colors hover:text-paper">Log in</Link>
            </li>
            <li>
              <Link to="/register" className="transition-colors hover:text-paper">Register</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="eyebrow !text-wheat">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm text-paper/60">
            <li>support@sharebite.org</li>
            <li>Community Food Rescue Initiative</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} ShareBite. All rights reserved.</p>
          <p>Share Food. Share Hope. — Built to reduce food waste.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

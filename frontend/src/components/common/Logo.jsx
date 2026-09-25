import { Link } from "react-router-dom";
import ShareBiteLogoMark from "./ShareBiteLogoMark";

/**
 * Official ShareBite Brand Logo Header/Footer Component.
 */
function Logo({ variant = "dark" }) {
  const textColor = variant === "light" ? "text-paper" : "text-forest-dark";

  return (
    <Link to="/" className="inline-flex items-center gap-3 group">
      <div className="transition-transform duration-300 group-hover:scale-105">
        <ShareBiteLogoMark className="h-10 w-10 sm:h-11 sm:w-11" />
      </div>
      <span className={`font-display text-xl sm:text-2xl font-bold tracking-tight ${textColor}`}>
        ShareBite
      </span>
    </Link>
  );
}

export default Logo;

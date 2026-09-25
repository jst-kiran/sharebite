import { useState, useEffect } from "react";
import defaultFood from "../../assets/images/food/default_food.svg";

/**
 * Performance-Optimized Source-Agnostic FoodImage Component for ShareBite.
 * Features:
 * - Native Lazy Loading (loading="lazy" / loading="eager" via priority prop)
 * - Async Decoding (decoding="async")
 * - Layout Shift Prevention (CLS=0 via pre-reserved 4:3 container box)
 * - Perceived Performance (lightweight placeholder + smooth fade-in transition)
 * - Automatic onError Fallback to defaultFood placeholder
 */
function FoodImage({
  src,
  alt = "Food donation item",
  aspectRatio = "aspect-[4/3]",
  priority = false,
  className = "",
  imgClassName = "",
  fallbackSrc = defaultFood,
}) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setIsLoaded(false);
    setHasError(false);
  }, [src, fallbackSrc]);

  function handleError() {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
      setIsLoaded(true);
    }
  }

  return (
    <div className={`relative overflow-hidden rounded-xl bg-stone/30 ${aspectRatio} ${className}`}>
      {/* Lightweight Pre-reserved Placeholder background */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone/40 z-0">
          <span className="h-6 w-6 rounded-full border-2 border-forest/20 border-t-forest animate-spin" />
        </div>
      )}

      <img
        src={imgSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`h-full w-full object-cover transition-opacity duration-300 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
}

export default FoodImage;

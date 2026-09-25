import ShareBiteLogoMark from "./ShareBiteLogoMark";

/**
 * ShareBite Ecosystem Hero Illustration Component.
 * Features official new ShareBite brand emblem in center circle,
 * non-overlapping floating cards (Donors, NGOs, Volunteers), guide orbits, node badges, & floating leaves.
 */
function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none overflow-visible">
      {/* 1. Dotted Matrix Grid Backgrounds (Top Right & Bottom Left) */}
      <div className="absolute top-2 right-4 pointer-events-none opacity-30 grid grid-cols-5 gap-1.5 z-0">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-forest-dark" />
        ))}
      </div>
      <div className="absolute bottom-2 left-4 pointer-events-none opacity-30 grid grid-cols-5 gap-1.5 z-0">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-forest-dark" />
        ))}
      </div>

      {/* 2. Decorative Floating Leaves */}
      <div className="absolute top-[8%] left-[28%] pointer-events-none opacity-70 animate-card-top-left">
        <svg className="w-4 h-4 text-fern transform -rotate-45" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.86 16.7 9.8 11.8 17.5 10V8z" />
          <path d="M21 3C10 3 4 9 4 20h2c0-9 5-14 15-15V3z" />
        </svg>
      </div>
      <div className="absolute top-[28%] left-[8%] pointer-events-none opacity-60 animate-card-top-left">
        <svg className="w-3.5 h-3.5 text-fern transform rotate-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 3C10 3 4 9 4 20h2c0-9 5-14 15-15V3z" />
        </svg>
      </div>
      <div className="absolute bottom-[30%] right-[6%] pointer-events-none opacity-60 animate-card-top-right">
        <svg className="w-3.5 h-3.5 text-fern transform -rotate-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 3C10 3 4 9 4 20h2c0-9 5-14 15-15V3z" />
        </svg>
      </div>
      <div className="absolute bottom-[28%] left-[24%] pointer-events-none opacity-70 animate-card-top-left">
        <svg className="w-4 h-4 text-fern transform rotate-45" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.86 16.7 9.8 11.8 17.5 10V8z" />
          <path d="M21 3C10 3 4 9 4 20h2c0-9 5-14 15-15V3z" />
        </svg>
      </div>

      {/* 3. Curved Connection Line SVG Overlay & Concentric Nodes */}
      <svg
        viewBox="0 0 540 540"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        fill="none"
      >
        {/* Main Outer Dotted Orbital Circle (Centered at 270, 270) */}
        <circle
          cx="270"
          cy="270"
          r="195"
          stroke="#40704A"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Inner Guide Ring around Logo (Centered at 270, 270) */}
        <circle
          cx="270"
          cy="270"
          r="70"
          stroke="rgba(27, 67, 50, 0.15)"
          strokeWidth="1.2"
        />

        {/* Orbital Node Indicators */}
        <circle cx="75" cy="270" r="5" fill="#52B788" />
        <circle cx="465" cy="270" r="5" fill="#D4A72C" />
      </svg>

      {/* 4. CARD 1: TOP LEFT - DONORS */}
      <div className="absolute top-[2%] left-[2%] sm:left-[4%] z-20 w-[150px] sm:w-[165px] bg-white p-4 sm:p-5 rounded-[24px] border border-ink/10 shadow-xl shadow-forest-dark/5 text-center flex flex-col items-center animate-card-top-left transition-transform duration-300 hover:scale-105">
        {/* Icon Container */}
        <div className="relative flex h-13 w-13 items-center justify-center rounded-full bg-[#E2EBE4] text-[#122E22] mb-2.5">
          <svg className="w-6.5 h-6.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-3.5 h-3.5 text-fern" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 3C10 3 4 9 4 20h2c0-9 5-14 15-15V3z" />
          </svg>
        </div>
        <h3 className="font-display text-base sm:text-lg font-bold text-forest-dark mb-0.5">
          Donors
        </h3>
        <span className="text-[10px] text-ink/30 font-bold tracking-widest block mb-1">•••</span>
        <p className="text-[11px] text-ink/60 leading-relaxed font-medium">
          Share surplus food with ease
        </p>
      </div>

      {/* 5. CARD 2: TOP RIGHT - NGOS */}
      <div className="absolute top-[2%] right-[2%] sm:right-[4%] z-20 w-[150px] sm:w-[165px] bg-white p-4 sm:p-5 rounded-[24px] border border-ink/10 shadow-xl shadow-forest-dark/5 text-center flex flex-col items-center animate-card-top-right transition-transform duration-300 hover:scale-105">
        {/* Icon Container */}
        <div className="relative flex h-13 w-13 items-center justify-center rounded-full bg-[#F5EAD4] text-[#B58618] mb-2.5">
          <svg className="w-6.5 h-6.5 text-[#B58618]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-3.5 h-3.5 text-wheat" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 3C10 3 4 9 4 20h2c0-9 5-14 15-15V3z" />
          </svg>
        </div>
        <h3 className="font-display text-base sm:text-lg font-bold text-forest-dark mb-0.5">
          NGOs
        </h3>
        <span className="text-[10px] text-ink/30 font-bold tracking-widest block mb-1">•••</span>
        <p className="text-[11px] text-ink/60 leading-relaxed font-medium">
          Receive and serve meals to those in need
        </p>
      </div>

      {/* 6. CENTER: OFFICIAL NEW SHAREBITE LOGO EMBLEM */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center text-center">
        {/* Central Logo Container */}
        <div className="relative p-1.5 rounded-full bg-forest/5 flex items-center justify-center">
          <div className="p-2 rounded-full border border-forest/30 relative flex items-center justify-center">
            {/* Top, Right, Bottom, Left node dots on border ring */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-forest-dark" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-forest-dark" />
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-forest-dark" />
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-forest-dark" />

            {/* Dark Green Circle with New Official Emblem */}
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-[#122E22] flex items-center justify-center shadow-lg relative overflow-hidden transition-transform duration-500 hover:scale-105 p-3">
              <ShareBiteLogoMark className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Floating Typography */}
        <div className="mt-3 flex flex-col items-center">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-forest-dark tracking-tight leading-tight">
            ShareBite
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-ink/70 mt-1 leading-snug">
            Smart matching. <br /> Real impact.
          </p>
        </div>
      </div>

      {/* 7. CARD 3: BOTTOM CENTER - VOLUNTEERS */}
      <div className="absolute bottom-[0%] left-1/2 z-20 w-[150px] sm:w-[165px] bg-white p-4 sm:p-5 rounded-[24px] border border-ink/10 shadow-xl shadow-forest-dark/5 text-center flex flex-col items-center animate-card-bottom transition-transform duration-300 hover:scale-105">
        {/* Icon Container */}
        <div className="relative flex h-13 w-13 items-center justify-center rounded-full bg-[#EAE8F4] text-[#5B4B9A] mb-2.5">
          <svg className="w-6.5 h-6.5 text-[#5B4B9A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-3.5 h-3.5 text-[#8B78D8]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 3C10 3 4 9 4 20h2c0-9 5-14 15-15V3z" />
          </svg>
        </div>
        <h3 className="font-display text-base sm:text-lg font-bold text-forest-dark mb-0.5">
          Volunteers
        </h3>
        <span className="text-[10px] text-ink/30 font-bold tracking-widest block mb-1">•••</span>
        <p className="text-[11px] text-ink/60 leading-relaxed font-medium">
          Help bridge the gap and make a difference
        </p>
      </div>
    </div>
  );
}

export default HeroIllustration;

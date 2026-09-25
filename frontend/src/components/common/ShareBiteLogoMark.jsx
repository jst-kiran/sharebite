/**
 * Official ShareBite Brand Logo Emblem SVG Component.
 */
function ShareBiteLogoMark({ className = "w-9 h-9" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`shrink-0 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="greenGradMark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B4332" />
          <stop offset="100%" stopColor="#2D6A4F" />
        </linearGradient>
        <linearGradient id="goldGradMark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5B014" />
          <stop offset="100%" stopColor="#D4A72C" />
        </linearGradient>
        <linearGradient id="leafGradMark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#52B788" />
          <stop offset="100%" stopColor="#40704A" />
        </linearGradient>
      </defs>

      {/* Golden Outer Swirling Arc */}
      <path
        d="M 125,48 A 78,78 0 0,1 178,125 A 78,78 0 0,1 108,178 C 122,175 168,160 168,122 C 168,85 142,56 125,48 Z"
        fill="url(#goldGradMark)"
      />

      {/* Dark Green Hand & Circular Arc Body */}
      <path
        d="M 100,20 A 80,80 0 0,0 24,100 A 80,80 0 0,0 100,180 C 72,174 38,145 38,100 C 38,58 72,28 100,20 Z"
        fill="url(#greenGradMark)"
      />
      {/* Hand Finger Details */}
      <path
        d="M 38,100 C 38,125 55,142 82,142 L 112,142 C 122,142 128,136 128,128 C 128,122 122,118 112,118 L 88,118 C 72,118 52,110 38,100 Z"
        fill="url(#greenGradMark)"
      />
      <path
        d="M 45,115 C 55,128 75,132 105,132 L 122,132 C 128,132 134,126 134,120 C 134,115 128,110 118,110 L 92,110 C 72,110 55,120 45,115 Z"
        fill="#122E22"
        opacity="0.3"
      />

      {/* Golden Bread / Food Items in Bowl */}
      <ellipse cx="82" cy="78" rx="26" ry="18" fill="url(#goldGradMark)" transform="rotate(-15 82 78)" />
      <path d="M 68,70 Q 75,60 85,68" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M 80,75 Q 88,65 96,72" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />

      <ellipse cx="118" cy="84" rx="20" ry="14" fill="url(#goldGradMark)" transform="rotate(10 118 84)" />

      {/* Sprouting Green Leaves */}
      <path
        d="M 112,80 C 112,50 145,35 155,30 C 150,45 138,72 112,80 Z"
        fill="url(#leafGradMark)"
      />
      <path
        d="M 116,68 C 108,55 98,50 92,48 C 98,58 108,66 116,68 Z"
        fill="url(#leafGradMark)"
      />

      {/* Green Bowl with White Heart */}
      <path
        d="M 52,88 L 152,88 C 148,122 120,138 102,138 C 82,138 56,122 52,88 Z"
        fill="url(#greenGradMark)"
      />
      <path
        d="M 52,88 C 75,94 128,94 152,88 C 152,92 148,120 102,120 C 82,120 52,92 52,88 Z"
        fill="#2D6A4F"
      />

      {/* White Heart on Bowl */}
      <path
        d="M 102,112 C 98,106 90,102 85,107 C 80,112 82,119 102,128 C 122,119 124,112 119,107 C 114,102 106,106 102,112 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export default ShareBiteLogoMark;

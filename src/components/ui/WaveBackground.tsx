export function WaveBackground() {
  return (
    <>
      {/* Top wave (12% tint) */}
      <svg
        className="pointer-events-none absolute -top-[1px] left-0 h-[120px] w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,20 1440,40 L1440,0 L0,0 Z"
          fill="rgba(180,187,95,0.12)"
        />
      </svg>

      {/* Bottom wave (12% tint) */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 h-[120px] w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 C240,40 480,120 720,80 C960,40 1200,100 1440,80 L1440,120 L0,120 Z"
          fill="rgba(180,187,95,0.12)"
        />
      </svg>
    </>
  );
}

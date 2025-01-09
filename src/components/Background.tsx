import React from 'react';

const ElegantBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      {/* Base gradient layer */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950 to-black" />
      </div>

      {/* Crystalline pattern layer */}
      <div className="absolute inset-0">
        {/* Crystal structure */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="crystal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.2)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <pattern id="hexGrid" width="100" height="173.2" patternUnits="userSpaceOnUse">
            <path d="M50 0L0 86.6l50 86.6 100 0-50-86.6L50 0z" 
                  fill="none" 
                  stroke="url(#crystal)" 
                  strokeWidth="1" 
                  filter="url(#glow)"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexGrid)" />
        </svg>
      </div>

      {/* Light rays effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30"
          style={{
            background: `
              linear-gradient(60deg, transparent 0%, rgba(59, 130, 246, 0.1) 20%, transparent 40%),
              linear-gradient(-60deg, transparent 10%, rgba(59, 130, 246, 0.1) 30%, transparent 50%),
              linear-gradient(180deg, transparent 10%, rgba(59, 130, 246, 0.05) 50%, transparent 90%)
            `
          }}
        />
      </div>

      {/* Prismatic highlights */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: '200%',
                height: '200%',
                top: '-50%',
                left: '-50%',
                background: `
                  conic-gradient(
                    from ${i * 72}deg at 50% 50%,
                    transparent 0deg,
                    rgba(59, 130, 246, 0.03) ${30 + i * 5}deg,
                    transparent ${60 + i * 10}deg
                  )
                `,
                transform: `rotate(${i * 72}deg)`
              }}
            />
          ))}
        </div>
      </div>

      {/* Deep space effect */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              background: `rgba(255, 255, 255, ${Math.random() * 0.3})`,
              boxShadow: `0 0 ${Math.random() * 4}px rgba(255, 255, 255, 0.2)`
            }}
          />
        ))}
      </div>

      {/* Central focal point */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2">
          <div className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          />
        </div>
      </div>

      {/* Subtle energy waves */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="energyWave" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.05)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </radialGradient>
          </defs>
          <circle cx="50%" cy="50%" r="40%" fill="none" stroke="url(#energyWave)" strokeWidth="100" opacity="0.3" />
        </svg>
      </div>

      {/* Depth vignette */}
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)'
        }}
      />
    </div>
  );
};

export default ElegantBackground;
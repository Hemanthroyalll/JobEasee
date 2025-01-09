import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: string;
  top: string;
  animationDuration: string;
  animationDelay: string;
  transform1: string;
  transform2: string;
}

const Particles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 50;
    const newParticles = Array.from({ length: particleCount }).map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${10 + Math.random() * 20}s`,
      animationDelay: `-${Math.random() * 20}s`,
      transform1: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`,
      transform2: `translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px)`
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              animation: `float ${particle.animationDuration} linear infinite`,
              animationDelay: particle.animationDelay,
              '--transform1': particle.transform1,
              '--transform2': particle.transform2,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <style>
        {`
          @keyframes float {
            0% {
              transform: translate(0, 0) scale(1);
              opacity: 0;
            }
            25% {
              opacity: 0.5;
            }
            50% {
              transform: var(--transform1) scale(1.5);
              opacity: 1;
            }
            75% {
              opacity: 0.5;
            }
            100% {
              transform: var(--transform2) scale(1);
              opacity: 0;
            }
          }
        `}
      </style>
    </>
  );
};

export default Particles;
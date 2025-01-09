import { useEffect, useRef } from 'react';
import { ParticleSystem } from './ParticleSystem';
import { Renderer } from './Renderer';
import { Viewport } from './types';

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set up canvas with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    updateCanvasSize();

    // Initialize viewport and systems
    const viewport: Viewport = {
      width: canvas.width,
      height: canvas.height,
      depth: 1000
    };

    const particleSystem = new ParticleSystem(viewport, 50);
    const renderer = new Renderer(canvas, viewport);

    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;

    const animate = () => {
      renderer.clear();
      renderer.drawBackground();

      particleSystem.update(mouseX - viewport.width / 2, mouseY - viewport.height / 2);
      particleSystem.getParticles().forEach(particle => {
        renderer.drawParticle(particle);
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * dpr;
      mouseY = (e.clientY - rect.top) * dpr;
    };

    const handleResize = () => {
      updateCanvasSize();
      viewport.width = canvas.width;
      viewport.height = canvas.height;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ background: '#0f172a' }}
    />
  );
}
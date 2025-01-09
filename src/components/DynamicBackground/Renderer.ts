import { Particle3D, Viewport } from './types';

export class Renderer {
  private ctx: CanvasRenderingContext2D;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly viewport: Viewport
  ) {
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get canvas context');
    this.ctx = context;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground(): void {
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(1, '#1e293b');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawParticle(particle: Particle3D): void {
    // Calculate perspective scaling
    const scale = this.viewport.depth / (this.viewport.depth + particle.z);
    const x = particle.x * scale + this.canvas.width / 2;
    const y = particle.y * scale + this.canvas.height / 2;
    const size = particle.size * scale;

    // Skip if particle is too small or out of view
    if (size < 1) return;

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(particle.rotationX);

    // Create shape with depth effect
    this.ctx.beginPath();
    this.ctx.moveTo(-size / 2, -size / 2);
    this.ctx.lineTo(size / 2, -size / 2);
    this.ctx.lineTo(size / 2, size / 2);
    this.ctx.lineTo(-size / 2, size / 2);
    this.ctx.closePath();

    // Apply color with depth-based opacity
    const depthFactor = (particle.z + this.viewport.depth / 2) / this.viewport.depth;
    const opacity = particle.opacity * depthFactor;
    this.ctx.fillStyle = `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
    this.ctx.fill();

    this.ctx.restore();
  }
}
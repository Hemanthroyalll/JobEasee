export interface Point3D {
    x: number;
    y: number;
    z: number;
  }
  
  export interface Particle3D extends Point3D {
    size: number;
    color: string;
    opacity: number;
    speedX: number;
    speedY: number;
    speedZ: number;
    rotationX: number;
    rotationY: number;
    rotationSpeed: number;
  }
  
  export interface Viewport {
    width: number;
    height: number;
    depth: number;
  }
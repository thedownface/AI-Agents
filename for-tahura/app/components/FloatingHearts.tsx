"use client";

import { useEffect, useRef } from "react";

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  rotation: number;
  rotSpeed: number;
}

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<HeartParticle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#dc2626", "#ef4444", "#f87171", "#fca5a5", "#fee2e2", "#e11d48"];

    const createParticle = (): HeartParticle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: Math.random() * 14 + 6,
      speedY: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
    });

    // Initialise with some already visible particles
    for (let i = 0; i < 20; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      particles.current.push(p);
    }

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x, y - size * 0.3, x - size * 0.5, y - size * 0.7, x - size * 0.5, y - size * 0.35);
      ctx.bezierCurveTo(x - size * 0.5, y - size * 0.75, x, y - size * 0.75, x, y - size * 0.35);
      ctx.bezierCurveTo(x, y - size * 0.75, x + size * 0.5, y - size * 0.75, x + size * 0.5, y - size * 0.35);
      ctx.bezierCurveTo(x + size * 0.5, y - size * 0.7, x, y - size * 0.3, x, y);
      ctx.closePath();
    };

    let spawnTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      spawnTimer++;
      if (spawnTimer > 40 && particles.current.length < 40) {
        particles.current.push(createParticle());
        spawnTimer = 0;
      }

      particles.current = particles.current.filter((p) => p.y > -30);

      particles.current.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        drawHeart(ctx, 0, 0, p.size);
        ctx.fill();
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

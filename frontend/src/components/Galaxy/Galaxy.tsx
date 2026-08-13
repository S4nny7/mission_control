import { useEffect, useRef } from "react";
import "./Galaxy.css";

interface GalaxyProps {
  starCount?: number;
  speed?: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  speed: number;
}

export default function Galaxy({ starCount = 220, speed = 0.15 }: GalaxyProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas === null) {
      return;
    }

    const context = canvas.getContext("2d");

    if (context === null) {
      return;
    }

    let animationFrameId: number;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.4 + 0.4,
      brightness: Math.random() * 0.6 + 0.4,
      speed: Math.random() * speed + 0.02,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = () => {
      // Black background
      context.fillStyle = "#000000";
      context.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        // Slowly move stars downward
        star.y += star.speed * 0.0002;

        // Move star back to top
        if (star.y > 1) {
          star.y = 0;
          star.x = Math.random();
        }

        const x = star.x * width;
        const y = star.y * height;

        context.beginPath();

        context.arc(x, y, star.size, 0, Math.PI * 2);

        context.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;

        context.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();

    window.addEventListener("resize", resize);

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener("resize", resize);
    };
  }, [starCount, speed]);

  return <canvas ref={canvasRef} className="galaxy-background" />;
}

"use client";

import { useEffect, useRef } from "react";

function paintStar(ctx, x, y, radius, hue, alpha) {
  const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
  glow.addColorStop(0, `hsla(${hue}, 40%, 98%, ${alpha})`);
  glow.addColorStop(0.2, `hsla(${hue}, 80%, 82%, ${alpha * 0.4})`);
  glow.addColorStop(1, `hsla(${hue}, 90%, 70%, 0)`);
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `hsla(${hue}, 30%, 96%, ${alpha * 0.75})`;
  ctx.lineWidth = Math.max(0.45, radius * 0.22);
  ctx.beginPath();
  ctx.moveTo(x - radius * 4.5, y);
  ctx.lineTo(x + radius * 4.5, y);
  ctx.moveTo(x, y - radius * 4.5);
  ctx.lineTo(x, y + radius * 4.5);
  ctx.stroke();

  ctx.strokeStyle = `hsla(${hue}, 40%, 94%, ${alpha * 0.4})`;
  ctx.beginPath();
  ctx.moveTo(x - radius * 2.4, y - radius * 2.4);
  ctx.lineTo(x + radius * 2.4, y + radius * 2.4);
  ctx.moveTo(x + radius * 2.4, y - radius * 2.4);
  ctx.lineTo(x - radius * 2.4, y + radius * 2.4);
  ctx.stroke();

  ctx.fillStyle = `hsla(${hue}, 20%, 100%, ${alpha})`;
  ctx.beginPath();
  ctx.arc(x, y, Math.max(0.8, radius * 0.85), 0, Math.PI * 2);
  ctx.fill();
}

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const stars = Array.from({ length: 260 }, (_, index) => {
      const featured = index % 4 === 0;
      return {
        x: Math.random(),
        y: Math.random(),
        size: featured ? 0.85 + Math.random() * 0.7 : 0.2 + Math.random() * 0.35,
        depth: 0.25 + Math.random() * 0.75,
        hue: index % 7 === 0 ? 36 : index % 5 === 0 ? 220 : 205,
        phase: Math.random() * Math.PI * 2,
        drift: (Math.random() - 0.5) * 0.00004,
        featured
      };
    });
    const pointer = { x: 0, y: 0 };
    const onMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);

    let frame = 0;
    const draw = (time) => {
      const width = canvas.clientWidth || 0;
      const height = canvas.clientHeight || 0;
      if (width < 2 || height < 2) {
        frame = requestAnimationFrame(draw);
        return;
      }
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        star.x = (star.x + star.drift + 1) % 1;
        const flicker = 0.62 + 0.38 * (0.5 + 0.5 * Math.sin(time * 0.002 + star.phase));
        const px = star.x * width + pointer.x * 40 * star.depth;
        const py = star.y * height + pointer.y * 26 * star.depth;
        if (star.featured) {
          paintStar(ctx, px, py, star.size * flicker, star.hue, 0.95);
        } else {
          const dust = ctx.createRadialGradient(px, py, 0, px, py, star.size * 3);
          dust.addColorStop(0, `hsla(${star.hue}, 25%, 98%, ${0.9 * flicker})`);
          dust.addColorStop(1, `hsla(${star.hue}, 80%, 80%, 0)`);
          ctx.fillStyle = dust;
          ctx.beginPath();
          ctx.arc(px, py, star.size * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}

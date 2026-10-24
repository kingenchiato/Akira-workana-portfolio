"use client";

import { forwardRef, useEffect, useRef } from "react";

const SIZE = 240;
const JAPAN = (138 * Math.PI) / 180;

const EarthGlobe = forwardRef(function EarthGlobe({ pausedRef }, pivotRef) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    const pixels = ctx.createImageData(SIZE, SIZE);
    const buffer = pixels.data;
    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const radius = SIZE / 2 - 2;
    const samples = [];

    for (let y = 0; y < SIZE; y += 1) {
      for (let x = 0; x < SIZE; x += 1) {
        const dx = (x + 0.5 - cx) / radius;
        const dy = (cy - (y + 0.5)) / radius;
        const dist = dx * dx + dy * dy;
        const index = (y * SIZE + x) * 4;
        if (dist > 1.08) continue;
        samples.push({ index, dx, dy, dist });
      }
    }

    let map = null;
    let frame = 0;
    let spin = 0.4;
    const image = new Image();
    image.src = "/images/earth.jpg";
    image.onload = () => {
      const source = document.createElement("canvas");
      source.width = 720;
      source.height = 360;
      const sourceCtx = source.getContext("2d", { willReadFrequently: true });
      sourceCtx.drawImage(image, 0, 0, source.width, source.height);
      map = sourceCtx.getImageData(0, 0, source.width, source.height).data;
    };

    const tick = () => {
      if (!pausedRef.current) spin += 0.0045;
      buffer.fill(0);
      const cos = Math.cos(spin);
      const sin = Math.sin(spin);
      const width = 720;
      const height = 360;

      for (let n = 0; n < samples.length; n += 1) {
        const sample = samples[n];
        const { index, dx, dy, dist } = sample;
        if (dist > 1) {
          const edge = 1.08 - dist;
          const alpha = Math.max(0, edge / 0.08) * 150;
          buffer[index] = 150;
          buffer[index + 1] = 206;
          buffer[index + 2] = 235;
          buffer[index + 3] = alpha;
          continue;
        }

        const dz = Math.sqrt(1 - dist);
        const rx = dx * cos + dz * sin;
        const rz = -dx * sin + dz * cos;
        let lon = Math.atan2(rx, rz) + JAPAN;
        lon = ((lon % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const lat = Math.asin(Math.max(-1, Math.min(1, dy)));
        const u = (lon / (Math.PI * 2)) * (width - 1);
        const v = (0.5 - lat / Math.PI) * (height - 1);
        const sx = Math.max(0, Math.min(width - 1, u | 0));
        const sy = Math.max(0, Math.min(height - 1, v | 0));
        const sourceIndex = (sy * width + sx) * 4;
        const light = 0.72 + 0.16 * Math.max(0, dx * -0.1 + dy * 0.16 + dz * 0.9);
        const shade = 0.78 + 0.22 * (1 - dist);
        if (map) {
          const red = map[sourceIndex];
          const green = map[sourceIndex + 1];
          const blue = map[sourceIndex + 2];
          const average = (red + green + blue) / 3;
          const tone = average * 0.62 + 46;
          const keep = 0.28;
          buffer[index] = Math.min(255, (tone * 0.72 + (red - average) * keep + 18) * light * shade);
          buffer[index + 1] = Math.min(255, (tone * 0.78 + (green - average) * keep + 24) * light * shade);
          buffer[index + 2] = Math.min(255, (tone * 0.92 + (blue - average) * keep + 36) * light * shade);
        } else {
          buffer[index] = 36 * light;
          buffer[index + 1] = 52 * light;
          buffer[index + 2] = 74 * light;
        }
        buffer[index + 3] = Math.round(168 + 40 * (1 - dist));
      }

      ctx.putImageData(pixels, 0, 0);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [pausedRef]);

  return (
    <div className="earth-pivot" ref={pivotRef} aria-hidden="true">
      <canvas ref={canvasRef} className="earth-canvas" width={SIZE} height={SIZE} />
    </div>
  );
});

export default EarthGlobe;

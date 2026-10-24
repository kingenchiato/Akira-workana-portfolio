import { classifyLatLon, COUNTRY_RGB } from "./earthMap";

function rgb255(rgb) {
  return `rgb(${Math.round(rgb[0] * 255)},${Math.round(rgb[1] * 255)},${Math.round(rgb[2] * 255)})`;
}

/** Build an equirectangular Earth canvas (oceans + continents + featured countries). */
export function createEarthCanvas(width = 2048, height = 1024) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: false });

  // Ocean base
  const ocean = ctx.createLinearGradient(0, 0, 0, height);
  ocean.addColorStop(0, "#0e3a68");
  ocean.addColorStop(0.5, "#1460a8");
  ocean.addColorStop(1, "#0a2c55");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, width, height);

  // Soft ocean texture noise
  for (let i = 0; i < 1800; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.fillStyle = `rgba(80,160,220,${0.03 + Math.random() * 0.05})`;
    ctx.beginPath();
    ctx.arc(x, y, 1 + Math.random() * 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Paint land by sampling classification
  const step = 2;
  const img = ctx.getImageData(0, 0, width, height);
  const data = img.data;
  for (let py = 0; py < height; py += step) {
    const lat = 90 - (py / (height - 1)) * 180;
    for (let px = 0; px < width; px += step) {
      const lon = (px / (width - 1)) * 360 - 180;
      const hit = classifyLatLon(lat, lon);
      if (hit.kind === "ocean") continue;
      let [r, g, b] = hit.rgb;
      if (hit.kind === "country") {
        // slightly brighten featured nations
        r = Math.min(1, r * 1.08 + 0.04);
        g = Math.min(1, g * 1.08 + 0.04);
        b = Math.min(1, b * 1.08 + 0.04);
      }
      for (let dy = 0; dy < step; dy += 1) {
        for (let dx = 0; dx < step; dx += 1) {
          const x = px + dx;
          const y = py + dy;
          if (x >= width || y >= height) continue;
          const i = (y * width + x) * 4;
          data[i] = Math.round(r * 255);
          data[i + 1] = Math.round(g * 255);
          data[i + 2] = Math.round(b * 255);
          data[i + 3] = 255;
        }
      }
    }
  }
  ctx.putImageData(img, 0, 0);

  // Subtle country edge glow for featured nations (capital-centered blotches already colored)
  Object.entries(COUNTRY_RGB).forEach(([id, rgb]) => {
    // decorative — keep classification as source of truth
    void id;
    void rgb;
  });

  // Latitude lines (very faint)
  ctx.strokeStyle = "rgba(180,220,255,0.07)";
  ctx.lineWidth = 1;
  for (let lat = -60; lat <= 60; lat += 30) {
    const y = ((90 - lat) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let lon = -150; lon <= 150; lon += 30) {
    const x = ((lon + 180) / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  return canvas;
}

export function paintLegendSwatch(ctx, x, y, rgb, label) {
  ctx.fillStyle = rgb255(rgb);
  ctx.fillRect(x, y, 14, 10);
  ctx.fillStyle = "#dff";
  ctx.font = "10px sans-serif";
  ctx.fillText(label, x + 18, y + 9);
}

"use client";

import { useEffect, useRef } from "react";

const DURATION = 8200;
const LEATHER = "#1a3358";

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function paintLeatherTo(g, leather, w, h) {
  g.fillStyle = LEATHER;
  g.fillRect(0, 0, w, h);
  if (!leather) return;
  const inset = Math.floor(Math.min(leather.width, leather.height) * 0.08);
  const sw = leather.width - inset * 2;
  const sh = leather.height - inset * 2;
  const scale = Math.max(w / sw, h / sh) * 1.02;
  const dw = sw * scale;
  const dh = sh * scale;
  g.drawImage(leather, inset, inset, sw, sh, (w - dw) / 2, (h - dh) / 2, dw, dh);
  g.fillStyle = "rgba(8, 20, 40, 0.14)";
  g.fillRect(0, 0, w, h);
}

function makeNameMask(w, h, names, size) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  g.clearRect(0, 0, w, h);
  g.fillStyle = "#fff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  names.forEach((n) => {
    g.font = n.font(size);
    g.fillText(n.text, w / 2, h * n.y);
  });
  return g.getImageData(0, 0, w, h);
}

const FLAKE_COLORS = ["#d7c089", "#f3e4b0", "#8ea4c4", "#0c1524", "#c9a227", "#4a6a92", "#efe6c8", "#16243c"];

function makeFlakes(w, h, mask) {
  const flakes = [];
  const data = mask.data;
  const step = 3;
  const cx = w / 2;
  const cy = h * 0.51;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (data[(y * w + x) * 4 + 3] < 40) continue;
      if (Math.random() > 0.48) continue;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.min(1, Math.hypot(dx, dy) / (Math.min(w, h) * 0.28));
      flakes.push({
        x: x + Math.random() * step,
        y: y + Math.random() * step,
        ox: x,
        oy: y,
        vx: dx * 0.006 + (Math.random() - 0.5) * 1.45,
        vy: -0.55 - Math.random() * 1.85 + dy * 0.002,
        vr: (Math.random() - 0.5) * 0.24,
        rot: Math.random() * Math.PI,
        size: 2.2 + Math.random() * 5.4,
        sheet: Math.random() > 0.86,
        delay: 0.17 + dist * 0.3 + Math.random() * 0.14,
        life: 0,
        on: false,
        color: FLAKE_COLORS[(Math.random() * FLAKE_COLORS.length) | 0]
      });
    }
  }
  return flakes;
}

function punchNameHole(lp, names, size, w, h, ease) {
  lp.globalCompositeOperation = "destination-out";
  lp.textAlign = "center";
  lp.textBaseline = "middle";
  lp.lineJoin = "round";
  lp.lineCap = "round";
  const crack = Math.min(1, ease / 0.2);
  const open = Math.min(1, Math.max(0, (ease - 0.06) / 0.5));
  const openE = open * open * (3 - 2 * open);
  names.forEach((n) => {
    const y = h * n.y;
    lp.font = n.font(size);
    lp.strokeStyle = `rgba(255,255,255,${crack})`;
    lp.lineWidth = 1.2 + crack * 3.2;
    lp.strokeText(n.text, w / 2, y);
    if (openE > 0) {
      lp.fillStyle = `rgba(255,255,255,${openE})`;
      lp.fillText(n.text, w / 2, y);
    }
  });
  lp.globalCompositeOperation = "source-over";
}

export default function NameReveal({ onDone }) {
  const ref = useRef(null);
  const doneRef = useRef(false);
  const skipRef = useRef(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      onDoneRef.current?.();
      return undefined;
    }
    let raf = 0;
    let start = 0;
    let leather = null;
    let gold = null;
    let flakes = [];
    let namePlate = null;
    let leatherFull = null;
    let leatherPeel = null;
    let leatherGlyph = null;
    let plateW = 0;
    let plateH = 0;
    let running = true;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 3200 : DURATION;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      running = false;
      onDoneRef.current?.();
    };
    skipRef.current = finish;

    const names = [
      { text: "荒木 秀樹", y: 0.44, font: (size) => `700 ${size}px "Shippori Mincho", "Yu Mincho", serif` },
      { text: "Araki Hideki", y: 0.58, font: (size) => `600 ${size * 0.46}px Cinzel, "Times New Roman", serif` }
    ];

    const rebuild = (w, h) => {
      const size = Math.min(w * 0.13, h * 0.16, 148);
      namePlate = document.createElement("canvas");
      namePlate.width = w;
      namePlate.height = h;
      plateW = w;
      plateH = h;
      const g = namePlate.getContext("2d");
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.lineJoin = "round";
      names.forEach((n) => {
        const y = h * n.y;
        g.font = n.font(size);
        g.shadowColor = "rgba(40, 22, 4, 0.55)";
        g.shadowBlur = 22;
        g.shadowOffsetY = 7;
        g.fillStyle = "rgba(32, 18, 4, 0.45)";
        g.fillText(n.text, w / 2 + 1.5, y + 3);
        g.shadowBlur = 0;
        g.shadowOffsetY = 0;
        const metal = g.createLinearGradient(w * 0.18, y - size, w * 0.82, y + size * 0.7);
        metal.addColorStop(0, "#7a5414");
        metal.addColorStop(0.16, "#e0b84a");
        metal.addColorStop(0.32, "#fff6d0");
        metal.addColorStop(0.48, "#f0d078");
        metal.addColorStop(0.62, "#b07a22");
        metal.addColorStop(0.78, "#fff3c2");
        metal.addColorStop(1, "#8a5e16");
        g.fillStyle = metal;
        g.fillText(n.text, w / 2, y);
        if (gold) {
          const layer = document.createElement("canvas");
          layer.width = w;
          layer.height = h;
          const lg = layer.getContext("2d");
          lg.drawImage(gold, 0, 0, w, h);
          lg.globalCompositeOperation = "destination-in";
          lg.textAlign = "center";
          lg.textBaseline = "middle";
          lg.font = n.font(size);
          lg.fillStyle = "#fff";
          lg.fillText(n.text, w / 2, y);
          g.save();
          g.globalCompositeOperation = "overlay";
          g.globalAlpha = 0.45;
          g.drawImage(layer, 0, 0);
          g.restore();
        }
        g.strokeStyle = "rgba(255, 244, 200, 0.55)";
        g.lineWidth = 1.35;
        g.strokeText(n.text, w / 2 - 0.7, y - 0.8);
        g.strokeStyle = "rgba(90, 52, 10, 0.4)";
        g.strokeText(n.text, w / 2 + 0.8, y + 1);
      });

      leatherFull = document.createElement("canvas");
      leatherFull.width = w;
      leatherFull.height = h;
      paintLeatherTo(leatherFull.getContext("2d"), leather, w, h);

      leatherPeel = document.createElement("canvas");
      leatherPeel.width = w;
      leatherPeel.height = h;

      leatherGlyph = document.createElement("canvas");
      leatherGlyph.width = w;
      leatherGlyph.height = h;
      const gg = leatherGlyph.getContext("2d");
      gg.drawImage(leatherFull, 0, 0);
      gg.globalCompositeOperation = "destination-in";
      gg.fillStyle = "#fff";
      gg.textAlign = "center";
      gg.textBaseline = "middle";
      names.forEach((n) => {
        gg.font = n.font(size);
        gg.fillText(n.text, w / 2, h * n.y);
      });

      const mask = makeNameMask(w, h, names, size);
      flakes = makeFlakes(w, h, mask);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      namePlate = null;
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = (now) => {
      if (!running) return;
      if (!start) start = now;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (!namePlate || plateW !== w || plateH !== h) rebuild(w, h);

      const t = Math.min(1, (now - start) / duration);
      const peel = Math.min(1, Math.max(0, (t - 0.16) / 0.58));
      const ease = peel * peel * (3 - 2 * peel);
      const sheen = 0.22 + ease * 0.68 + Math.sin(now * 0.002) * 0.03;
      const size = Math.min(w * 0.13, h * 0.16, 148);
      const nameAlpha = Math.min(1, Math.max(0, (ease - 0.08) / 0.42));

      ctx.drawImage(leatherFull, 0, 0);

      if (nameAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = nameAlpha;
        ctx.drawImage(namePlate, 0, 0);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.globalCompositeOperation = "lighter";
        names.forEach((n) => {
          ctx.font = n.font(size);
          const y = h * n.y;
          const shine = ctx.createLinearGradient(w * (sheen - 0.28), y - size, w * (sheen + 0.12), y + size);
          shine.addColorStop(0, "rgba(255,240,180,0)");
          shine.addColorStop(0.48, "rgba(255,255,245,0.08)");
          shine.addColorStop(0.5, "rgba(255,255,245,0.82)");
          shine.addColorStop(0.52, "rgba(255,255,245,0.08)");
          shine.addColorStop(1, "rgba(255,240,180,0)");
          ctx.fillStyle = shine;
          ctx.fillText(n.text, w / 2, y);
        });
        ctx.restore();
      }

      const lp = leatherPeel.getContext("2d");
      lp.setTransform(1, 0, 0, 1, 0, 0);
      lp.globalCompositeOperation = "source-over";
      lp.globalAlpha = 1;
      lp.clearRect(0, 0, w, h);
      lp.drawImage(leatherFull, 0, 0);
      if (ease > 0) punchNameHole(lp, names, size, w, h, ease);

      if (ease > 0.04 && ease < 0.92) {
        const lip = Math.sin(Math.min(1, ease / 0.85) * Math.PI);
        lp.lineJoin = "round";
        lp.lineCap = "round";
        lp.textAlign = "center";
        lp.textBaseline = "middle";
        names.forEach((n) => {
          lp.font = n.font(size * (1 + ease * 0.03));
          lp.strokeStyle = `rgba(6, 12, 24, ${0.28 * lip})`;
          lp.lineWidth = 2.8 + ease * 1.4;
          lp.strokeText(n.text, w / 2, h * n.y);
          lp.strokeStyle = `rgba(170, 200, 230, ${0.16 * lip})`;
          lp.lineWidth = 1.2;
          lp.strokeText(n.text, w / 2 - 0.6, h * n.y - 0.8);
        });
      }

      ctx.drawImage(leatherPeel, 0, 0);

      if (ease > 0.04 && ease < 0.52 && leatherGlyph) {
        const k = (ease - 0.04) / 0.48;
        const lift = k * size * 2.4;
        const squish = Math.max(0.08, 1 - k * 0.94);
        ctx.save();
        ctx.translate(w / 2, h * 0.46 - lift);
        ctx.rotate(-k * 0.16);
        ctx.scale(1 + k * 0.08, squish);
        ctx.translate(-w / 2, -h * 0.5);
        ctx.globalAlpha = Math.max(0, 0.8 - k * 1.35);
        ctx.drawImage(leatherGlyph, 0, 0);
        ctx.restore();
      }

      flakes.forEach((f) => {
        if (!f.on && t > f.delay && peel > 0.02) f.on = true;
        if (!f.on) return;
        f.life += 1;
        f.vy += 0.02;
        f.x += f.vx;
        f.y += f.vy;
        f.rot += f.vr;
        const span = f.sheet ? 160 : 118;
        const alpha = Math.max(0, 1 - f.life / span);
        if (alpha <= 0) return;
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rot);
        ctx.globalAlpha = alpha * 0.95;
        ctx.fillStyle = f.color;
        if (f.sheet) {
          ctx.fillRect(-f.size * 1.25, -f.size * 0.38, f.size * 2.5, f.size * 0.76);
        } else {
          ctx.fillRect(-f.size * 0.55, -f.size * 0.24, f.size * 1.1, f.size * 0.48);
        }
        ctx.restore();
      });

      const hold = t > 0.88 ? (t - 0.88) / 0.12 : 0;
      if (hold > 0) {
        ctx.fillStyle = `rgba(0,0,0,${hold})`;
        ctx.fillRect(0, 0, w, h);
      }

      if (t >= 1) {
        finish();
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    Promise.all([
      loadImage("/cinematic/leather-fine.jpg"),
      loadImage("/cinematic/gold-metal.jpg"),
      document.fonts ? document.fonts.ready.catch(() => null) : Promise.resolve()
    ]).then(([a, b]) => {
      if (!running) return;
      leather = a;
      gold = b;
      namePlate = null;
    });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="reveal-root">
      <canvas ref={ref} className="reveal-canvas" />
      <button type="button" className="skip-btn" onClick={() => skipRef.current?.()}>
        Skip
      </button>
    </div>
  );
}

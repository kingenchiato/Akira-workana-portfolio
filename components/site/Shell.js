"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const THEMES = [
  { id: "snow", label: "Snow" },
  { id: "harbor", label: "Harbor" },
  { id: "pine", label: "Pine" },
  { id: "sand", label: "Sand" },
  { id: "dusk", label: "Dusk" }
];

const ZOOMS = [1, 1.12, 1.28, 1.45];

const HOME_STEPS = ["fv", "reviews", "profile", "journey", "skills", "selected", "services", "faq", "contact"];
const PROJECT_STEPS = [
  "projects-top",
  "group-system",
  "group-app",
  "group-web",
  "group-game",
  "group-python",
  "group-international",
  "group-logo",
  "group-card"
];

const SiteContext = createContext(null);

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) throw new Error("Site context is missing");
  return value;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Shell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const [theme, setThemeState] = useState("snow");
  const [zoomIndex, setZoomIndex] = useState(0);
  const [mode, setMode] = useState("idle");
  const [progress, setProgress] = useState(0);
  const status = useRef("idle");
  const gen = useRef(0);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const stored = window.localStorage.getItem("ah-theme");
    if (THEMES.some((item) => item.id === stored)) setThemeState(stored);
    const zoom = Number(window.localStorage.getItem("ah-zoom"));
    const index = ZOOMS.findIndex((value) => Math.abs(value - zoom) < 0.01);
    if (index > 0) setZoomIndex(index);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("ah-theme", theme);
  }, [theme]);

  useEffect(() => {
    const value = String(ZOOMS[zoomIndex]);
    document.documentElement.style.setProperty("--read", value);
    window.localStorage.setItem("ah-zoom", value);
  }, [zoomIndex]);

  useEffect(() => {
    const onDown = (event) => {
      if (event.button !== 0) return;
      const mark = document.createElement("span");
      mark.className = "ripple";
      mark.style.left = `${event.clientX}px`;
      mark.style.top = `${event.clientY}px`;
      document.body.appendChild(mark);
      mark.addEventListener("animationend", () => mark.remove());
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  const setTheme = useCallback((id) => {
    if (THEMES.some((item) => item.id === id)) setThemeState(id);
  }, []);

  const zoomIn = useCallback(() => {
    setZoomIndex((index) => Math.min(ZOOMS.length - 1, index + 1));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomIndex((index) => Math.max(0, index - 1));
  }, []);

  const pause = useCallback(() => {
    if (status.current !== "playing") return;
    status.current = "paused";
    setMode("paused");
  }, []);

  const resume = useCallback(() => {
    if (status.current !== "paused") return;
    status.current = "playing";
    setMode("playing");
  }, []);

  useEffect(() => {
    const stopIfScroll = () => {
      if (status.current === "playing") pause();
    };
    const onClick = (event) => {
      if (status.current !== "playing") return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-film-control]")) return;
      if (target.closest("a")) pause();
    };
    const onKey = (event) => {
      if (event.key === "Escape") pause();
    };
    window.addEventListener("wheel", stopIfScroll, { passive: true });
    window.addEventListener("touchmove", stopIfScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("wheel", stopIfScroll);
      window.removeEventListener("touchmove", stopIfScroll);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [pause]);

  const alive = (token) => token === gen.current;

  const gate = async (token) => {
    while (alive(token) && status.current === "paused") {
      await sleep(80);
    }
    return alive(token) && status.current === "playing";
  };

  const animateTo = (target, token, duration) =>
    new Promise((resolve) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const start = window.scrollY;
      const distance = target - start;
      if (reduce || Math.abs(distance) < 2) {
        window.scrollTo(0, target);
        resolve(alive(token) ? "done" : "dead");
        return;
      }
      const ms = duration;
      const t0 = performance.now();
      const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2);
      const frame = (now) => {
        if (!alive(token)) {
          resolve("dead");
          return;
        }
        if (status.current === "paused") {
          resolve("paused");
          return;
        }
        const p = Math.min(1, (now - t0) / ms);
        window.scrollTo(0, start + distance * ease(p));
        if (p < 1) requestAnimationFrame(frame);
        else resolve("done");
      };
      requestAnimationFrame(frame);
    });

  const dwell = async (ms, token) => {
    let left = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? Math.min(ms, 700) : ms;
    while (left > 0) {
      if (!(await gate(token))) return false;
      const slice = Math.min(left, 80);
      await sleep(slice);
      left -= slice;
    }
    return alive(token);
  };

  const waitFor = async (id, token) => {
    for (let attempt = 0; attempt < 80; attempt += 1) {
      if (!(await gate(token))) return false;
      if (document.getElementById(id)) return true;
      await sleep(100);
    }
    return false;
  };

  const glide = async (id, token, hold) => {
    const found = await waitFor(id, token);
    if (!found) return alive(token) ? "skip" : "dead";
    const element = document.getElementById(id);
    if (!element) return "skip";
    const top = Math.max(0, window.scrollY + element.getBoundingClientRect().top - 76);
    let moved = await animateTo(top, token, 1100);
    if (moved === "paused") {
      if (!(await gate(token))) return "dead";
      moved = await animateTo(top, token, 800);
    }
    if (moved === "dead") return "dead";
    if (!(await dwell(hold, token))) return "dead";
    const bottom = window.scrollY + element.getBoundingClientRect().bottom - window.innerHeight + 28;
    if (bottom > window.scrollY + 48) {
      const distance = bottom - window.scrollY;
      const duration = Math.min(14000, Math.max(1600, distance * 1.8));
      let swept = await animateTo(bottom, token, duration);
      if (swept === "paused") {
        if (!(await gate(token))) return "dead";
        swept = await animateTo(bottom, token, Math.min(duration, 4000));
      }
      if (swept === "dead") return "dead";
      if (!(await dwell(500, token))) return "dead";
    }
    return "done";
  };

  const play = useCallback(() => {
    if (status.current === "paused") {
      resume();
      return;
    }
    if (status.current === "playing") return;
    const token = gen.current + 1;
    gen.current = token;
    status.current = "playing";
    setMode("playing");
    setProgress(0);

    const run = async () => {
      const sequence = [
        ...HOME_STEPS.map((id) => ({ id, page: "/", hold: id === "fv" ? 2400 : 900 })),
        ...PROJECT_STEPS.map((id) => ({ id, page: "/projects", hold: id === "projects-top" ? 1400 : 700 }))
      ];
      for (let index = 0; index < sequence.length; index += 1) {
        if (!alive(token) || !(await gate(token))) return;
        const step = sequence[index];
        if (window.location.pathname !== step.page) {
          routerRef.current.push(step.page);
          const ready = await waitFor(step.id, token);
          if (!ready) return;
        }
        setProgress((index + 1) / sequence.length);
        const result = await glide(step.id, token, step.hold);
        if (result === "dead") return;
      }
      if (alive(token)) {
        status.current = "idle";
        setMode("idle");
        setProgress(1);
      }
    };

    run().catch(() => {
      if (alive(token)) {
        status.current = "idle";
        setMode("idle");
      }
    });
  }, [resume]);

  const zoomLabel = `${Math.round(ZOOMS[zoomIndex] * 100)}%`;
  const activeTheme = THEMES.find((item) => item.id === theme) || THEMES[0];

  return (
    <SiteContext.Provider
      value={{
        theme,
        themes: THEMES,
        setTheme,
        activeTheme,
        zoomIn,
        zoomOut,
        zoomLabel,
        canZoomIn: zoomIndex < ZOOMS.length - 1,
        canZoomOut: zoomIndex > 0,
        mode,
        play,
        pause,
        resume,
        progress
      }}
    >
      <div className="field">
        <header className="nav">
          <Link href="/" className="nav-mark">
            <span>Araki Hideki</span>
            <small>荒木 秀樹</small>
          </Link>
          <nav className="nav-links">
            <Link href="/#profile" aria-current={pathname === "/" ? "page" : undefined}>
              Profile
            </Link>
            <Link href="/projects" aria-current={pathname === "/projects" ? "page" : undefined}>
              Projects
            </Link>
          </nav>
        </header>
        {children}
        <aside className="lens" aria-label="Text size">
          <button type="button" onClick={zoomIn} disabled={! (zoomIndex < ZOOMS.length - 1)} aria-label="Zoom in">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="5.5" />
              <path d="M14.6 14.6 19 19" />
              <path d="M10.5 8.2v4.6M8.2 10.5h4.6" />
            </svg>
          </button>
          <span>{zoomLabel}</span>
          <button type="button" onClick={zoomOut} disabled={zoomIndex === 0} aria-label="Zoom out">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="5.5" />
              <path d="M14.6 14.6 19 19" />
              <path d="M8.2 10.5h4.6" />
            </svg>
          </button>
        </aside>
        {mode !== "idle" ? (
          <div className="transport" data-film-control>
            <span className="transport-track" aria-hidden="true">
              <i style={{ width: `${Math.round(progress * 100)}%` }} />
            </span>
            {mode === "playing" ? (
              <button type="button" data-film-control onClick={pause}>
                Pause
              </button>
            ) : (
              <button type="button" data-film-control onClick={resume}>
                Resume
              </button>
            )}
          </div>
        ) : null}
      </div>
    </SiteContext.Provider>
  );
}

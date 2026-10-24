"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CinematicWorld } from "../lib/cinematic/world";
import { japanWorks, worldWorks } from "../lib/cinematic/journey";
import { LANGS, ui } from "../lib/cinematic/ui";
import FlagIcon from "./FlagIcon";
import NameReveal from "./NameReveal";
import SpaceHub from "./SpaceHub";
import ProjectGallery from "./ProjectGallery";
import AboutMe from "./AboutMe";
import SkillsField from "./SkillsField";

export default function CinematicApp() {
  const canvasRef = useRef(null);
  const worldRef = useRef(null);
  const [boot, setBoot] = useState(false);
  const [phase, setPhase] = useState("reveal");
  const [lang, setLang] = useState(null);
  const [hoverLang, setHoverLang] = useState(null);
  const [ready, setReady] = useState(false);
  const [arriveOpacity, setArriveOpacity] = useState(0);
  const [diveDark, setDiveDark] = useState(0);
  const [pins, setPins] = useState([]);

  const copy = ui(lang || "en");
  const inner = phase === "hub" || phase === "japan" || phase === "world" || phase === "about" || phase === "skills";

  const finishReveal = useCallback(() => setPhase("void"), []);

  const pickLang = useCallback((id) => {
    setLang(id);
    setPhase("dive");
    worldRef.current?.setPhase("dive");
  }, []);

  const goHub = useCallback(() => {
    setPhase("hub");
    worldRef.current?.setPhase("hub");
  }, []);

  const goSection = useCallback((next) => {
    setPhase(next);
    worldRef.current?.setPhase(next);
  }, []);

  useEffect(() => {
    setBoot(true);
  }, []);

  useEffect(() => {
    if (!boot || !canvasRef.current) return undefined;
    let dead = false;
    const world = new CinematicWorld(canvasRef.current, {
      onReady: () => {
        if (!dead) setReady(true);
      },
      onDiveProgress: (k) => {
        if (!dead) setDiveDark(k);
      },
      onDived: () => {
        if (dead) return;
        setPhase("hub");
        world.setPhase("hub");
        setDiveDark(0);
      },
      onGlobePins: (next) => {
        if (!dead) setPins(next);
      }
    });
    worldRef.current = world;
    world
      .init()
      .then(() => {
        if (dead) {
          world.dispose();
          if (worldRef.current === world) worldRef.current = null;
        }
      })
      .catch(() => {
        if (!dead) setReady(true);
      });
    return () => {
      dead = true;
      world.dispose();
      if (worldRef.current === world) worldRef.current = null;
    };
  }, [boot]);

  useEffect(() => {
    if (phase !== "void") return undefined;
    const t = setTimeout(() => setPhase("arrive"), 900);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "arrive" || !ready) return undefined;
    setArriveOpacity(0);
    const fadeIn = setTimeout(() => setArriveOpacity(1), 40);
    const toShow = setTimeout(() => {
      setArriveOpacity(0);
      setPhase("showroom");
      worldRef.current?.setPhase("showroom");
    }, 1600);
    return () => {
      clearTimeout(fadeIn);
      clearTimeout(toShow);
    };
  }, [phase, ready]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && (phase === "japan" || phase === "world" || phase === "about" || phase === "skills")) {
        if (document.querySelector(".folio-overlay")) return;
        goHub();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, goHub]);

  const showWorld = phase !== "reveal";
  const showHud = phase === "showroom" || phase === "dive" || inner;

  if (!boot) {
    return <div className="cine cine-void" />;
  }

  return (
    <div className={`cine cine-${phase}`}>
      {phase === "reveal" ? <NameReveal onDone={finishReveal} /> : null}

      <canvas ref={canvasRef} className={`cine-canvas ${showWorld ? "is-on" : ""}`} />

      <div className={`arrive-plate ${phase === "arrive" ? "is-on" : ""}`} style={{ opacity: arriveOpacity }} />
      {phase === "dive" ? <div className="dive-veil" style={{ opacity: diveDark }} /> : null}

      {showHud ? (
        <div className="hud">
          <header className="hud-top">
            <div className="brand-plate">
              <p className="hud-kana">荒木 秀樹</p>
              <strong>Araki Hideki</strong>
              <span>{copy.role}</span>
            </div>
            {lang ? (
              <div className="lang-pills" role="tablist">
                {LANGS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={item.id === lang ? "is-on" : ""}
                    onClick={() => setLang(item.id)}
                  >
                    {item.native}
                  </button>
                ))}
              </div>
            ) : null}
          </header>

          {phase === "showroom" ? (
            <>
              <div className="lang-float">
                {LANGS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`lang-card lang-card-${item.id}${hoverLang === item.id ? " is-on" : ""}`}
                    onMouseEnter={() => setHoverLang(item.id)}
                    onMouseLeave={() => setHoverLang(null)}
                    onClick={() => pickLang(item.id)}
                  >
                    <span className="lang-flag">
                      <FlagIcon code={item.flag} />
                    </span>
                    <span className="lang-copy">
                      <strong>{item.native}</strong>
                      <em>{item.sub}</em>
                    </span>
                  </button>
                ))}
              </div>
              <div className="showroom-copy">
                <p className="guide-line">{(hoverLang ? ui(hoverLang) : copy).guide}</p>
                <p className="select-line">{copy.selectLang}</p>
                <p className="hint-line">{copy.enterHint}</p>
              </div>
            </>
          ) : null}

          {phase === "dive" ? <p className="boarding-line">{copy.dive}</p> : null}
        </div>
      ) : null}

      {phase === "hub" && lang ? <SpaceHub copy={copy} lang={lang} pins={pins} onPick={goSection} /> : null}
      {phase === "japan" && lang ? (
        <ProjectGallery works={japanWorks} lang={lang} copy={copy} variant="japan" onBack={goHub} />
      ) : null}
      {phase === "world" && lang ? (
        <ProjectGallery works={worldWorks} lang={lang} copy={copy} variant="world" onBack={goHub} />
      ) : null}
      {phase === "about" && lang ? <AboutMe lang={lang} copy={copy} onBack={goHub} /> : null}
      {phase === "skills" && lang ? <SkillsField lang={lang} copy={copy} onBack={goHub} /> : null}

      {phase === "void" || (phase === "arrive" && !ready) ? <div className="void-veil" /> : null}
    </div>
  );
}

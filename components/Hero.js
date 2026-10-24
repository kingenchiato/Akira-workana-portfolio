"use client";

import { useEffect, useRef, useState } from "react";
import CelestialOrbit from "./CelestialOrbit";
import LocalNow from "./LocalNow";
import EarthGlobe from "./EarthGlobe";
import RankMedal from "./RankMedal";
import Starfield from "./Starfield";
import { praises, profile, projects, stages } from "../lib/content";
import { heroOrbitFrames } from "../lib/portfolio";

function radiusFor(stageWidth) {
  const card = 252;
  const gap = 48;
  const needed = (card + gap) / (2 * Math.sin(Math.PI / 8));
  const room = stageWidth / 2 - card / 2 - 16;
  return Math.max(220, Math.min(needed, room));
}

export default function Hero() {
  const rotatorRef = useRef(null);
  const praiseRef = useRef(null);
  const stageRef = useRef(null);
  const earthRef = useRef(null);
  const [radius, setRadius] = useState(340);
  const radiusRef = useRef(340);
  const [paused, setPaused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    radiusRef.current = radius;
  }, [radius]);

  useEffect(() => {
    const update = () => {
      const stage = stageRef.current;
      if (!stage) return;
      setRadius(radiusFor(stage.clientWidth));
    };
    update();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) setPaused(true);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const rotator = rotatorRef.current;
    const praise = praiseRef.current;
    const stage = stageRef.current;
    const earth = earthRef.current;
    if (!rotator || !praise || !stage || !earth) return;

    let frame = 0;
    let rot = 16;
    let praiseRot = 0;
    let tilt = 16;
    let lean = 0;
    let velocity = 0.18;
    let targetTilt = 16;
    let targetLean = 0;
    let targetVelocity = 0.18;
    let dragging = false;
    let lastX = 0;

    const onWindowMove = (event) => {
      if (dragging) return;
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      targetTilt = 12 - y * 24;
      targetLean = x * 18;
      targetVelocity = x * 0.62 + 0.06;
    };

    const onDown = (event) => {
      dragging = true;
      lastX = event.clientX;
    };
    const onUp = () => {
      dragging = false;
    };
    const onDrag = (event) => {
      if (!dragging) return;
      const delta = event.clientX - lastX;
      lastX = event.clientX;
      rot += delta * 0.4;
      targetVelocity = Math.max(-0.8, Math.min(0.8, delta * 0.03));
    };

    window.addEventListener("pointermove", onWindowMove);
    stage.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    stage.addEventListener("pointermove", onDrag);

    const tick = () => {
      if (!pausedRef.current) {
        velocity += (targetVelocity - velocity) * 0.045;
        rot += velocity;
        praiseRot -= velocity * 0.72;
      }
      tilt += (targetTilt - tilt) * 0.055;
      lean += (targetLean - lean) * 0.055;
      const pitch = -22 + (tilt - 16) * 0.05;
      const ring = radiusRef.current;
      earth.style.transform = `rotateZ(${(lean * 0.06).toFixed(2)}deg)`;
      rotator.style.transform = `rotateX(${pitch.toFixed(2)}deg) rotateZ(${(lean * 0.12).toFixed(2)}deg) rotateY(${rot.toFixed(2)}deg)`;
      praise.style.transform = `rotateX(${pitch.toFixed(2)}deg) rotateZ(${(lean * -0.08).toFixed(2)}deg) rotateY(${praiseRot.toFixed(2)}deg)`;
      const films = rotator.children;
      const cardStep = 360 / films.length;
      for (let index = 0; index < films.length; index += 1) {
        const angle = index * cardStep;
        const facing = Math.cos(((rot + angle) * Math.PI) / 180);
        const film = films[index];
        film.style.transform = `rotateY(${angle}deg) translateZ(${ring}px) rotateY(${-(angle + rot).toFixed(2)}deg) rotateX(${(-pitch).toFixed(2)}deg)`;
        const lead = facing > 0.84;
        film.style.zIndex = facing > 0.15 ? "6" : "2";
        film.style.opacity = lead ? "1" : String(0.7 + Math.max(0, facing) * 0.3);
        film.style.filter = lead ? "brightness(1.2) saturate(1.15) contrast(1.05)" : "none";
        film.style.visibility = "visible";
      }
      const notes = praise.children;
      const noteStep = 360 / notes.length;
      for (let index = 0; index < notes.length; index += 1) {
        const angle = index * noteStep;
        const facing = Math.cos(((praiseRot + angle) * Math.PI) / 180);
        const note = notes[index];
        note.style.transform = `rotateY(${angle}deg) translateZ(${ring + 72}px) rotateY(${-(angle + praiseRot).toFixed(2)}deg) rotateX(${(-pitch).toFixed(2)}deg)`;
        note.style.zIndex = "7";
        note.style.opacity = facing > 0.2 ? String(Math.min(1, (facing - 0.2) * 1.6)) : "0";
        note.style.visibility = facing > 0.2 ? "visible" : "hidden";
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onWindowMove);
      stage.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointermove", onDrag);
    };
  }, []);

  const step = 360 / projects.length;

  return (
    <section className="hero" aria-label="ファーストビュー">
      <div className="portrait-wrap">
        <img className="portrait portrait-blur" src="/images/hideki-developer.jpg" alt="" />
        <img className="portrait portrait-sharp" src="/images/hideki-developer.jpg" alt="コンピュータに向かって作業する荒木秀樹のイメージ" />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <LocalNow />

      <div className="stage" ref={stageRef}>
        <Starfield />
        <EarthGlobe ref={earthRef} pausedRef={pausedRef} />
        <CelestialOrbit />
        <div className="ring-shift">
        <div className="rotator" ref={rotatorRef}>
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="film"
              style={{ transform: `rotateY(${index * step}deg) translateZ(${radius}px)` }}
            >
              <img
                src={heroOrbitFrames.length ? heroOrbitFrames[index % heroOrbitFrames.length].src : project.image}
                alt={heroOrbitFrames.length ? heroOrbitFrames[index % heroOrbitFrames.length].alt : `${project.title}の領域を示すビジュアル`}
              />
              <p>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {heroOrbitFrames.length
                  ? heroOrbitFrames[index % heroOrbitFrames.length].label
                  : project.title}
              </p>
            </article>
          ))}
        </div>
        <div className="praise-ring" ref={praiseRef} aria-hidden="true">
          {praises.map((line, index) => (
            <span key={line} style={{ transform: `rotateY(${index * 60}deg) translateZ(${radius + 96}px)` }}>
              {line}
            </span>
          ))}
        </div>
        </div>
      </div>

      <aside className={profileOpen ? "profile-drawer is-open" : "profile-drawer"}>
        <button
          className="profile-tab"
          type="button"
          aria-expanded={profileOpen}
          onClick={() => setProfileOpen((value) => !value)}
        >
          プロフィール
        </button>
        <div className="profile-panel">
          <p className="kana">{profile.kana}　{profile.kanaKata}</p>
          <h1>{profile.name}</h1>
          <p className="role">{profile.role}　／　{profile.experience}　／　{profile.period}</p>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions">
            <a className="button solid" href="#guide">サイトの歩き方</a>
            <a className="button ghost" href="#works">実績の領域を見る</a>
            <button className="button ghost" type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
              {paused ? "回転を再開" : "回転を止める"}
            </button>
          </div>
          <p className="fine hero-note">
            フィルムはマウスの左右で向きと速度が変わり、ドラッグでも回せます。地球を回る太陽と月は、昼と夜の表示に合わせて切り替わります。下のバッジは経験の積み上げを示すこのサイト独自のステージで、公的資格の名称ではありません。
          </p>
        </div>
      </aside>

      <ol className="rank-list">
        {stages.map((stage) => (
          <RankMedal key={stage.rank} stage={stage} />
        ))}
      </ol>
    </section>
  );
}

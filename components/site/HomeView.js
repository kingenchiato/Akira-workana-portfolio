"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import FlagIcon from "../FlagIcon";
import { SiteChrome, useSite } from "./Shell";

const PHOTOS = [
  { src: "/photo/1.png", alt: "Araki Hideki beside a business automation diagram", focus: "42% 40%", zoom: "1.05" },
  { src: "/photo/2.png", alt: "Araki Hideki in the studio", focus: "50% 28%", zoom: "1.05" },
  { src: "/photo/3.png", alt: "Araki Hideki at work", focus: "16% 18%", zoom: "1.28" },
  { src: "/photo/4.png", alt: "Araki Hideki", focus: "28% 24%", zoom: "1.52" }
];

const FLOORS = { visitors: 320, contracts: 72, daily: 28, recommends: 0 };

function todayKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function Count({ value }) {
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const startValue = shown;
    const end = value;
    if (startValue === end) return undefined;
    const t0 = performance.now();
    let frame = 0;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / 760);
      const eased = 1 - (1 - p) ** 3;
      setShown(Math.round(startValue + (end - startValue) * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // The animation should leave the latest shown value, not restart from a stale render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <>{shown.toLocaleString("en-US")}</>;
}

function Stars() {
  return (
    <span className="stars" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 1.7 12.5 7l5.8.5-4.4 3.8 1.4 5.6L10 14.1 4.7 16.9l1.4-5.6L1.7 7.5 7.5 7z" />
        </svg>
      ))}
    </span>
  );
}

const FAMILIES = [
  { name: "Interface", ids: ["html", "css3", "rwd", "react"] },
  { name: "Languages", ids: ["javascript", "python", "php", "dart", "kotlin", "swift"] },
  { name: "Product", ids: ["flutter", "android", "wordpress"] },
  { name: "Data", ids: ["mysql", "database", "rest", "firebase"] },
  { name: "Systems", ids: ["sysprog", "crm", "excel"] },
  { name: "Spatial", ids: ["unity", "blender", "anim3d"] },
  { name: "Dialogue", ids: ["nlp", "chatbot"] }
];

const SHORT = {
  css3: "CSS",
  javascript: "JavaScript",
  python: "Python",
  rwd: "Responsive",
  react: "React",
  flutter: "Flutter",
  firebase: "Firebase",
  dart: "Dart",
  unity: "Unity",
  wordpress: "WordPress",
  sysprog: "Systems",
  blender: "Blender",
  rest: "REST",
  excel: "Excel",
  android: "Android",
  database: "Database",
  php: "PHP",
  mysql: "MySQL",
  html: "HTML",
  chatbot: "Chatbot",
  kotlin: "Kotlin",
  swift: "Swift",
  crm: "CRM",
  nlp: "Language",
  anim3d: "Animation"
};

const REACH = { "10+": 1, "5-10": 0.68, "3-5": 0.38 };

function reach(years) {
  return REACH[years] ?? REACH["5-10"];
}

function polar(cx, cy, radius, angle) {
  return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
}

function petalPath(cx, cy, inner, outer, start, end) {
  const large = end - start > Math.PI ? 1 : 0;
  const [x0, y0] = polar(cx, cy, outer, start);
  const [x1, y1] = polar(cx, cy, outer, end);
  const [x2, y2] = polar(cx, cy, inner, end);
  const [x3, y3] = polar(cx, cy, inner, start);
  return `M ${x0} ${y0} A ${outer} ${outer} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${inner} ${inner} 0 ${large} 0 ${x3} ${y3} Z`;
}

function SkillAtlas({ items }) {
  const byId = new Map(items.map((skill) => [skill.id, skill]));
  const families = FAMILIES.map((family) => ({
    ...family,
    skills: family.ids.map((id) => byId.get(id)).filter(Boolean)
  })).filter((family) => family.skills.length);
  const gap = 0.11;
  const usable = Math.PI * 2 - gap * families.length;
  const count = families.reduce((sum, family) => sum + family.skills.length, 0);
  const slot = usable / count;
  const cx = 100;
  const cy = 100;
  const inner = 26;
  let cursor = -Math.PI / 2 + gap / 2;
  const petals = [];

  families.forEach((family) => {
    family.skills.forEach((skill) => {
      const pad = slot * 0.16;
      const start = cursor + pad;
      const end = cursor + slot - pad;
      const mid = (start + end) / 2;
      const outer = inner + 52 * reach(skill.years);
      const labelAt = 86;
      const [lx, ly] = polar(cx, cy, labelAt, mid);
      let rotation = (mid * 180) / Math.PI;
      let anchor = "start";
      if (Math.cos(mid) < 0) {
        rotation += 180;
        anchor = "end";
      }
      petals.push({ skill, family: family.name, start, end, mid, outer, lx, ly, rotation, anchor });
      cursor += slot;
    });
    cursor += gap;
  });

  return (
    <div className="skill-atlas">
      <figure className="rose">
        <svg viewBox="-8 -8 216 216" role="img" aria-label="Skills arranged by years of use">
          {Object.values(REACH).map((level) => (
            <circle key={level} cx={cx} cy={cy} r={inner + 52 * level} fill="none" stroke="currentColor" strokeOpacity="0.16" />
          ))}
          {petals.map((petal) => (
            <path
              key={petal.skill.id}
              d={petalPath(cx, cy, inner, petal.outer, petal.start, petal.end)}
              fill="currentColor"
            >
              <title>{`${petal.skill.name}: ${petal.skill.label}`}</title>
            </path>
          ))}
          <circle cx={cx} cy={cy} r="22" fill="var(--card-solid)" />
          <text x={cx} y={cy - 1.5} textAnchor="middle" className="rose-core">Years</text>
          <text x={cx} y={cy + 6.5} textAnchor="middle" className="rose-core-sub">of use</text>
          {petals.map((petal) => (
            <text
              key={`${petal.skill.id}-label`}
              x={petal.lx}
              y={petal.ly}
              textAnchor={petal.anchor}
              transform={`rotate(${petal.rotation} ${petal.lx} ${petal.ly})`}
              className="rose-label"
            >
              {SHORT[petal.skill.id] || petal.skill.name}
            </text>
          ))}
        </svg>
        <figcaption className="rose-key">
          <span><i className="is-long" /> 10+ years</span>
          <span><i className="is-mid" /> 5–10 years</span>
          <span><i className="is-short" /> 3–5 years</span>
        </figcaption>
      </figure>
      <ol className="skill-index">
        {families.map((family) => (
          <li key={family.name}>
            <strong>{family.name}</strong>
            <ul>
              {family.skills.map((skill) => (
                <li key={skill.id}>
                  <span>{skill.name}</span>
                  <em>{skill.years === "10+" ? "10+" : skill.years === "3-5" ? "3–5" : "5–10"}</em>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function HomeView({ data }) {
  const site = useSite();
  const [photo, setPhoto] = useState(0);
  const reel = useRef(0);
  const [stats, setStats] = useState(FLOORS);
  const [note, setNote] = useState("");
  const [form, setForm] = useState({ name: "", email: "", kind: data.contact.form.kinds[0], budget: data.contact.form.budgets[0], message: "" });

  const armReel = useCallback(() => {
    window.clearInterval(reel.current);
    reel.current = window.setInterval(() => setPhoto((index) => (index + 1) % PHOTOS.length), 6400);
  }, []);

  useEffect(() => {
    armReel();
    return () => window.clearInterval(reel.current);
  }, [armReel]);

  const stepPhoto = (delta) => {
    setPhoto((index) => (index + PHOTOS.length + delta) % PHOTOS.length);
    armReel();
  };

  useEffect(() => {
    const today = todayKey();
    const visitKey = `ah_visit_sent:${today}`;
    const alreadySent = window.sessionStorage.getItem(visitKey) === "1";
    const knownVisitor = alreadySent || window.localStorage.getItem("ah_vid") === "1";
    const knownDay = alreadySent || window.localStorage.getItem("ah_day") === today;
    window.sessionStorage.setItem(visitKey, "1");
    const controller = new AbortController();
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "visit", knownVisitor, knownDay: knownDay ? today : "" }),
      signal: controller.signal
    })
      .then((response) => response.json())
      .then((payload) => {
        if (!payload || typeof payload.visitors !== "number") return;
        window.localStorage.setItem("ah_vid", "1");
        window.localStorage.setItem("ah_day", today);
        setStats({
          visitors: Math.max(FLOORS.visitors, payload.visitors),
          contracts: Math.max(FLOORS.contracts, payload.contracts),
          daily: Math.max(FLOORS.daily, payload.daily),
          recommends: Math.max(0, payload.recommends || 0)
        });
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const recommend = () => {
    setStats((current) => ({ ...current, recommends: current.recommends + 1 }));
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "recommend" })
    })
      .then((response) => response.json())
      .then((payload) => {
        if (!payload || typeof payload.recommends !== "number") return;
        setStats((current) => ({
          ...current,
          visitors: Math.max(current.visitors, payload.visitors),
          contracts: Math.max(FLOORS.contracts, payload.contracts),
          daily: Math.max(current.daily, payload.daily),
          recommends: Math.max(current.recommends, payload.recommends)
        }));
      })
      .catch(() => {});
  };

  const submit = (event) => {
    event.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!form.name.trim() || !emailOk || form.message.trim().length < 4) {
      setNote(data.contact.form.invalid);
      return;
    }
    const text = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Project: ${form.kind}`,
      `Scale: ${form.budget}`,
      "",
      form.message.trim()
    ].join("\n");
    navigator.clipboard?.writeText(text).then(
      () => setNote(data.contact.form.copied),
      () => setNote(data.contact.form.ready)
    );
  };

  const shot = PHOTOS[photo];

  return (
    <main>
      <section className="fv" id="fv">
        <div className="fv-top">
          <SiteChrome />
        </div>
        <div className="fv-copy">
          <div className="signal" aria-hidden="true" />
          <p className="kicker">{data.hero.kicker}</p>
          <h1 className="serif">
            {data.hero.name.split(" ").slice(0, -1).join(" ")} <em>{data.hero.name.split(" ").slice(-1)}</em>
          </h1>
          <p className="kana">{data.hero.sub}</p>
          <p className="role">{data.hero.role}</p>
          <p className="lede">{data.hero.body}</p>
          <ul className="pills">
            {data.hero.pills.map((pill) => (
              <li key={pill}>{pill}</li>
            ))}
          </ul>
          <dl className="meters">
            <div>
              <dt>Visitors</dt>
              <dd>
                <Count value={stats.visitors} />
              </dd>
            </div>
            <div>
              <dt>Contracts</dt>
              <dd>
                <Count value={stats.contracts} />
              </dd>
            </div>
            <div>
              <dt>Today</dt>
              <dd>
                <Count value={stats.daily} />
              </dd>
            </div>
          </dl>
          <div className="fv-actions">
            <button type="button" className="seal" onClick={recommend}>
              <span>Recommend</span>
              <strong>
                <Count value={stats.recommends} />
              </strong>
            </button>
            <button type="button" className="play" data-film-control onClick={site.play} disabled={site.mode === "playing"}>
              <i aria-hidden="true" />
              {site.mode === "playing" ? "Playing" : site.mode === "paused" ? "Resume" : "Play"}
            </button>
            <a className="github-link" href="https://github.com/kingenchiato" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <div className="themes" role="group" aria-label="Viewing color">
            {site.themes.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === site.theme ? "is-on" : ""}
                data-swatch={item.id}
                aria-pressed={item.id === site.theme}
                aria-label={item.label}
                onClick={() => site.setTheme(item.id)}
              />
            ))}
            <span>{site.activeTheme.label}</span>
          </div>
        </div>
        <figure className="portrait">
          <div className="mat">
            <div className="mat-frame">
              <img key={shot.src} src={shot.src} alt={shot.alt} style={{ "--focus": shot.focus, "--zoom": shot.zoom }} />
            </div>
            <button type="button" className="portrait-arrow is-prev" onClick={() => stepPhoto(-1)} aria-label="Previous photo">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.5 6.5 9 12l5.5 5.5" />
              </svg>
            </button>
            <button type="button" className="portrait-arrow is-next" onClick={() => stepPhoto(1)} aria-label="Next photo">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9.5 6.5 15 12l-5.5 5.5" />
              </svg>
            </button>
          </div>
          <figcaption>
            {String(photo + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
          </figcaption>
        </figure>
      </section>

      <section className="chapter" id="reviews">
        <div className="section-head">
          <p className="kicker">{data.voices.kicker}</p>
          <h2 className="serif">{data.voices.title}</h2>
          <p>{data.voices.lead}</p>
        </div>
        <div className="reviews">
          {data.reviews.map((review) => (
            <article key={review.id} className="review">
              <header>
                <span className="review-face">
                  <img
                    src={review.photo}
                    alt=""
                    onError={(event) => {
                      if (event.currentTarget.dataset.fallback === "1") return;
                      event.currentTarget.dataset.fallback = "1";
                      event.currentTarget.src = review.face;
                    }}
                  />
                  <span className="review-flag">
                    <FlagIcon code={review.flag} />
                  </span>
                </span>
                <div>
                  <strong>{review.name}</strong>
                  <em>{review.country}</em>
                  <Stars />
                </div>
                <time>{review.ago}</time>
              </header>
              <blockquote>{review.quote}</blockquote>
              <p className="review-project">{review.project}</p>
              <footer>
                <p className="review-price">
                  <span>Approximate fee</span>
                  <strong>{review.price.replace("Approx. ", "")}</strong>
                </p>
                <dl className="review-stats">
                  <div>
                    <dt>Posted</dt>
                    <dd>{review.posted}</dd>
                  </div>
                  <div>
                    <dt>Entrusted</dt>
                    <dd>{review.entrusted}</dd>
                  </div>
                  <div>
                    <dt>Completed</dt>
                    <dd>{review.completed}</dd>
                  </div>
                </dl>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="chapter" id="profile">
        <div className="section-head">
          <p className="kicker">{data.profile.kicker}</p>
          <h2 className="serif">{data.profile.title}</h2>
        </div>
        <div className="split">
          <div className="prose">
            <p>{data.profile.lead}</p>
            <p>{data.profile.more}</p>
            {data.profile.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <aside className="facts">
            <ul className="stat-list">
              {data.profile.stats.map(([value, label]) => (
                <li key={value}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
            <div className="fact-block">
              <p className="kicker">{data.profile.workTitle}</p>
              <h3>{data.profile.workRole}</h3>
              <p>
                {data.profile.workCompany}
                <br />
                {data.profile.workDates}
              </p>
              <p>{data.profile.workBody}</p>
            </div>
            <div className="fact-block">
              <p className="kicker">{data.profile.langTitle}</p>
              <ul className="langs">
                {data.profile.langs.map((lang) => (
                  <li key={lang.name}>
                    <span>{lang.name}</span>
                    <span>{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
        <div className="approach">
          <p className="kicker">{data.profile.approachKicker}</p>
          {data.profile.approach.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <section className="chapter" id="journey">
        <div className="section-head">
          <p className="kicker">{data.journey.kicker}</p>
          <h2 className="serif">{data.journey.title}</h2>
          <p>{data.journey.lead}</p>
        </div>
        <ol className="saw">
          {data.journey.items.map(([period, label, title, body], index) => (
            <li key={period}>
              <article>
                <span className="saw-index">{String(index + 1).padStart(2, "0")}</span>
                <p className="kicker">{label}</p>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
              <div className="saw-year">
                <span>{period}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="chapter" id="skills">
        <div className="section-head">
          <p className="kicker">{data.skills.kicker}</p>
          <h2 className="serif">{data.skills.title}</h2>
          <p>{data.skills.lead}</p>
        </div>
        <SkillAtlas items={data.skills.items} />
        <p className="quiet">{data.skills.note}</p>
      </section>

      <section className="chapter" id="selected">
        <div className="section-head">
          <p className="kicker">{data.projects.kicker}</p>
          <h2 className="serif">{data.projects.title}</h2>
          <p>{data.projects.lead}</p>
        </div>
        <div className="preview">
          {data.preview.map((item) => (
            <Link key={item.id} href="/projects" className="preview-card">
              <img src={item.image} alt="" />
              <strong>{item.title}</strong>
              <span>{item.summary}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="chapter" id="services">
        <div className="section-head">
          <p className="kicker">{data.services.kicker}</p>
          <h2 className="serif">{data.services.title}</h2>
        </div>
        <ol className="services">
          {data.services.items.map(([num, title, body, points, tag]) => (
            <li key={num}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <ul>
                {points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <em>{tag}</em>
            </li>
          ))}
        </ol>
      </section>

      <section className="chapter" id="faq">
        <div className="section-head">
          <p className="kicker">{data.faq.kicker}</p>
          <h2 className="serif">{data.faq.title}</h2>
        </div>
        <div className="faq">
          {data.faq.items.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
        <p className="quiet">{data.faq.aside}</p>
      </section>

      <section className="chapter" id="contact">
        <div className="section-head">
          <p className="kicker">{data.contact.kicker}</p>
          <h2 className="serif">{data.contact.title}</h2>
          <p>{data.contact.body}</p>
        </div>
        <ul className="pills">
          {data.contact.chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
        <form className="inquiry" onSubmit={submit}>
          <label>
            {data.contact.form.name}
            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder={data.contact.form.namePh} />
          </label>
          <label>
            {data.contact.form.email}
            <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder={data.contact.form.emailPh} />
          </label>
          <label>
            {data.contact.form.kind}
            <select value={form.kind} onChange={(event) => setForm({ ...form, kind: event.target.value })}>
              {data.contact.form.kinds.map((kind) => (
                <option key={kind}>{kind}</option>
              ))}
            </select>
          </label>
          <label>
            {data.contact.form.budget}
            <select value={form.budget} onChange={(event) => setForm({ ...form, budget: event.target.value })}>
              {data.contact.form.budgets.map((budget) => (
                <option key={budget}>{budget}</option>
              ))}
            </select>
          </label>
          <label className="wide">
            {data.contact.form.message}
            <textarea rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder={data.contact.form.messagePh} />
          </label>
          <div className="wide form-foot">
            <button type="submit">{data.contact.form.submit}</button>
            <p>{note || data.contact.form.hint}</p>
          </div>
        </form>
      </section>

      <footer className="colophon">
        <p>{data.footer.blurb}</p>
        <a href="https://github.com/kingenchiato" target="_blank" rel="noreferrer">
          github.com/kingenchiato
        </a>
        <p>{data.footer.rights}</p>
      </footer>
    </main>
  );
}

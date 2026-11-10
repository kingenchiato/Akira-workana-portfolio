"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSite } from "./Shell";

const PHOTOS = [
  { src: "/photo/1.png", alt: "Araki Hideki beside a business automation diagram" },
  { src: "/photo/2.png", alt: "Araki Hideki in the studio" },
  { src: "/photo/3.png", alt: "Araki Hideki at work" },
  { src: "/photo/4.png", alt: "Araki Hideki" }
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

function meterWidth(years) {
  if (years === "10+") return "92%";
  if (years === "3-5") return "48%";
  return "70%";
}

export default function HomeView({ data }) {
  const site = useSite();
  const [photo, setPhoto] = useState(0);
  const [stats, setStats] = useState(FLOORS);
  const [note, setNote] = useState("");
  const [form, setForm] = useState({ name: "", email: "", kind: data.contact.form.kinds[0], budget: data.contact.form.budgets[0], message: "" });

  useEffect(() => {
    const timer = setInterval(() => setPhoto((index) => (index + 1) % PHOTOS.length), 5200);
    return () => clearInterval(timer);
  }, []);

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
        <div className="fv-copy">
          <div className="signal" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
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
            <img key={shot.src} src={shot.src} alt={shot.alt} />
          </div>
          <figcaption>
            <span>
              {String(photo + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
            </span>
            <span className="portrait-nav">
              <button type="button" onClick={() => setPhoto((index) => (index + PHOTOS.length - 1) % PHOTOS.length)} aria-label="Previous photo">
                Prev
              </button>
              <button type="button" onClick={() => setPhoto((index) => (index + 1) % PHOTOS.length)} aria-label="Next photo">
                Next
              </button>
            </span>
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
              <img src={review.face} alt="" />
              <div>
                <header>
                  <strong>{review.name}</strong>
                  <span>{review.ago}</span>
                </header>
                <p>{review.quote}</p>
                <small>{review.project}</small>
              </div>
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
        <ol className="timeline">
          {data.journey.items.map(([period, label, title, body]) => (
            <li key={period}>
              <span>{period}</span>
              <div>
                <p className="kicker">{label}</p>
                <h3>{title}</h3>
                <p>{body}</p>
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
        <ul className="skill-list">
          {data.skills.items.map((skill) => (
            <li key={skill.id}>
              <div>
                <strong>{skill.name}</strong>
                <span>{skill.label}</span>
              </div>
              <i aria-hidden="true">
                <b style={{ width: meterWidth(skill.years) }} />
              </i>
            </li>
          ))}
        </ul>
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

"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { alternateOrigins } from "../../lib/order";
import { GROUPS } from "../../lib/groups";
import { useSite } from "./Shell";

function inlineMarks(line) {
  const parts = String(line).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : <span key={index}>{part}</span>
  );
}

function Rich({ text }) {
  if (!text) return null;
  const blocks = String(text)
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);
  return blocks.map((block, index) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    const isList = lines.every((line) => /^[-*・]/.test(line) || /^\d+\./.test(line));
    if (isList) {
      return (
        <ul key={index}>
          {lines.map((line) => (
            <li key={line}>{inlineMarks(line.replace(/^[-*・]\s*/, "").replace(/^\d+\.\s*/, ""))}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index}>
        {lines.map((line, lineIndex) => (
          <span key={`${index}-${lineIndex}`}>
            {lineIndex > 0 ? <br /> : null}
            {inlineMarks(line)}
          </span>
        ))}
      </p>
    );
  });
}

function Notes({ paragraphs }) {
  if (!paragraphs?.length) return null;
  return paragraphs.map((paragraph) => <Rich key={paragraph.slice(0, 48)} text={paragraph} />);
}

export default function ProjectsView({ catalog }) {
  const site = useSite();
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const requested = new URLSearchParams(window.location.search).get("work");
    if (requested && catalog.some((item) => item.id === requested)) setOpenId(requested);
  }, [catalog]);

  useEffect(() => {
    if (site.mode === "playing") setFilter("all");
  }, [site.mode]);

  useEffect(() => {
    if (!openId) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpenId(null);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [openId]);

  const visible = useMemo(() => {
    const order = GROUPS.map((group) => group.id);
    return catalog
      .filter((item) => filter === "all" || item.group === filter)
      .slice()
      .sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group));
  }, [catalog, filter]);

  const open = catalog.find((item) => item.id === openId) || null;
  const counts = Object.fromEntries(GROUPS.map((group) => [group.id, catalog.filter((item) => item.group === group.id).length]));

  const openWork = (id) => {
    if (site.mode === "playing") site.pause();
    setOpenId(id);
  };

  const modal =
    mounted && open
      ? createPortal(
          <div className="modal-back" onClick={() => setOpenId(null)} role="presentation">
            <article
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="work-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="modal-close" onClick={() => setOpenId(null)}>
                Close
              </button>
              <div className="modal-shots">
                {open.images.map((src) => (
                  <img key={src} src={src} alt="" />
                ))}
              </div>
              <div className="modal-copy">
                <p className="kicker">{GROUPS.find((group) => group.id === open.group)?.label}</p>
                <h2 id="work-title" className="serif">
                  {open.title}
                </h2>
                {open.originalTitle ? <p className="original">{open.originalTitle}</p> : null}
                {open.summary ? <p className="lede">{open.summary}</p> : null}
                {open.skills?.length ? (
                  <ul className="pills">
                    {open.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                ) : null}
                {open.story ? (
                  <section>
                    <h3>What it is</h3>
                    <p>{open.story}</p>
                  </section>
                ) : null}
                {open.notes?.length ? (
                  <section>
                    <h3>Project notes</h3>
                    <Notes paragraphs={open.notes} />
                  </section>
                ) : null}
                {open.approach ? (
                  <section>
                    <h3>Approach</h3>
                    <Rich text={open.approach} />
                  </section>
                ) : null}
                {open.problem ? (
                  <section>
                    <h3>The constraint</h3>
                    <Rich text={open.problem} />
                  </section>
                ) : null}
                {open.response ? (
                  <section>
                    <h3>What I did</h3>
                    <Rich text={open.response} />
                  </section>
                ) : null}
                {open.features?.length ? (
                  <section>
                    <h3>In the work</h3>
                    <ul>
                      {open.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </section>
                ) : null}
                {open.stack?.length ? (
                  <section>
                    <h3>Stack</h3>
                    <p>{open.stack.join(" · ")}</p>
                  </section>
                ) : null}
                <div className="modal-links">
                  {open.url ? (
                    <a href={open.url} target="_blank" rel="noreferrer">
                      Live site
                    </a>
                  ) : null}
                  {open.pdf ? (
                    <a href={open.pdf} target="_blank" rel="noreferrer">
                      Case study PDF
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          </div>,
          document.body
        )
      : null;

  return (
    <main className="projects-page">
      <header className="mast" id="projects-top">
        <p className="kicker">Projects</p>
        <h1 className="serif">The work, kept in one place.</h1>
        <p>Systems, applications, sites, games, automation, and the marks around them. Open any piece for the notes, images, and case study.</p>
      </header>
      <div className="filters" role="tablist" aria-label="Project groups">
        <button type="button" className={filter === "all" ? "is-on" : ""} onClick={() => setFilter("all")}>
          All <span>{catalog.length}</span>
        </button>
        {GROUPS.map((group) => (
          <button key={group.id} type="button" className={filter === group.id ? "is-on" : ""} onClick={() => setFilter(group.id)}>
            {group.label} <span>{counts[group.id] || 0}</span>
          </button>
        ))}
      </div>
      {filter === "all" ? (
        <section className="work-group" id="group-all">
          <h2 className="serif">International, then Japan</h2>
          <div className="work-grid">
            {alternateOrigins(visible).map((item) => (
              <button key={item.id} type="button" className={`work fit-${item.group}`} onClick={() => openWork(item.id)}>
                <span className="work-shot">
                  <img src={item.images[0]} alt="" />
                </span>
                <span className="work-copy">
                  <strong>{item.title}</strong>
                  <em>{item.origin === "international" ? "International" : "Japan"} · {item.summary}</em>
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : (
        GROUPS.map((group) => {
          const items = visible.filter((item) => item.group === group.id);
          if (!items.length) return null;
          return (
            <section key={group.id} id={`group-${group.id}`} className="work-group">
              <h2 className="serif">{group.label}</h2>
              <div className="work-grid">
                {items.map((item) => (
                  <button key={item.id} type="button" className={`work fit-${item.group}`} onClick={() => openWork(item.id)}>
                    <span className="work-shot">
                      <img src={item.images[0]} alt="" />
                    </span>
                    <span className="work-copy">
                      <strong>{item.title}</strong>
                      <em>{item.summary}</em>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          );
        })
      )}
      {modal}
      <footer className="colophon">
        <p>
          <a href="/">Araki Hideki</a>
        </p>
        <a href="https://github.com/kingenchiato" target="_blank" rel="noreferrer">
          github.com/kingenchiato
        </a>
        <p>© 2026 Araki Hideki. All rights reserved.</p>
      </footer>
    </main>
  );
}

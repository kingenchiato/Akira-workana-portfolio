"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { enrichWork, folioText } from "../lib/cinematic/folio";
import BackHub from "./BackHub";

function inlineMarks(line) {
  const parts = String(line).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part
  );
}

function renderRich(text) {
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
        <ul key={index} className="folio-list">
          {lines.map((line) => (
            <li key={line}>{inlineMarks(line.replace(/^[-*・]\s*/, "").replace(/^\d+\.\s*/, ""))}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index}>
        {lines.map((line, i) => (
          <span key={`${index}-${i}`}>
            {i > 0 ? <br /> : null}
            {inlineMarks(line)}
          </span>
        ))}
      </p>
    );
  });
}

export default function ProjectGallery({ works, lang, copy, variant, onBack }) {
  const items = useMemo(() => works.map((work) => enrichWork(work, variant)), [works, variant]);
  const [open, setOpen] = useState(null);
  const [mounted, setMounted] = useState(false);
  const work = open ? items.find((item) => item.id === open) : null;
  const text = work ? folioText(work, lang) : null;

  const closeDetail = () => {
    setOpen(null);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const modal =
    mounted && work && text
      ? createPortal(
          <div className="folio-overlay" role="presentation" onClick={closeDetail}>
            <aside
              className={`folio-modal folio-modal-${variant}`}
              role="dialog"
              aria-modal="true"
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="detail-close" onClick={closeDetail}>
                {copy.close}
              </button>
              <div className="folio-modal-grid">
                <div className="folio-modal-shots">
                  {work.images.map((src) => (
                    <img key={src} src={src} alt="" />
                  ))}
                </div>
                <div className="folio-modal-copy">
                  <p className="detail-city">{variant === "japan" ? copy.japan : copy.world}</p>
                  <h2>{text.title}</h2>
                  <p className="detail-kicker">{text.kicker}</p>
                  {text.overview.length ? (
                    <div className="detail-section">
                      <h3>{copy.story}</h3>
                      {text.overview.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}
                  {text.features?.length ? (
                    <div className="detail-section">
                      <h3>{copy.features}</h3>
                      <ul className="folio-list">
                        {text.features.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {text.stack?.length ? (
                    <div className="detail-section">
                      <h3>{copy.stack}</h3>
                      <p>{text.stack.join(" · ")}</p>
                    </div>
                  ) : null}
                  {text.approach ? (
                    <div className="detail-section">
                      <h3>{copy.approach}</h3>
                      {renderRich(text.approach)}
                    </div>
                  ) : null}
                  {text.problem || text.response ? (
                    <dl>
                      {text.problem ? (
                        <div>
                          <dt>{copy.problem}</dt>
                          <dd>{renderRich(text.problem)}</dd>
                        </div>
                      ) : null}
                      {text.response ? (
                        <div>
                          <dt>{copy.response}</dt>
                          <dd>{renderRich(text.response)}</dd>
                        </div>
                      ) : null}
                    </dl>
                  ) : null}
                  {work.period ? (
                    <p className="detail-period">
                      <span>{copy.period}</span> {work.period}
                    </p>
                  ) : null}
                  <p className="detail-skills">
                    <span>{copy.skills}</span> {work.skills.join(" · ")}
                  </p>
                  <div className="detail-actions">
                    {work.url ? (
                      <a className="detail-link" href={work.url} target="_blank" rel="noreferrer">
                        {copy.live}
                      </a>
                    ) : null}
                    {work.pdf ? (
                      <a
                        className="detail-link"
                        href={`/pdf?src=${encodeURIComponent(work.pdf)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {copy.viewPdf}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </aside>
          </div>,
          document.body
        )
      : null;

  return (
    <section className={`gallery gallery-${variant}${open ? " is-modal" : ""}`}>
      <header className="gallery-head">
        <h2>{variant === "japan" ? copy.japanProjects : copy.worldProjects}</h2>
      </header>
      <BackHub label={copy.backHub} onBack={onBack} />
      <div className="gallery-grid">
        {items.map((item, index) => {
          const card = folioText(item, lang);
          return (
            <button
              key={item.id}
              type="button"
              className="work-card"
              style={{ animationDelay: `${index * 70}ms` }}
              onClick={() => {
                setOpen(item.id);
              }}
            >
              <img src={item.images[0]} alt="" />
              <span className="work-card-copy">
                <em>{card.kicker}</em>
                <strong>{card.title}</strong>
                <p>{card.summary}</p>
              </span>
            </button>
          );
        })}
      </div>
      {modal}
    </section>
  );
}

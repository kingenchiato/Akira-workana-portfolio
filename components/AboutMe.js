"use client";

import { ABOUT } from "../lib/cinematic/about";
import { REVIEWS } from "../lib/cinematic/reviews";
import BackHub from "./BackHub";
import FlagIcon from "./FlagIcon";

function Stars({ value }) {
  return (
    <span className="review-stars" aria-label={`${value}.0`}>
      {Array.from({ length: 5 }, (_, i) => (
        <em key={i} className={i < value ? "is-on" : ""}>
          ★
        </em>
      ))}
    </span>
  );
}

export default function AboutMe({ lang, copy, onBack }) {
  const about = ABOUT[lang] || ABOUT.en;
  return (
    <section className="about-stage">
      <header className="gallery-head">
        <h2>{copy.aboutMe}</h2>
      </header>
      <BackHub label={copy.backHub} onBack={onBack} />
      <div className="about-shell">
        <div className="about-fixed">
          <figure className="about-portrait">
            <img src="/about/hideki.jpg" alt={about.title} />
          </figure>
          <div className="about-copy">
            <p className="about-kicker">{about.kicker}</p>
            <h3>{about.title}</h3>
            <p className="about-role">
              {about.role} · {about.headline}
            </p>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <div className="about-meta">
              <article>
                <h4>{about.workTitle}</h4>
                <strong>{about.workRole}</strong>
                <span>
                  {about.workCompany} · {about.workDates}
                </span>
                <p>{about.workBody}</p>
              </article>
              <article>
                <h4>{about.langTitle}</h4>
                <ul>
                  {about.langs.map((item) => (
                    <li key={item.name}>
                      <strong>{item.name}</strong>
                      <em>{item.level}</em>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
        <aside className="about-reviews">
          <h3>{copy.reviews}</h3>
          <div className="review-list">
            {REVIEWS.map((review) => (
              <article key={review.id} className="review-card">
                <p className="review-project">{review.project[lang] || review.project.en}</p>
                <div className="review-who">
                  <img
                    className="review-avatar"
                    src={review.avatar}
                    alt=""
                    onError={(event) => {
                      if (review.face) event.currentTarget.src = review.face;
                    }}
                  />
                  <span className="review-flag">
                    <FlagIcon code={review.flag} />
                  </span>
                  <strong>{review.name}</strong>
                  <span className="review-score">{review.rating.toFixed(1)}</span>
                  <Stars value={review.rating} />
                  <time>{review.ago[lang] || review.ago.en}</time>
                </div>
                <p className="review-quote">“{review.quote[lang] || review.quote.en}”</p>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

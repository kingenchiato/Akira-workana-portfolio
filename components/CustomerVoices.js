"use client";

import { useEffect, useState } from "react";

const voices = [
  {
    src: "/images/voices/voice-01.png",
    alt: "評価5.0。YouTube・SNS動画の編集に関するレビュー。2026年10月14日"
  },
  {
    src: "/images/voices/voice-02.png",
    alt: "アプリ開発③。満足、4回リピート。2026年5月15日"
  },
  {
    src: "/images/voices/voice-03.png",
    alt: "メディアサイトの制作【ワードプレス】。満足。2026年5月15日"
  },
  {
    src: "/images/voices/voice-04.png",
    alt: "トラックのエンジン燃焼促進装置「FUEL BOOSTER」のロゴ。満足、1回リピート。2026年9月30日"
  },
  {
    src: "/images/voices/voice-05.png",
    alt: "新規法人コーポレートサイト＆インフラ全代行。満足、1回リピート。2026年5月7日"
  },
  {
    src: "/images/voices/voice-06.png",
    alt: "評価5.0。Webデザイナーに関するレビュー。2026年10月14日"
  }
];

function CornerBloom({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <g transform="translate(6 8)">
        <path d="M18 22c-7 1-11-6-7-11 5 1 8 6 7 11z" fill="rgba(255,255,255,0.82)" stroke="rgba(86,124,116,0.55)" strokeWidth="0.6" />
        <path d="M20 20c0-8 6-12 11-9-3 3-7 6-11 9z" fill="rgba(226,244,236,0.9)" stroke="rgba(86,124,116,0.45)" strokeWidth="0.6" />
        <path d="M22 24c-6 4-6 10-1 12 2-5 3-8 1-12z" fill="rgba(255,255,255,0.75)" stroke="rgba(86,124,116,0.45)" strokeWidth="0.6" />
        <path d="M24 18c6-5 13-3 14 2-5 0-9 1-14-2z" fill="rgba(210,232,224,0.85)" stroke="rgba(86,124,116,0.4)" strokeWidth="0.6" />
        <circle cx="22" cy="21" r="2.1" fill="#fff" stroke="rgba(110,146,138,0.55)" strokeWidth="0.5" />
        <path d="M34 10c4 2 5 6 2 8" fill="none" stroke="rgba(86,124,116,0.4)" strokeWidth="0.7" />
      </g>
    </svg>
  );
}

function ThumbsUp() {
  return (
    <span className="voice-like" aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <path
          d="M16 21v16H8.5A2.5 2.5 0 0 1 6 34.5v-11A2.5 2.5 0 0 1 8.5 21H16z"
          fill="#14b8a6"
        />
        <path
          d="M18 20.2 24.2 8.4c.7-1.3 2.6-1.5 3.6-.4.6.7.9 1.6.8 2.5l-.8 6.3h8.7c2.2 0 3.8 2.1 3.2 4.2l-2.6 10.2A4 4 0 0 1 33.3 35H18V20.2z"
          fill="#2dd4bf"
        />
        <path d="M24 12.5c1.2 2.2 1.6 4.2 1.2 6.2" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function ReviewImage({ voice }) {
  return (
    <div className="voice-shot">
      <img src={voice.src} alt="" />
      <ThumbsUp />
    </div>
  );
}

export default function CustomerVoices() {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <section className="panel voices" id="voices">
      <div className="section-head">
        <p className="eyebrow">Client Testimonials</p>
        <h2>お客様の声</h2>
      </div>
      <div className="voice-row">
        {voices.map((voice) => (
          <button
            key={voice.src}
            type="button"
            className="voice-frame"
            onClick={() => setOpen(voice)}
            aria-label={`${voice.alt}。画像を拡大`}
          >
            <CornerBloom className="voice-bloom tl" />
            <CornerBloom className="voice-bloom br" />
            <ReviewImage voice={voice} />
          </button>
        ))}
      </div>
      {open ? (
        <div className="voice-modal" role="presentation" onClick={() => setOpen(null)}>
          <div
            className="voice-modal-card"
            role="dialog"
            aria-modal="true"
            aria-label={open.alt}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="voice-modal-close" onClick={() => setOpen(null)}>
              閉じる
            </button>
            <ReviewImage voice={open} />
          </div>
        </div>
      ) : null}
    </section>
  );
}

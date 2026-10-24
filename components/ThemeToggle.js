"use client";

import { useTheme } from "./ThemeContext";

function DayAvatar() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id="dayFace" cx="38%" cy="34%" r="70%">
          <stop stopColor="#fffef2" />
          <stop offset="0.55" stopColor="#ffe38a" />
          <stop offset="1" stopColor="#f5a524" />
        </radialGradient>
      </defs>
      <g fill="#fff4c2">
        <polygon points="32,2 35,12 32,10 29,12" />
        <polygon points="32,62 29,52 32,54 35,52" />
        <polygon points="2,32 12,29 10,32 12,35" />
        <polygon points="62,32 52,35 54,32 52,29" />
        <polygon points="10,10 18,16 16,18 14,14" />
        <polygon points="54,10 50,14 48,16 46,16" />
        <polygon points="10,54 14,50 16,48 18,48" />
        <polygon points="54,54 46,48 48,46 50,50" />
      </g>
      <circle cx="32" cy="32" r="16" fill="url(#dayFace)" />
      <path d="M26 30c1.2-2 3-2 4 0M36 30c1.2-2 3-2 4 0" fill="none" stroke="#9a5b10" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M27 37c2 2.4 8 2.4 10 0" fill="none" stroke="#9a5b10" strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="25" cy="26" rx="5" ry="3" fill="#fff" opacity="0.7" />
    </svg>
  );
}

function NightAvatar() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id="nightFace" cx="40%" cy="36%" r="72%">
          <stop stopColor="#f4f7ff" />
          <stop offset="0.5" stopColor="#c9d6f5" />
          <stop offset="1" stopColor="#6d7ec4" />
        </radialGradient>
      </defs>
      <circle cx="18" cy="16" r="1.4" fill="#fff" />
      <circle cx="50" cy="14" r="1.1" fill="#d7fff6" />
      <circle cx="54" cy="28" r="1.3" fill="#fff" />
      <path d="M40 10c-8 2-14 10-14 19 0 12 9 21 21 21 4 0 8-1 11-3-3 6-10 10-17 10C28 57 18 47 18 34 18 22 27 12 40 10z" fill="url(#nightFace)" />
      <path d="M34 30c1-1.6 2.4-1.6 3.2 0M42 31c1-1.6 2.4-1.6 3.2 0" fill="none" stroke="#24315f" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M36 38c2 2 6 2 8 0" fill="none" stroke="#24315f" strokeWidth="1.3" strokeLinecap="round" />
      <ellipse cx="36" cy="26" rx="4" ry="2.4" fill="#fff" opacity="0.65" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const day = theme === "day";
  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-pressed={day} aria-label={day ? "夜の表示に切り替える" : "昼の表示に切り替える"}>
      <span className="theme-avatar">{day ? <DayAvatar /> : <NightAvatar />}</span>
      <span>{day ? "昼" : "夜"}</span>
    </button>
  );
}

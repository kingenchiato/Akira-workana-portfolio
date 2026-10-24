"use client";

import { useTheme } from "./ThemeContext";

function SunIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g fill="#ffe08a">
        <polygon points="32,2 35,12 32,10 29,12" />
        <polygon points="32,62 29,52 32,54 35,52" />
        <polygon points="2,32 12,29 10,32 12,35" />
        <polygon points="62,32 52,35 54,32 52,29" />
        <polygon points="11,11 18,16 16,18 13,14" />
        <polygon points="53,11 51,14 48,16 46,16" />
        <polygon points="11,53 13,50 16,48 18,48" />
        <polygon points="53,53 46,48 48,46 51,50" />
      </g>
      <circle cx="32" cy="32" r="15" fill="#fff4c2" stroke="#e89b08" strokeWidth="2" />
      <circle cx="32" cy="32" r="10" fill="#ff9f0a" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M40 8c-10 2-18 12-18 23 0 14 11 25 25 25 5 0 10-1.4 14-4-4 8-12 13-21 13C22 65 8 51 8 33 8 18 20 6 36 6c1.4 0 2.7.1 4 .3z"
        fill="#eef3ff"
      />
      <circle cx="30" cy="28" r="3" fill="#c5d0ee" />
      <circle cx="40" cy="36" r="2" fill="#c5d0ee" />
    </svg>
  );
}

export default function CelestialOrbit() {
  const { theme } = useTheme();
  const day = theme === "day";

  return (
    <div className={day ? "orbit orbit-day" : "orbit orbit-night"} aria-hidden="true">
      <span className="orbit-body">{day ? <SunIcon /> : <MoonIcon />}</span>
    </div>
  );
}

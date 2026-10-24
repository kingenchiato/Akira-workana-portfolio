import { useId } from "react";

export default function Clover({ className = "clover" }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f7fffd" />
          <stop offset="0.42" stopColor="#7ef6df" />
          <stop offset="1" stopColor="#0e7490" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M32 29.5c-1.6-7.2-7.2-12.8-12.6-9.2-4.6 3-3.6 10 1.8 12.8-7.2 1.6-10.8 8-7.2 12.6 3.6 4.8 10.8 1.6 12.6-3.6 1.8 7.4 9 11 13.4 6.4 4.4-4.2 1.6-11-4.6-13.4 7-2.6 10-10 6.2-13.6-4.4-3.8-11 .4-9.6 8z"
      />
      <path
        d="M32 34.5c1.2 5.2-.4 10.4-4.8 14.2"
        fill="none"
        stroke="#b6fff2"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

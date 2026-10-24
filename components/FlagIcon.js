function Svg({ children }) {
  return (
    <svg viewBox="0 0 60 40" aria-hidden="true">
      {children}
    </svg>
  );
}

export default function FlagIcon({ code }) {
  if (code === "jp") {
    return (
      <Svg>
        <rect width="60" height="40" rx="3" fill="#f7f7f7" />
        <circle cx="30" cy="20" r="9.5" fill="#bc002d" />
      </Svg>
    );
  }
  if (code === "gb") {
    return (
      <Svg>
        <rect width="60" height="40" rx="3" fill="#012169" />
        <path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" strokeWidth="8" />
        <path d="M0 0 L60 40 M60 0 L0 40" stroke="#c8102e" strokeWidth="4" />
        <path d="M30 0 V40 M0 20 H60" stroke="#fff" strokeWidth="12" />
        <path d="M30 0 V40 M0 20 H60" stroke="#c8102e" strokeWidth="7" />
      </Svg>
    );
  }
  if (code === "us") {
    return (
      <Svg>
        <rect width="60" height="40" rx="3" fill="#bf0a30" />
        <path fill="#fff" d="M0 3.08h60v3.08H0zm0 6.15h60v3.08H0zm0 6.16h60v3.08H0zm0 6.15h60v3.08H0zm0 6.16h60v3.08H0zm0 6.15h60v3.08H0z" />
        <rect width="24" height="21.54" fill="#002868" />
        <g fill="#fff">
          <circle cx="4" cy="3.2" r="0.9" />
          <circle cx="10" cy="3.2" r="0.9" />
          <circle cx="16" cy="3.2" r="0.9" />
          <circle cx="22" cy="3.2" r="0.9" />
          <circle cx="7" cy="7.4" r="0.9" />
          <circle cx="13" cy="7.4" r="0.9" />
          <circle cx="19" cy="7.4" r="0.9" />
          <circle cx="4" cy="11.6" r="0.9" />
          <circle cx="10" cy="11.6" r="0.9" />
          <circle cx="16" cy="11.6" r="0.9" />
          <circle cx="22" cy="11.6" r="0.9" />
          <circle cx="7" cy="15.8" r="0.9" />
          <circle cx="13" cy="15.8" r="0.9" />
          <circle cx="19" cy="15.8" r="0.9" />
          <circle cx="4" cy="19.6" r="0.9" />
          <circle cx="10" cy="19.6" r="0.9" />
          <circle cx="16" cy="19.6" r="0.9" />
          <circle cx="22" cy="19.6" r="0.9" />
        </g>
      </Svg>
    );
  }
  if (code === "br") {
    return (
      <Svg>
        <rect width="60" height="40" rx="3" fill="#009c3b" />
        <path d="M30 5 L54 20 L30 35 L6 20 Z" fill="#ffdf00" />
        <circle cx="30" cy="20" r="7.2" fill="#002776" />
      </Svg>
    );
  }
  if (code === "es") {
    return (
      <Svg>
        <rect width="60" height="40" rx="3" fill="#c60b1e" />
        <rect y="10" width="60" height="20" fill="#ffc400" />
      </Svg>
    );
  }
  if (code === "pt") {
    return (
      <Svg>
        <rect width="60" height="40" rx="3" fill="#ff0000" />
        <rect width="24" height="40" fill="#006600" />
        <circle cx="24" cy="20" r="6.4" fill="#ffd700" />
        <circle cx="24" cy="20" r="4.1" fill="#fff" />
        <circle cx="24" cy="20" r="2.4" fill="#002776" />
      </Svg>
    );
  }
  if (code === "mx") {
    return (
      <Svg>
        <rect width="60" height="40" rx="3" fill="#fff" />
        <rect width="20" height="40" fill="#006847" />
        <rect x="40" width="20" height="40" fill="#ce1126" />
        <circle cx="30" cy="20" r="4.2" fill="#c9a227" />
      </Svg>
    );
  }
  if (code === "co") {
    return (
      <Svg>
        <rect width="60" height="40" rx="3" fill="#fcd116" />
        <rect y="20" width="60" height="10" fill="#003893" />
        <rect y="30" width="60" height="10" fill="#ce1126" />
      </Svg>
    );
  }
  if (code === "ar") {
    return (
      <Svg>
        <rect width="60" height="40" rx="3" fill="#74acdf" />
        <rect y="13.3" width="60" height="13.4" fill="#fff" />
        <circle cx="30" cy="20" r="4.2" fill="#f6b40e" />
      </Svg>
    );
  }
  if (code === "cl") {
    return (
      <Svg>
        <rect width="60" height="40" rx="3" fill="#fff" />
        <rect y="20" width="60" height="20" fill="#d52b1e" />
        <rect width="20" height="20" fill="#0039a6" />
        <circle cx="10" cy="10" r="3.2" fill="#fff" />
      </Svg>
    );
  }
  if (code === "bd") {
    return (
      <Svg>
        <rect width="60" height="40" rx="3" fill="#006a4e" />
        <circle cx="26" cy="20" r="9" fill="#f42a41" />
      </Svg>
    );
  }
  if (code === "pa") {
    return (
      <Svg>
        <rect width="60" height="40" rx="3" fill="#fff" />
        <rect width="30" height="20" fill="#fff" />
        <rect x="30" y="20" width="30" height="20" fill="#fff" />
        <rect x="30" width="30" height="20" fill="#d21034" />
        <rect y="20" width="30" height="20" fill="#0052b4" />
        <circle cx="15" cy="10" r="3.1" fill="#0052b4" />
        <circle cx="45" cy="30" r="3.1" fill="#d21034" />
      </Svg>
    );
  }
  return (
    <Svg>
      <rect width="60" height="40" rx="3" fill="#1b2a44" />
    </Svg>
  );
}

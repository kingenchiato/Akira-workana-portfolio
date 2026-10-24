const GLYPH = {
  css: { ch: "3", bg: "#264de4" },
  js: { ch: "JS", bg: "#f7df1e", fg: "#111" },
  python: { ch: "Py", bg: "#3776ab" },
  rwd: { ch: "R", bg: "#5b8def" },
  react: { ch: "⚛", bg: "#21232a", fg: "#61dafb" },
  flutter: { ch: "Fl", bg: "#02569b" },
  firebase: { ch: "Fb", bg: "#ffca28", fg: "#111" },
  dart: { ch: "Dt", bg: "#0175c2" },
  unity: { ch: "U", bg: "#222" },
  wp: { ch: "W", bg: "#21759b" },
  sys: { ch: "</>", bg: "#1f3b5b" },
  blender: { ch: "Bl", bg: "#e87d0d" },
  rest: { ch: "{}", bg: "#0ea5a5" },
  excel: { ch: "Xl", bg: "#217346" },
  android: { ch: "A", bg: "#3ddc84", fg: "#111" },
  db: { ch: "DB", bg: "#336791" },
  php: { ch: "php", bg: "#777bb4" },
  mysql: { ch: "my", bg: "#00758f" },
  html: { ch: "5", bg: "#e44d26" },
  bot: { ch: "AI", bg: "#7c3aed" },
  kotlin: { ch: "K", bg: "#7f52ff" },
  swift: { ch: "S", bg: "#f05138" },
  crm: { ch: "◎", bg: "#0f766e" },
  nlp: { ch: "NL", bg: "#be185d" },
  anim: { ch: "3D", bg: "#c2410c" }
};

export default function SkillMark({ icon }) {
  const spec = GLYPH[icon] || { ch: "•", bg: "#334155" };
  return (
    <span className="skill-mark" style={{ background: spec.bg, color: spec.fg || "#fff" }}>
      {spec.ch}
    </span>
  );
}

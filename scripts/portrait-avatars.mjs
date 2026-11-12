import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "reviews");

const people = [
  { id: "wagner", skin: "#c68642", hair: "#24160f", shirt: "#1f4d3a", bg: "#e7f0ea", style: "crop", beard: true },
  { id: "james", skin: "#e7c09a", hair: "#3a2a1c", shirt: "#1c3358", bg: "#e7eef8", style: "short", beard: true },
  { id: "hiroshi", skin: "#e4c2a4", hair: "#16120f", shirt: "#2c3444", bg: "#eef1f6", style: "fringe" },
  { id: "maria", skin: "#c48a5a", hair: "#1a100c", shirt: "#6b2148", bg: "#f8eef3", style: "long" },
  { id: "carlos", skin: "#c9a06e", hair: "#2a1c12", shirt: "#0f3d4c", bg: "#e7f2f4", style: "short" },
  { id: "camila", skin: "#b56b42", hair: "#2a140e", shirt: "#7a2e1e", bg: "#f8eee8", style: "wave" },
  { id: "daniel", skin: "#f0c8a4", hair: "#8a5a32", shirt: "#1a2a44", bg: "#eef2f8", style: "short" },
  { id: "yuki", skin: "#efd0b4", hair: "#1a1412", shirt: "#5a2040", bg: "#f8eef4", style: "bob" },
  { id: "pablo", skin: "#c68642", hair: "#1d1410", shirt: "#3d1f14", bg: "#f6eee8", style: "crop", beard: true },
  { id: "ana", skin: "#a86b45", hair: "#24140e", shirt: "#2a3d28", bg: "#eef4ee", style: "wave" },
  { id: "kenji", skin: "#e6c4a6", hair: "#14110f", shirt: "#243044", bg: "#eef1f6", style: "neat" },
  { id: "emily", skin: "#f3d0b4", hair: "#8a4a28", shirt: "#3d2a58", bg: "#f4eef8", style: "long" },
  { id: "mateo", skin: "#8d5524", hair: "#140e0c", shirt: "#1e3a2f", bg: "#e8f2ec", style: "crop" },
  { id: "olivia", skin: "#f0c4a6", hair: "#4a2c1c", shirt: "#4a2040", bg: "#f8eef3", style: "bob" },
  { id: "lucia", skin: "#c47a52", hair: "#2a1810", shirt: "#5a1f2e", bg: "#f8eee8", style: "bun" },
  { id: "joao", skin: "#c49a6c", hair: "#24180f", shirt: "#16324a", bg: "#e8f0f6", style: "short", beard: true },
  { id: "sakura", skin: "#f0d0b8", hair: "#161210", shirt: "#6a3048", bg: "#f8eef2", style: "long" },
  { id: "rafael", skin: "#a86b3c", hair: "#1a100c", shirt: "#2c2a18", bg: "#f4f1e8", style: "crop" },
  { id: "isabella", skin: "#c68642", hair: "#3a2014", shirt: "#3a2458", bg: "#f3eef8", style: "wave" },
  { id: "thomas", skin: "#e6b48a", hair: "#4a3320", shirt: "#1b2c20", bg: "#eef4ee", style: "short", beard: true }
];

function hairFront(style, hair) {
  if (style === "bob") {
    return `<path d="M16 40c2-18 12-26 24-26s22 8 24 26c0 10-4 16-8 18 0-8-4-12-16-12s-16 4-16 12c-4-2-8-8-8-18z" fill="${hair}"/>
      <path d="M24 28c4 6 10 8 16 8s12-2 16-8c-4 3-8 4-16 4s-12-1-16-4z" fill="${hair}"/>`;
  }
  if (style === "long" || style === "wave") {
    return `<path d="M14 42c3-20 14-28 26-28s23 8 26 28c1 16-2 26-7 30-1-12-6-16-19-16s-18 4-19 16c-5-4-8-14-7-30z" fill="${hair}"/>
      <path d="M22 30c5 7 12 9 18 9s13-2 18-9c-5 3-10 4-18 4s-13-1-18-4z" fill="${hair}"/>`;
  }
  if (style === "fringe" || style === "neat") {
    return `<path d="M18 36c2-16 12-22 22-22s20 6 22 22c-6-4-12-6-22-6s-16 2-22 6z" fill="${hair}"/>
      <path d="M24 24h32c-2 7-8 11-16 11s-14-4-16-11z" fill="${hair}"/>`;
  }
  if (style === "bun") {
    return `<circle cx="40" cy="16" r="7" fill="${hair}"/>
      <path d="M20 38c2-14 10-20 20-20s18 6 20 20c-4 2-10 1-20 1s-16 1-20-1z" fill="${hair}"/>`;
  }
  if (style === "crop") {
    return `<path d="M20 36c2-12 12-18 20-18s18 6 20 18c-4 1-10 2-20 2s-16-1-20-2z" fill="${hair}"/>`;
  }
  return `<path d="M20 36c1-14 12-20 20-20s19 6 20 20c-5 2-11 3-20 3s-15-1-20-3z" fill="${hair}"/>`;
}

function svgFor(person) {
  const beard = person.beard
    ? `<path d="M28 48c2 8 6 12 12 12s10-4 12-12c-3 3-7 4-12 4s-9-1-12-4z" fill="${person.hair}" opacity="0.9"/>`
    : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <circle cx="40" cy="40" r="40" fill="${person.bg}"/>
  <path d="M6 80c8-18 18-26 34-26s26 8 34 26" fill="${person.shirt}"/>
  <path d="M32 52h16c2 6 2 12 0 16H32c-2-4-2-10 0-16z" fill="${person.skin}"/>
  ${hairFront(person.style, person.hair)}
  <ellipse cx="40" cy="40" rx="15" ry="17" fill="${person.skin}"/>
  <path d="M25 36c2-8 8-12 15-12s13 4 15 12" fill="${person.hair}"/>
  <ellipse cx="33.5" cy="41" rx="1.7" ry="1.9" fill="#2a211c"/>
  <ellipse cx="46.5" cy="41" rx="1.7" ry="1.9" fill="#2a211c"/>
  <path d="M33 39.2c1.2-1.4 3-1.4 4.2 0" fill="none" stroke="${person.hair}" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M46 39.2c1.2-1.4 3-1.4 4.2 0" fill="none" stroke="${person.hair}" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M39.2 44.5c.6 1.4 1.6 1.6 2.2 0" fill="none" stroke="#a87862" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M34.5 48.5c3.2 3.2 7.8 3.2 11 0" fill="none" stroke="#8a5344" stroke-width="1.15" stroke-linecap="round"/>
  ${beard}
</svg>
`;
}

for (const person of people) {
  await writeFile(join(root, `${person.id}.svg`), svgFor(person));
}
console.log("portraits", people.length);

import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "reviews");

const people = [
  { id: "wagner", skin: "#c68642", hair: "#2b1b12", shirt: "#1f4d3a", hairPath: "M18 28c2-16 44-16 48 2-10-2-16 4-24 4s-15-6-24-6z" },
  { id: "james", skin: "#e0b184", hair: "#3b2a1a", shirt: "#1c3358", hairPath: "M20 30c1-18 42-18 44 1-8 1-14 8-22 8s-14-8-22-9z" },
  { id: "hiroshi", skin: "#d8a57a", hair: "#1a1410", shirt: "#3a2a22", hairPath: "M17 32c3-20 46-20 50-1-18 2-32 2-50 1z" },
  { id: "maria", skin: "#b56c3c", hair: "#1b0f0a", shirt: "#6b2148", hairPath: "M14 34c6-24 50-24 56 0-8-8-16-2-28-2s-20-6-28 2z" },
  { id: "carlos", skin: "#c48a5a", hair: "#2a1c12", shirt: "#0f3d4c", hairPath: "M18 29c3-16 44-16 48 2-12 0-18 6-24 6s-12-6-24-8z" },
  { id: "camila", skin: "#c68642", hair: "#4a2414", shirt: "#7a2e1e", hairPath: "M13 36c8-26 50-26 58-1-10-7-18 1-29 1s-19-8-29 0z" },
  { id: "daniel", skin: "#edc4a0", hair: "#5a3b22", shirt: "#1a2a44", hairPath: "M19 30c2-16 42-16 46 1-10 2-16 7-23 7s-13-7-23-8z" },
  { id: "yuki", skin: "#e6c2a0", hair: "#211810", shirt: "#5a2040", hairPath: "M12 38c10-28 50-28 60 0-12-10-20-1-30-1s-18-9-30 1z" },
  { id: "pablo", skin: "#c68642", hair: "#1d1410", shirt: "#3d1f14", hairPath: "M18 30c2-17 44-17 48 1-11 0-17 6-24 6s-13-6-24-7z" },
  { id: "ana", skin: "#b8733a", hair: "#2c160e", shirt: "#2a3d28", hairPath: "M14 35c7-24 48-24 56 0-9-8-17-1-28-1s-19-7-28 1z" },
  { id: "kenji", skin: "#d2a07a", hair: "#161210", shirt: "#2a3344", hairPath: "M18 31c3-18 44-18 48 0-16 2-32 2-48 0z" },
  { id: "emily", skin: "#f0c8a8", hair: "#8a5a28", shirt: "#3d2a58", hairPath: "M14 34c6-22 48-22 56 1-10-8-18 0-28 0s-18-8-28-1z" },
  { id: "mateo", skin: "#a15c32", hair: "#1a100c", shirt: "#1e3a2f", hairPath: "M17 30c3-16 45-16 50 2-12-1-18 5-25 5s-13-5-25-7z" },
  { id: "olivia", skin: "#e8b892", hair: "#3d2416", shirt: "#4a2040", hairPath: "M13 36c8-24 50-24 58 0-11-8-19 1-29 1s-18-9-29-1z" },
  { id: "lucia", skin: "#c68642", hair: "#2a1810", shirt: "#5a1f2e", hairPath: "M14 35c7-24 48-24 56 1-9-8-18-1-28-1s-19-7-28 0z" },
  { id: "joao", skin: "#c48a58", hair: "#24180f", shirt: "#16324a", hairPath: "M18 29c2-16 44-16 48 2-11 0-17 6-24 6s-13-6-24-8z" },
  { id: "sakura", skin: "#efc3a4", hair: "#1c1410", shirt: "#6a3048", hairPath: "M12 38c9-27 50-27 60 0-12-9-20 0-30 0s-18-9-30 0z" },
  { id: "rafael", skin: "#b56c3c", hair: "#1a100c", shirt: "#2c2a18", hairPath: "M17 30c3-16 45-16 50 2-12 0-18 6-25 6s-13-6-25-8z" },
  { id: "isabella", skin: "#c68642", hair: "#3a2014", shirt: "#3a2458", hairPath: "M13 36c8-25 50-25 58 0-10-8-18 1-29 1s-19-9-29 0z" },
  { id: "thomas", skin: "#e6b48a", hair: "#4a3320", shirt: "#1b2c20", hairPath: "M19 30c2-16 42-16 46 1-10 1-15 7-23 7s-13-7-23-8z" }
];

const photos = {
  wagner: "https://randomuser.me/api/portraits/men/75.jpg",
  james: "https://randomuser.me/api/portraits/men/32.jpg",
  hiroshi: "https://randomuser.me/api/portraits/men/51.jpg",
  maria: "https://randomuser.me/api/portraits/women/21.jpg",
  carlos: "https://randomuser.me/api/portraits/men/22.jpg",
  camila: "https://randomuser.me/api/portraits/women/65.jpg",
  daniel: "https://randomuser.me/api/portraits/men/11.jpg",
  yuki: "https://randomuser.me/api/portraits/women/44.jpg",
  pablo: "https://randomuser.me/api/portraits/men/41.jpg",
  ana: "https://randomuser.me/api/portraits/women/12.jpg",
  kenji: "https://randomuser.me/api/portraits/men/64.jpg",
  emily: "https://randomuser.me/api/portraits/women/33.jpg",
  mateo: "https://randomuser.me/api/portraits/men/36.jpg",
  olivia: "https://randomuser.me/api/portraits/women/47.jpg",
  lucia: "https://randomuser.me/api/portraits/women/68.jpg",
  joao: "https://randomuser.me/api/portraits/men/18.jpg",
  sakura: "https://randomuser.me/api/portraits/women/90.jpg",
  rafael: "https://randomuser.me/api/portraits/men/28.jpg",
  isabella: "https://randomuser.me/api/portraits/women/26.jpg",
  thomas: "https://randomuser.me/api/portraits/men/8.jpg"
};

function svgFor(person) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="160" height="160">
  <rect width="80" height="80" rx="40" fill="#141820"/>
  <path d="${person.hairPath}" fill="${person.hair}"/>
  <circle cx="40" cy="36" r="16" fill="${person.skin}"/>
  <ellipse cx="40" cy="72" rx="22" ry="16" fill="${person.shirt}"/>
  <circle cx="34" cy="35" r="1.4" fill="#2a2118"/>
  <circle cx="46" cy="35" r="1.4" fill="#2a2118"/>
  <path d="M36 42c2.4 2.4 5.6 2.4 8 0" fill="none" stroke="#7a5340" stroke-width="1.2" stroke-linecap="round"/>
</svg>
`;
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        download(res.headers.location, dest).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const file = createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve(true)));
      file.on("error", reject);
    });
    req.on("error", reject);
  });
}

await mkdir(root, { recursive: true });

for (const person of people) {
  await writeFile(join(root, `${person.id}.svg`), svgFor(person));
  try {
    await download(photos[person.id], join(root, `${person.id}.jpg`));
    console.log("photo", person.id);
  } catch (error) {
    console.log("svg-only", person.id, error.message);
  }
}

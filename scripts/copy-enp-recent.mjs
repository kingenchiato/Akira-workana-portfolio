import { copyFile, mkdir, readdir } from "node:fs/promises";
import { join } from "node:path";

const root = join("e:", "My data", "Acount", "Account-6 (Call)", "workana");
const destRoot = join(root, "portfolio", "public", "enp");
const docs = join(destRoot, "docs");
const holdings = join(root, "portfolio", "ENP");

await mkdir(docs, { recursive: true });

for (let n = 10; n <= 23; n += 1) {
  const src = join(root, String(n));
  const imgDest = join(destRoot, String(n));
  const holdDest = join(holdings, String(n));
  await mkdir(imgDest, { recursive: true });
  await mkdir(holdDest, { recursive: true });
  const files = await readdir(src);
  for (const file of files) {
    const from = join(src, file);
    if (/\.png$/i.test(file)) {
      await copyFile(from, join(imgDest, file));
      await copyFile(from, join(holdDest, file));
      console.log("img", n, file);
    } else if (/\.pdf$/i.test(file)) {
      await copyFile(from, join(docs, file));
      await copyFile(from, join(holdDest, file));
      console.log("pdf", n, file);
    } else if (/\.txt$/i.test(file)) {
      await copyFile(from, join(holdDest, file));
    }
  }
}

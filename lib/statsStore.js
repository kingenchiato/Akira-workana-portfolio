import fs from "fs";
import path from "path";
import { get, put } from "@vercel/blob";

const BLOB_PATH = "records/counters.json";
const LOCAL_PATH = path.join(process.cwd(), "data", "counters.json");

export const FLOORS = {
  visitors: 320,
  contracts: 72,
  daily: 28
};

export function todayKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function emptyRecord() {
  return {
    visitors: FLOORS.visitors,
    contracts: FLOORS.contracts,
    recommends: 0,
    daily: FLOORS.daily,
    day: todayKey(),
    revision: 0
  };
}

export function normalize(raw) {
  const today = todayKey();
  const base = emptyRecord();
  const visitors = Math.max(FLOORS.visitors, Number(raw?.visitors) || base.visitors);
  const contracts = Math.max(FLOORS.contracts, Number(raw?.contracts) || base.contracts);
  const recommends = Math.max(0, Number(raw?.recommends) || 0);
  let day = typeof raw?.day === "string" ? raw.day : today;
  let daily = Math.max(0, Number(raw?.daily) || 0);
  if (day !== today) {
    day = today;
    daily = FLOORS.daily;
  } else {
    daily = Math.max(FLOORS.daily, daily);
  }
  return {
    visitors,
    contracts,
    recommends,
    daily,
    day,
    revision: Number(raw?.revision) || 0
  };
}

async function readBlob() {
  try {
    const result = await get(BLOB_PATH, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text);
  } catch (error) {
    if (error && error.name === "BlobNotFoundError") return null;
    throw error;
  }
}

async function writeBlob(record) {
  await put(BLOB_PATH, JSON.stringify(record), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0
  });
}

function readFile() {
  try {
    return JSON.parse(fs.readFileSync(LOCAL_PATH, "utf8"));
  } catch {
    return null;
  }
}

function writeFile(record) {
  fs.mkdirSync(path.dirname(LOCAL_PATH), { recursive: true });
  fs.writeFileSync(LOCAL_PATH, JSON.stringify(record));
}

function useBlob() {
  const token = process.env.BLOB_READ_WRITE_TOKEN || "";
  return Boolean(token) && !token.startsWith("eyJ");
}

async function readRaw() {
  if (!useBlob()) return readFile();
  return readBlob();
}

async function writeRaw(record) {
  if (!useBlob()) {
    writeFile(record);
    return;
  }
  await writeBlob(record);
}

let chain = Promise.resolve();

export function updateRecord(mutator) {
  const run = chain.then(() => applyUpdate(mutator));
  chain = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

async function applyUpdate(mutator) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const current = normalize(await readRaw());
    const draft = normalize(mutator(current));
    draft.revision = Date.now() + attempt;
    await writeRaw(draft);
    const saved = await readRaw();
    if (Number(saved?.revision) === draft.revision) return normalize(saved);
    await new Promise((resolve) => setTimeout(resolve, 40 * (attempt + 1)));
  }
  return normalize(await readRaw());
}

export function publicStats(record) {
  return {
    visitors: record.visitors,
    contracts: record.contracts,
    daily: record.daily,
    recommends: record.recommends
  };
}

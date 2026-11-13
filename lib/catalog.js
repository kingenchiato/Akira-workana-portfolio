import { alternateOrigins } from "./order";
import { presentWork } from "./briefs";
import { journey, worldWorks } from "./cinematic/journey";
import { enrichWork, folioText } from "./cinematic/folio";
import { GROUPS } from "./groups";
import { portfolioItems } from "./portfolio";

export { GROUPS };

const JOURNEY_FOR = {
  choimite: "choimite",
  attendance: "attendance",
  restaurant: "restaurant",
  medireserve: "medireserve",
  partsstock: "partsstock",
  "app-3": "app-attendance",
  "app-8": "app-wearable",
  "app-12": "app-pharma",
  "web-2": "web-tea",
  "web-4": "web-law",
  "game-1": "game-rpg",
  "python-6": "kintone"
};

function paragraphs(value) {
  if (Array.isArray(value)) {
    return value.map((part) => String(part).trim()).filter(Boolean);
  }
  return String(value || "")
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function text(value) {
  return String(value || "").trim();
}

const journeyById = Object.fromEntries(journey.map((work) => [work.id, work]));

function studioItem(item) {
  const brief = presentWork(item, "en");
  const linked = journeyById[JOURNEY_FOR[item.id]];
  const english = linked?.copy?.en || null;
  return {
    id: item.id,
    group: item.category,
    title: brief.title || item.title,
    originalTitle: item.title && item.title !== brief.title ? item.title : "",
    summary: brief.text || english?.summary || item.summary || "",
    story: text(english?.story),
    notes: paragraphs(item.overview),
    approach: text(item.approach),
    problem: text(item.problem || english?.problem),
    response: text(item.response || english?.response),
    features: [],
    stack: [],
    skills: item.skills || [],
    images: item.images || [],
    url: item.url || "",
    pdf: "",
    origin: "japan"
  };
}

function internationalItem(work) {
  const enriched = enrichWork(work, "world");
  const detail = folioText(enriched, "en");
  const english = work.copy?.en || {};
  const notes = detail.overview?.length ? detail.overview : paragraphs(english.story);
  return {
    id: work.id,
    group: "international",
    title: detail.title || english.title || work.id,
    originalTitle: "",
    summary: detail.summary || english.summary || "",
    story: notes.length ? "" : text(english.story),
    notes,
    approach: text(detail.approach),
    problem: text(detail.problem || english.problem),
    response: text(detail.response || english.response),
    features: detail.features || [],
    stack: detail.stack || [],
    skills: enriched.skills?.length ? enriched.skills : work.skills || [],
    images: work.images || [],
    url: work.url || "",
    pdf: enriched.pdf || "",
    origin: "international"
  };
}

let cached;

export function getCatalog() {
  if (cached) return cached;
  const studio = portfolioItems.map(studioItem);
  const international = worldWorks.map(internationalItem).filter((item) => item.images.length);
  cached = [...studio, ...international];
  return cached;
}

export function previewWorks() {
  const ordered = alternateOrigins(getCatalog().filter((item) => item.images.length && item.group !== "logo" && item.group !== "card"));
  return ordered.slice(0, 20).map((item) => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    image: item.images[0] || "",
    group: item.group,
    origin: item.origin === "international" ? "International" : "Japan"
  }));
}

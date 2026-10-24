import { portfolioItems } from "../portfolio";
import { ENP_COPY } from "./enpCopy";

const JAPAN_SOURCE_ID = {
  choimite: "choimite",
  attendance: "attendance",
  restaurant: "restaurant",
  medireserve: "medireserve",
  partsstock: "partsstock",
  "app-attendance": "app-3",
  "app-wearable": "app-8",
  "app-pharma": "app-12",
  "web-tea": "web-2",
  "web-law": "web-4",
  "game-rpg": "game-1",
  kintone: "python-6"
};

const byId = Object.fromEntries(portfolioItems.map((item) => [item.id, item]));

function paragraphs(overview) {
  if (Array.isArray(overview)) return overview.filter(Boolean);
  return String(overview || "")
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function enrichWork(work, variant) {
  if (variant === "japan") {
    const src = byId[JAPAN_SOURCE_ID[work.id]];
    if (!src) return work;
    const overview = paragraphs(src.overview);
    return {
      ...work,
      skills: src.skills?.length ? src.skills : work.skills,
      url: src.url || work.url,
      period: src.period || "",
      folio: {
        title: src.title,
        kicker: src.label || "",
        summary: overview[0] || src.summary,
        overview,
        approach: src.approach || "",
        problem: src.problem || "",
        response: src.response || "",
        features: [],
        stack: []
      }
    };
  }

  const enp = ENP_COPY[work.id];
  if (!enp) return work;
  return {
    ...work,
    skills: enp.skills,
    pdf: enp.pdf,
    folio: {
      title: enp.title,
      kicker: "Workana · International",
      summary: enp.summary,
      overview: enp.overview,
      approach: "",
      problem: "",
      response: "",
      features: enp.features,
      stack: enp.stack
    }
  };
}

export function folioText(work, lang) {
  if (work.folio) {
    return {
      title: work.folio.title,
      kicker: work.folio.kicker,
      summary: work.folio.summary,
      overview: work.folio.overview,
      approach: work.folio.approach,
      problem: work.folio.problem,
      response: work.folio.response,
      features: work.folio.features,
      stack: work.folio.stack
    };
  }
  const copy = work.copy?.[lang] || work.copy?.en || {};
  return {
    title: copy.title || "",
    kicker: copy.kicker || "",
    summary: copy.summary || "",
    overview: copy.story ? [copy.story] : [],
    approach: "",
    problem: copy.problem || "",
    response: copy.response || "",
    features: [],
    stack: []
  };
}

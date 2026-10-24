/** Approximate geographic coloring for the Earth canvas (lat/lon degrees). */

const OCEAN = [0.08, 0.38, 0.66];
const OCEAN_DEEP = [0.05, 0.22, 0.45];
const ICE = [0.88, 0.93, 0.98];

export const COUNTRY_RGB = {
  jp: [0.92, 0.28, 0.32],
  us: [0.22, 0.48, 0.92],
  br: [0.12, 0.68, 0.32],
  es: [0.95, 0.58, 0.1],
  pt: [0.58, 0.12, 0.22],
  mx: [0.06, 0.58, 0.34],
  co: [0.95, 0.78, 0.1],
  ar: [0.4, 0.72, 0.92],
  cl: [0.88, 0.18, 0.22],
  bd: [0.05, 0.58, 0.38],
  pa: [0.1, 0.4, 0.82]
};

const LAND = {
  africa: [0.86, 0.64, 0.3],
  europe: [0.42, 0.7, 0.4],
  asia: [0.7, 0.56, 0.3],
  oceania: [0.58, 0.76, 0.28],
  na: [0.36, 0.68, 0.4],
  sa: [0.28, 0.66, 0.34],
  default: [0.46, 0.62, 0.34]
};

function box(lat, lon, s, n, w, e) {
  return lat >= s && lat <= northBound(n) && lon >= w && lon <= e;
}
function northBound(n) {
  return n;
}

/** Point-in-polygon. poly = [[lat, lon], ...] */
function inside(lat, lon, poly) {
  let odd = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [yi, xi] = poly[i];
    const [yj, xj] = poly[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi + 1e-12) + xi) odd = !odd;
  }
  return odd;
}

// Coarse continent outlines (lat, lon) — keep oceans out of bounding boxes
const AFRICA = [
  [37, -6],
  [37, 11],
  [32, 25],
  [30, 33],
  [12, 43],
  [12, 51],
  [-5, 42],
  [-35, 28],
  [-35, 18],
  [-22, 14],
  [0, 8],
  [5, -5],
  [15, -18],
  [28, -14],
  [36, -6]
];

const EUROPE = [
  [36, -10],
  [44, -10],
  [59, -8],
  [71, 25],
  [60, 40],
  [48, 40],
  [41, 29],
  [36, 26],
  [36, -5]
];

const ASIA = [
  [8, 72],
  [25, 60],
  [40, 45],
  [55, 60],
  [75, 80],
  [72, 140],
  [55, 145],
  [42, 142],
  [30, 122],
  [20, 110],
  [8, 100],
  [-2, 105],
  [-8, 115],
  [-10, 140],
  [0, 130],
  [10, 100],
  [8, 72]
];

const NA = [
  [15, -95],
  [30, -115],
  [49, -125],
  [60, -140],
  [70, -165],
  [72, -90],
  [60, -55],
  [48, -52],
  [30, -80],
  [25, -80],
  [15, -85]
];

const SA = [
  [12, -72],
  [5, -60],
  [-5, -35],
  [-25, -40],
  [-55, -68],
  [-52, -75],
  [-20, -72],
  [0, -80],
  [12, -72]
];

const AUS = [
  [-10, 113],
  [-12, 142],
  [-25, 153],
  [-39, 150],
  [-38, 115],
  [-22, 113],
  [-10, 113]
];

export function classifyLatLon(lat, lon) {
  if (lat > 74 || lat < -62) return { kind: "ice", rgb: ICE };
  if (box(lat, lon, 59, 84, -74, -12)) return { kind: "ice", rgb: ICE };

  // Featured countries (tight boxes)
  if (box(lat, lon, 30.5, 45.6, 129.2, 145.8)) return { kind: "country", id: "jp", rgb: COUNTRY_RGB.jp };
  if (box(lat, lon, 20.7, 26.7, 88.0, 92.7)) return { kind: "country", id: "bd", rgb: COUNTRY_RGB.bd };
  if (box(lat, lon, 36.9, 42.2, -9.55, -6.15)) return { kind: "country", id: "pt", rgb: COUNTRY_RGB.pt };
  if (box(lat, lon, 36.0, 43.8, -9.3, 3.3) && lon > -7.3) return { kind: "country", id: "es", rgb: COUNTRY_RGB.es };
  if (box(lat, lon, 7.05, 9.8, -83.05, -77.15)) return { kind: "country", id: "pa", rgb: COUNTRY_RGB.pa };
  if (box(lat, lon, -2.0, 12.8, -79.1, -66.9)) return { kind: "country", id: "co", rgb: COUNTRY_RGB.co };
  if (box(lat, lon, -55.9, -17.6, -75.7, -67.2) && lon < -68) return { kind: "country", id: "cl", rgb: COUNTRY_RGB.cl };
  if (box(lat, lon, -55.0, -21.8, -73.2, -53.5) && lon > -70.5) return { kind: "country", id: "ar", rgb: COUNTRY_RGB.ar };
  if (box(lat, lon, -33.5, 5.0, -73.8, -34.8) && !box(lat, lon, -2.0, 12.8, -79.1, -66.9) && lon > -68) {
    // Brazil mainland-ish (exclude far west Andes strip)
    if (!(lon < -70 && lat < -20)) return { kind: "country", id: "br", rgb: COUNTRY_RGB.br };
  }
  if (box(lat, lon, 14.6, 32.6, -117.2, -86.7) && !(lat > 30.2 && lon < -104)) {
    return { kind: "country", id: "mx", rgb: COUNTRY_RGB.mx };
  }
  if (box(lat, lon, 24.5, 49.4, -124.7, -66.9) && !box(lat, lon, 14.6, 28, -110, -86)) {
    return { kind: "country", id: "us", rgb: COUNTRY_RGB.us };
  }

  if (inside(lat, lon, AFRICA)) return { kind: "land", id: "africa", rgb: LAND.africa };
  if (inside(lat, lon, EUROPE)) return { kind: "land", id: "europe", rgb: LAND.europe };
  if (inside(lat, lon, ASIA)) return { kind: "land", id: "asia", rgb: LAND.asia };
  if (inside(lat, lon, AUS) || box(lat, lon, -47, -34, 166, 179)) return { kind: "land", id: "oceania", rgb: LAND.oceania };
  if (inside(lat, lon, NA) || box(lat, lon, 51, 72, -170, -130)) return { kind: "land", id: "na", rgb: LAND.na };
  if (inside(lat, lon, SA)) return { kind: "land", id: "sa", rgb: LAND.sa };

  // British Isles / Madagascar / Japan already handled / NZ
  if (box(lat, lon, 50, 59, -8, 2)) return { kind: "land", id: "europe", rgb: LAND.europe };
  if (box(lat, lon, -26, -12, 43, 51)) return { kind: "land", id: "africa", rgb: LAND.africa };
  if (box(lat, lon, 7, 18, -92, -77)) return { kind: "land", id: "na", rgb: LAND.na };

  const deep = Math.abs(lat) < 5 || Math.sin((lon * Math.PI) / 45) > 0.9;
  return { kind: "ocean", rgb: deep ? OCEAN_DEEP : OCEAN };
}

import * as THREE from "three";
import { CAPITALS } from "./capitals";
import { classifyLatLon, COUNTRY_RGB } from "./earthMap";

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

const COUNTRY_BOX = {
  jp: [30.5, 45.6, 129.2, 145.8],
  us: [24.5, 49.4, -124.7, -66.9],
  br: [-33.5, 5.0, -73.8, -34.8],
  es: [36.0, 43.8, -9.3, 3.3],
  pt: [36.9, 42.2, -9.55, -6.15],
  mx: [14.6, 32.6, -117.2, -86.7],
  co: [-2.0, 12.8, -79.1, -66.9],
  ar: [-55.0, -21.8, -73.2, -53.5],
  cl: [-55.9, -17.6, -75.7, -67.2],
  bd: [20.7, 26.7, 88.0, 92.7],
  pa: [7.05, 9.8, -83.05, -77.15]
};

const COUNTRY_EXTRA = {
  jp: 110,
  us: 130,
  br: 120,
  es: 70,
  pt: 60,
  mx: 80,
  co: 70,
  ar: 80,
  cl: 60,
  bd: 60,
  pa: 50
};

export function latLonToVec(lat, lon, radius) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function clamp01(v) {
  return Math.min(1, Math.max(0, v));
}

function vary(rgb, amount) {
  return [
    clamp01(rgb[0] + (Math.random() - 0.5) * amount),
    clamp01(rgb[1] + (Math.random() - 0.5) * amount),
    clamp01(rgb[2] + (Math.random() - 0.5) * amount)
  ];
}

function pushDrone(list, lat, lon, radius, hit) {
  const jitter = (Math.random() - 0.45) * 0.024;
  const r = radius * (1.004 + jitter);
  const p = latLonToVec(lat, lon, r);
  let rgb = hit.rgb;
  let size = 0.11;
  if (hit.kind === "ocean") {
    const deep = Math.abs(lat) > 48 || Math.abs(lat) < 8;
    rgb = vary(deep ? [0.1, 0.42, 0.92] : [0.16, 0.62, 1], 0.1);
    size = 0.145 + Math.random() * 0.04;
  } else if (hit.kind === "ice") {
    rgb = vary([0.86, 0.94, 1], 0.05);
    size = 0.155 + Math.random() * 0.045;
  } else if (hit.kind === "country") {
    rgb = vary(rgb, 0.04);
    rgb = [clamp01(rgb[0] * 1.18 + 0.06), clamp01(rgb[1] * 1.14 + 0.04), clamp01(rgb[2] * 1.1 + 0.04)];
    size = 0.22 + Math.random() * 0.07;
  } else {
    rgb = vary(
      [clamp01(rgb[0] * 1.22 + 0.06), clamp01(rgb[1] * 1.18 + 0.05), clamp01(rgb[2] * 1.08 + 0.02)],
      0.06
    );
    size = 0.19 + Math.random() * 0.05;
  }
  list.push({
    x: p.x,
    y: p.y,
    z: p.z,
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
    size,
    phase: Math.random() * Math.PI * 2
  });
}

function sampleCountry(id, count, radius, list) {
  const box = COUNTRY_BOX[id];
  if (!box) return;
  const [s, n, w, e] = box;
  let added = 0;
  let guard = 0;
  while (added < count && guard < count * 40) {
    guard += 1;
    const lat = s + Math.random() * (n - s);
    const lon = w + Math.random() * (e - w);
    const hit = classifyLatLon(lat, lon);
    if (hit.id !== id) continue;
    pushDrone(list, lat, lon, radius, hit);
    added += 1;
  }
}

function buildDroneList(radius) {
  const list = [];
  const fib = 8200;
  for (let i = 0; i < fib; i += 1) {
    const y = 1 - (i / (fib - 1)) * 2;
    const lat = THREE.MathUtils.radToDeg(Math.asin(Math.max(-1, Math.min(1, y))));
    const lon = THREE.MathUtils.radToDeg(GOLDEN * i);
    const wrapped = ((((lon + 180) % 360) + 360) % 360) - 180;
    const hit = classifyLatLon(lat, wrapped);
    if (hit.kind === "ocean" && i % 2 === 0) continue;
    pushDrone(list, lat, wrapped, radius, hit);
  }

  let land = 0;
  let tries = 0;
  while (land < 2000 && tries < 40000) {
    tries += 1;
    const lat = Math.asin(Math.random() * 2 - 1) * (180 / Math.PI);
    const lon = Math.random() * 360 - 180;
    const hit = classifyLatLon(lat, lon);
    if (hit.kind === "ocean") continue;
    pushDrone(list, lat, lon, radius, hit);
    land += 1;
  }

  Object.entries(COUNTRY_EXTRA).forEach(([id, count]) => {
    sampleCountry(id, count, radius, list);
  });

  return list;
}

function droneShaders() {
  return {
    vertexShader: `
      attribute float aSize;
      attribute float aPhase;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vPhase;
      uniform float uTime;
      void main() {
        vColor = color;
        vPhase = aPhase;
        float hover = sin(uTime * 1.35 + aPhase) * 0.014;
        vec3 pos = position + normalize(position) * hover;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        float pulse = 0.78 + 0.28 * sin(uTime * 2.2 + aPhase);
        float dist = max(1.2, -mvPosition.z);
        gl_PointSize = clamp(aSize * pulse * (360.0 / dist), 1.8, 20.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vPhase;
      uniform float uTime;
      void main() {
        vec2 uv = gl_PointCoord * 2.0 - 1.0;
        float d = length(uv);
        if (d > 1.0) discard;
        float core = smoothstep(0.55, 0.08, d);
        float glow = exp(-d * 3.1);
        float twinkle = 0.72 + 0.28 * sin(uTime * 3.4 + vPhase * 2.1);
        vec3 col = vColor * (0.88 + core * 0.55);
        float alpha = (glow * 0.42 + core * 0.96) * twinkle;
        gl_FragColor = vec4(col, alpha);
      }
    `
  };
}

function makeDronePoints(drones, additive) {
  const count = drones.length;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  drones.forEach((d, i) => {
    positions[i * 3] = d.x;
    positions[i * 3 + 1] = d.y;
    positions[i * 3 + 2] = d.z;
    colors[i * 3] = d.r;
    colors[i * 3 + 1] = d.g;
    colors[i * 3 + 2] = d.b;
    sizes[i] = additive ? d.size * 1.65 : d.size;
    phases[i] = d.phase;
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  const shaders = droneShaders();
  const material = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: shaders.vertexShader,
    fragmentShader: shaders.fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    toneMapped: false
  });
  return new THREE.Points(geometry, material);
}

function makePolarAurora(radius) {
  const count = 1100;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const palette = [
    [0.25, 1.0, 0.62],
    [0.15, 0.92, 0.78],
    [0.45, 0.55, 1.0],
    [0.82, 0.32, 1.0],
    [0.2, 0.98, 0.88]
  ];
  for (let i = 0; i < count; i += 1) {
    const lat = 64 + Math.random() * 18;
    const lon = Math.random() * 360 - 180;
    const h = radius * (1.04 + Math.random() * 0.16);
    const p = latLonToVec(lat, lon, h);
    positions[i * 3] = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z;
    const c = palette[i % palette.length];
    colors[i * 3] = c[0];
    colors[i * 3 + 1] = c[1];
    colors[i * 3 + 2] = c[2];
    sizes[i] = 0.2 + Math.random() * 0.22;
    phases[i] = Math.random() * Math.PI * 2;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  const shaders = droneShaders();
  return new THREE.Points(
    geometry,
    new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: shaders.vertexShader,
      fragmentShader: shaders.fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false
    })
  );
}

export function createGlobe(radius = 1.62) {
  const root = new THREE.Group();
  const earth = new THREE.Group();
  root.add(earth);

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 0.972, 64, 48),
    new THREE.MeshBasicMaterial({ color: 0x071e3a, toneMapped: false })
  );
  earth.add(core);

  const drones = buildDroneList(radius);
  const swarm = makeDronePoints(drones, false);
  const halo = makeDronePoints(
    drones.filter((d, i) => d.size > 0.145 && i % 4 === 0),
    true
  );
  earth.add(swarm, halo);

  const polar = makePolarAurora(radius);
  earth.add(polar);

  earth.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.085, 48, 32),
      new THREE.MeshBasicMaterial({
        color: 0x3aa8ff,
        transparent: true,
        opacity: 0.14,
        side: THREE.BackSide,
        depthWrite: false,
        toneMapped: false,
        blending: THREE.AdditiveBlending
      })
    )
  );

  const capitals = [];
  CAPITALS.forEach((capital) => {
    const pos = latLonToVec(capital.lat, capital.lon, radius * 1.045);
    const tint = COUNTRY_RGB[capital.id] || [0.95, 0.82, 0.48];
    const color = new THREE.Color(tint[0], tint[1], tint[2]);
    const corePin = new THREE.Mesh(
      new THREE.SphereGeometry(0.038, 14, 14),
      new THREE.MeshBasicMaterial({ color: 0xfff6d2, toneMapped: false })
    );
    corePin.position.copy(pos);
    const pinHalo = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 12, 12),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        toneMapped: false,
        blending: THREE.AdditiveBlending
      })
    );
    pinHalo.position.copy(pos);
    earth.add(pinHalo, corePin);
    capitals.push({ capital, mesh: corePin });
  });

  // Start on the Africa / Atlantic face used by the previous hub view.
  root.rotation.y = Math.PI;

  root.userData.capitals = capitals;
  root.userData.radius = radius;
  root.userData.earth = earth;
  root.userData.droneMats = [swarm.material, halo.material, polar.material];
  return root;
}

export function updateGlobe(root, t) {
  root?.userData?.droneMats?.forEach((mat) => {
    if (mat?.uniforms?.uTime) mat.uniforms.uTime.value = t;
  });
}

function makeStarTexture(points) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, size, size);
  const cx = size / 2;
  const cy = size / 2;
  ctx.translate(cx, cy);

  const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.48);
  glow.addColorStop(0, "rgba(255,255,255,0.95)");
  glow.addColorStop(0.18, "rgba(255,255,255,0.45)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.48, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  const outer = size * (points === 4 ? 0.48 : 0.46);
  const inner = size * (points === 4 ? 0.08 : 0.18);
  const steps = points * 2;
  for (let i = 0; i < steps; i += 1) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / points;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  const fill = ctx.createRadialGradient(0, 0, 0, 0, 0, outer);
  fill.addColorStop(0, "rgba(255,255,255,1)");
  fill.addColorStop(0.45, "rgba(255,255,255,0.92)");
  fill.addColorStop(1, "rgba(255,255,255,0.2)");
  ctx.fillStyle = fill;
  ctx.shadowColor = "rgba(255,255,255,0.85)";
  ctx.shadowBlur = points === 4 ? 6 : 8;
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function starShaders() {
  return {
    vertexShader: `
      attribute float aSize;
      attribute float aPhase;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vPhase;
      uniform float uTime;
      void main() {
        vColor = color;
        vPhase = aPhase;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float twinkle = 0.78 + 0.32 * sin(uTime * (1.15 + aPhase * 0.12) + aPhase);
        float dist = max(18.0, -mvPosition.z);
        gl_PointSize = clamp(aSize * twinkle * (90.0 / dist), 8.0, 44.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D uStar;
      varying vec3 vColor;
      varying float vPhase;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float c = cos(vPhase);
        float s = sin(vPhase);
        vec2 rot = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y) + 0.5;
        vec4 star = texture2D(uStar, rot);
        if (star.a < 0.06) discard;
        gl_FragColor = vec4(vColor * star.rgb, star.a);
      }
    `
  };
}

function makeStarLayer({ count, near, far, sizeMin, sizeMax, map, band }) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const palettes = [
    [0.82, 0.9, 1.0],
    [0.97, 0.98, 1.0],
    [1.0, 0.92, 0.68],
    [1.0, 0.78, 0.5],
    [0.68, 0.93, 1.0],
    [1.0, 0.82, 0.9],
    [0.78, 0.84, 1.0]
  ];
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.62, 0.4, -0.18));
  const v = new THREE.Vector3();

  for (let i = 0; i < count; i += 1) {
    if (band) {
      const lon = Math.random() * Math.PI * 2;
      const lat = (Math.random() - 0.5) * 0.38;
      const dist = near + Math.random() * (far - near);
      v.set(Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon));
      v.applyQuaternion(q).multiplyScalar(dist);
    } else {
      v.randomDirection().multiplyScalar(near + Math.random() * (far - near));
    }
    positions[i * 3] = v.x;
    positions[i * 3 + 1] = v.y;
    positions[i * 3 + 2] = v.z;
    const c = palettes[(Math.random() * palettes.length) | 0];
    const bright = 0.62 + Math.random() * 0.38;
    colors[i * 3] = Math.min(1, c[0] * bright);
    colors[i * 3 + 1] = Math.min(1, c[1] * bright);
    colors[i * 3 + 2] = Math.min(1, c[2] * bright);
    sizes[i] = sizeMin + Math.random() * (sizeMax - sizeMin);
    phases[i] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  const shaders = starShaders();
  return new THREE.Points(
    geometry,
    new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uStar: { value: map } },
      vertexShader: shaders.vertexShader,
      fragmentShader: shaders.fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false
    })
  );
}

function makeNebulaTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, size, size);
  const layers = [
    ["rgba(40, 180, 255, 0.16)", 0.42],
    ["rgba(90, 70, 255, 0.14)", 0.5],
    ["rgba(40, 255, 190, 0.1)", 0.38],
    ["rgba(210, 90, 255, 0.1)", 0.46]
  ];
  layers.forEach(([color, spread], i) => {
    const g = ctx.createRadialGradient(
      size * (0.3 + i * 0.14),
      size * (0.38 + (i % 2) * 0.18),
      10,
      size * 0.5,
      size * 0.5,
      size * spread
    );
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createStarfield() {
  const root = new THREE.Group();
  const sparkle = makeStarTexture(4);
  const pentagram = makeStarTexture(5);
  const far = makeStarLayer({ count: 1600, near: 55, far: 170, sizeMin: 9, sizeMax: 16, map: sparkle, band: false });
  const mid = makeStarLayer({ count: 700, near: 28, far: 90, sizeMin: 13, sizeMax: 22, map: pentagram, band: false });
  const bright = makeStarLayer({ count: 160, near: 22, far: 70, sizeMin: 20, sizeMax: 34, map: sparkle, band: false });
  const milky = makeStarLayer({ count: 2200, near: 40, far: 140, sizeMin: 8, sizeMax: 15, map: sparkle, band: true });
  root.add(far, mid, bright, milky);

  const nebulaMap = makeNebulaTexture();
  [
    [0, 4, -48, 90, 36, 0.18],
    [-22, -6, -40, 70, 28, -0.4],
    [26, 8, -44, 64, 26, 0.35]
  ].forEach(([x, y, z, w, h, rot]) => {
    const plate = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({
        map: nebulaMap,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
        side: THREE.DoubleSide
      })
    );
    plate.position.set(x, y, z);
    plate.rotation.z = rot;
    root.add(plate);
  });

  root.userData.materials = [far.material, mid.material, bright.material, milky.material];
  return root;
}

export function updateStars(stars, t) {
  stars?.userData?.materials?.forEach((mat) => {
    if (mat?.uniforms?.uTime) mat.uniforms.uTime.value = t;
  });
}

function auroraShaders() {
  return {
    vertexShader: `
      varying vec2 vUv;
      varying float vWave;
      uniform float uTime;
      void main() {
        vUv = uv;
        vec3 p = position;
        float fold = sin(p.x * 0.42 + uTime * 0.55) * 0.95
          + sin(p.x * 0.9 + p.y * 0.35 + uTime * 0.8) * 0.7;
        float rise = sin(p.y * 0.55 + uTime * 0.65 + p.x * 0.2) * 1.15;
        p.z += fold + rise;
        p.x += sin(p.y * 0.38 + uTime * 0.4) * 0.55;
        vWave = 0.5 + 0.5 * sin(uTime * 0.7 + p.x * 0.3);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying float vWave;
      uniform float uTime;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform float uOpacity;
      void main() {
        float bands = pow(0.5 + 0.5 * sin(vUv.x * 22.0 + uTime * 1.15 + sin(vUv.y * 7.0 + uTime)), 2.2);
        float shafts = pow(max(0.0, sin(vUv.x * 46.0 + uTime * 1.6 + vUv.y * 10.0)), 10.0);
        float vertical = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.28, vUv.y);
        float edge = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
        vec3 col = mix(uColorA, uColorB, clamp(vUv.y * 0.85 + bands * 0.25 + vWave * 0.1, 0.0, 1.0));
        float alpha = (0.12 + bands * 0.55 + shafts * 0.5) * vertical * edge * uOpacity;
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(col, alpha);
      }
    `
  };
}

function makeCurtain({ width, height, colorA, colorB, opacity }) {
  const shaders = auroraShaders();
  return new THREE.Mesh(
    new THREE.PlaneGeometry(width, height, 90, 50),
    new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color(colorA) },
        uColorB: { value: new THREE.Color(colorB) },
        uOpacity: { value: opacity }
      },
      vertexShader: shaders.vertexShader,
      fragmentShader: shaders.fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      toneMapped: false
    })
  );
}

export function createAurora() {
  const root = new THREE.Group();
  const materials = [];

  const curtains = [
    { pos: [0, 2.6, -16], rot: [0.08, 0.12, 0.04], w: 28, h: 13, a: 0x1cff9a, b: 0x4d7cff, o: 0.72 },
    { pos: [-12.5, 1.8, -9], rot: [0.1, 0.82, -0.08], w: 16, h: 12, a: 0x2affd0, b: 0x7a5bff, o: 0.62 },
    { pos: [12.8, 2.1, -9.5], rot: [0.06, -0.78, 0.1], w: 16, h: 12, a: 0x5cffb0, b: 0xd24bff, o: 0.6 },
    { pos: [-2.2, 7.2, -7.5], rot: [1.05, 0.18, 0.22], w: 20, h: 9, a: 0x6dffc4, b: 0x8aa2ff, o: 0.55 },
    { pos: [4.5, -3.4, -14], rot: [0.2, -0.28, 0.08], w: 18, h: 8, a: 0x3d6bff, b: 0xff5ad6, o: 0.38 },
    { pos: [0, 5.4, -22], rot: [0.18, 0, 0], w: 36, h: 14, a: 0x18e7a4, b: 0x5a8cff, o: 0.4 }
  ];

  curtains.forEach((cfg) => {
    const mesh = makeCurtain({
      width: cfg.w,
      height: cfg.h,
      colorA: cfg.a,
      colorB: cfg.b,
      opacity: cfg.o
    });
    mesh.position.set(...cfg.pos);
    mesh.rotation.set(...cfg.rot);
    root.add(mesh);
    materials.push(mesh.material);
  });

  const mistCount = 1800;
  const positions = new Float32Array(mistCount * 3);
  const cols = new Float32Array(mistCount * 3);
  const palette = [0x2dffb4, 0x5a78ff, 0xd06bff, 0x2ad8ff, 0x7cff9a, 0xa0f0ff];
  const c = new THREE.Color();
  for (let i = 0; i < mistCount; i += 1) {
    const side = i % 2 === 0 ? -1 : 1;
    positions[i * 3] = side * (6 + Math.random() * 14) + Math.sin(i) * 2;
    positions[i * 3 + 1] = -2 + Math.random() * 11;
    positions[i * 3 + 2] = -8 - Math.random() * 20;
    c.setHex(palette[i % palette.length]);
    cols[i * 3] = c.r;
    cols[i * 3 + 1] = c.g;
    cols[i * 3 + 2] = c.b;
  }
  const mistGeo = new THREE.BufferGeometry();
  mistGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  mistGeo.setAttribute("color", new THREE.BufferAttribute(cols, 3));
  const mist = new THREE.Points(
    mistGeo,
    new THREE.PointsMaterial({
      map: makeStarTexture(4),
      size: 0.42,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      toneMapped: false,
      alphaTest: 0.05
    })
  );
  root.add(mist);

  root.userData.materials = materials;
  root.userData.points = mist;
  root.userData.basePositions = positions.slice();
  return root;
}

export function updateAurora(aurora, t) {
  aurora?.userData?.materials?.forEach((mat) => {
    if (mat?.uniforms?.uTime) mat.uniforms.uTime.value = t;
  });
  const points = aurora?.userData?.points;
  const base = aurora?.userData?.basePositions;
  if (!points || !base) return;
  const pos = points.geometry.attributes.position.array;
  for (let i = 0; i < pos.length; i += 3) {
    const phase = i * 0.01;
    pos[i] = base[i] + Math.sin(t * 0.35 + phase) * 0.45;
    pos[i + 1] = base[i + 1] + Math.sin(t * 0.5 + phase * 1.25) * 0.95;
    pos[i + 2] = base[i + 2];
  }
  points.geometry.attributes.position.needsUpdate = true;
  points.material.opacity = 0.22 + Math.sin(t * 0.32) * 0.08;
}

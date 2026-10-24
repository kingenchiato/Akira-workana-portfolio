import * as THREE from "three";
import { createSedan } from "./car";
import { CITY_TINT, journey } from "./journey";
import { createBuildings, createHighway, layoutCity } from "./city";
import { createAurora, createGlobe, createStarfield, updateAurora, updateGlobe, updateStars } from "./globe";

function loadTexture(loader, url) {
  return new Promise((resolve) => {
    loader.load(
      url,
      (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        resolve(t);
      },
      undefined,
      () => resolve(null)
    );
  });
}

export class CinematicWorld {
  constructor(canvas, hooks = {}) {
    this.canvas = canvas;
    this.hooks = hooks;
    this.phase = "showroom";
    this.doorAmount = 1;
    this.doorTarget = 1;
    this.look = { x: 0, y: 0, tx: 0, ty: 0 };
    this.speed = 18;
    this.distance = 0;
    this.workIndex = 0;
    this.paused = false;
    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.workTextures = {};
    this._boarding = 0;
    this._boardedFired = false;
    this._dive = 0;
    this._divedFired = false;
    this._pinScratch = new THREE.Vector3();
    this._pinNormal = new THREE.Vector3();
    this._pinCam = new THREE.Vector3();
    this._pinTick = 0;
    this.camShow = new THREE.Vector3(0, 0, 10);
    this.camHub = new THREE.Vector3(0, 0.12, 6.8);
    this.camHubTarget = new THREE.Vector3(0, 0, 0);
    this.camShowTarget = new THREE.Vector3(0, 0, 0);
    this.camBoard = new THREE.Vector3(5.1, 1.85, 6.4);
    this.camBoardTarget = new THREE.Vector3(0.15, 0.95, 0);
    this.camRide = new THREE.Vector3(-1.22, 1.22, 0.08);
    this.camRideTarget = new THREE.Vector3(0.9, 1.16, 0);
    this.onPointer = this.onPointer.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  async init() {
    try {
      const canvas = this.canvas;
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: "high-performance",
        alpha: false
      });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      this.renderer.setSize(window.innerWidth, window.innerHeight, false);
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.18;
      this.renderer.setClearColor(0x05070c, 1);

      this.scene = new THREE.Scene();
      this.scene.fog = null;
      this.scene.background = new THREE.Color(0x05070c);

      this.camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.08, 400);
      this.camera.position.copy(this.camShow);
      this.camera.lookAt(this.camShowTarget);

      const hemi = new THREE.HemisphereLight(0xffe1c0, 0x6a3a22, 1.15);
      const sun = new THREE.DirectionalLight(0xffd9a8, 2.15);
      sun.position.set(-9, 6.5, 5);
      this.scene.add(hemi, sun);
      this.sun = sun;
      this.hemi = hemi;

      const loader = new THREE.TextureLoader();
      const [asphalt, flame, sunsetMap] = await Promise.all([
        loadTexture(loader, "/cinematic/asphalt-night.jpg"),
        loadTexture(loader, "/cinematic/flame-sprite.jpg"),
        loadTexture(loader, "/cinematic/sunset-highway-car.jpg?v=door1")
      ]);

      this.rideRoot = new THREE.Group();
      this.rideRoot.visible = false;
      this.highway = createHighway(asphalt, flame);
      this.rideRoot.add(this.highway);
      this.city = createBuildings();
      this.rideRoot.add(this.city);
      this.car = createSedan();
      this.car.position.set(0, 0, 0);
      this.rideRoot.add(this.car);

      const interior = new THREE.Group();
      interior.visible = false;
      const dark = new THREE.MeshStandardMaterial({ color: 0x0a0c12, roughness: 0.8 });
      const floor = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 1.7), dark);
      floor.position.set(-0.7, 0.62, 0);
      const roof = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.06, 1.7), dark);
      roof.position.set(-0.5, 1.62, 0);
      const lPillar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.1, 0.12), dark);
      lPillar.position.set(-0.1, 1.15, 0.72);
      const rPillar = lPillar.clone();
      rPillar.position.z = -0.72;
      interior.add(floor, roof, lPillar, rPillar);
      this.interior = interior;
      this.rideRoot.add(interior);
      this.scene.add(this.rideRoot);

      this.showRoot = new THREE.Group();
      if (sunsetMap) {
        const plate = new THREE.Mesh(
          new THREE.PlaneGeometry(16, 9),
          new THREE.MeshBasicMaterial({ map: sunsetMap, toneMapped: false })
        );
        this.backdrop = plate;
        this.showRoot.add(plate);
      }
      this.scene.add(this.showRoot);
      this.fitShowPlate();

      this.stars = createStarfield();
      this.stars.visible = false;
      this.scene.add(this.stars);
      this.aurora = createAurora();
      this.aurora.visible = false;
      this.scene.add(this.aurora);
      this.globeRoot = createGlobe();
      this.globeRoot.visible = false;
      this.scene.add(this.globeRoot);

      this.setWork(0);
      window.addEventListener("pointermove", this.onPointer);
      window.addEventListener("pointerdown", this.onClick);
      window.addEventListener("resize", this.onResize);
      this.running = true;
      this.loop();
    } catch {
      this.running = false;
    } finally {
      this.hooks.onReady?.();
    }
  }

  setPhase(phase) {
    this.phase = phase;
    const space = phase === "hub" || phase === "japan" || phase === "world" || phase === "about" || phase === "skills";
    if (this.stars) this.stars.visible = space;
    if (this.aurora) this.aurora.visible = space;
    if (this.globeRoot) {
      this.globeRoot.visible = space;
      const scale = phase === "hub" ? 1 : phase === "skills" ? 0.5 : 0.42;
      this.globeRoot.scale.setScalar(scale);
    }
    if (phase === "dive") {
      this._dive = 0;
      this._divedFired = false;
      if (this.camera) {
        this.camera.fov = 38;
        this.camera.updateProjectionMatrix();
      }
    }
    if (phase === "hub" || space) {
      if (this.showRoot) this.showRoot.visible = false;
      if (this.rideRoot) this.rideRoot.visible = false;
      if (this.interior) this.interior.visible = false;
      if (this.renderer) this.renderer.toneMappingExposure = 1.02;
      this.scene.fog = null;
      this.scene.background = new THREE.Color(0x010208);
      this.renderer?.setClearColor(0x010208, 1);
      if (this.camera) {
        this.camera.fov = phase === "hub" ? 42 : 38;
        this.camera.updateProjectionMatrix();
        this.camera.position.copy(this.camHub);
        this.camera.lookAt(this.camHubTarget);
      }
    }
    if (phase === "boarding") {
      this._boarding = 0;
      this._boardedFired = false;
    }
    if (phase === "ride") {
      this.doorTarget = 0;
      if (this.showRoot) this.showRoot.visible = false;
      if (this.rideRoot) this.rideRoot.visible = true;
      if (this.interior) this.interior.visible = true;
      this.car?.userData?.setDoors?.(0);
      if (this.renderer) this.renderer.toneMappingExposure = 0.92;
      this.scene.fog = new THREE.Fog(0x1a2744, 18, 90);
      this.scene.background = new THREE.Color(0x1a2744);
    }
    if (phase === "showroom") {
      this.doorTarget = 1;
      if (this.showRoot) this.showRoot.visible = true;
      if (this.rideRoot) this.rideRoot.visible = false;
      if (this.interior) this.interior.visible = false;
      if (this.stars) this.stars.visible = false;
      if (this.aurora) this.aurora.visible = false;
      if (this.globeRoot) this.globeRoot.visible = false;
      if (this.renderer) this.renderer.toneMappingExposure = 1.18;
      this.scene.fog = null;
      this.scene.background = new THREE.Color(0x05070c);
      if (this.backdrop?.material) this.backdrop.material.opacity = 1;
      if (this.camera) {
        this.camera.fov = 38;
        this.camera.updateProjectionMatrix();
        this.camera.position.copy(this.camShow);
        this.camera.lookAt(this.camShowTarget);
      }
      this.fitShowPlate();
    }
  }

  setWork(index) {
    this.workIndex = index;
    const work = journey[index];
    if (!work || !this.car || !this.scene) return;
    const tex = this.workTextures[work.id];
    const screen = this.car.userData.screen;
    if (tex && screen) {
      screen.material.map = tex;
      screen.material.color.set(0xffffff);
      screen.material.emissiveIntensity = 0.15;
      screen.material.needsUpdate = true;
    }
    if (this.phase === "ride" || this.phase === "boarding") {
      const tint = CITY_TINT[work.city] || 0x1a2744;
      this.scene.fog?.color.setHex(tint);
      this.scene.background?.setHex(tint);
    }
    if (this.city) layoutCity(this.city.userData.slots, journey, -this.distance, this.workTextures);
  }

  setPaused(v) {
    this.paused = v;
  }

  onPointer(event) {
    if (!this.camera) return;
    this.look.tx = (event.clientX / window.innerWidth) * 2 - 1;
    this.look.ty = (event.clientY / window.innerHeight) * 2 - 1;
    this.pointer.x = this.look.tx;
    this.pointer.y = -this.look.ty;
    if (this.phase === "ride" && this.car?.userData?.screen) {
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const hits = this.raycaster.intersectObject(this.car.userData.screen, false);
      this.canvas.style.cursor = hits.length ? "pointer" : "default";
    } else {
      this.canvas.style.cursor = "default";
    }
  }

  onClick() {
    if (!this.camera) return;
    if (this.phase === "ride" && this.car?.userData?.screen) {
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const hits = this.raycaster.intersectObject(this.car.userData.screen, false);
      if (hits.length) this.hooks.onPickWork?.();
    }
  }

  fitShowPlate() {
    if (!this.camera || !this.backdrop) return;
    const dist = Math.abs(this.camShow.z);
    const vFov = (this.camera.fov * Math.PI) / 180;
    const viewH = 2 * Math.tan(vFov / 2) * dist;
    const viewW = viewH * this.camera.aspect;
    const imgA = 16 / 9;
    let w;
    let h;
    if (this.camera.aspect > imgA) {
      w = viewW;
      h = w / imgA;
    } else {
      h = viewH;
      w = h * imgA;
    }
    this.backdrop.scale.set(w / 16, h / 9, 1);
  }

  onResize() {
    if (!this.camera || !this.renderer) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    this.fitShowPlate();
  }

  loop = () => {
    if (!this.running) return;
    this._raf = requestAnimationFrame(this.loop);
    if (!this.renderer || !this.scene || !this.camera) return;
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.elapsedTime;
    this.look.x += (this.look.tx - this.look.x) * 0.06;
    this.look.y += (this.look.ty - this.look.y) * 0.06;
    if (this.car?.userData?.setDoors) {
      this.doorAmount += (this.doorTarget - this.doorAmount) * Math.min(1, dt * 1.8);
      this.car.userData.setDoors(this.doorAmount);
    }

    this.highway?.userData.flames?.forEach((spr, i) => {
      const s = 0.85 + Math.sin(t * 9 + i) * 0.18;
      spr.scale.y = spr.userData.base * s;
      spr.material.opacity = 0.55 + Math.sin(t * 7 + i * 0.4) * 0.25;
    });

    if (this.globeRoot?.visible) {
      this.globeRoot.rotation.y += dt * 0.18;
      updateGlobe(this.globeRoot, t);
      if (this.stars) {
        this.stars.rotation.y += dt * 0.008;
        updateStars(this.stars, t);
      }
      if (this.aurora?.visible) updateAurora(this.aurora, t);
      this._pinTick += dt;
      if (this._pinTick > 0.05) {
        this._pinTick = 0;
        this.publishPins();
      }
    }

    if (this.phase === "showroom") {
      const cam = this.camShow.clone();
      cam.x += this.look.x * 0.12;
      cam.y += -this.look.y * 0.06;
      this.camera.position.lerp(cam, 0.08);
      const look = this.camShowTarget.clone();
      look.x += this.look.x * 0.08;
      look.y += -this.look.y * 0.04;
      this.camera.lookAt(look);
    } else if (this.phase === "dive") {
      this._dive = Math.min(1, this._dive + dt * 0.38);
      const k = this._dive * this._dive * (3 - 2 * this._dive);
      this.camera.position.z = this.camShow.z * (1 - k * 0.78);
      this.camera.fov = 38 + k * 22;
      this.camera.updateProjectionMatrix();
      this.camera.lookAt(this.camShowTarget);
      if (this.renderer) this.renderer.toneMappingExposure = 1.18 * (1 - k * 0.92);
      this.hooks.onDiveProgress?.(k);
      if (this._dive >= 1 && !this._divedFired) {
        this._divedFired = true;
        this.hooks.onDived?.();
      }
    } else if (this.phase === "hub" || this.phase === "japan" || this.phase === "world" || this.phase === "about" || this.phase === "skills") {
      const cam = this.camHub.clone();
      cam.x += this.look.x * 0.35;
      cam.y += -this.look.y * 0.18;
      this.camera.position.lerp(cam, 0.08);
      this.camera.lookAt(this.camHubTarget);
    } else if (this.phase === "boarding") {
      this._boarding = Math.min(1, this._boarding + dt * 0.32);
      const k = this._boarding * this._boarding * (3 - 2 * this._boarding);
      if (this.backdrop?.material) this.backdrop.material.opacity = Math.max(0, 1 - k * 1.35);
      if (k > 0.38) {
        if (this.showRoot) this.showRoot.visible = false;
        if (this.rideRoot) this.rideRoot.visible = true;
        const u = Math.min(1, (k - 0.38) / 0.62);
        this.camera.position.lerpVectors(this.camBoard, this.camRide, u);
        const look = new THREE.Vector3().lerpVectors(this.camBoardTarget, this.camRideTarget, u);
        this.camera.lookAt(look);
        this.doorTarget = u > 0.55 ? 0 : 1;
        if (u > 0.4 && this.interior) this.interior.visible = true;
      } else {
        this.camera.position.z = this.camShow.z - k * 0.8;
      }
      if (this._boarding >= 1 && !this._boardedFired) {
        this._boardedFired = true;
        this.hooks.onBoarded?.();
      }
    } else if (this.phase === "ride") {
      if (!this.paused && this.car) {
        this.distance += this.speed * dt;
        this.car.userData.spinWheels(dt, this.speed);
        if (this.highway) this.highway.position.z = this.distance % 16;
        if (this.city) layoutCity(this.city.userData.slots, journey, -this.distance, this.workTextures);
      }
      const cam = this.camRide.clone();
      cam.z += this.look.x * 0.18;
      cam.y += -this.look.y * 0.08;
      cam.x += Math.sin(t * 9) * 0.01;
      this.camera.position.lerp(cam, 0.2);
      const look = this.camRideTarget.clone();
      look.z += this.look.x * 0.22;
      look.y += -this.look.y * 0.12;
      this.camera.lookAt(look);
    }

    this.renderer.render(this.scene, this.camera);
  };

  publishPins() {
    if (!this.globeRoot?.userData?.capitals || !this.camera) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const pins = this.globeRoot.userData.capitals.map(({ capital, mesh }) => {
      const v = this._pinScratch;
      mesh.getWorldPosition(v);
      this._pinNormal.copy(v).sub(this.globeRoot.position).normalize();
      this._pinCam.copy(this.camera.position).sub(v).normalize();
      const facing = this._pinNormal.dot(this._pinCam);
      v.project(this.camera);
      return {
        id: capital.id,
        flag: capital.flag,
        name: capital.name,
        x: (v.x * 0.5 + 0.5) * w,
        y: (-v.y * 0.5 + 0.5) * h,
        visible: v.z < 1 && facing > 0.16
      };
    });
    this.hooks.onGlobePins?.(pins);
  }

  dispose() {
    this.running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    window.removeEventListener("pointermove", this.onPointer);
    window.removeEventListener("pointerdown", this.onClick);
    window.removeEventListener("resize", this.onResize);
    this.renderer?.dispose();
  }
}

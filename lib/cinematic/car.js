import * as THREE from "three";

function mat(opts) {
  return new THREE.MeshStandardMaterial(opts);
}

export function createSedan() {
  const car = new THREE.Group();
  car.name = "sedan";

  const paint = mat({
    color: 0x163a72,
    metalness: 0.82,
    roughness: 0.24
  });
  const paintAccent = mat({
    color: 0x1c120c,
    metalness: 0.8,
    roughness: 0.3
  });
  const chrome = mat({ color: 0xd9dde8, metalness: 1, roughness: 0.12 });
  const glass = mat({
    color: 0x9ec7ff,
    metalness: 0.85,
    roughness: 0.05,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide
  });
  const darkGlass = mat({
    color: 0x07090e,
    metalness: 0.7,
    roughness: 0.08,
    transparent: true,
    opacity: 0.72
  });
  const fire = mat({
    color: 0xff6a18,
    emissive: 0xff4a00,
    emissiveIntensity: 2.6,
    metalness: 0.35,
    roughness: 0.28
  });
  const cabin = mat({ color: 0x0c0e14, roughness: 0.85, metalness: 0.1 });
  const leather = mat({ color: 0x1a2748, roughness: 0.55, metalness: 0.08 });
  const rubber = mat({ color: 0x111114, roughness: 0.9, metalness: 0.05 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(4.7, 0.52, 1.92), paint);
  body.position.set(0, 0.58, 0);
  body.castShadow = true;
  car.add(body);

  const cabinBox = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.72, 1.78), paint);
  cabinBox.position.set(-0.18, 1.12, 0);
  car.add(cabinBox);

  const hood = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.16, 1.78), paint);
  hood.position.set(1.62, 0.86, 0);
  hood.rotation.z = -0.08;
  car.add(hood);

  const trunk = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.2, 1.78), paintAccent);
  trunk.position.set(-2.0, 0.86, 0);
  car.add(trunk);

  const roof = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 1.62), paint);
  roof.position.set(-0.22, 1.52, 0);
  car.add(roof);

  const windshield = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.62), glass);
  windshield.position.set(0.95, 1.28, 0);
  windshield.rotation.y = Math.PI / 2;
  windshield.rotation.z = -0.52;
  car.add(windshield);

  const rearGlass = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 0.5), darkGlass);
  rearGlass.position.set(-1.42, 1.26, 0);
  rearGlass.rotation.y = -Math.PI / 2;
  rearGlass.rotation.z = 0.4;
  car.add(rearGlass);

  const stripGeo = new THREE.BoxGeometry(4.55, 0.035, 0.045);
  [-0.9, 0.9].forEach((z) => {
    const strip = new THREE.Mesh(stripGeo, fire);
    strip.position.set(0, 0.42, z);
    car.add(strip);
  });
  const under = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.04, 1.5), fire);
  under.position.set(0, 0.18, 0);
  car.add(under);

  const lightGeo = new THREE.BoxGeometry(0.12, 0.12, 0.55);
  const head = mat({ color: 0xfff4d2, emissive: 0xffe9b0, emissiveIntensity: 3.2 });
  const tail = mat({ color: 0xff2a22, emissive: 0xff1a12, emissiveIntensity: 2.8 });
  const hl = new THREE.Mesh(lightGeo, head);
  hl.position.set(2.36, 0.58, 0);
  car.add(hl);
  const tl = new THREE.Mesh(lightGeo, tail);
  tl.position.set(-2.36, 0.58, 0);
  car.add(tl);

  function wheel(x, z) {
    const g = new THREE.Group();
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.24, 22), rubber);
    tire.rotation.z = Math.PI / 2;
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.26, 18), chrome);
    rim.rotation.z = Math.PI / 2;
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.28, 12), fire);
    hub.rotation.z = Math.PI / 2;
    g.add(tire, rim, hub);
    g.position.set(x, 0.38, z);
    g.userData.spin = true;
    car.add(g);
    return g;
  }
  const wheels = [wheel(1.45, 0.92), wheel(1.45, -0.92), wheel(-1.45, 0.92), wheel(-1.45, -0.92)];

  function door(side, x) {
    const g = new THREE.Group();
    const panel = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.72, 0.08), paint);
    panel.position.set(0.56, 0, 0);
    const win = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.32), glass);
    win.position.set(0.58, 0.22, side * 0.05);
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.03, 0.04), chrome);
    handle.position.set(0.86, 0.02, side * 0.06);
    const edge = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.02, 0.03), fire);
    edge.position.set(0.56, -0.3, side * 0.05);
    g.add(panel, win, handle, edge);
    g.position.set(x, 0.78, side * 0.96);
    g.userData.side = side;
    g.userData.closed = 0;
    g.userData.open = side > 0 ? -1.05 : 1.05;
    g.rotation.y = 0;
    car.add(g);
    return g;
  }
  const doors = {
    fl: door(-1, 0.55),
    fr: door(1, 0.55),
    rl: door(-1, -0.62),
    rr: door(1, -0.62)
  };
  doors.rl.rotation.y = doors.rl.userData.open;
  doors.rr.rotation.y = doors.rr.userData.open;

  const seatGeo = new THREE.BoxGeometry(0.52, 0.18, 0.52);
  const backGeo = new THREE.BoxGeometry(0.52, 0.55, 0.1);
  function seat(x, z) {
    const s = new THREE.Group();
    const base = new THREE.Mesh(seatGeo, leather);
    const back = new THREE.Mesh(backGeo, leather);
    back.position.set(0, 0.32, -0.22);
    s.add(base, back);
    s.position.set(x, 0.78, z);
    car.add(s);
    return s;
  }
  seat(0.38, 0.38);
  seat(0.38, -0.38);
  const rearLeft = seat(-0.85, 0.38);
  seat(-0.85, -0.38);
  rearLeft.visible = false;

  const dash = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.22, 1.5), cabin);
  dash.position.set(0.95, 0.92, 0);
  car.add(dash);

  const ipad = new THREE.Group();
  const bezel = new THREE.Mesh(
    new THREE.BoxGeometry(0.58, 0.4, 0.028),
    mat({ color: 0x121317, metalness: 0.45, roughness: 0.32 })
  );
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 0.33),
    mat({ color: 0x111827, emissive: 0x1a2744, emissiveIntensity: 0.7, roughness: 0.28 })
  );
  screen.position.z = 0.016;
  screen.name = "seatScreen";
  ipad.add(bezel, screen);
  ipad.position.set(-0.18, 1.14, 0);
  ipad.rotation.y = Math.PI;
  car.add(ipad);

  const laptop = new THREE.Group();
  const deck = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.018, 0.24),
    mat({ color: 0x1c1f27, metalness: 0.55, roughness: 0.28 })
  );
  const lid = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.22, 0.012),
    mat({ color: 0x1c1f27, metalness: 0.5, roughness: 0.28 })
  );
  lid.position.set(0, 0.11, -0.11);
  lid.rotation.x = -0.42;
  const lpScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.33, 0.19),
    mat({ color: 0x0e1624, emissive: 0x2a6a88, emissiveIntensity: 0.55, roughness: 0.25 })
  );
  lpScreen.position.set(0, 0.11, -0.102);
  lpScreen.rotation.x = -0.42;
  laptop.add(deck, lid, lpScreen);
  laptop.position.set(-0.82, 0.9, 0.02);
  car.add(laptop);

  const glow = new THREE.PointLight(0xff6a22, 1.6, 12, 2);
  glow.position.set(0, 0.3, 0);
  car.add(glow);
  const cabinLight = new THREE.PointLight(0x9ec4ff, 0.55, 5, 2);
  cabinLight.position.set(0, 1.45, 0);
  car.add(cabinLight);

  car.userData = {
    doors,
    wheels,
    screen,
    glow,
    setDoors(amount) {
      const a = THREE.MathUtils.clamp(amount, 0, 1);
      doors.fl.rotation.y = doors.fl.userData.closed;
      doors.fr.rotation.y = doors.fr.userData.closed;
      [doors.rl, doors.rr].forEach((d) => {
        d.rotation.y = d.userData.closed * (1 - a) + d.userData.open * a;
      });
    },
    spinWheels(dt, speed) {
      wheels.forEach((w) => {
        w.rotation.x += dt * speed * 3.4;
      });
    }
  };

  car.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = false;
      n.receiveShadow = false;
    }
  });

  return car;
}

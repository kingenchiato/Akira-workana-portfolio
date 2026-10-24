import * as THREE from "three";

export function createHighway(asphaltMap, flameMap) {
  const root = new THREE.Group();
  root.name = "highway";

  if (asphaltMap) {
    asphaltMap.wrapS = asphaltMap.wrapT = THREE.RepeatWrapping;
    asphaltMap.repeat.set(2, 48);
    asphaltMap.anisotropy = 8;
  }

  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 420),
    new THREE.MeshStandardMaterial({
      map: asphaltMap || null,
      color: asphaltMap ? 0xffffff : 0x151820,
      roughness: 0.92,
      metalness: 0.04
    })
  );
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0, -80);
  road.receiveShadow = true;
  root.add(road);
  root.userData.road = road;

  const shoulder = new THREE.Mesh(
    new THREE.PlaneGeometry(46, 420),
    new THREE.MeshStandardMaterial({ color: 0x07080c, roughness: 1 })
  );
  shoulder.rotation.x = -Math.PI / 2;
  shoulder.position.set(0, -0.02, -80);
  root.add(shoulder);

  const dashMat = new THREE.MeshBasicMaterial({ color: 0xf2f0e4 });
  for (let i = 0; i < 50; i += 1) {
    const dash = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 3.2), dashMat);
    dash.position.set(0, 0.03, 40 - i * 8);
    root.add(dash);
  }

  const fireGroup = new THREE.Group();
  const spriteMat = flameMap
    ? new THREE.SpriteMaterial({
        map: flameMap,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xff9a4a
      })
    : null;
  for (let i = 0; i < 28; i += 1) {
    const z = 30 - i * 12;
    [-8.2, 8.2].forEach((x) => {
      if (spriteMat) {
        const spr = new THREE.Sprite(spriteMat.clone());
        spr.scale.set(1.1 + Math.random() * 0.7, 2.4 + Math.random() * 1.4, 1);
        spr.position.set(x, 0.9, z);
        spr.userData.base = spr.scale.y;
        fireGroup.add(spr);
      }
    });
  }
  root.add(fireGroup);
  root.userData.flames = fireGroup.children;

  const curbMat = new THREE.MeshStandardMaterial({
    color: 0x2a140c,
    emissive: 0xff4a12,
    emissiveIntensity: 0.35,
    roughness: 0.6
  });
  [-7.4, 7.4].forEach((x) => {
    const curb = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.22, 420), curbMat);
    curb.position.set(x, 0.1, -80);
    root.add(curb);
  });

  return root;
}

export function createBuildings() {
  const group = new THREE.Group();
  group.name = "city";
  const slots = [];
  const geo = new THREE.BoxGeometry(1, 1, 1);
  geo.translate(0, 0.5, 0);

  for (let i = 0; i < 18; i += 1) {
    const side = i % 2 === 0 ? -1 : 1;
    const mesh = new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({
        color: 0x1a2233,
        metalness: 0.45,
        roughness: 0.4
      })
    );
    mesh.position.set(side * (11 + (i % 3) * 1.4), 0, -20 - i * 14);
    mesh.scale.set(3.2 + (i % 4), 6 + (i % 7) * 2.2, 3.4);
    group.add(mesh);

    const facade = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ color: 0x0a0e16, toneMapped: false })
    );
    facade.position.copy(mesh.position);
    facade.position.x += side > 0 ? -1.62 : 1.62;
    facade.position.y = mesh.scale.y * 0.55;
    facade.scale.set(mesh.scale.z * 0.92, mesh.scale.y * 0.78, 1);
    facade.rotation.y = side > 0 ? Math.PI / 2 : -Math.PI / 2;
    group.add(facade);

    slots.push({ mesh, facade, side, seed: i });
  }
  group.userData.slots = slots;
  return group;
}

export function layoutCity(slots, works, cameraZ, textures) {
  if (!slots || !works || !textures) return;
  slots.forEach((slot, i) => {
    const z = cameraZ - 18 - ((i * 16 + cameraZ * 0.2) % (slots.length * 16));
    slot.mesh.position.z = z;
    slot.facade.position.z = z;
    const work = works[i % works.length];
    const tex = textures[work.id];
    if (tex && slot.facade.material.map !== tex) {
      slot.facade.material.map = tex;
      slot.facade.material.needsUpdate = true;
      slot.facade.material.color.set(0xffffff);
    }
    const h = 7 + (slot.seed % 6) * 2.4 + (work.region === "world" ? 3 : 0);
    slot.mesh.scale.y = h;
    slot.facade.position.y = h * 0.52;
    slot.facade.scale.y = h * 0.76;
  });
}

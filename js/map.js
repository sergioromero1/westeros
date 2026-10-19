(() => {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const MAP_W = GEO_DATA.W;
  const MAP_H = GEO_DATA.H;

  const svg = document.getElementById("map");
  const stage = document.getElementById("stage");
  const tooltip = document.getElementById("tooltip");

  // ---------- Utilidades ----------
  function el(tag, attrs = {}, parent) {
    const node = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
    if (parent) parent.appendChild(node);
    return node;
  }

  // Generador pseudoaleatorio con semilla para que el mapa sea siempre igual
  function rng(seed) {
    return () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Desplazamiento de punto medio: vuelve irregulares las líneas de costa
  function roughen(pts, { closed = true, iters = 4, rough = 0.35, seed = 1 } = {}) {
    const rand = rng(seed);
    let cur = pts.map((p) => p.slice());
    for (let i = 0; i < iters; i++) {
      const next = [];
      const n = closed ? cur.length : cur.length - 1;
      for (let j = 0; j < n; j++) {
        const a = cur[j];
        const b = cur[(j + 1) % cur.length];
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const off = (rand() - 0.5) * rough;
        next.push(a, [a[0] + dx / 2 - dy * off, a[1] + dy / 2 + dx * off]);
      }
      if (!closed) next.push(cur[cur.length - 1]);
      cur = next;
    }
    return cur;
  }

  const toPath = (pts, closed = true) =>
    "M" + pts.map((p) => p[0].toFixed(1) + " " + p[1].toFixed(1)).join("L") + (closed ? "Z" : "");

  // Curva suave (Catmull-Rom) para ríos y fronteras
  function smoothPath(pts) {
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  }

  // ---------- Construcción del mapa ----------
  const layers = {};
  ["sea", "land", "terrain", "water", "borders", "labels", "markers"].forEach((n) => {
    layers[n] = el("g", { class: "layer-" + n }, svg);
  });
  const defs = svg.querySelector("defs");

  function gradient(id, stops, y1, y2) {
    const g = el("linearGradient", { id, gradientUnits: "userSpaceOnUse", x1: 0, x2: 0, y1, y2 }, defs);
    stops.forEach(([o, c]) => el("stop", { offset: o, "stop-color": c }, g));
    return `url(#${id})`;
  }

  // Mar
  el("rect", { x: -2000, y: -2000, width: MAP_W + 4000, height: MAP_H + 4000, fill: "url(#seaPattern)" }, layers.sea);

  // Tierra: un polígono por región (la costa y las fronteras vienen de geo-data.js)
  const landPolys = GEO_DATA.land.map((l) => l.pts);
  const essosD = GEO_DATA.essos.map((p) => toPath(p)).join(" ");
  const landD = landPolys.map((p) => toPath(p)).join(" ");
  const wallY = Math.max(...GEO_DATA.wall.map((p) => p[1]));

  // Hielo marino en los mares del norte (debajo de los anillos de costa)
  (function seaIce() {
    const rand = rng(77);
    const g = el("g", { class: "sea-ice" }, layers.sea);
    for (let i = 0; i < 140; i++) {
      const cx = rand() * MAP_W;
      const cy = Math.pow(rand(), 1.6) * wallY * 1.05;
      const r = 3 + rand() * 9 * (1 - cy / (wallY * 1.1));
      const n = 6;
      const pts = [];
      for (let k = 0; k < n; k++) {
        const a = (k / n) * Math.PI * 2 + rand() * 0.6;
        const rr = r * (0.6 + rand() * 0.5);
        pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.75]);
      }
      el("path", { d: toPath(pts) }, g);
    }
  })();

  el("path", { d: landD + essosD, class: "coast-glow" }, layers.land);
  el("path", { d: landD + essosD, class: "coast-glow2" }, layers.land);
  el("path", { d: essosD, class: "land essos" }, layers.land);

  // Biomas: cada región con su color (solo Dorne es desierto)
  const BIOME = {
    beyond: gradient("g-beyond", [[0, "#f8fbfc"], [0.45, "#eef3f4"], [0.8, "#d9e0d6"], [1, "#c7cfb6"]], 0, wallY),
    north: gradient("g-north", [[0, "#d3d8c4"], [0.5, "#c3c9a5"], [1, "#b9c294"]], wallY, wallY + 560),
    iron: "#b9b5a6",
    west: "#d3c690",
    river: "#c3cf92",
    vale: "#c2caa0",
    crown: "#cbcf96",
    reach: "#b8cd85",
    storm: "#afbf8c",
    dorne: gradient("g-dorne", [[0, "#d9c690"], [0.35, "#e6c98a"], [1, "#ecc77f"]], 1380, 1620),
  };
  Object.keys(BIOME).forEach((region) => {
    const d = GEO_DATA.land.filter((l) => l.region === region).map((l) => toPath(l.pts)).join(" ");
    el("path", { d, style: `fill:${BIOME[region]}`, class: "land biome" }, layers.land);
  });
  el("path", { d: landD + essosD, class: "land-texture" }, layers.land);

  // Grietas en el hielo de las Tierras del Eterno Invierno
  (function iceCracks() {
    const rand = rng(91);
    const g = el("g", { class: "ice-cracks" }, layers.land);
    for (let i = 0; i < 40; i++) {
      let x = 120 + rand() * 700;
      let y = rand() * wallY * 0.45;
      const pts = [[x, y]];
      for (let k = 0; k < 4; k++) {
        x += (rand() - 0.5) * 30;
        y += (rand() - 0.3) * 14;
        pts.push([x, y]);
      }
      el("path", { d: toPath(pts, false) }, g);
    }
  })();

  // Niebla de tierras inexploradas en el borde norte (el mapa corta el continente en y = 0)
  el("rect", { x: -2000, y: -400, width: MAP_W + 4000, height: 480, fill: gradient("g-fog", [[0, "#f2f6f7"], [0.8, "#f2f6f7"], [1, "rgba(242,246,247,0)"]], -400, 80), class: "fog" }, layers.labels);

  // Línea de costa (solo los tramos que tocan el mar, no las fronteras internas)
  el("path", { d: GEO_DATA.coast.map((c) => toPath(c, false)).join(" "), class: "coastline" }, layers.land);
  el("path", { d: essosD, class: "coastline essos-coast" }, layers.land);
  (function paperTexture() {
    const size = 256;
    const cv = document.createElement("canvas");
    cv.width = cv.height = size;
    const ctx = cv.getContext("2d");
    const img = ctx.createImageData(size, size);
    const rand = rng(42);
    // Ruido suavizado en dos escalas para imitar papel viejo
    const coarse = Array.from({ length: 17 * 17 }, () => rand());
    const at = (x, y) => coarse[(y % 16) * 17 + (x % 16)];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const gx = x / 16, gy = y / 16;
        const x0 = Math.floor(gx), y0 = Math.floor(gy);
        const fx = gx - x0, fy = gy - y0;
        const v = at(x0, y0) * (1 - fx) * (1 - fy) + at(x0 + 1, y0) * fx * (1 - fy) + at(x0, y0 + 1) * (1 - fx) * fy + at(x0 + 1, y0 + 1) * fx * fy;
        const a = Math.max(0, v * 0.7 + rand() * 0.3 - 0.35) * 255;
        const i = (y * size + x) * 4;
        img.data[i] = 90; img.data[i + 1] = 64; img.data[i + 2] = 30; img.data[i + 3] = a;
      }
    }
    ctx.putImageData(img, 0, 0);
    const pat = el("pattern", { id: "paperPattern", width: 128, height: 128, patternUnits: "userSpaceOnUse" }, defs);
    el("image", { href: cv.toDataURL(), width: 128, height: 128 }, pat);
  })();

  // ¿Está un punto sobre tierra firme? Se pinta una máscara de la tierra (sin lagos) una sola vez
  // en un canvas y luego cada consulta es una lectura de píxel.
  const onDryLand = (() => {
    const k = 0.5; // resolución: 2 unidades del mapa por píxel
    const w = Math.ceil(MAP_W * k);
    const h = Math.ceil(MAP_H * k);
    const cv = document.createElement("canvas");
    cv.width = w;
    cv.height = h;
    const ctx = cv.getContext("2d");
    ctx.scale(k, k);
    ctx.fill(new Path2D(landD));
    ctx.globalCompositeOperation = "destination-out";
    ctx.fill(new Path2D(GEO_DATA.lakes.map((l) => toPath(l.pts)).join(" ")));
    const alpha = ctx.getImageData(0, 0, w, h).data;
    return (p) => {
      const x = Math.floor(p[0] * k);
      const y = Math.floor(p[1] * k);
      return x >= 0 && y >= 0 && x < w && y < h && alpha[(y * w + x) * 4 + 3] > 128;
    };
  })();

  // Bosques y montañas (generados con semilla, solo sobre tierra)
  function scatter(area, seed, minDist) {
    const rand = rng(seed);
    const [x, y, w, h] = area.rect;
    const out = [];
    let tries = 0;
    while (out.length < area.n && tries < area.n * 30) {
      tries++;
      const p = [x + rand() * w, y + rand() * h];
      if (!onDryLand(p)) continue;
      if (out.some((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) < minDist)) continue;
      out.push(p);
    }
    return out.sort((a, b) => a[1] - b[1]);
  }

  GEO.forests.forEach((f, i) => {
    scatter(f, 300 + i, 9).forEach(([x, y]) => {
      const g = el("g", { class: "tree", transform: `translate(${x.toFixed(1)} ${y.toFixed(1)})` }, layers.terrain);
      el("line", { x1: 0, y1: 2, x2: 0, y2: 6 }, g);
      el("circle", { cx: 0, cy: 0, r: 4.2 }, g);
    });
  });

  GEO.mountains.forEach((m, i) => {
    const rand = rng(500 + i);
    scatter(m, 400 + i, 13).forEach(([x, y]) => {
      const s = 0.8 + rand() * 0.6;
      const g = el("g", { class: "mountain", transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})` }, layers.terrain);
      el("path", { d: "M-9 6 L0 -9 L9 6 Z", class: "m-body" }, g);
      el("path", { d: "M0 -9 L9 6 L2 6 L1 -2 Z", class: "m-shade" }, g);
      el("path", { d: "M-3.5 -3.5 L0 -9 L3.5 -3.5 L1 -4.5 L0 -3 L-1.5 -4.5 Z", class: "m-snow" }, g);
    });
  });

  // Ríos: cada uno se dibuja en tramos cada vez más anchos hacia la desembocadura
  const RIVER_NAMES = {
    milkwater: "Milkwater", "white-knife": "White Knife", "green-fork": "Green Fork", "blue-fork": "Blue Fork",
    "red-fork": "Red Fork", "blackwater-rush": "Blackwater Rush", "mander-main": "Mander", greenblood: "Greenblood",
    "last-river": "Last River", "weeping-water": "Weeping Water", tumblestone: "Tumblestone", wendwater: "Wendwater",
    torentine: "Torrentine", honeywine: "Honeywine", scourge: "Scourge", vaith: "Vaith", brimstone: "Brimstone",
    slayne: "Slayne", "broken-branch": "Broken Branch", "antler-river": "Antler", "ice-river": "Ice River",
    "fever-river": "Fever River", cockleswhent: "Cockleswhent", blueburn: "Blueburn", wyl: "Wyl",
  };
  const riverGroup = el("g", { class: "rivers" }, layers.water);
  const riverLabels = el("g", { class: "river-labels" }, layers.labels);
  const labelled = new Set();
  GEO_DATA.rivers.forEach((r, i) => {
    const pts = r.pts;
    const full = r.major ? 2.4 : 1.4;
    const parts = 3;
    const n = pts.length - 1;
    for (let k = 0; k < parts; k++) {
      const seg = pts.slice(Math.floor((k * n) / parts), Math.floor(((k + 1) * n) / parts) + 1);
      if (seg.length < 2) continue;
      el("path", { d: toPath(seg, false), class: "river", "stroke-width": (full * (0.45 + (0.55 * (k + 1)) / parts)).toFixed(2) }, riverGroup);
    }
    const name = RIVER_NAMES[r.id];
    if (name && !labelled.has(name) && pts.length > 6) {
      labelled.add(name);
      // El texto se lee de izquierda a derecha
      const lp = pts[0][0] <= pts[pts.length - 1][0] ? pts : pts.slice().reverse();
      const id = "river-path-" + i;
      el("path", { id, d: toPath(lp, false) }, defs);
      const t = el("text", { class: "river-label", dy: -2.5 }, riverLabels);
      const tp = el("textPath", { href: "#" + id, startOffset: "50%", "text-anchor": "middle" }, t);
      tp.textContent = name;
    }
  });

  // Lagos (formas reales)
  GEO_DATA.lakes.forEach((l) => el("path", { d: toPath(l.pts), class: "lake" }, layers.water));

  // Fronteras entre regiones y el Muro
  GEO_DATA.borders.forEach((b) => el("path", { d: toPath(b, false), class: "border" }, layers.borders));
  const wallD = toPath(GEO_DATA.wall, false);
  el("path", { d: wallD, class: "wall-shadow" }, layers.borders);
  el("path", { d: wallD, class: "wall" }, layers.borders);

  // Rótulos de regiones y mares
  GEO.regionLabels.forEach((r) => {
    const t = el("text", { x: r.x, y: r.y, class: "region-label", "font-size": r.size, "data-region": r.region }, layers.labels);
    t.textContent = REGIONS[r.region].en.toUpperCase();
  });
  GEO.seaLabels.forEach((s) => {
    const attrs = { x: s.x, y: s.y, class: "sea-label", "font-size": s.size };
    if (s.rotate) attrs.transform = `rotate(${s.rotate} ${s.x} ${s.y})`;
    el("text", attrs, layers.labels).textContent = s.name;
  });
  GEO.landLabels.forEach((s) => {
    const attrs = { x: s.x, y: s.y, class: "land-label", "font-size": s.size };
    if (s.rotate) attrs.transform = `rotate(${s.rotate} ${s.x} ${s.y})`;
    el("text", attrs, layers.labels).textContent = s.name;
  });
  const wallMid = GEO_DATA.wall[Math.floor(GEO_DATA.wall.length / 2)];
  const wallLabel = el("text", { x: wallMid[0], y: wallMid[1] - 8, class: "wall-label", "font-size": 9 }, layers.labels);
  wallLabel.textContent = "THE WALL";

  // ---------- Marcadores de castillos ----------
  const TYPE_LABEL = {
    capital: "Sede de una gran casa",
    castle: "Castillo",
    city: "Ciudad",
    ruin: "Ruinas / lugar histórico",
    watch: "Castillo de la Guardia de la Noche",
  };

  // Un clipPath por tamaño de escudo para recortar cada blasón del sprite
  const clips = {};
  function shieldClip(w, h) {
    const id = "clip-" + Math.round(w * 10);
    if (!clips[id]) {
      const cp = el("clipPath", { id }, defs);
      el("rect", { x: -w / 2, y: -h / 2, width: w, height: h }, cp);
      clips[id] = true;
    }
    return id;
  }

  const markers = CASTLES.map((c, idx) => {
    const house = HOUSES[c.house];
    const g = el("g", { class: `marker type-${c.type}`, "data-idx": idx, tabindex: 0, role: "button", "aria-label": c.en }, layers.markers);
    const inner = el("g", { class: "marker-inner" }, g);
    const r = c.type === "capital" ? 13 : 9.5;
    if (house.sprite !== undefined) {
      // Escudo real recortado del sprite
      const w = r * 2.1;
      const hh = w * (SIGIL_SPRITE.cellH / SIGIL_SPRITE.cellW);
      const col = house.sprite % SIGIL_SPRITE.cols;
      const row = Math.floor(house.sprite / SIGIL_SPRITE.cols);
      const box = el("g", { class: "pin shield-pin", "clip-path": `url(#${shieldClip(w, hh)})` }, inner);
      el("image", { href: SIGIL_SPRITE.url, x: -w / 2 - col * w, y: -hh / 2 - row * hh, width: SIGIL_SPRITE.cols * w, height: SIGIL_SPRITE.rows * hh, preserveAspectRatio: "none" }, box);
      const label = el("text", { class: "marker-label", x: w / 2 + 4, y: 4 }, inner);
      label.textContent = c.en;
      return { c, g, inner, label };
    }
    if (c.type === "city") {
      el("rect", { x: -r, y: -r, width: r * 2, height: r * 2, rx: 3, fill: house.colors[0], stroke: house.colors[1], class: "pin" }, inner);
    } else if (c.type === "watch") {
      el("rect", { x: -r * 0.85, y: -r * 0.85, width: r * 1.7, height: r * 1.7, transform: "rotate(45)", fill: house.colors[0], stroke: "#d8d8d8", class: "pin" }, inner);
    } else {
      el("circle", { r, fill: house.colors[0], stroke: house.colors[1], class: "pin" }, inner);
    }
    const sig = el("text", { class: "sigil", "font-size": c.type === "capital" ? 14 : 10, y: 0.5 }, inner);
    sig.textContent = house.sigil;
    const label = el("text", { class: "marker-label", x: r + 5, y: 4 }, inner);
    label.textContent = c.en;
    return { c, g, inner, label };
  });

  // ---------- Pan y zoom (sobre el viewBox) ----------
  const view = { x: 0, y: 0, w: MAP_W, h: MAP_H };
  let fitW = MAP_W;

  function stageSize() {
    const r = stage.getBoundingClientRect();
    return { w: r.width || 1, h: r.height || 1 };
  }

  function fit() {
    const s = stageSize();
    const pad = 1.04;
    const scale = Math.max((MAP_W * pad) / s.w, (MAP_H * pad) / s.h);
    view.w = s.w * scale;
    view.h = s.h * scale;
    view.x = MAP_W / 2 - view.w / 2;
    view.y = MAP_H / 2 - view.h / 2;
    fitW = view.w;
    apply();
  }

  function clampView() {
    const minW = fitW / 14;
    const maxW = fitW * 1.15;
    const s = stageSize();
    if (view.w < minW || view.w > maxW) {
      const nw = Math.min(maxW, Math.max(minW, view.w));
      const cx = view.x + view.w / 2;
      const cy = view.y + view.h / 2;
      view.w = nw;
      view.h = nw * (s.h / s.w);
      view.x = cx - view.w / 2;
      view.y = cy - view.h / 2;
    }
    const mx = view.w * 0.5;
    const my = view.h * 0.5;
    view.x = Math.min(MAP_W - mx, Math.max(-view.w + mx, view.x));
    view.y = Math.min(MAP_H - my, Math.max(-view.h + my, view.y));
  }

  let showAllLabels = false;

  // Durante un gesto el mapa no se redibuja: se mueve la capa ya pintada con un transform (GPU)
  // y al terminar se fija el viewBox real. El SVG mide el doble del escenario (ver CSS),
  // así al arrastrar se ve mapa ya dibujado en los bordes.
  const committed = { ...view };
  let frame = 0;
  let pending = false; // hay cambios de vista sin fijar en el viewBox

  function preview() {
    clampView();
    pending = true;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const s = stageSize();
      const k = committed.w / view.w;
      const tx = ((committed.x - view.x) / view.w) * s.w;
      const ty = ((committed.y - view.y) / view.h) * s.h;
      svg.style.transformOrigin = `${s.w / 2}px ${s.h / 2}px`;
      svg.style.transform = `translate(${tx}px, ${ty}px) scale(${k})`;
    });
  }

  let commitTimer = 0;
  function commitSoon(delay = 140) {
    clearTimeout(commitTimer);
    commitTimer = setTimeout(apply, delay);
  }

  function apply() {
    clampView();
    clearTimeout(commitTimer);
    cancelAnimationFrame(frame);
    frame = 0;
    pending = false;
    Object.assign(committed, view);
    svg.style.transform = "";
    svg.setAttribute("viewBox", `${view.x - view.w / 2} ${view.y - view.h / 2} ${view.w * 2} ${view.h * 2}`);
    const unit = view.w / stageSize().w; // unidades del mapa por píxel de pantalla
    const zoom = fitW / view.w;
    svg.style.setProperty("--unit", unit);
    const s = unit * Math.min(1.15, 0.62 + zoom * 0.12);
    markers.forEach((m) => {
      m.g.setAttribute("transform", `translate(${m.c.x} ${m.c.y})`);
      m.inner.setAttribute("transform", `scale(${s.toFixed(4)})`);
      const visible = showAllLabels || zoom >= 2.2 || m.c.type === "capital" || (zoom >= 1.4 && m.c.type === "city");
      m.label.classList.toggle("hidden", !visible);
    });
    svg.classList.toggle("zoomed-in", zoom > 3);
    wallLabel.setAttribute("font-size", Math.min(9, 12 * unit).toFixed(2));
  }

  function clientToMap(cx, cy) {
    const r = stage.getBoundingClientRect();
    return [view.x + ((cx - r.left) / r.width) * view.w, view.y + ((cy - r.top) / r.height) * view.h];
  }

  function zoomAt(factor, cx, cy, live = false) {
    const [mx, my] = clientToMap(cx, cy);
    const s = stageSize();
    const nw = Math.min(fitW * 1.15, Math.max(fitW / 14, view.w / factor));
    const k = nw / view.w;
    view.x = mx - (mx - view.x) * k;
    view.y = my - (my - view.y) * k;
    view.w = nw;
    view.h = nw * (s.h / s.w);
    if (live) preview();
    else apply();
  }

  let anim = null;
  function flyTo(x, y, zoom, duration = 700, offsetY = 0) {
    cancelAnimationFrame(anim);
    const s = stageSize();
    const start = { ...view };
    const tw = fitW / zoom;
    const target = { w: tw, h: tw * (s.h / s.w) };
    target.x = x - target.w / 2;
    target.y = y - target.h / 2 + target.h * offsetY;
    const t0 = performance.now();
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const step = (now) => {
      const t = Math.min(1, (now - t0) / duration);
      const e = ease(t);
      for (const k of ["x", "y", "w", "h"]) view[k] = start[k] + (target[k] - start[k]) * e;
      if (t < 1) {
        preview();
        anim = requestAnimationFrame(step);
      } else {
        apply();
      }
    };
    anim = requestAnimationFrame(step);
  }

  stage.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      cancelAnimationFrame(anim);
      zoomAt(Math.exp(-e.deltaY * 0.0015), e.clientX, e.clientY, true);
      commitSoon();
    },
    { passive: false }
  );

  const pointers = new Map();
  let dragMoved = 0;
  let pinchDist = 0;

  stage.addEventListener("pointerdown", (e) => {
    if (anim) {
      cancelAnimationFrame(anim);
      anim = null;
      apply();
    }
    try {
      stage.setPointerCapture(e.pointerId);
    } catch (_) {
      /* puntero sin captura posible (p. ej. eventos sintéticos) */
    }
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragMoved = 0;
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
    }
    stage.classList.add("dragging");
  });

  stage.addEventListener("pointermove", (e) => {
    if (!pointers.has(e.pointerId)) {
      updateTooltip(e);
      return;
    }
    const prev = pointers.get(e.pointerId);
    const cur = { x: e.clientX, y: e.clientY };
    pointers.set(e.pointerId, cur);
    if (pointers.size === 1) {
      const r = stage.getBoundingClientRect();
      const dx = cur.x - prev.x;
      const dy = cur.y - prev.y;
      dragMoved += Math.abs(dx) + Math.abs(dy);
      view.x -= (dx / r.width) * view.w;
      view.y -= (dy / r.height) * view.h;
      preview();
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      dragMoved += 10;
      if (pinchDist) zoomAt(d / pinchDist, (a.x + b.x) / 2, (a.y + b.y) / 2, true);
      pinchDist = d;
    }
    hideTooltip();
  });

  function endPointer(e) {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinchDist = 0;
    if (pointers.size === 0) {
      stage.classList.remove("dragging");
      if (pending) apply();
    }
  }
  stage.addEventListener("pointerup", (e) => {
    const wasClick = pointers.size === 1 && dragMoved < 6;
    endPointer(e);
    if (wasClick) {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const m = target && target.closest(".marker");
      if (m) select(+m.dataset.idx, true);
    }
  });
  stage.addEventListener("pointercancel", endPointer);
  stage.addEventListener("dblclick", (e) => zoomAt(2, e.clientX, e.clientY));
  window.addEventListener("resize", () => {
    const cx = view.x + view.w / 2;
    const cy = view.y + view.h / 2;
    const zoom = fitW / view.w;
    fit();
    const s = stageSize();
    view.w = fitW / zoom;
    view.h = view.w * (s.h / s.w);
    view.x = cx - view.w / 2;
    view.y = cy - view.h / 2;
    apply();
  });

  document.getElementById("zoomIn").addEventListener("click", () => {
    const r = stage.getBoundingClientRect();
    zoomAt(1.6, r.left + r.width / 2, r.top + r.height / 2);
  });
  document.getElementById("zoomOut").addEventListener("click", () => {
    const r = stage.getBoundingClientRect();
    zoomAt(1 / 1.6, r.left + r.width / 2, r.top + r.height / 2);
  });
  document.getElementById("zoomReset").addEventListener("click", () => flyTo(MAP_W / 2, MAP_H / 2, 1));
  document.getElementById("toggleLabels").addEventListener("change", (e) => {
    showAllLabels = e.target.checked;
    apply();
  });

  // ---------- Tooltip ----------
  function updateTooltip(e) {
    const m = e.target.closest && e.target.closest(".marker");
    if (!m) return hideTooltip();
    const c = CASTLES[+m.dataset.idx];
    const h = HOUSES[c.house];
    tooltip.innerHTML = `<strong>${c.en}</strong><span>${h.name}</span>`;
    const r = stage.getBoundingClientRect();
    tooltip.style.left = e.clientX - r.left + 14 + "px";
    tooltip.style.top = e.clientY - r.top + 14 + "px";
    tooltip.hidden = false;
  }
  function hideTooltip() {
    tooltip.hidden = true;
  }
  stage.addEventListener("pointerleave", hideTooltip);

  // ---------- Panel de información ----------
  const info = document.getElementById("info");
  let selected = -1;

  function shield(h, size = 56) {
    const height = Math.round(size * (SIGIL_SPRITE.cellH / SIGIL_SPRITE.cellW));
    if (h.sprite !== undefined) {
      const col = h.sprite % SIGIL_SPRITE.cols;
      const row = Math.floor(h.sprite / SIGIL_SPRITE.cols);
      const style = [
        `width:${size}px`,
        `height:${height}px`,
        `background-image:url(${SIGIL_SPRITE.url})`,
        `background-size:${size * SIGIL_SPRITE.cols}px ${height * SIGIL_SPRITE.rows}px`,
        `background-position:${-col * size}px ${-row * height}px`,
      ].join(";");
      return `<div class="sigil-img" role="img" aria-label="Escudo de ${h.name}" style="${style}"></div>`;
    }
    return `<div class="shield" style="--c0:${h.colors[0]};--c1:${h.colors[1]};width:${size}px;height:${height}px"><span>${h.sigil}</span></div>`;
  }

  const list = (items) => `<ul>${items.map((t) => `<li>${t}</li>`).join("")}</ul>`;

  function select(idx, fly) {
    selected = idx;
    markers.forEach((m, i) => m.g.classList.toggle("selected", i === idx));
    if (idx < 0) {
      info.hidden = true;
      history.replaceState(null, "", location.pathname + location.search);
      return;
    }
    const c = CASTLES[idx];
    const h = HOUSES[c.house];
    const lore = LORE[c.en];
    const others = CASTLES.map((o, i) => ({ o, i })).filter(({ o, i }) => o.house === c.house && i !== idx);
    info.innerHTML = `
      <button class="close" aria-label="Cerrar">×</button>
      <div class="info-head">
        ${shield(h)}
        <div>
          <h2>${c.en}</h2>
          ${c.en !== c.name ? `<p class="en">${c.name}</p>` : ""}
          <p class="type">${TYPE_LABEL[c.type]} · ${REGIONS[c.region].en}</p>
        </div>
      </div>
      <p class="desc">${c.desc}</p>
      ${lore && lore.people ? `<div class="lore"><h4>Personajes</h4><div class="people">${lore.people.map((p) => `<span>${p}</span>`).join("")}</div></div>` : ""}
      ${lore && lore.events ? `<div class="lore"><h4>Lo que pasó aquí</h4>${list(lore.events)}</div>` : ""}
      <div class="house-box">
        <h3>${h.name}</h3>
        ${h.mottoEn ? `<p class="motto">«${h.mottoEn}»</p><p class="motto-es">${h.motto}</p>` : h.motto ? `<p class="motto">«${h.motto}»</p>` : ""}
        <p class="blazon">${h.sigilText}</p>
      </div>
      ${
        others.length
          ? `<div class="others"><h4>Otros lugares de la casa</h4>${others
              .map(({ o, i }) => `<button class="link" data-idx="${i}">${o.en}</button>`)
              .join("")}</div>`
          : ""
      }`;
    info.hidden = false;
    info.querySelector(".close").addEventListener("click", () => select(-1));
    info.querySelectorAll(".link").forEach((b) => b.addEventListener("click", () => select(+b.dataset.idx, true)));
    history.replaceState(null, "", "#" + encodeURIComponent(c.en.replace(/\s+/g, "-")));
    const mobile = window.matchMedia("(max-width: 800px)").matches;
    if (fly) flyTo(c.x, c.y, Math.max(3, fitW / view.w), 700, mobile ? 0.22 : 0);
  }

  markers.forEach((m, i) => {
    m.g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        select(i, true);
      }
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") select(-1);
  });

  // ---------- Barra lateral: búsqueda, regiones y casas ----------
  const search = document.getElementById("search");
  const results = document.getElementById("results");
  const regionChips = document.getElementById("regions");
  const houseList = document.getElementById("houses");
  let regionFilter = null;
  let houseFilter = null;

  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  function applyFilters() {
    markers.forEach((m) => {
      const ok = (!regionFilter || m.c.region === regionFilter) && (!houseFilter || m.c.house === houseFilter);
      m.g.classList.toggle("dimmed", !ok);
    });
    svg.querySelectorAll(".region-label").forEach((t) => {
      t.classList.toggle("active", t.dataset.region === regionFilter);
    });
    regionChips.querySelectorAll(".chip").forEach((b) => b.classList.toggle("on", b.dataset.region === (regionFilter || "")));
    houseList.querySelectorAll(".house").forEach((b) => b.classList.toggle("on", b.dataset.house === houseFilter));
  }

  function chip(label, region) {
    const b = document.createElement("button");
    b.className = "chip";
    b.dataset.region = region;
    b.textContent = label;
    b.addEventListener("click", () => {
      regionFilter = region || null;
      document.body.classList.remove("sidebar-open");
      houseFilter = null;
      applyFilters();
      renderHouses();
      if (region) {
        const pts = CASTLES.filter((c) => c.region === region);
        const xs = pts.map((p) => p.x);
        const ys = pts.map((p) => p.y);
        const w = Math.max(...xs) - Math.min(...xs) + 160;
        const hgt = Math.max(...ys) - Math.min(...ys) + 160;
        const s = stageSize();
        const zoom = Math.min(fitW / w, (fitW * (s.h / s.w)) / hgt, 4);
        flyTo((Math.max(...xs) + Math.min(...xs)) / 2, (Math.max(...ys) + Math.min(...ys)) / 2, Math.max(1, zoom));
      } else {
        flyTo(MAP_W / 2, MAP_H / 2, 1);
      }
    });
    regionChips.appendChild(b);
  }
  chip("Todas", "");
  Object.entries(REGIONS).forEach(([k, r]) => chip(r.en, k));

  function renderHouses() {
    houseList.innerHTML = "";
    const order = ["stark", "lannister", "baratheon", "targaryen", "tully", "arryn", "greyjoy", "tyrell", "martell"];
    const keys = Object.keys(HOUSES)
      .filter((k) => CASTLES.some((c) => c.house === k))
      .filter((k) => !regionFilter || CASTLES.some((c) => c.house === k && c.region === regionFilter))
      .sort((a, b) => {
        const ia = order.indexOf(a);
        const ib = order.indexOf(b);
        if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        return HOUSES[a].name.localeCompare(HOUSES[b].name, "es");
      });
    keys.forEach((k) => {
      const h = HOUSES[k];
      const seats = CASTLES.filter((c) => c.house === k);
      const b = document.createElement("button");
      b.className = "house" + (order.includes(k) ? " great" : "");
      b.dataset.house = k;
      b.innerHTML = `${shield(h, 26)}<span class="h-name">${h.name}</span><span class="h-count">${seats.length}</span>`;
      b.addEventListener("click", () => {
        houseFilter = houseFilter === k ? null : k;
        document.body.classList.remove("sidebar-open");
        applyFilters();
        if (houseFilter) {
          const main = seats.find((c) => c.type === "capital") || seats[0];
          select(CASTLES.indexOf(main), true);
        }
      });
      houseList.appendChild(b);
    });
    applyFilters();
  }
  renderHouses();

  search.addEventListener("input", () => {
    const q = norm(search.value.trim());
    results.innerHTML = "";
    if (!q) return;
    const hits = CASTLES.map((c, i) => ({ c, i }))
      .filter(({ c }) => norm(c.name).includes(q) || norm(c.en).includes(q) || norm(HOUSES[c.house].name).includes(q))
      .slice(0, 8);
    if (!hits.length) {
      results.innerHTML = `<li class="empty">Sin resultados</li>`;
      return;
    }
    hits.forEach(({ c, i }) => {
      const li = document.createElement("li");
      li.innerHTML = `<button><strong>${c.en}</strong><small>${c.en !== c.name ? c.name + " · " : ""}${HOUSES[c.house].name}</small></button>`;
      li.querySelector("button").addEventListener("click", () => {
        select(i, true);
        search.value = "";
        results.innerHTML = "";
        document.body.classList.remove("sidebar-open");
      });
      results.appendChild(li);
    });
  });
  search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const first = results.querySelector("button");
      if (first) first.click();
    }
  });

  document.getElementById("menuToggle").addEventListener("click", () => document.body.classList.toggle("sidebar-open"));

  // ---------- Inicio ----------
  function openFromHash() {
    const hash = decodeURIComponent(location.hash.slice(1)).replace(/-/g, " ");
    if (!hash) return;
    const key = (t) => norm(t).replace(/[^a-z0-9]/g, "");
    const idx = CASTLES.findIndex((c) => key(c.en) === key(hash) || key(c.name) === key(hash));
    if (idx >= 0) setTimeout(() => select(idx, true), 200);
  }
  fit();
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();

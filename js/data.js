// Datos de Poniente: regiones, casas y castillos.
// Coordenadas en el sistema del SVG (viewBox 0 0 1000 1800). Ubicaciones aproximadas
// basadas en los mapas de "Canción de Hielo y Fuego" / "Juego de Tronos".

const REGIONS = {
  beyond: { name: "Más allá del Muro", color: "#c9d3d6" },
  north: { name: "El Norte", color: "#b9c4b0" },
  iron: { name: "Islas del Hierro", color: "#9fa3a0" },
  river: { name: "Tierras de los Ríos", color: "#b8c79a" },
  vale: { name: "El Valle de Arryn", color: "#c3cfd6" },
  west: { name: "Tierras del Oeste", color: "#d6b98c" },
  crown: { name: "Tierras de la Corona", color: "#d9c58f" },
  reach: { name: "El Dominio", color: "#b5cc8e" },
  storm: { name: "Tierras de la Tormenta", color: "#bfb8a6" },
  dorne: { name: "Dorne", color: "#e3c48a" },
};

// sigil: emoji representativo del blasón; colors: [campo, carga]
const HOUSES = {
  stark: { name: "Casa Stark", sigil: "🐺", sigilText: "Lobo huargo gris sobre campo blanco", motto: "Se acerca el invierno", colors: ["#e9ecef", "#6c757d"], region: "north" },
  lannister: { name: "Casa Lannister", sigil: "🦁", sigilText: "León dorado rampante sobre campo carmesí", motto: "¡Oye mi rugido!", colors: ["#9b1c1c", "#f2c14e"], region: "west" },
  baratheon: { name: "Casa Baratheon", sigil: "🦌", sigilText: "Venado coronado negro sobre campo dorado", motto: "Nuestra es la furia", colors: ["#f2c14e", "#1b1b1b"], region: "storm" },
  targaryen: { name: "Casa Targaryen", sigil: "🐉", sigilText: "Dragón rojo de tres cabezas sobre campo negro", motto: "Fuego y sangre", colors: ["#151515", "#c0392b"], region: "crown" },
  tully: { name: "Casa Tully", sigil: "🐟", sigilText: "Trucha plateada saltando sobre ondas azules y rojas", motto: "Familia, deber, honor", colors: ["#2e5d9f", "#c0c6cc"], region: "river" },
  arryn: { name: "Casa Arryn", sigil: "🦅", sigilText: "Luna y halcón blancos sobre campo celeste", motto: "Tan alto como el honor", colors: ["#7fb2d9", "#ffffff"], region: "vale" },
  greyjoy: { name: "Casa Greyjoy", sigil: "🦑", sigilText: "Kraken dorado sobre campo negro", motto: "Nosotros no sembramos", colors: ["#111111", "#d4af37"], region: "iron" },
  tyrell: { name: "Casa Tyrell", sigil: "🌹", sigilText: "Rosa dorada sobre campo verde", motto: "Crecer fuertes", colors: ["#2f7d32", "#f2c14e"], region: "reach" },
  martell: { name: "Casa Martell", sigil: "☀️", sigilText: "Sol rojo atravesado por una lanza dorada sobre naranja", motto: "Nunca doblegado, nunca roto", colors: ["#e67e22", "#c0392b"], region: "dorne" },
  bolton: { name: "Casa Bolton", sigil: "🩸", sigilText: "Hombre desollado sobre campo rosado", motto: "Nuestras hojas están afiladas", colors: ["#e8a5a5", "#8b0000"], region: "north" },
  umber: { name: "Casa Umber", sigil: "⛓️", sigilText: "Gigante rugiente con cadenas rotas", motto: "", colors: ["#7a4b2a", "#e0d6c8"], region: "north" },
  karstark: { name: "Casa Karstark", sigil: "☀", sigilText: "Sol blanco sobre campo negro", motto: "El sol del invierno", colors: ["#111111", "#ffffff"], region: "north" },
  mormont: { name: "Casa Mormont", sigil: "🐻", sigilText: "Oso negro sobre campo verde", motto: "Aquí estamos", colors: ["#2f6b3a", "#111111"], region: "north" },
  glover: { name: "Casa Glover", sigil: "✋", sigilText: "Puño de malla plateado sobre escarlata", motto: "", colors: ["#a3262a", "#c0c6cc"], region: "north" },
  manderly: { name: "Casa Manderly", sigil: "🧜", sigilText: "Tritón blanco con tridente sobre verde mar", motto: "", colors: ["#2a8c82", "#ffffff"], region: "north" },
  reed: { name: "Casa Reed", sigil: "🦎", sigilText: "Lagarto león negro sobre verde", motto: "", colors: ["#5e8c3a", "#1b1b1b"], region: "north" },
  tallhart: { name: "Casa Tallhart", sigil: "🌲", sigilText: "Tres arcianos sobre campo marrón", motto: "", colors: ["#6b4a2b", "#ffffff"], region: "north" },
  dustin: { name: "Casa Dustin", sigil: "👑", sigilText: "Corona negra de hierro sobre ocre con hachas", motto: "", colors: ["#c9a14a", "#111111"], region: "north" },
  hornwood: { name: "Casa Hornwood", sigil: "🍂", sigilText: "Alce sobre campo naranja", motto: "", colors: ["#d97a2b", "#5a3a1a"], region: "north" },
  cerwyn: { name: "Casa Cerwyn", sigil: "🪓", sigilText: "Hacha de batalla negra sobre plata", motto: "", colors: ["#c0c6cc", "#111111"], region: "north" },
  frey: { name: "Casa Frey", sigil: "🏰", sigilText: "Dos torres azules unidas por un puente sobre gris", motto: "", colors: ["#9aa1a8", "#2e5d9f"], region: "river" },
  mallister: { name: "Casa Mallister", sigil: "🦅", sigilText: "Águila plateada sobre campo índigo", motto: "Por encima del resto", colors: ["#2b2f6b", "#c0c6cc"], region: "river" },
  blackwood: { name: "Casa Blackwood", sigil: "🐦", sigilText: "Bandada de cuervos alrededor de un arciano muerto", motto: "", colors: ["#7a1f1f", "#111111"], region: "river" },
  bracken: { name: "Casa Bracken", sigil: "🐎", sigilText: "Semental rojo sobre campo dorado", motto: "", colors: ["#c9a14a", "#8b1a1a"], region: "river" },
  whent: { name: "Casa Whent", sigil: "🦇", sigilText: "Nueve murciélagos negros sobre campo dorado", motto: "", colors: ["#c9a14a", "#111111"], region: "river" },
  royce: { name: "Casa Royce", sigil: "🛡️", sigilText: "Runas negras sobre bronce, bordura de remaches", motto: "Nosotros recordamos", colors: ["#a87b3a", "#111111"], region: "vale" },
  grafton: { name: "Casa Grafton", sigil: "⚔️", sigilText: "Mano dorada con espada sobre azul", motto: "", colors: ["#2e5d9f", "#f2c14e"], region: "vale" },
  westerling: { name: "Casa Westerling", sigil: "🐚", sigilText: "Seis conchas blancas sobre arena", motto: "Honor, no honores", colors: ["#d6c49a", "#ffffff"], region: "west" },
  lefford: { name: "Casa Lefford", sigil: "🏔️", sigilText: "Torre dorada sobre campo azul", motto: "", colors: ["#2e5d9f", "#f2c14e"], region: "west" },
  marbrand: { name: "Casa Marbrand", sigil: "🔥", sigilText: "Árbol en llamas sobre campo humo", motto: "Arderé brillante", colors: ["#6c6c6c", "#e67e22"], region: "west" },
  hightower: { name: "Casa Hightower", sigil: "🗼", sigilText: "Torre blanca coronada en llamas sobre gris", motto: "Iluminamos el camino", colors: ["#8c8c8c", "#ffffff"], region: "reach" },
  tarly: { name: "Casa Tarly", sigil: "🏹", sigilText: "Cazador andante sobre campo verde", motto: "Primeros en la batalla", colors: ["#2f6b3a", "#a3262a"], region: "reach" },
  redwyne: { name: "Casa Redwyne", sigil: "🍇", sigilText: "Racimo de uvas burdeos sobre azul", motto: "", colors: ["#2e5d9f", "#6b1f3a"], region: "reach" },
  florent: { name: "Casa Florent", sigil: "🦊", sigilText: "Cabeza de zorro entre flores", motto: "", colors: ["#e8e0c8", "#d97a2b"], region: "reach" },
  caswell: { name: "Casa Caswell", sigil: "🐴", sigilText: "Caballo rampante sobre campo verde", motto: "", colors: ["#5e8c3a", "#f2c14e"], region: "reach" },
  ashford: { name: "Casa Ashford", sigil: "🌞", sigilText: "Sol blanco con galón sobre naranja", motto: "", colors: ["#e67e22", "#ffffff"], region: "reach" },
  tarth: { name: "Casa Tarth", sigil: "🌙", sigilText: "Soles rosados y lunas crecientes sobre azul", motto: "", colors: ["#2e5d9f", "#e8a5a5"], region: "storm" },
  connington: { name: "Casa Connington", sigil: "🦁", sigilText: "Dos grifos rojos y blancos contrapuestos", motto: "", colors: ["#a3262a", "#ffffff"], region: "storm" },
  dayne: { name: "Casa Dayne", sigil: "☄️", sigilText: "Espada y estrella fugaz blancas sobre lila", motto: "", colors: ["#7b5ea7", "#ffffff"], region: "dorne" },
  yronwood: { name: "Casa Yronwood", sigil: "⛓", sigilText: "Cadenas negras sobre campo ocre", motto: "", colors: ["#c9a14a", "#111111"], region: "dorne" },
  fowler: { name: "Casa Fowler", sigil: "🪶", sigilText: "Halcón verde y gris sobre campo dorado", motto: "Déjame volar", colors: ["#c9a14a", "#3f6f4f"], region: "dorne" },
  rykker: { name: "Casa Rykker", sigil: "⚒️", sigilText: "Martillos de guerra", motto: "", colors: ["#6b6b6b", "#f2c14e"], region: "crown" },
  velaryon: { name: "Casa Velaryon", sigil: "🌊", sigilText: "Caballito de mar plateado sobre verde mar", motto: "El viejo, el verdadero, el valiente", colors: ["#2a8c82", "#c0c6cc"], region: "crown" },
  watch: { name: "La Guardia de la Noche", sigil: "🛡", sigilText: "Negro sin blasón", motto: "La noche es oscura...", colors: ["#111111", "#555555"], region: "beyond" },
  freefolk: { name: "Pueblo Libre", sigil: "❄️", sigilText: "Sin blasón", motto: "", colors: ["#7f8c8d", "#ecf0f1"], region: "beyond" },
};

// type: capital (sede principal de un gran casa), castle, city, ruin, watch
const CASTLES = [
  // Más allá del Muro y el Muro
  { name: "Castillo Negro", x: 470, y: 330, house: "watch", region: "beyond", type: "watch", desc: "Sede del Lord Comandante de la Guardia de la Noche, en el centro del Muro." },
  { name: "Guardiaoriente del Mar", x: 640, y: 322, house: "watch", region: "beyond", type: "watch", desc: "Castillo de la Guardia en el extremo oriental del Muro, junto al mar." },
  { name: "Torre Sombría", x: 300, y: 336, house: "watch", region: "beyond", type: "watch", desc: "Fortaleza occidental de la Guardia, vigila los pasos de los Colmillos Helados." },
  { name: "Torreón de Craster", x: 490, y: 235, house: "freefolk", region: "beyond", type: "ruin", desc: "Salón fortificado del salvaje Craster, en el Bosque Encantado." },
  { name: "El Puño de los Primeros Hombres", x: 420, y: 165, house: "freefolk", region: "beyond", type: "ruin", desc: "Antiguo fuerte circular sobre una colina; escenario de un ataque de los Otros." },
  { name: "Casa Austera", x: 672, y: 178, house: "freefolk", region: "beyond", type: "ruin", desc: "Poblado en ruinas en la costa; lugar de la masacre de los salvajes." },

  // El Norte
  { name: "Invernalia", x: 440, y: 600, house: "stark", region: "north", type: "capital", desc: "Sede ancestral de la Casa Stark y corazón del Norte. Construida sobre aguas termales." },
  { name: "Último Hogar", x: 560, y: 405, house: "umber", region: "north", type: "castle", desc: "Sede de la Casa Umber, el castillo más septentrional de los Siete Reinos." },
  { name: "Bastión Kar", x: 690, y: 455, house: "karstark", region: "north", type: "castle", desc: "Sede de la Casa Karstark, en el este del Norte." },
  { name: "Fuerte Terror", x: 610, y: 560, house: "bolton", region: "north", type: "castle", desc: "Sede de la Casa Bolton, junto al río Weeping Water." },
  { name: "Bosquespeso", x: 245, y: 470, house: "glover", region: "north", type: "castle", desc: "Motte de madera en el Bosque de los Lobos, sede de la Casa Glover." },
  { name: "Isla del Oso", x: 185, y: 405, house: "mormont", region: "north", type: "castle", desc: "Isla de la Bahía de Hielo, gobernada por la Casa Mormont." },
  { name: "Bosquecuerno", x: 580, y: 650, house: "hornwood", region: "north", type: "castle", desc: "Sede de la Casa Hornwood." },
  { name: "Castillo Cerwyn", x: 470, y: 655, house: "cerwyn", region: "north", type: "castle", desc: "Sede de la Casa Cerwyn, a medio día a caballo de Invernalia." },
  { name: "Ciudadela de Torrhen", x: 360, y: 685, house: "tallhart", region: "north", type: "castle", desc: "Sede de la Casa Tallhart, en el río Fosso." },
  { name: "Puerto Blanco", x: 560, y: 795, house: "manderly", region: "north", type: "city", desc: "La única ciudad del Norte, sede de la Casa Manderly, en la desembocadura del Cuchillo Blanco." },
  { name: "Túmulo", x: 330, y: 770, house: "dustin", region: "north", type: "castle", desc: "Pueblo y castillo de la Casa Dustin, junto al Gran Túmulo." },
  { name: "Foso Cailin", x: 440, y: 885, house: "stark", region: "north", type: "ruin", desc: "Antigua fortaleza en ruinas que guarda la Atalaya del Cuello." },
  { name: "Atalaya de Aguasgrises", x: 410, y: 945, house: "reed", region: "north", type: "castle", desc: "Castillo flotante de la Casa Reed, en los pantanos del Cuello." },

  // Islas del Hierro
  { name: "Pyke", x: 205, y: 1085, house: "greyjoy", region: "iron", type: "capital", desc: "Sede de la Casa Greyjoy, construida sobre acantilados y unida por puentes colgantes." },

  // Tierras de los Ríos
  { name: "Los Gemelos", x: 415, y: 1030, house: "frey", region: "river", type: "castle", desc: "Dos castillos unidos por un puente sobre el Forca Verde. Sede de la Casa Frey." },
  { name: "Varamar", x: 320, y: 1060, house: "mallister", region: "river", type: "castle", desc: "Sede de la Casa Mallister, defensa contra los hijos del hierro." },
  { name: "Aguasdulces", x: 375, y: 1150, house: "tully", region: "river", type: "capital", desc: "Sede de la Casa Tully, en la confluencia del Forca Roja y el Piedrasviejas." },
  { name: "Harrenhal", x: 490, y: 1175, house: "whent", region: "river", type: "ruin", desc: "El castillo más grande de Poniente, fundido por el fuego de dragón de Aegon." },
  { name: "Árbol de los Cuervos", x: 430, y: 1100, house: "blackwood", region: "river", type: "castle", desc: "Sede de la Casa Blackwood, con su gran arciano muerto." },
  { name: "Seto de Piedra", x: 430, y: 1140, house: "bracken", region: "river", type: "castle", desc: "Sede de la Casa Bracken, eternos rivales de los Blackwood." },

  // El Valle
  { name: "Nido de Águilas", x: 640, y: 1045, house: "arryn", region: "vale", type: "capital", desc: "Sede de la Casa Arryn, inexpugnable sobre la cima de la Lanza del Gigante." },
  { name: "Puerto Gaviota", x: 705, y: 1110, house: "grafton", region: "vale", type: "city", desc: "Ciudad portuaria del Valle, gobernada por la Casa Grafton." },
  { name: "Piedra de las Runas", x: 735, y: 1020, house: "royce", region: "vale", type: "castle", desc: "Sede de la Casa Royce, sus muros están grabados con runas de los Primeros Hombres." },

  // Tierras del Oeste
  { name: "Roca Casterly", x: 205, y: 1265, house: "lannister", region: "west", type: "capital", desc: "Sede de la Casa Lannister, excavada en una enorme roca sobre el mar." },
  { name: "Lannisport", x: 230, y: 1285, house: "lannister", region: "west", type: "city", desc: "La mayor ciudad del Oeste, a la sombra de Roca Casterly." },
  { name: "El Risco", x: 185, y: 1185, house: "westerling", region: "west", type: "castle", desc: "Sede de la Casa Westerling, sobre acantilados marinos." },
  { name: "Colmillo Dorado", x: 275, y: 1180, house: "lefford", region: "west", type: "castle", desc: "Sede de la Casa Lefford, guarda el paso entre el Oeste y las Tierras de los Ríos." },
  { name: "Marca Ceniza", x: 245, y: 1215, house: "marbrand", region: "west", type: "castle", desc: "Sede de la Casa Marbrand." },

  // Tierras de la Corona
  { name: "Desembarco del Rey", x: 605, y: 1295, house: "baratheon", region: "crown", type: "capital", desc: "Capital de los Siete Reinos. Hogar de la Fortaleza Roja y el Trono de Hierro." },
  { name: "Rocadragón", x: 725, y: 1248, house: "targaryen", region: "crown", type: "capital", desc: "Isla volcánica, antigua fortaleza de los Targaryen y luego de Stannis Baratheon." },
  { name: "Marcaderiva", x: 695, y: 1272, house: "velaryon", region: "crown", type: "castle", desc: "Isla sede de la Casa Velaryon, señores de las mareas." },
  { name: "El Valle Oscuro", x: 640, y: 1235, house: "rykker", region: "crown", type: "city", desc: "Ciudad portuaria en la Bahía del Aguasnegras." },

  // El Dominio
  { name: "Altojardín", x: 315, y: 1495, house: "tyrell", region: "reach", type: "capital", desc: "Sede de la Casa Tyrell, castillo rodeado de jardines junto al río Mander." },
  { name: "Antigua", x: 200, y: 1620, house: "hightower", region: "reach", type: "city", desc: "La ciudad más antigua de Poniente, hogar de la Ciudadela de los maestres y del Faro." },
  { name: "Colina Cuerno", x: 365, y: 1595, house: "tarly", region: "reach", type: "castle", desc: "Sede de la Casa Tarly, donde guardan la espada Veneno de Corazón." },
  { name: "El Rejo", x: 170, y: 1725, house: "redwyne", region: "reach", type: "castle", desc: "Isla famosa por sus vinos, sede de la Casa Redwyne." },
  { name: "Aguasclaras", x: 250, y: 1575, house: "florent", region: "reach", type: "castle", desc: "Sede de la Casa Florent." },
  { name: "Puenteamargo", x: 440, y: 1385, house: "caswell", region: "reach", type: "castle", desc: "Sede de la Casa Caswell, sobre el río Mander." },
  { name: "Vado Ceniza", x: 450, y: 1490, house: "ashford", region: "reach", type: "castle", desc: "Sede de la Casa Ashford, famosa por su gran torneo." },

  // Tierras de la Tormenta
  { name: "Bastión de Tormentas", x: 705, y: 1445, house: "baratheon", region: "storm", type: "capital", desc: "Sede de la Casa Baratheon, construida para resistir las tormentas de la Bahía de los Naufragios." },
  { name: "Atardecer", x: 805, y: 1400, house: "tarth", region: "storm", type: "castle", desc: "Castillo de la isla de Tarth, la Isla Zafiro. Hogar de Brienne." },
  { name: "Nido del Grifo", x: 735, y: 1405, house: "connington", region: "storm", type: "castle", desc: "Sede de la Casa Connington, sobre un acantilado." },
  { name: "Refugio Estival", x: 585, y: 1470, house: "targaryen", region: "storm", type: "ruin", desc: "Palacio de verano Targaryen, destruido por el fuego en la tragedia de Refugio Estival." },

  // Dorne
  { name: "Lanza del Sol", x: 885, y: 1690, house: "martell", region: "dorne", type: "capital", desc: "Sede de la Casa Martell y capital de Dorne." },
  { name: "Jardines del Agua", x: 820, y: 1700, house: "martell", region: "dorne", type: "castle", desc: "Palacio de recreo de los Martell, con fuentes y estanques." },
  { name: "Campo Estrella", x: 430, y: 1705, house: "dayne", region: "dorne", type: "castle", desc: "Sede de la Casa Dayne, guardianes de la espada Albor." },
  { name: "Palosanto", x: 615, y: 1640, house: "yronwood", region: "dorne", type: "castle", desc: "Sede de la Casa Yronwood, guardianes del Camino Pedregoso." },
  { name: "Altozano", x: 500, y: 1630, house: "fowler", region: "dorne", type: "castle", desc: "Sede de la Casa Fowler, vigila el Paso del Príncipe." },
  { name: "Torre de la Alegría", x: 540, y: 1595, house: "targaryen", region: "dorne", type: "ruin", desc: "Torre en las Montañas Rojas donde murió Lyanna Stark." },
];

// Nombre original en inglés de cada lugar (también se usa en la búsqueda)
const EN_NAMES = {
  "Castillo Negro": "Castle Black", "Guardiaoriente del Mar": "Eastwatch-by-the-Sea", "Torre Sombría": "The Shadow Tower",
  "Torreón de Craster": "Craster's Keep", "El Puño de los Primeros Hombres": "Fist of the First Men", "Casa Austera": "Hardhome",
  "Invernalia": "Winterfell", "Último Hogar": "Last Hearth", "Bastión Kar": "Karhold", "Fuerte Terror": "The Dreadfort",
  "Bosquespeso": "Deepwood Motte", "Isla del Oso": "Bear Island", "Bosquecuerno": "Hornwood", "Castillo Cerwyn": "Castle Cerwyn",
  "Ciudadela de Torrhen": "Torrhen's Square", "Puerto Blanco": "White Harbor", "Túmulo": "Barrowton", "Foso Cailin": "Moat Cailin",
  "Atalaya de Aguasgrises": "Greywater Watch", "Pyke": "Pyke", "Los Gemelos": "The Twins", "Varamar": "Seagard",
  "Aguasdulces": "Riverrun", "Harrenhal": "Harrenhal", "Árbol de los Cuervos": "Raventree Hall", "Seto de Piedra": "Stone Hedge",
  "Nido de Águilas": "The Eyrie", "Puerto Gaviota": "Gulltown", "Piedra de las Runas": "Runestone", "Roca Casterly": "Casterly Rock",
  "Lannisport": "Lannisport", "El Risco": "The Crag", "Colmillo Dorado": "The Golden Tooth", "Marca Ceniza": "Ashemark",
  "Desembarco del Rey": "King's Landing", "Rocadragón": "Dragonstone", "Marcaderiva": "Driftmark", "El Valle Oscuro": "Duskendale",
  "Altojardín": "Highgarden", "Antigua": "Oldtown", "Colina Cuerno": "Horn Hill", "El Rejo": "The Arbor", "Aguasclaras": "Brightwater Keep",
  "Puenteamargo": "Bitterbridge", "Vado Ceniza": "Ashford", "Bastión de Tormentas": "Storm's End", "Atardecer": "Evenfall Hall",
  "Nido del Grifo": "Griffin's Roost", "Refugio Estival": "Summerhall", "Lanza del Sol": "Sunspear", "Jardines del Agua": "The Water Gardens",
  "Campo Estrella": "Starfall", "Palosanto": "Yronwood", "Altozano": "Skyreach", "Torre de la Alegría": "Tower of Joy",
};
CASTLES.forEach((c) => (c.en = EN_NAMES[c.name] || c.name));

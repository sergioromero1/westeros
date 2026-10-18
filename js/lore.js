// Personajes y acontecimientos importantes de cada lugar (libros y serie).
// Clave: nombre en inglés del lugar (ver EN_NAMES en data.js).

const LORE = {
  "Castle Black": {
    people: ["Jon Snow", "Jeor Mormont", "Maester Aemon", "Samwell Tarly", "Alliser Thorne", "Tyrion Lannister (visita)"],
    events: [
      "Jon Snow y Sam Tarly juran como hermanos negros.",
      "Batalla del Castillo Negro: la Guardia resiste el ataque del ejército de Mance Rayder.",
      "Stannis Baratheon llega y derrota a los salvajes.",
      "Jon Snow, Lord Comandante, es apuñalado por sus propios hermanos («Por la Guardia»).",
    ],
  },
  "Eastwatch-by-the-Sea": {
    people: ["Cotter Pyke", "Tormund Giantsbane", "Beric Dondarrion"],
    events: [
      "Base naval de la Guardia de la Noche.",
      "Jon Snow parte desde aquí con su grupo a capturar un espectro (serie).",
      "El Rey de la Noche derriba esta sección del Muro con Viserion, el dragón no muerto (serie).",
    ],
  },
  "The Shadow Tower": {
    people: ["Denys Mallister", "Qhorin Halfhand"],
    events: [
      "Vigila el Paso del Aullador en los Colmillos Helados.",
      "Qhorin Mediamano y Jon Snow salen desde aquí a explorar; Jon se infiltra entre los salvajes.",
    ],
  },
  "Craster's Keep": {
    people: ["Craster", "Gilly", "Jeor Mormont"],
    events: [
      "Craster entrega a sus hijos varones a los Otros.",
      "Motín en el Torreón de Craster: el Lord Comandante Jeor Mormont es asesinado por sus hombres.",
      "Sam escapa con Gilly y su bebé.",
    ],
  },
  "Fist of the First Men": {
    people: ["Jeor Mormont", "Samwell Tarly", "Grenn"],
    events: [
      "La Gran Exploración de la Guardia acampa en el antiguo fuerte.",
      "Ataque de los Otros y los espectros: masacre de los hermanos negros.",
      "Jon encuentra el alijo de obsidiana (vidriagón) enterrado.",
    ],
  },
  "Hardhome": {
    people: ["Jon Snow", "Tormund Giantsbane", "Karsi", "El Rey de la Noche"],
    events: [
      "Antiguo asentamiento destruido por una catástrofe hace siglos.",
      "Masacre de Casa Austera: el ejército de los muertos ataca a los salvajes (serie).",
      "Jon mata a un Caminante Blanco con Garra, su espada de acero valyrio.",
    ],
  },
  "Winterfell": {
    people: ["Eddard Stark", "Catelyn Stark", "Robb Stark", "Sansa Stark", "Arya Stark", "Bran Stark", "Jon Snow", "Theon Greyjoy", "Ramsay Bolton"],
    events: [
      "El rey Robert visita Invernalia y pide a Ned ser su Mano; Bran cae de la torre.",
      "Theon Greyjoy toma Invernalia; luego es saqueada y quemada por Ramsay.",
      "La Batalla de los Bastardos devuelve el castillo a los Stark (serie).",
      "La Larga Noche: Arya mata al Rey de la Noche en el bosque de dioses (serie).",
    ],
  },
  "Last Hearth": {
    people: ["Greatjon Umber", "Smalljon Umber", "Ned Umber"],
    events: [
      "El Gran Jon fue uno de los primeros en proclamar a Robb «Rey en el Norte».",
      "Tras la caída del Muro, el niño Ned Umber aparece muerto y clavado en la pared (serie).",
    ],
  },
  "Karhold": {
    people: ["Rickard Karstark", "Alys Karstark", "Harald Karstark"],
    events: [
      "Lord Rickard mata a dos rehenes Lannister y Robb lo ejecuta, perdiendo su apoyo.",
      "Los Karstark se pasan al lado de los Bolton (serie).",
    ],
  },
  "The Dreadfort": {
    people: ["Roose Bolton", "Ramsay Bolton", "Theon Greyjoy (Hediondo)"],
    events: [
      "Theon es torturado aquí por Ramsay hasta convertirse en «Hediondo».",
      "Los Bolton celebran su tradición de desollar a sus enemigos.",
    ],
  },
  "Deepwood Motte": {
    people: ["Robett Glover", "Asha (Yara) Greyjoy", "Sybelle Glover"],
    events: [
      "Asha Greyjoy toma el castillo durante la invasión del Norte.",
      "Stannis Baratheon lo recupera con ayuda de los clanes de las montañas.",
    ],
  },
  "Bear Island": {
    people: ["Jeor Mormont", "Jorah Mormont", "Maege Mormont", "Lyanna Mormont"],
    events: [
      "Hogar de Jorah Mormont, desterrado por vender esclavos.",
      "La pequeña Lyanna Mormont declara: «El Norte recuerda» (serie).",
    ],
  },
  "Hornwood": {
    people: ["Lady Donella Hornwood", "Ramsay Snow"],
    events: [
      "Ramsay se casa a la fuerza con la viuda Lady Hornwood y la deja morir de hambre.",
    ],
  },
  "Castle Cerwyn": {
    people: ["Medger Cerwyn", "Cley Cerwyn"],
    events: ["Lord Medger es capturado en la guerra; su hijo Cley muere en el ataque de Ramsay junto a Invernalia."],
  },
  "Torrhen's Square": {
    people: ["Leobald Tallhart", "Dagmer Cleftjaw"],
    events: ["Dagmer Barbapartida ataca el castillo para atraer a los defensores fuera de Invernalia."],
  },
  "White Harbor": {
    people: ["Wyman Manderly", "Davos Seaworth"],
    events: [
      "Lord Wyman finge apoyar a los Lannister, pero planea vengar a Robb Stark.",
      "Davos llega como emisario de Stannis.",
    ],
  },
  "Barrowton": {
    people: ["Barbrey Dustin", "Roose Bolton"],
    events: ["Junto al Gran Túmulo, la tumba del Primer Rey; los Bolton se reúnen aquí antes de la boda de Ramsay."],
  },
  "Moat Cailin": {
    people: ["Ramsay Bolton", "Theon Greyjoy"],
    events: [
      "La fortaleza que protege el Norte por el Cuello; los hijos del hierro la ocupan.",
      "Theon («Hediondo») convence a los hombres del hierro de rendirse y Ramsay los desuella.",
    ],
  },
  "Greywater Watch": {
    people: ["Howland Reed", "Meera Reed", "Jojen Reed"],
    events: [
      "Howland Reed salvó a Ned Stark en la Torre de la Alegría.",
      "Meera y Jojen acompañan a Bran hacia el Cuervo de Tres Ojos.",
    ],
  },
  "Pyke": {
    people: ["Balon Greyjoy", "Theon Greyjoy", "Asha (Yara) Greyjoy", "Euron Greyjoy"],
    events: [
      "Rebelión Greyjoy: Robert Baratheon y Ned Stark asedian Pyke; Theon es tomado como pupilo.",
      "Balon muere al caer de un puente colgante en plena tormenta.",
      "Asamblea de sucesión (kingsmoot) en Viejo Wyk: Euron es elegido rey.",
    ],
  },
  "The Twins": {
    people: ["Walder Frey", "Robb Stark", "Catelyn Stark", "Roose Bolton", "Arya Stark"],
    events: [
      "Robb acepta casarse con una Frey a cambio de cruzar el puente.",
      "La Boda Roja: Robb, Catelyn y sus abanderados son asesinados.",
      "Arya Stark mata a Walder Frey y envenena a toda su casa (serie).",
    ],
  },
  "Seagard": {
    people: ["Jason Mallister", "Patrek Mallister"],
    events: ["Defiende la costa de los hijos del hierro; Lord Jason combatió en la Rebelión de Robert."],
  },
  "Riverrun": {
    people: ["Hoster Tully", "Catelyn Stark", "Edmure Tully", "Brynden «Pez Negro» Tully", "Jaime Lannister"],
    events: [
      "Batalla de los Campamentos: Robb rompe el asedio Lannister y captura a Jaime.",
      "Catelyn libera a Jaime en secreto para recuperar a sus hijas.",
      "Asedio de Aguasdulces: Jaime obliga a rendirse al castillo amenazando a Edmure.",
    ],
  },
  "Harrenhal": {
    people: ["Harren el Negro", "Aegon el Conquistador", "Arya Stark", "Tywin Lannister", "Roose Bolton", "Jaime y Brienne"],
    events: [
      "Aegon y sus dragones funden las torres el mismo día en que se terminó el castillo.",
      "Torneo de Harrenhal: Rhaegar corona a Lyanna Stark como reina del amor y la belleza.",
      "Arya sirve aquí como copera de Tywin y usa a Jaqen H'ghar para vengarse.",
      "Jaime salta al foso del oso para salvar a Brienne.",
    ],
  },
  "Raventree Hall": {
    people: ["Tytos Blackwood", "Brynden Rivers (Cuervo de Sangre)"],
    events: ["Rivalidad ancestral con los Bracken; Jaime negocia su rendición al final de la guerra."],
  },
  "Stone Hedge": {
    people: ["Jonos Bracken"],
    events: ["Eternos rivales de los Blackwood; sus disputas por tierras duran siglos."],
  },
  "The Eyrie": {
    people: ["Jon Arryn", "Lysa Arryn", "Robin (Robert) Arryn", "Petyr Baelish", "Sansa Stark", "Tyrion Lannister"],
    events: [
      "Tyrion es encerrado en las celdas del cielo y gana un juicio por combate con Bronn.",
      "Petyr Baelish empuja a Lysa Arryn por la Puerta de la Luna.",
      "Sansa se esconde aquí como Alayne, la «hija» de Meñique.",
    ],
  },
  "Gulltown": {
    people: ["Gerold Grafton", "Petyr Baelish"],
    events: ["Principal puerto del Valle; Ned Stark y Robert se refugiaron aquí al iniciar la rebelión."],
  },
  "Runestone": {
    people: ["Yohn Royce «Bronze Yohn»", "Waymar Royce"],
    events: [
      "Ser Waymar Royce es el primer muerto a manos de los Otros (prólogo del primer libro).",
      "Bronze Yohn lidera la oposición de los Lores Declarantes contra Meñique.",
    ],
  },
  "Casterly Rock": {
    people: ["Tywin Lannister", "Cersei Lannister", "Jaime Lannister", "Tyrion Lannister"],
    events: [
      "Lann el Astuto se apoderó de la roca con su ingenio, según la leyenda.",
      "Las minas de oro dan a los Lannister su riqueza: «Un Lannister siempre paga sus deudas».",
      "Los Inmaculados de Daenerys toman la Roca a través de las alcantarillas (serie).",
    ],
  },
  "Lannisport": {
    people: ["Tywin Lannister", "Lancel Lannister"],
    events: ["Los hijos del hierro quemaron la flota Lannister en el puerto al iniciar la Rebelión Greyjoy."],
  },
  "The Crag": {
    people: ["Jeyne Westerling", "Robb Stark"],
    events: ["Robb toma El Risco, es herido y se casa con Jeyne Westerling, rompiendo su promesa a los Frey."],
  },
  "The Golden Tooth": {
    people: ["Leo Lefford", "Jaime Lannister"],
    events: ["Jaime vigila aquí el paso; la Batalla del Colmillo Dorado abre la guerra contra los Tully."],
  },
  "Ashemark": {
    people: ["Addam Marbrand", "Damon Marbrand"],
    events: ["Robb Stark la saquea durante su campaña en el Oeste."],
  },
  "King's Landing": {
    people: ["Robert Baratheon", "Cersei Lannister", "Joffrey", "Tyrion Lannister", "Eddard Stark", "Varys", "Petyr Baelish", "Daenerys Targaryen"],
    events: [
      "Saqueo de Desembarco del Rey: Jaime mata al Rey Loco Aerys II.",
      "Ned Stark es decapitado en el Septo de Baelor por orden de Joffrey.",
      "Batalla del Aguasnegras: el fuego valyrio y Tyrion derrotan a la flota de Stannis.",
      "Boda Púrpura: Joffrey muere envenenado.",
      "Cersei vuela el Gran Septo; Daenerys quema la ciudad con Drogon (serie).",
    ],
  },
  "Dragonstone": {
    people: ["Aegon el Conquistador", "Stannis Baratheon", "Melisandre", "Davos Seaworth", "Daenerys Targaryen"],
    events: [
      "Desde aquí Aegon y sus hermanas iniciaron la Conquista de Poniente.",
      "Nace Daenerys «de la Tormenta» en medio de una gran tempestad.",
      "Stannis se proclama rey y Melisandre quema a los Siete.",
      "Jon Snow y Daenerys se reúnen por primera vez (serie).",
    ],
  },
  "Driftmark": {
    people: ["Corlys Velaryon «la Serpiente Marina»", "Monford Velaryon"],
    events: ["Hogar de los Velaryon, aliados de los Targaryen en la Danza de los Dragones."],
  },
  "Duskendale": {
    people: ["Denys Darklyn", "Aerys II", "Barristan Selmy"],
    events: ["El Desafío del Valle Oscuro: Aerys es tomado prisionero y Barristan lo rescata; inicio de su locura."],
  },
  "Highgarden": {
    people: ["Mace Tyrell", "Olenna Tyrell", "Margaery Tyrell", "Loras Tyrell"],
    events: [
      "Los Tyrell se alían con los Lannister tras la muerte de Renly.",
      "Jaime toma Altojardín; Olenna confiesa haber envenenado a Joffrey (serie).",
    ],
  },
  "Oldtown": {
    people: ["Samwell Tarly", "Archmaester Marwyn", "Leyton Hightower"],
    events: [
      "Hogar de la Ciudadela, donde se forman los maestres, y del Faro de la Torre Alta.",
      "Sam estudia aquí y descubre la verdad sobre el origen de Jon (serie).",
    ],
  },
  "Horn Hill": {
    people: ["Randyll Tarly", "Samwell Tarly", "Dickon Tarly"],
    events: [
      "Randyll obliga a Sam a unirse a la Guardia de la Noche.",
      "Sam se lleva la espada Veneno de Corazón (serie).",
    ],
  },
  "The Arbor": {
    people: ["Paxter Redwyne"],
    events: ["Famosa por el vino del Rejo; la flota Redwyne es la mayor de Poniente."],
  },
  "Brightwater Keep": {
    people: ["Alester Florent", "Selyse Florent"],
    events: ["Familia de Selyse, esposa de Stannis; Lord Alester es quemado por traición."],
  },
  "Bitterbridge": {
    people: ["Renly Baratheon", "Catelyn Stark"],
    events: [
      "Renly reúne aquí su gran ejército y Brienne gana el torneo para su Guardia Arcoíris.",
      "Catelyn negocia con Renly.",
    ],
  },
  "Ashford": {
    people: ["Dunk (Ser Duncan el Alto)", "Egg (Aegon V)", "Baelor Rompelanzas"],
    events: ["El Torneo de Vado Ceniza y el Juicio de Siete de «El caballero errante»."],
  },
  "Storm's End": {
    people: ["Durran", "Robert Baratheon", "Stannis Baratheon", "Renly Baratheon"],
    events: [
      "Asedio de Bastión de Tormentas: Stannis resiste un año y Davos lo salva con cebollas.",
      "Una sombra de Melisandre asesina a Renly en su tienda.",
    ],
  },
  "Evenfall Hall": {
    people: ["Brienne of Tarth", "Selwyn Tarth"],
    events: ["Hogar de Brienne, la Doncella de Tarth."],
  },
  "Griffin's Roost": {
    people: ["Jon Connington"],
    events: ["Jon Connington, exiliado tras perder la Batalla de las Campanas, regresa para recuperarlo con Aegon."],
  },
  "Summerhall": {
    people: ["Aegon V", "Rhaegar Targaryen", "Duncan el Alto"],
    events: ["La tragedia de Refugio Estival: un intento de hacer nacer dragones acaba en incendio; nace Rhaegar."],
  },
  "Sunspear": {
    people: ["Doran Martell", "Oberyn Martell", "Arianne Martell", "Ellaria Sand", "Serpientes de Arena"],
    events: [
      "Myrcella Baratheon vive aquí prometida con Trystane Martell.",
      "Ellaria y las Serpientes de Arena asesinan a Doran (serie).",
    ],
  },
  "The Water Gardens": {
    people: ["Doran Martell", "Myrcella Baratheon", "Jaime y Bronn (serie)"],
    events: ["Jaime y Bronn se infiltran para rescatar a Myrcella (serie)."],
  },
  "Starfall": {
    people: ["Arthur Dayne", "Ashara Dayne", "Edric Dayne"],
    events: ["Hogar de Ser Arthur Dayne, la Espada del Amanecer, portador de Albor."],
  },
  "Yronwood": {
    people: ["Anders Yronwood", "Quentyn Martell"],
    events: ["Quentyn Martell fue criado aquí antes de viajar a buscar a Daenerys."],
  },
  "Skyreach": {
    people: ["Casa Fowler"],
    events: ["Guarda el Paso del Príncipe entre el Dominio y Dorne."],
  },
  "Tower of Joy": {
    people: ["Eddard Stark", "Lyanna Stark", "Arthur Dayne", "Howland Reed"],
    events: [
      "Ned lucha contra tres caballeros de la Guardia Real; Howland Reed le salva la vida.",
      "Lyanna muere y hace prometer a Ned que proteja a su hijo: Jon Snow (Aegon Targaryen).",
    ],
  },
};

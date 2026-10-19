// Decoración del mapa: montañas, bosques y rótulos (coordenadas del mapa, 1000 x 1656).
// La costa, islas, ríos, lagos, fronteras y el Muro están en js/geo-data.js.

const GEO = {
  // Zonas de montañas y bosques (rectángulos x, y, w, h + densidad)
  mountains: [
    { name: "Frostfangs", rect: [270, 90, 140, 230], n: 55 },
    { name: "Mountains of the Moon", rect: [600, 930, 110, 90], n: 40 },
    { name: "Red Mountains", rect: [420, 1440, 190, 55], n: 45 },
    { name: "Northern mountains", rect: [430, 470, 80, 60], n: 14 },
    { name: "Westerlands hills", rect: [285, 1095, 90, 80], n: 18 },
  ],
  forests: [
    { name: "Haunted Forest", rect: [430, 250, 200, 110], n: 70 },
    { name: "Wolfswood", rect: [350, 560, 90, 60], n: 35 },
    { name: "Kingswood", rect: [600, 1255, 70, 50], n: 22 },
    { name: "Rainwood", rect: [700, 1395, 50, 30], n: 12 },
    { name: "Whispering Wood", rect: [450, 1030, 40, 30], n: 10 },
    { name: "Reach woods", rect: [380, 1300, 60, 40], n: 12 },
  ],

  regionLabels: [
    { region: "beyond", x: 505, y: 195, size: 20 },
    { region: "north", x: 470, y: 565, size: 30 },
    { region: "iron", x: 265, y: 962, size: 10 },
    { region: "river", x: 515, y: 985, size: 13 },
    { region: "vale", x: 655, y: 905, size: 14 },
    { region: "west", x: 315, y: 1232, size: 14 },
    { region: "crown", x: 650, y: 1140, size: 12 },
    { region: "reach", x: 400, y: 1420, size: 22 },
    { region: "storm", x: 620, y: 1352, size: 14 },
    { region: "dorne", x: 560, y: 1572, size: 24 },
  ],

  // Accidentes geográficos sobre tierra
  landLabels: [
    { name: "Lands of Always Winter", x: 430, y: 45, size: 14 },
    { name: "Frostfangs", x: 340, y: 200, size: 9, rotate: -70 },
    { name: "Haunted Forest", x: 530, y: 268, size: 8 },
    { name: "The Neck", x: 458, y: 815, size: 8 },
    { name: "Mountains of the Moon", x: 655, y: 1022, size: 7 },
    { name: "Red Mountains", x: 515, y: 1500, size: 8 },
    { name: "Essos", x: 935, y: 1150, size: 22, rotate: 90 },
  ],

  seaLabels: [
    { name: "The Sunset Sea", x: 90, y: 1100, size: 22, rotate: -90 },
    { name: "The Narrow Sea", x: 845, y: 1150, size: 17, rotate: 90 },
    { name: "The Shivering Sea", x: 800, y: 260, size: 18, rotate: 90 },
    { name: "Summer Sea", x: 600, y: 1645, size: 16 },
    { name: "Bay of Ice", x: 420, y: 430, size: 9 },
    { name: "The Bite", x: 600, y: 815, size: 12 },
    { name: "Sea of Dorne", x: 640, y: 1477, size: 11 },
    { name: "Shipbreaker Bay", x: 725, y: 1385, size: 6 },
    { name: "Blackwater Bay", x: 665, y: 1215, size: 7 },
    { name: "Ironman's Bay", x: 372, y: 1020, size: 8 },
    { name: "Bay of Crabs", x: 652, y: 1086, size: 6 },
    { name: "The Stepstones", x: 840, y: 1530, size: 8 },
  ],
};

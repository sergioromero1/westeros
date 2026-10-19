# Mapa de Poniente

Mapa interactivo de Poniente (Westeros) con las casas nobles y sus castillos, hecho solo con HTML, CSS y JavaScript.

## Funciones

- Zoom con la rueda, doble clic, botones o pellizco; arrastrar para moverse.
- Clic en un castillo para ver su casa, escudo, lema, personajes y lo que pasó allí.
- Nombres del mapa en inglés (con el nombre en español en el panel).
- Búsqueda por nombre en español o en inglés (`Invernalia` o `Winterfell`).
- Filtros por región y por casa.
- Enlaces directos a un castillo: `index.html#Winterfell`.

## Estructura

- `index.html` – página principal.
- `css/styles.css` – estilos.
- `js/data.js` – regiones, casas y castillos (para añadir lugares, edita este archivo).
- `js/lore.js` – personajes y acontecimientos de cada lugar.
- `img/sigils.webp` – escudos de las casas (sprite de 8 columnas).
- `js/geo-data.js` – costa, islas, ríos, lagos, fronteras y el Muro (archivo generado).
- `js/geo.js` – montañas, bosques y rótulos.
- `js/map.js` – dibujo del mapa e interacción.

## Ejecutar en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python -m http.server 8080
```

## Publicación

Se publica con GitHub Pages desde la rama `main` (carpeta raíz).

La geografía (`js/geo-data.js`) se generó a partir de [Location map Westeros.svg](https://awoiaf.westeros.org/index.php/File:Location_map_Westeros.svg), de Abjiklam en A Wiki of Ice and Fire, bajo licencia [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/): se convirtieron sus trazos al sistema de coordenadas del mapa y se le dio otro estilo.

Los escudos provienen de [A Wiki of Ice and Fire](https://awoiaf.westeros.org/index.php/Category:SVG_coats_of_arms) y se distribuyen bajo la licencia [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/); aquí se rasterizaron y combinaron en `img/sigils.webp`.

Proyecto de fans sin fines comerciales. *Canción de Hielo y Fuego* es obra de George R. R. Martin.

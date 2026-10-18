# Mapa de Poniente

Mapa interactivo de Poniente (Westeros) con las casas nobles y sus castillos, hecho solo con HTML, CSS y JavaScript.

## Funciones

- Zoom con la rueda, doble clic, botones o pellizco; arrastrar para moverse.
- Clic en un castillo para ver su casa, lema, blasón y descripción.
- Búsqueda por nombre en español o en inglés (`Invernalia` o `Winterfell`).
- Filtros por región y por casa.
- Enlaces directos a un castillo: `index.html#Winterfell`.

## Estructura

- `index.html` – página principal.
- `css/styles.css` – estilos.
- `js/data.js` – regiones, casas y castillos (para añadir lugares, edita este archivo).
- `js/geo.js` – geografía del mapa (costa, islas, ríos, montañas, fronteras).
- `js/map.js` – dibujo del mapa e interacción.

## Ejecutar en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python -m http.server 8080
```

## Publicación

Se publica con GitHub Pages desde la rama `main` (carpeta raíz).

Proyecto de fans sin fines comerciales. *Canción de Hielo y Fuego* es obra de George R. R. Martin.

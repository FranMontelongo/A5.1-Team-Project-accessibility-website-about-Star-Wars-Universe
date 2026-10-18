# Proyecto Star Wars accesible — plantilla inicial

## Reparto del trabajo

### Francisco Javier — diseño visual y React
- Crear el diseño en Figma: escritorio, móvil, componentes, colores, tipografía y estados de foco.
- Preparar el storyboard junto con el grupo y mantener `css/styles.css`.
- Completar el listado React en `js/react-app.js` con más personajes y filtros.
- Revisar responsive, jerarquía de encabezados, enlaces, contraste y foco visible.
- Asegurarse de que la página usa Bootstrap y Tailwind de forma razonable; anotar conflictos o retirar utilidades que choquen.

### Hugo Expósito — multimedia y lectura en voz alta
- Preparar/añadir imagen, vídeo, audio y subtítulos en las carpetas `assets/`.
- Revisar permisos y registrar las licencias/fuentes de cada archivo.
- Completar la lectura en voz alta y la interacción jQuery en `js/app.js`.
- Añadir transcripción del vídeo/audio, comprobar controles por teclado y no usar autoplay.
- Hacer una revisión de accesibilidad centrada en multimedia y teclado.

### Ricardo Lerma — contenido, canvas y accesibilidad
- Redactar contenido de planetas, facciones y cronología; verificar los datos.
- Completar el mapa del canvas en `js/app.js` y su descripción textual.
- Redactar declaración de accesibilidad y registrar el informe inicial/final del comprobador.
- Revisar textos alternativos, estructura semántica, enlaces y licencias junto con el grupo.
- Preparar evidencias de las correcciones y participar en la presentación.

## Archivos
- `index.html`: estructura de página y espacios reservados.
- `css/styles.css`: estilos base y responsive.
- `js/app.js`: lectura en voz alta, canvas y ejemplo jQuery.
- `js/react-app.js`: buscador/filtro React.
- `docs/storyboard.md`: storyboard para completar.
- `docs/figma.md`: guía del diseño.
- `docs/accessibility-report.md`: plantilla para los dos informes.
- `docs/presentation.md`: estructura de 10 diapositivas.

## Cómo probar
Abre `index.html` en un navegador con conexión a internet. Las librerías se cargan desde CDN. Los archivos multimedia son marcadores de posición: crea las carpetas `assets/images`, `assets/video` y `assets/audio` y sustituye las rutas por archivos reales. Para evitar problemas de carga local, también puedes ejecutar un servidor local sencillo desde la carpeta del proyecto.

## Importante
Esta es una base sin terminar, no una web final ni una certificación. No afirméis cumplimiento WCAG AA hasta probar y corregir. Un comprobador automático no detecta todos los problemas: combinadlo con revisión manual y teclado. Usad recursos con licencia adecuada y no presentéis el proyecto como oficial de Star Wars.

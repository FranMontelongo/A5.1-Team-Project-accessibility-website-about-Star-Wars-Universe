/* HUGO EXPÓSITO: responsable de voz, audio/vídeo y un elemento interactivo con jQuery.
   Pista: prueba cada función con teclado y comprueba los mensajes accesibles. */

// Elemento interactivo 1: lectura en voz alta mediante SpeechSynthesis del navegador.
// No es un lector de pantalla completo; los usuarios deben poder usar su propio lector.
document.addEventListener("DOMContentLoaded", function () {
  const readButton = document.getElementById("readPageButton");
  const readStatus = document.getElementById("readStatus");

  if (readButton) {
    readButton.addEventListener("click", function () {
      if (!("speechSynthesis" in window)) {
        readStatus.textContent = "La lectura en voz alta no está disponible en este navegador.";
        return;
      }

      // HUGO: decide si leer toda la página o solo el contenido principal.
      window.speechSynthesis.cancel();
      const textToRead = document.querySelector("main").innerText;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = "es-ES";
      utterance.onstart = function () { readStatus.textContent = "Lectura en voz alta iniciada."; };
      utterance.onend = function () { readStatus.textContent = "Lectura terminada."; };
      window.speechSynthesis.speak(utterance);
    });
  }
});


// Elemento interactivo 2: dibujo del mapa estelar en canvas con modales.
// RICARDO LERMA: interacción al hacer clic en planetas, apertura de modales accesibles y redibujado.
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("starCanvas");
  const redrawButton = document.getElementById("redrawCanvas");
  const canvasDescription = document.getElementById("canvasDescription");

  if (!canvas) return;

  const context = canvas.getContext("2d");

  // Datos de los planetas y sus modales asignados
  const planets = [
    { x: 180, y: 100, name: "Tatooine", color: "#ffd166", desc: "Planeta desértico de dos soles.", modalId: "modalTatooine" },
    { x: 420, y: 190, name: "Coruscant", color: "#4a90e2", desc: "Capital ecumenópolis de la galaxia.", modalId: "modalCoruscant" },
    { x: 610, y: 80, name: "Endor", color: "#50e3c2", desc: "Luna boscosa hogar de los Ewoks.", modalId: "modalEndor" }
  ];

  let stars = [];
  let hoveredPlanet = null;

  // Función para generar estrellas de fondo dinámicas
  function generateStars() {
    stars = [];
    for (let i = 0; i < 25; i++) {
      stars.push({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: Math.random() * 2 + 1
      });
    }
  }

  function drawMap() {
    if (!context) return;

    // 1. Limpiar y pintar fondo
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#050914";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Dibujar estrellas de fondo
    context.fillStyle = "#ffffff";
    stars.forEach(function (star) {
      context.beginPath();
      context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      context.fill();
    });

    // 3. Rutas hiperespaciales (líneas de conexión)
    context.strokeStyle = "#ffd166";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(planets[0].x, planets[0].y); // Tatooine
    context.lineTo(planets[1].x, planets[1].y); // Coruscant
    context.lineTo(planets[2].x, planets[2].y); // Endor
    context.stroke();

    // 4. Dibujar planetas
    planets.forEach(function (planet) {
      const isHovered = hoveredPlanet && hoveredPlanet.name === planet.name;

      context.beginPath();
      context.arc(planet.x, planet.y, isHovered ? 11 : 7, 0, Math.PI * 2);
      context.fillStyle = planet.color;
      context.fill();

      // Anillo de resaltado
      if (isHovered) {
        context.strokeStyle = "#ffffff";
        context.lineWidth = 2;
        context.stroke();
      }

      context.fillStyle = "#ffffff";
      context.font = isHovered ? "bold 13px sans-serif" : "12px sans-serif";
      context.fillText(planet.name, planet.x - 18, planet.y - 15);
    });

    // 5. Actualizar descripción textual de accesibilidad
    if (canvasDescription) {
      if (hoveredPlanet) {
        canvasDescription.textContent = `Puntero sobre ${hoveredPlanet.name}. Haz clic para abrir más información.`;
      } else {
        canvasDescription.textContent = "Mapa estelar interactivo: Haz clic sobre Tatooine, Coruscant o Endor para abrir su ficha informativa.";
      }
    }
  }

  generateStars();
  drawMap();

  // Detección de posición del ratón
  function getCanvasCoordinates(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  }

  canvas.addEventListener("mousemove", function (event) {
    const coords = getCanvasCoordinates(event);
    let found = null;

    planets.forEach(function (planet) {
      const distance = Math.hypot(coords.x - planet.x, coords.y - planet.y);
      if (distance < 25) {
        found = planet;
      }
    });

    if (hoveredPlanet !== found) {
      hoveredPlanet = found;
      canvas.style.cursor = found ? "pointer" : "default";
      drawMap();
    }
  });

  canvas.addEventListener("mouseleave", function () {
    if (hoveredPlanet !== null) {
      hoveredPlanet = null;
      canvas.style.cursor = "default";
      drawMap();
    }
  });

  // Evento CLICK para abrir el modal del planeta seleccionado
  canvas.addEventListener("click", function (event) {
    const coords = getCanvasCoordinates(event);

    planets.forEach(function (planet) {
      const distance = Math.hypot(coords.x - planet.x, coords.y - planet.y);
      if (distance < 25) {
        const modalElement = document.getElementById(planet.modalId);
        if (modalElement && window.bootstrap) {
          const bsModal = new bootstrap.Modal(modalElement);
          bsModal.show();
        }
      }
    });
  });

  // Botón de redibujar mapa
  if (redrawButton) {
    redrawButton.addEventListener("click", function () {
      generateStars();
      hoveredPlanet = null;
      drawMap();
    });
  }
});


// Elemento interactivo 3: efecto jQuery para mostrar/ocultar una nota sobre licencias.
// HUGO: cambia este ejemplo por una interacción útil y comprueba que el estado se comunica de forma accesible.
$(function () {
  const note = $("<p>", {
    id: "licenseHint",
    text: "Pista: registra la fuente, autor, licencia y enlace de cada recurso multimedia."
  });
  note.attr("aria-live", "polite");
  $("#accesibilidad").append(note);

  $("<button>", {
    type: "button",
    class: "btn btn-outline-light mt-2",
    id: "toggleLicenseHint",
    text: "Mostrar u ocultar ayuda sobre licencias"
  }).insertBefore(note);

  $("#toggleLicenseHint").on("click", function () {
    note.toggle();
    const visible = note.is(":visible");
    $(this).attr("aria-expanded", String(visible));
    note.attr("aria-hidden", String(!visible));
  });
});
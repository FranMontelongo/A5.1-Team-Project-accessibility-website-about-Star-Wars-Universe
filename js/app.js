
/* FRANCISCO JAVIER: funciones interactivas de la página */

document.addEventListener("DOMContentLoaded", function () {

  /* 1. Lectura en voz alta */
  const readPageButton = document.getElementById("readPageButton");
  const readStatus = document.getElementById("readStatus");
  let leyendo = false;

   if (readButton && readStatus) {
    readButton.addEventListener("click", function () {
      if (!("speechSynthesis" in window)) {
        readStatus.textContent = "La lectura en voz alta no está disponible en este navegador.";
        return;
      }

      // Si ya está leyendo, detenemos la lectura.
      if (leyendo || window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        leyendo = false;
        readButton.textContent = "Leer página en voz alta";
        readStatus.textContent = "Lectura detenida.";
        return;
      }

      const main = document.querySelector("main");

      if (!main) {
        readStatus.textContent = "No se ha encontrado el contenido que se debe leer.";
        return;
      }

      const textToRead = main.innerText;
      const utterance = new SpeechSynthesisUtterance(textToRead);

      utterance.lang = "es-ES";

      utterance.onstart = function () {
        leyendo = true;
        readButton.textContent = "Detener lectura";
        readStatus.textContent = "Lectura en voz alta iniciada.";
      };

      utterance.onend = function () {
        leyendo = false;
        readButton.textContent = "Leer página en voz alta";
        readStatus.textContent = "Lectura terminada.";
      };

      utterance.onerror = function () {
        leyendo = false;
        readButton.textContent = "Leer página en voz alta";
        readStatus.textContent = "La lectura se ha detenido o ha ocurrido un error.";
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    });
  }

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

  if ($("#accesibilidad").length) {
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
  }
});
  
  if (readPageButton && readStatus) {

    readPageButton.addEventListener("click", function () {

      if (!("speechSynthesis" in window)) {
        readStatus.textContent =
          "La lectura en voz alta no está disponible en este navegador.";
        return;
      }

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        readPageButton.textContent = "Leer página en voz alta";
        readStatus.textContent = "Lectura detenida.";
      } else {
        const texto = document.querySelector("main").innerText;
        const lectura = new SpeechSynthesisUtterance(texto);

        lectura.lang = "es-ES";

        lectura.onend = function () {
          readPageButton.textContent = "Leer página en voz alta";
          readStatus.textContent = "Lectura terminada.";
        };

        window.speechSynthesis.speak(lectura);
        readPageButton.textContent = "Detener lectura";
        readStatus.textContent = "Leyendo la página.";
      }

    });

  }

  /* 2. Mapa estelar */
  const starCanvas = document.getElementById("starCanvas");
  const redrawCanvas = document.getElementById("redrawCanvas");

  function dibujarMapa() {

    if (!starCanvas) {
      return;
    }

    const contexto = starCanvas.getContext("2d");
    const ancho = starCanvas.width;
    const alto = starCanvas.height;

    contexto.clearRect(0, 0, ancho, alto);
    contexto.fillStyle = "#050914";
    contexto.fillRect(0, 0, ancho, alto);

    /* Dibujar estrellas */
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * ancho;
      const y = Math.random() * alto;
      const radio = Math.random() * 2 + 1;

      contexto.beginPath();
      contexto.arc(x, y, radio, 0, Math.PI * 2);
      contexto.fillStyle = "#ffffff";
      contexto.fill();
    }

    /* Planetas */
    const planetas = [
      { nombre: "Tatooine", x: 120, y: 160 },
      { nombre: "Naboo", x: 370, y: 90 },
      { nombre: "Hoth", x: 650, y: 190 }
    ];

    /* Conectar los planetas */
    contexto.strokeStyle = "#60a5fa";
    contexto.lineWidth = 2;
    contexto.beginPath();
    contexto.moveTo(planetas[0].x, planetas[0].y);
    contexto.lineTo(planetas[1].x, planetas[1].y);
    contexto.lineTo(planetas[2].x, planetas[2].y);
    contexto.stroke();

    /* Dibujar los planetas y sus nombres */
    planetas.forEach(function (planeta) {

      contexto.beginPath();
      contexto.arc(planeta.x, planeta.y, 12, 0, Math.PI * 2);
      contexto.fillStyle = "#ffe08a";
      contexto.fill();

      contexto.fillStyle = "#ffffff";
      contexto.font = "16px Arial";
      contexto.fillText(
        planeta.nombre,
        planeta.x - 35,
        planeta.y + 32
      );

    });

  }

  if (starCanvas) {
    dibujarMapa();
  }

  if (redrawCanvas) {
    redrawCanvas.addEventListener("click", dibujarMapa);
  }

  /* 3. Reproducción de tráileres de YouTube */

  const trailerModal = document.getElementById("trailerModal");
  const trailerFrame = document.getElementById("trailerVideo");
  const trailerTitle = document.getElementById("trailerModalTitle");
  const trailerButtons = document.querySelectorAll(".trailer-button");

  if (trailerModal && trailerFrame && trailerTitle) {

    trailerButtons.forEach(function (boton) {

      boton.addEventListener("click", function () {

        /* Obtener el enlace y el título del botón */
        const enlace = boton.getAttribute("data-video");
        const titulo = boton.getAttribute("data-title");

        if (!enlace || enlace.includes("ID_VIDEO_")) {
          alert("Añade un enlace válido de YouTube a este tráiler.");
          return;
        }

        /* Obtener el ID del vídeo a partir del enlace */
        let videoId = "";

        try {
          const url = new URL(enlace);

          if (url.hostname === "youtu.be") {
            videoId = url.pathname.substring(1);
          } else if (
            url.hostname.includes("youtube.com") &&
            url.pathname === "/watch"
          ) {
            videoId = url.searchParams.get("v");
          } else if (
            url.hostname.includes("youtube.com") &&
            url.pathname.startsWith("/embed/")
          ) {
            videoId = url.pathname.split("/")[2];
          }
        } catch (error) {
          videoId = "";
        }

        if (!videoId) {
          alert("El enlace de YouTube no es válido.");
          return;
        }

        /* Cambiar el título y cargar el vídeo */
        trailerTitle.textContent = titulo;

        trailerFrame.src =
          "https://www.youtube-nocookie.com/embed/" +
          encodeURIComponent(videoId) +
          "?autoplay=1";

        /* Abrir el modal de Bootstrap */
        const modal = bootstrap.Modal.getOrCreateInstance(trailerModal);
        modal.show();

      });

    });

    /* Detener el vídeo al cerrar el modal */
    trailerModal.addEventListener("hidden.bs.modal", function () {
      trailerFrame.src = "";
    });

  };

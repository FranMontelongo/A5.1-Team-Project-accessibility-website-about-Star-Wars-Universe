
/* FRANCISCO JAVIER: funciones interactivas de la página */

document.addEventListener("DOMContentLoaded", function () {

  /* 1. Lectura en voz alta */
  const readPageButton = document.getElementById("readPageButton");
  const readStatus = document.getElementById("readStatus");

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

  }

});

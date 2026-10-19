
/* HUGO EXPÓSITO: responsable de voz, audio/vídeo y un elemento interactivo con jQuery.
   Pista: prueba cada función con teclado y comprueba los mensajes accesibles. */

// Elemento interactivo 1: lectura en voz alta mediante SpeechSynthesis del navegador.
document.addEventListener("DOMContentLoaded", function () {
  const readButton = document.getElementById("readPageButton");
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

  // Elemento interactivo 2: dibujo básico de estrellas en canvas.
  // RICARDO LERMA: añade nombres de planetas, líneas de conexión y una descripción equivalente en texto.
  const canvas = document.getElementById("starCanvas");
  const redrawButton = document.getElementById("redrawCanvas");

  if (canvas && redrawButton) {
    const context = canvas.getContext("2d");

    function drawMap() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#050914";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Pista: cambia estas coordenadas o crea un array de estrellas para dibujar más puntos.
      const stars = [[70, 45], [180, 100], [320, 55], [420, 190], [610, 80], [700, 230], [250, 245]];
      context.fillStyle = "#ffffff";

      stars.forEach(function (star) {
        context.beginPath();
        context.arc(star[0], star[1], 2.5, 0, Math.PI * 2);
        context.fill();
      });

      context.strokeStyle = "#ffd166";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(180, 100);
      context.lineTo(420, 190);
      context.lineTo(610, 80);
      context.stroke();

      // RICARDO: añade etiquetas y actualiza #canvasDescription con los datos que dibujes.
    }

    drawMap();
    redrawButton.addEventListener("click", drawMap);
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

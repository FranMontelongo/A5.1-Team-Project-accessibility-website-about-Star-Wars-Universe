
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const grid = document.getElementById("shipsGrid");
    const status = document.getElementById("shipsStatus");
    const search = document.getElementById("shipSearch");

    let ships = [];

    const imagenes = {
        "CR90 corvette": "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Corvette-CHRON.jpg/revision/latest/scale-to-width-down/1000?cb=20171016160544",
        "Star Destroyer": "https://static.wikia.nocookie.net/esstarwars/images/a/a7/ISD_arrow.jpg/revision/latest?cb=20080723163844",
        "Sentinel-class landing craft": "https://static.wikia.nocookie.net/starwars-exodus/images/1/10/Sentinel-class_Landing_Craft.jpg/revision/latest?cb=20061026160527",
        "Death Star": "https://upload.wikimedia.org/wikipedia/commons/6/64/Lego_Death_Star.png?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=original",
        "Millennium Falcon": "https://upload.wikimedia.org/wikipedia/en/8/8d/A_screenshot_from_Star_Wars_Episode_IV_A_New_Hope_depicting_the_Millennium_Falcon.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
        "Y-wing": "https://upload.wikimedia.org/wikipedia/commons/0/02/Y-Wing.webp?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
        "X-wing": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa5uRNMKOq_Ie17hCFGUeXhU4Jm2C9kzcS_UMfHnKSdjI1FXz4P1FvA6qF&s=10",
        "TIE Advanced x1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZRP-HoRdusk4GAlf_b2DQk6b_s4mKQKZ1j9UjhdjSw&s=10",
        "Executor": "https://static.wikia.nocookie.net/starwars/images/3/30/Executor_BF2.png/revision/latest/scale-to-width-down/1200?cb=20230405071103",
        "Rebel transport": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-aoq2BWC_QOJq1kO8Mp3ljTsHNeCwsCo2Pky2LKG-udzqodt_tMvplok&s=10",
        "Slave 1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSADCxacry_GDXZYuxeDGXcS-DOdu0ktJ7ZZZrO-pkBqgp1WBv7CNsxqiRz&s=10",
        "Imperial shuttle": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3wweWVUhZzhIb1CMFvgZ95QtDj8VtoHEEhOzG-Uv5nqbW4nXL1HxmJfo&s=10",
        "EF76 Nebulon-B escort frigate": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc4pfyUiW64H1gTrYTB5NgOZ8JACDC3rpvGJJrJGtYCA&s=10",
        "Calamari Cruiser": "https://lumiere-a.akamaihd.net/v1/images/e6d_ia_2581_47f64de7.jpeg?region=165%2C0%2C1604%2C802",
        "A-wing": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiI_VLV4Rez_YtsFqIMMQ3U-mhK4em3aaJlZz4p9XUu-BO8LfR8FO4K58n&s=10",
        "B-wing": "https://static.wikia.nocookie.net/battlefront/images/0/01/Luke_Skywalkers_X-Wing.s.png/revision/latest?cb=20191231215328",
        "Republic Cruiser": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNGSJFeAzV-P_HWzAtM9GdF7DjM5LL6e7GTx-lAIV_aIcJeKO8Xvc2MYE&s=10",
        "Droid control ship": "https://static.wikia.nocookie.net/starwars/images/0/0a/Lucrehulk-Battlefront-2-Render.png/revision/latest?cb=20221114195931",
        "Naboo fighter": "https://static.wikia.nocookie.net/starwars/images/d/d3/N-1_BF2.png/revision/latest/scale-to-width-down/1200?cb=20170825000654",
        "Naboo Royal Starship": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXAgpyeDciHwY8BNPni8ruxtR51Sr3-llPbB-9g8C18LeMVjFfdQHolMk&s=10",
        "Scimitar": "https://static.wikia.nocookie.net/esstarwars/images/2/2e/Scimitar_BF2.png/revision/latest?cb=20170918195841",
        "J-type diplomatic barge": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXC_eDKO7hTLnmm42NVl0jVqGgSU6AxFtzcTf9g71YNIwGOXGcdE79LClG&s=10",
        "AA-9 Coruscant freighter": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSby1R1xgFXzExXVlVlSx5K8xlPwzp86Na62CCmjjwpKw1pwBwCl6ZldPsF&s=10",
        "Jedi starfighter": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN9z3qoPRirhmf_CG1gqLTyuJWJPiXxwOh9a-L8i1P_yiLT9AksHqnsbxC&s=10",
        "H-type Nubian yacht": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1IHEH63ZGA7R5ivIayzUPmi_sauOOZxeJLGLfZsEEpQ&s=10",
        "Republic Assault ship": "https://static.wikia.nocookie.net/starwars/images/f/fe/Acclamator_I_ships.png/revision/latest?cb=20201206074714",
        "Solar Sailer": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRW8HMq2AsVBhoXdqcj3HuFQHd6q3cEFg9vLHgD94X6TKdcKoIKrYVESw&s=10",
        "Trade Federation cruiser": "https://preview.redd.it/providence-class-dreadnought-size-v0-vok5velywxmc1.jpeg?auto=webp&s=13c82791650515fe506d7c9f5b707b05bd5bd5d2",
        "Theta-class T-2c shuttle": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkPoQkeDNZUXyqA1tEVudMcM9O-FMvbR8drSsIJ7R4XDnbiYu8BiXRdgI&s=10",
        "Republic attack cruiser": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBrjJl6bbWr6KpSh4LkFZ8zyMEcxFUrtzsJevaMMNI06DpGXDuZjNlcFTe&s=10",
        "Naboo star skiff": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_sUSe1SyX2pK_FMm30b7R4uS80e8Kp8_6sJWlGWPwdA&s=10",
        "Jedi Interceptor": "https://static.wikia.nocookie.net/esstarwars/images/9/97/Anakins_Eta-2_SWCT.png/revision/latest/scale-to-width-down/1200?cb=20171207164133",
        "arc-170": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv0L_tLoFJspwSwIrLUTmVtBw4yp1l5imuFfnqGa-2oQ&s=10",
        "Banking clan frigte": "https://static.wikia.nocookie.net/theclonewiki/images/1/1c/Frigate.jpg/revision/latest?cb=20140427210046",
        "Belbullab-22 starfighter": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyc3k2k6QwYZWHcec_PLjGvOQo1xeL6UumjWrz9AVmVw&s=10",
        "V-wing": "https://static.wikia.nocookie.net/starwars/images/a/a9/V-wing_BF2.png/revision/latest?cb=20170825000555"
    };

    
const sonidos = {
    "CR90 corvette": "assets/audio/cr90.mp3",
    "Star Destroyer": "assets/audio/stardestroyer.mp3",
    "Sentinel-class landing craft": "",
    "Death Star": "assets/audio/deathstar.mp3",
    "Millennium Falcon": "assets/audio/milleniumfalcon.mp3",
    "Y-wing": "",
    "X-wing": "",
    "TIE Advanced x1": "assets/audio/cazatie.mp3",
    "Executor": "",
    "Rebel transport": "",
    "Slave 1": "",
    "Imperial shuttle": "",
    "EF76 Nebulon-B escort frigate": "",
    "Calamari Cruiser": "",
    "A-wing": "",
    "B-wing": "",
    "Republic Cruiser": "",
    "Droid control ship": "",
    "Naboo fighter": "",
    "Naboo Royal Starship": "",
    "Scimitar": "",
    "J-type diplomatic barge": "",
    "AA-9 Coruscant freighter": "",
    "Jedi starfighter": "",
    "H-type Nubian yacht": "",
    "Republic Assault ship": "",
    "Solar Sailer": "",
    "Trade Federation cruiser": "",
    "Theta-class T-2c shuttle": "",
    "Republic attack cruiser": "",
    "Naboo star skiff": "",
    "Jedi Interceptor": "",
    "arc-170": "",
    "Banking clan frigte": "",
    "Belbullab-22 starfighter": "",
    "V-wing": ""
};


    const modal = document.createElement("dialog");
    modal.className = "ship-modal";
    modal.setAttribute("aria-labelledby", "shipModalTitle");
    modal.innerHTML = `
  <div class="ship-modal-content">
    <button class="ship-modal-close" type="button"
      aria-label="Cerrar ventana">&times;</button>
    <div id="shipModalContent"></div>
  </div>
`;

    document.body.appendChild(modal);

    const modalContent = document.getElementById("shipModalContent");

    modal.querySelector(".ship-modal-close").addEventListener("click", function () {
        modal.close();
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.close();
        }
    });

    function abrirModal(nave) {
        modalContent.replaceChildren();

        if (imagenes[nave.name]) {
            const imagen = document.createElement("img");
            imagen.className = "ship-modal-image";
            imagen.src = imagenes[nave.name];
            imagen.alt = "Imagen de " + nave.name;
            modalContent.appendChild(imagen);
        }

        const titulo = document.createElement("h2");
        titulo.id = "shipModalTitle";
        titulo.textContent = nave.name;
        modalContent.appendChild(titulo);

        const modelo = document.createElement("p");
        modelo.className = "ship-modal-model";
        modelo.textContent = nave.model || "Modelo desconocido";
        modalContent.appendChild(modelo);

        const detalles = document.createElement("dl");
        detalles.className = "ship-modal-details";

        const datos = [
            ["Fabricante", nave.manufacturer],
            ["Clase", nave.starship_class],
            ["Tripulación", nave.crew],
            ["Pasajeros", nave.passengers],
            ["Velocidad atmosférica", nave.max_atmosphering_speed],
            ["Coste en créditos", nave.cost_in_credits],
            ["Longitud", nave.length],
            ["Hiperimpulsor", nave.hyperdrive_rating],
            ["Capacidad de carga", nave.cargo_capacity],
            ["Autonomía", nave.consumables]
        ];

        datos.forEach(function (dato) {
            const fila = document.createElement("div");
            fila.className = "ship-modal-detail";

            const etiqueta = document.createElement("dt");
            etiqueta.textContent = dato[0];

            const valor = document.createElement("dd");
            valor.textContent = dato[1] || "Dato desconocido";

            fila.append(etiqueta, valor);
            detalles.appendChild(fila);
        });

        modalContent.appendChild(detalles);

        
const tituloSonido = document.createElement("h3");
tituloSonido.className = "ship-modal-audio-title";
tituloSonido.textContent = "Sonido de la nave";
modalContent.appendChild(tituloSonido);

if (sonidos[nave.name]) {
    const reproductor = document.createElement("audio");
    reproductor.controls = true;
    reproductor.preload = "none";
    reproductor.src = sonidos[nave.name];
    reproductor.setAttribute("aria-label", "Sonido de " + nave.name);
    modalContent.appendChild(reproductor);
} else {
    const aviso = document.createElement("p");
    aviso.textContent = "Sonido pendiente de añadir.";
    modalContent.appendChild(aviso);
}


        modal.showModal();
    }

    async function cargarNaves() {
        status.textContent = "Cargando naves...";
        grid.replaceChildren();

        try {
            const response = await fetch("https://swapi.info/api/starships");

            if (!response.ok) {
                throw new Error("Error al cargar la API");
            }

            ships = await response.json();
            mostrarNaves();
        } catch (error) {
            status.textContent = "No se han podido cargar las naves. Comprueba tu conexión.";
        }
    }

    function mostrarNaves() {
        const texto = search.value.toLowerCase().trim();

        const resultado = ships.filter(function (nave) {
            return nave.name.toLowerCase().includes(texto) ||
                nave.model.toLowerCase().includes(texto);
        });

        grid.replaceChildren();

        if (resultado.length === 0) {
            status.textContent = "No se han encontrado naves.";
            return;
        }

        status.textContent = "Naves encontradas: " + resultado.length;

        resultado.forEach(function (nave) {
            const card = document.createElement("article");
            card.className = "ship-card";

            const imagen = document.createElement("img");
            imagen.className = "ship-image";
            imagen.alt = "Imagen de " + nave.name;
            imagen.loading = "lazy";

            if (imagenes[nave.name]) {
                imagen.src = imagenes[nave.name];
            } else {
                imagen.classList.add("ship-image-empty");
                imagen.alt = "Imagen pendiente de añadir para " + nave.name;
            }

            const titulo = document.createElement("h3");
            titulo.textContent = nave.name;

            const modelo = document.createElement("p");
            modelo.className = "ship-model";
            modelo.textContent = "Modelo: " + nave.model;

            const fabricante = document.createElement("p");
            fabricante.textContent = "Fabricante: " + nave.manufacturer;

            const clase = document.createElement("p");
            clase.textContent = "Clase: " + nave.starship_class;

            const tripulacion = document.createElement("p");
            tripulacion.textContent = "Tripulación: " + nave.crew;

            const pasajeros = document.createElement("p");
            pasajeros.textContent = "Pasajeros: " + nave.passengers;

            const velocidad = document.createElement("p");
            velocidad.textContent =
                "Velocidad atmosférica: " + nave.max_atmosphering_speed;

            const coste = document.createElement("p");
            coste.textContent = "Coste: " + nave.cost_in_credits + " créditos";

            card.append(
                imagen,
                titulo,
                modelo,
                fabricante,
                clase,
                tripulacion,
                pasajeros,
                velocidad,
                coste
            );

            card.setAttribute("tabindex", "0");
            card.setAttribute("role", "button");
            card.setAttribute("aria-label", "Ver detalles de " + nave.name);

            card.addEventListener("click", function () {
                abrirModal(nave);
            });

            card.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    abrirModal(nave);
                }
            });

            grid.appendChild(card);
        });
    }

    search.addEventListener("input", mostrarNaves);

    cargarNaves();
});

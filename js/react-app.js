
/* FRANCISCO JAVIER: componente React de personajes */

const API_URL = "https://akabab.github.io/starwars-api/api/all.json";

function CharacterApp() {
  const [characters, setCharacters] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [side, setSide] = React.useState("");
  const [species, setSpecies] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  // Cargar personajes de la API
  React.useEffect(function () {
    fetch(API_URL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data.sort(function () {
          return Math.random() - 0.5;
        });

        setCharacters(data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Saber el bando de un personaje
  function obtenerBando(character) {
    const afiliaciones = (character.affiliations || []).join(" ").toLowerCase();

    if (afiliaciones.includes("sith")) {
      return "Sith";
    }

    if (afiliaciones.includes("jedi")) {
      return "Jedi";
    }

    if (afiliaciones.includes("rebel") || afiliaciones.includes("resistance")) {
      return "Rebelión";
    }

    if (afiliaciones.includes("empire") || afiliaciones.includes("first order")) {
      return "Imperio";
    }

    return "Otros";
  }

  // Filtrar personajes
  const filteredCharacters = characters.filter(function (character) {
    return (
      character.name.toLowerCase().includes(search.toLowerCase()) &&
      (side === "" || side === "Todos" || obtenerBando(character) === side) &&
      (species === "" || (character.species || "Desconocida") === species) &&
      (gender === "" || (character.gender || "Desconocido") === gender)
    );
  });

  // Mostrar 6 al principio y todos cuando se usan filtros
  let charactersToShow = filteredCharacters;

  if (search === "" && side === "" && species === "" && gender === "") {
    charactersToShow = filteredCharacters.slice(0, 6);
  }

  // Crear las listas de especies y géneros
  const speciesList = [];
  const genderList = [];

  characters.forEach(function (character) {
    const especie = character.species || "Desconocida";
    const genero = character.gender || "Desconocido";

    if (!speciesList.includes(especie)) {
      speciesList.push(especie);
    }

    if (!genderList.includes(genero)) {
      genderList.push(genero);
    }
  });

  return (
    <div>
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <label htmlFor="characterSearch" className="form-label">
            Buscar por nombre
          </label>

          <input
            id="characterSearch"
            type="search"
            className="form-control"
            placeholder="Ej.: Darth Vader"
            value={search}
            onChange={function (event) {
              setSearch(event.target.value);
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="sideFilter" className="form-label">
            Filtrar por bando
          </label>

          <select
            id="sideFilter"
            className="form-select"
            value={side}
            onChange={function (event) {
              setSide(event.target.value);
            }}
          >
            <option value="">Seleccionar...</option>
            <option value="Jedi">Jedi</option>
            <option value="Sith">Sith</option>
            <option value="Rebelión">Rebelión</option>
            <option value="Imperio">Imperio</option>
            <option value="Otros">Otros</option>
            <option value="Todos">Todos los personajes</option>
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="speciesFilter" className="form-label">
            Filtrar por especie
          </label>

          <select
            id="speciesFilter"
            className="form-select"
            value={species}
            onChange={function (event) {
              setSpecies(event.target.value);
            }}
          >
            <option value="">Seleccionar...</option>

            {speciesList.map(function (especie) {
              return (
                <option key={especie} value={especie}>
                  {especie}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="genderFilter" className="form-label">
            Filtrar por género
          </label>

          <select
            id="genderFilter"
            className="form-select"
            value={gender}
            onChange={function (event) {
              setGender(event.target.value);
            }}
          >
            <option value="">Seleccionar...</option>

            {genderList.map(function (genero) {
              return (
                <option key={genero} value={genero}>
                  {genero}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {loading && <p>Cargando personajes...</p>}

      {!loading && (
        <p aria-live="polite">
          Mostrando {charactersToShow.length} personajes.
        </p>
      )}

      {!loading && filteredCharacters.length === 0 && (
        <p>No se encontraron personajes.</p>
      )}

      <div className="row g-3">
        {!loading &&
          charactersToShow.map(function (character) {
            return (
              <div className="col-12 col-sm-6 col-md-4" key={character.id}>
                <article className="character-card h-100">
                  <img
                    className="character-image"
                    src={character.image}
                    alt={"Retrato de " + character.name}
                  />

                  <h3>{character.name}</h3>

                  <p><strong>Bando:</strong> {obtenerBando(character)}</p>
                  <p><strong>Especie:</strong> {character.species || "Desconocida"}</p>
                  <p><strong>Género:</strong> {character.gender || "Desconocido"}</p>
                  <p><strong>Planeta:</strong> {character.homeworld || "Desconocido"}</p>
                </article>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const appRoot = document.getElementById("character-app");

if (appRoot) {
  ReactDOM.createRoot(appRoot).render(<CharacterApp />);
}
/* FRANCISCO JAVIER: responsable del componente React (elemento interactivo obligatorio).
   Pista: añade personajes, completa los filtros y prueba el uso con teclado y lector de pantalla.
   Esta versión usa React desde CDN para que el proyecto inicial funcione sin instalar herramientas. */

const characters = [
  { name: "Leia Organa", side: "Rebelión", description: "Líder política y figura clave de la Rebelión." },
  { name: "Luke Skywalker", side: "Jedi", description: "Jedi que aprende a usar la Fuerza." },
  { name: "Darth Vader", side: "Imperio", description: "Figura central del Imperio Galáctico." }
];

function CharacterApp() {
  const [search, setSearch] = React.useState("");
  const [side, setSide] = React.useState("Todos");

  const filteredCharacters = characters.filter(function (character) {
    const matchesSearch = character.name.toLowerCase().includes(search.toLowerCase());
    const matchesSide = side === "Todos" || character.side === side;
    return matchesSearch && matchesSide;
  });

  return (
    <div>
      <div className="d-flex flex-wrap gap-3 mb-3">
        <div>
          <label htmlFor="characterSearch" className="form-label">Buscar personaje</label>
          <input id="characterSearch" type="search" value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Ej.: Leia" />
        </div>
        <div>
          <label htmlFor="sideFilter" className="form-label">Filtrar por grupo</label>
          <select id="sideFilter" value={side} onChange={(event) => setSide(event.target.value)}>
            <option>Todos</option>
            <option>Rebelión</option>
            <option>Jedi</option>
            <option>Imperio</option>
          </select>
        </div>
      </div>

      <p aria-live="polite" aria-atomic="true">
        Se muestran {filteredCharacters.length} personajes.
      </p>
      <div className="row g-3">
        {filteredCharacters.map(function (character) {
          return (
            <div className="col-md-4" key={character.name}>
              <article className="character-card h-100">
                <h3>{character.name}</h3>
                <p><strong>Grupo:</strong> {character.side}</p>
                <p>{character.description}</p>
              </article>
            </div>
          );
        })}
        {filteredCharacters.length === 0 && <p>No se encontraron personajes con esos filtros.</p>}
      </div>
      {/* FRANCISCO: posible mejora: añade un botón por tarjeta para ampliar información en un modal accesible. */}
    </div>
  );
}

const appRoot = document.getElementById("character-app");
if (appRoot && window.ReactDOM) {
  ReactDOM.createRoot(appRoot).render(<CharacterApp />);
}

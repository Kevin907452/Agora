import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarProfesor from "./NavbarProfesor.jsx";
import { NavbarEstudiante as MenuEstudiante } from "./indexestudiante.jsx";
import { modulos } from "../data/modulos.js";
import "./modulos.css";

function MenuOriginal() {
  const usuario = (() => {
    try {
      return JSON.parse(localStorage.getItem("usuario") || "null");
    } catch {
      return null;
    }
  })();
  return usuario?.rol === "profesor" ? <NavbarProfesor /> : <MenuEstudiante />;
}

import materialOriginal from "../data/materialOriginal.js"; // <-- Importa el material detallado

export function DetalleModulo() {
  const { id } = useParams();
  
  // Buscamos el módulo exacto usando el id numérico en materialOriginal
  const modulo = materialOriginal.find((m) => String(m.id) === String(id));

  return (
    <>
      <MenuOriginal />
      <main className="ag-modules ag-detail">
        <Link className="ag-back" to="/modulos">
          ← Volver a módulos
        </Link>
        {modulo ? (
          <section className="ag-detail-card">
            <img src={modulo.imagen} alt={modulo.title} />
            <div>
              <h1>{modulo.title}</h1>
              <p>{modulo.description}</p>

              {/* Lista dinámica exclusiva de los temas de ESTE módulo */}
              <div className="ag-topics-summary" style={{ marginTop: "16px", marginBottom: "20px" }}>
                <h3>Contenidos y Evaluaciones de este módulo:</h3>
                <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
                  {(modulo.topics || []).map((t) => (
                    <li key={t.id} style={{ marginBottom: "6px" }}>
                      <strong>{t.title}</strong> — {t.type === "quiz" ? "Prueba corta (Quiz)" : "Lectura y tarjetas flash"}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                {/* Redirige al aula pasando el ID exacto del módulo para que cargue solo su contenido */}
                <Link className="ag-enter" to={`/aula?modulo=${encodeURIComponent(modulo.id)}`}>
                  Ver lecciones y quizzes de este módulo ↗
                </Link>
                <Link className="ag-enter" to={`/modulos/${encodeURIComponent(modulo.id)}/juegos`}>
                  Ver juegos educativos ↗
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <p>Este módulo no se encuentra disponible.</p>
        )}
      </main>
    </>
  );
}

export default function Modulos() {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [giradas, setGiradas] = useState({});

  const categorias = ["Todos", ...new Set(modulos.map((m) => m.categoria).filter(Boolean))];
  const visibles = modulos.filter(
    (m) =>
      (filtro === "Todos" || m.categoria === filtro) &&
      `${m.titulo} ${m.descripcion} ${m.categoria || ""}`
        .toLocaleLowerCase("es")
        .includes(busqueda.trim().toLocaleLowerCase("es"))
  );

  function girar(id) {
    setGiradas((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <>
      <MenuOriginal />
      <main className="ag-modules">
        <header className="ag-heading">
          <div>
            <span className="ag-eyebrow">TU ESPACIO DE APRENDIZAJE</span>
            <h1>Explora los módulos</h1>
            <p>Elige un módulo y descubre lo que puedes aprender</p>
          </div>
          <div className="ag-heading-icon" aria-hidden="true"></div>
        </header>

        <section className="ag-tools" aria-label="Buscar y filtrar módulos">
          <label className="ag-search">
            <span aria-hidden="true">⌕</span>
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar un módulo..."
              aria-label="Buscar un módulo"
            />
          </label>
          {categorias.length > 2 && (
            <select
              className="ag-filter"
              aria-label="Filtrar módulos"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            >
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c === "Todos" ? "Todos los módulos" : c}
                </option>
              ))}
            </select>
          )}
        </section>

        <div className="ag-results">
          {visibles.length} {visibles.length === 1 ? "módulo disponible" : "módulos disponibles"}
        </div>

        {visibles.length ? (
          <div className="ag-grid">
            {visibles.map((m, i) => (
              <article className={`ag-card ${giradas[m.id] ? "is-flipped" : ""}`} key={m.id}>
                <div className="ag-card-inner">
                  <button
                    type="button"
                    className="ag-face ag-front"
                    onClick={() => girar(m.id)}
                    aria-label={`Ver descripción de ${m.titulo}`}
                    tabIndex={giradas[m.id] ? -1 : 0}
                    aria-hidden={giradas[m.id] ? "true" : undefined}
                  >
                    <img src={m.imagen} alt="" />
                    <div className="ag-image-tint" />
                    <span className="ag-module-number">MÓDULO {String(i + 1).padStart(2, "0")}</span>
                    <div className="ag-front-text">
                      <h2>{m.titulo}</h2>
                      <p>Descubrir módulo</p>
                    </div>
                  </button>
                  <div className="ag-face ag-rear" aria-hidden={!giradas[m.id] ? "true" : undefined}>
                    <span className="ag-rear-kicker">DESCUBRE MÁS</span>
                    <h2>{m.titulo}</h2>
                    <p>{m.descripcion}</p>
                    <div className="ag-card-actions">
                      <Link tabIndex={giradas[m.id] ? 0 : -1} className="ag-enter" to={`/modulos/${encodeURIComponent(m.id)}`}>
                        Entrar al módulo
                      </Link>
                      <button
                        tabIndex={giradas[m.id] ? 0 : -1}
                        type="button"
                        className="ag-turnback"
                        onClick={() => girar(m.id)}
                      >
                        Volver
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="ag-noresults">No encontramos módulos con esa búsqueda. Prueba con otra palabra.</div>
        )}
      </main>
    </>
  );
}
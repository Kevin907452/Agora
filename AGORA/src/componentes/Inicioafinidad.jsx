import React, { useState, useEffect, forwardRef } from 'react';
import Bandera from './Bandera';
import './quiz.css';
import { ColumnasAfinidad, Confeti } from './GraficosQuiz';

// =========================================================
// UTILIDADES Y OPCIONES DE LA ESCALA
// =========================================================
const OPCIONES = [
  { valor: 3, texto: "Totalmente de acuerdo", lado: "acuerdo", tamano: "grande" },
  { valor: 2, texto: "De acuerdo", lado: "acuerdo", tamano: "mediano" },
  { valor: 1, texto: "Algo de acuerdo", lado: "acuerdo", tamano: "pequeno" },
  { valor: 0, texto: "Neutral / Indiferente", lado: "neutral", tamano: "neutro" },
  { valor: -1, texto: "Algo en desacuerdo", lado: "desacuerdo", tamano: "pequeno" },
  { valor: -2, texto: "En desacuerdo", lado: "desacuerdo", tamano: "mediano" },
  { valor: -3, texto: "Totalmente en desacuerdo", lado: "desacuerdo", tamano: "grande" }
];

function opcionDe(valor) {
  return OPCIONES.find((o) => o.valor === Number(valor)) || { texto: "Sin responder", lado: "neutral" };
}

// =========================================================
// 1. PANTALLA INICIAL
// =========================================================
function InicioAfinidad({ carga, onComenzar, onReintentar }) {
  const { cargando, error, partidos, propuestas } = carga;
  const sinPropuestas = !cargando && !error && propuestas.length === 0;

  return (
    <section className="inicio gq-entrada">
      <div className="inicio-contenido">
        {error && (
          <div className="aviso" role="status">
            <p>
              <strong>Error de conexión:</strong> {error}
            </p>
            <button type="button" className="aviso-boton" onClick={onReintentar}>
              Reintentar
            </button>
          </div>
        )}

        <h1 className="inicio-titulo">¿Con cuál partido coincides más?</h1>

        {sinPropuestas ? (
          <p className="inicio-texto">
            Todavía no hay propuestas registradas en la base de datos. Cuando los partidos
            agreguen las suyas, el quiz aparecerá aquí.
          </p>
        ) : (
          <p className="inicio-texto">
            Vas a leer {cargando ? "las" : propuestas.length} propuestas sin
            saber qué partido las presentó. Marca qué tan de acuerdo estás con
            cada una y al final verás con cuál partido tienes más afinidad.
          </p>
        )}

        <button
          type="button"
          className="boton"
          onClick={onComenzar}
          disabled={cargando || sinPropuestas || !!error}
        >
          {cargando ? "Cargando propuestas…" : "Comenzar el quiz"}
        </button>
      </div>

      {partidos.length > 0 && (
        <ul className="inicio-banderas" aria-label="Partidos de esta elección">
          {partidos.map((partido) => (
            <li key={partido.id_partido} title={partido.nombre}>
              <Bandera partido={partido} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// =========================================================
// 2. COMPONENTE PREGUNTA INDIVIDUAL (CON ANIMACIONES RESTAURADAS)
// =========================================================
const Pregunta = forwardRef(function Pregunta(
  { propuesta, valor, falta, onResponder },
  ref
) {
  const id = propuesta.id_propuesta;

  const clases = ["pregunta", "pregunta--activa", "gq-entrada"];
  if (falta) clases.push("pregunta--falta");

  return (
    <div ref={ref} className={clases.join(" ")}>
      <h2 className="pregunta-titulo" id={`propuesta-${id}`}>
        {propuesta.titulo}
      </h2>
      {propuesta.descripcion && (
        <p className="pregunta-descripcion">{propuesta.descripcion}</p>
      )}

      <div
        className="escala"
        role="radiogroup"
        aria-labelledby={`propuesta-${id}`}
      >
        <span className="escala-extremo escala-extremo--acuerdo" aria-hidden="true">
          De acuerdo
        </span>

        <div className="escala-opciones gq-escalonado">
          {OPCIONES.map((opcion) => (
            <label
              key={opcion.valor}
              className={`opcion opcion--${opcion.lado} opcion--${opcion.tamano}`}
              title={opcion.texto}
            >
              <input
                type="radio"
                name={`propuesta-${id}`}
                value={opcion.valor}
                checked={Number(valor) === opcion.valor}
                aria-label={opcion.texto}
                onChange={() => onResponder(opcion.valor)}
              />
              <span className="opcion-circulo" aria-hidden="true" />
            </label>
          ))}
        </div>

        <span className="escala-extremo escala-extremo--desacuerdo" aria-hidden="true">
          En desacuerdo
        </span>
      </div>

      {falta && <p className="pregunta-aviso">Debes responder esta propuesta para continuar.</p>}
    </div>
  );
});

// =========================================================
// 3. PANTALLA RESULTADOS Y RANKING (CON CONFETI RESTAURADO)
// =========================================================
function Resultado({ ranking, respuestas, onRepetir }) {
  const [barrasListas, setBarrasListas] = useState(false);

  useEffect(() => {
    const espera = window.setTimeout(() => setBarrasListas(true), 80);
    return () => window.clearTimeout(espera);
  }, []);

  if (!ranking || ranking.length === 0) return null;

  const mejor = ranking[0].afinidad;
  const ganadores = ranking.filter((partido) => partido.afinidad === mejor);
  const hayEmpate = ganadores.length > 1;
  const ganador = ganadores[0];

  return (
    <section className="resultado gq-entrada">
      {/* Confeti restaurado y activo */}
      <Confeti activo={true} cantidad={40} />

      {hayEmpate ? (
        <div className="empate gq-zoom">
          <h1 className="empate-titulo">
            {ganadores.length === ranking.length
              ? `Tienes la misma afinidad con los ${ganadores.length} partidos`
              : `Tienes la misma afinidad con ${ganadores.length} partidos`}
          </h1>
          <p className="empate-texto">
            Coincides en un {mejor}% con las propuestas de cada uno.
          </p>
          <ul className="empate-lista">
            {ganadores.map((partido) => (
              <li key={partido.id_partido}>
                <Bandera partido={partido} />
                <span>{partido.nombre}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="ganador gq-zoom">
          <Bandera partido={ganador} className="ganador-bandera" />
          <div className="ganador-texto">
            <p className="ganador-entrada">Tu mayor afinidad es con</p>
            <h1 className="ganador-nombre">{ganador.nombre}</h1>
            <p className="ganador-afinidad">
              Coincides en un {ganador.afinidad}% con sus propuestas.
            </p>
          </div>
        </div>
      )}

      <h2 className="resultado-subtitulo">Tu afinidad con cada partido</h2>

      <ol className="ranking">
        {ranking.map((partido) => (
          <li key={partido.id_partido} className="ranking-partido">
            <Bandera partido={partido} className="ranking-bandera" />

            <div className="ranking-cuerpo">
              <div className="ranking-cabecera">
                <h3 className="ranking-nombre">{partido.nombre}</h3>
                <p className="ranking-porcentaje">{partido.afinidad}%</p>
              </div>

              <div className="ranking-barra" aria-hidden="true">
                <div
                  className="ranking-relleno"
                  style={{ width: barrasListas ? `${partido.afinidad}%` : "0%" }}
                />
              </div>

              {partido.propuestas && partido.propuestas.length > 0 && (
                <ul className="ranking-propuestas">
                  {partido.propuestas.map((propuesta) => {
                    const opcion = opcionDe(respuestas[propuesta.id_propuesta]);
                    return (
                      <li key={propuesta.id_propuesta}>
                        <span className="ranking-propuesta">{propuesta.titulo}</span>
                        <span className={`ranking-respuesta ranking-respuesta--${opcion.lado}`}>
                          {opcion.texto}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>

      <h2 className="gq-titulo-grafico-centrado">Comparación de afinidad</h2>
      <div style={{ marginTop: '1rem', marginBottom: '3rem' }}>
        <ColumnasAfinidad ranking={ranking} />
      </div>

      <div className="resultado-final">
        <button type="button" className="boton" onClick={onRepetir}>
          Repetir el quiz
        </button>
      </div>
    </section>
  );
}

// =========================================================
// CONTENEDOR PRINCIPAL DEL QUIZ
// =========================================================
export default function QuizAfinidad() {
  const [paso, setPaso] = useState("inicio");
  const [carga, setCarga] = useState({
    cargando: true,
    error: null,
    partidos: [],
    propuestas: []
  });

  const [respuestas, setRespuestas] = useState({});
  const [preguntaActiva, setPreguntaActiva] = useState(0);
  const [faltantes, setFaltantes] = useState([]);
  const [ranking, setRanking] = useState([]);

  const cargarDatos = async () => {
    setCarga((prev) => ({ ...prev, cargando: true, error: null }));

    try {
      const [resP, resPr] = await Promise.all([
        fetch("http://localhost:3000/api/partidos"),
        fetch("http://localhost:3000/api/propuestas")
      ]);

      const partidos = resP.ok ? await resP.json() : [];
      const propuestas = resPr.ok ? await resPr.json() : [];

      setCarga({
        cargando: false,
        error: null,
        partidos: Array.isArray(partidos) ? partidos : [],
        propuestas: Array.isArray(propuestas) ? propuestas : []
      });
    } catch (err) {
      console.error("Error al cargar datos del quiz:", err);
      setCarga({
        cargando: false,
        error: "No se pudo conectar con el servidor para cargar las propuestas.",
        partidos: [],
        propuestas: []
      });
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleResponder = (idPropuesta, valor) => {
    setRespuestas((prev) => ({
      ...prev,
      [idPropuesta]: Number(valor)
    }));
    setFaltantes((prev) => prev.filter((id) => id !== idPropuesta));
  };

  const calcularResultados = () => {
    const sinResponder = carga.propuestas.filter(
      (p) => respuestas[p.id_propuesta] === undefined
    );

    if (sinResponder.length > 0) {
      const primerFaltante = carga.propuestas.findIndex(
        (p) => p.id_propuesta === sinResponder[0].id_propuesta
      );
      if (primerFaltante !== -1) {
        setPreguntaActiva(primerFaltante);
      }
      setFaltantes(sinResponder.map((p) => p.id_propuesta));
      return;
    }

    const resultados = carga.partidos.map((partido) => {
      const propuestasPartido = carga.propuestas.filter(
        (p) => Number(p.id_partido) === Number(partido.id_partido)
      );

      if (propuestasPartido.length === 0) {
        return { ...partido, afinidad: 50, propuestas: [] };
      }

      let puntosObtenidos = 0;
      let puntosMaximos = propuestasPartido.length * 3;

      propuestasPartido.forEach((p) => {
        const resp = Number(respuestas[p.id_propuesta]) || 0;
        puntosObtenidos += Math.max(0, resp);
      });

      const afinidad = Math.round((puntosObtenidos / puntosMaximos) * 100);

      return {
        ...partido,
        afinidad: isNaN(afinidad) ? 0 : afinidad,
        propuestas: propuestasPartido
      };
    });

    resultados.sort((a, b) => b.afinidad - a.afinidad);

    setRanking(resultados);
    setPaso("resultado");
  };

  const handleRepetir = () => {
    setRespuestas({});
    setFaltantes([]);
    setPreguntaActiva(0);
    setPaso("inicio");
  };

  const totalPreguntas = carga.propuestas.length;
  const propuestaActual = carga.propuestas[preguntaActiva];

  const irAnterior = () => {
    if (preguntaActiva > 0) {
      setPreguntaActiva((prev) => prev - 1);
    }
  };

  return (
    <div className="quiz-contenedor-padre">
      {paso === "inicio" && (
        <InicioAfinidad
          carga={carga}
          onComenzar={() => setPaso("preguntas")}
          onReintentar={cargarDatos}
        />
      )}

      {paso === "preguntas" && propuestaActual && (
        <section className="seccion-preguntas gq-entrada">
          <h1 className="preguntas-titulo">Evalúa las propuestas</h1>
          <p className="preguntas-subtitulo">
            Selecciona tu postura para cada una de las propuestas.
          </p>

          <div className="progreso">
            <div
              className="progreso-barra"
              role="progressbar"
              aria-label="Progreso del quiz"
              aria-valuemin={0}
              aria-valuemax={totalPreguntas}
              aria-valuenow={preguntaActiva + 1}
            >
              <div
                className="progreso-relleno"
                style={{
                  width: `${Math.round(((preguntaActiva + 1) / totalPreguntas) * 100)}%`
                }}
              />
            </div>
            <p className="progreso-texto">
              Pregunta {preguntaActiva + 1} de {totalPreguntas}
            </p>
          </div>

          <div className="lista-preguntas">
            <Pregunta
              key={propuestaActual.id_propuesta}
              propuesta={propuestaActual}
              valor={respuestas[propuestaActual.id_propuesta]}
              falta={faltantes.includes(propuestaActual.id_propuesta)}
              onResponder={(val) => {
                handleResponder(propuestaActual.id_propuesta, val);
                if (preguntaActiva < totalPreguntas - 1) {
                  window.setTimeout(() => {
                    setPreguntaActiva((prev) => prev + 1);
                  }, 250);
                }
              }}
            />
          </div>

          <div className="preguntas-acciones">
            <button
              type="button"
              className="boton boton-anterior"
              onClick={irAnterior}
              disabled={preguntaActiva === 0}
            >
              Anterior
            </button>

            {preguntaActiva === totalPreguntas - 1 && (
              <button
                type="button"
                className="boton boton-resultado"
                onClick={calcularResultados}
              >
                Ver mis resultados
              </button>
            )}
          </div>
        </section>
      )}

      {paso === "resultado" && (
        <Resultado
          ranking={ranking}
          respuestas={respuestas}
          onRepetir={handleRepetir}
        />
      )}
    </div>
  );
}
import { useState, useEffect } from "react";
import "./trivia.css";

// Banco de preguntas organizadas exactamente por el ID de cada tarjeta de módulo (1 al 6)
const bancoPreguntasPorModulo = {
  1: [ // Deberes ciudadanos
    {
      pregunta: "¿Qué implica principal y directamente cumplir con un deber ciudadano?",
      opciones: ["Ignorar las leyes del país", "Asumir responsabilidades cívicas para la convivencia", "Tener solo privilegios sin obligaciones", "Ceder la libertad al Estado"],
      correcta: 1
    },
    {
      pregunta: "¿Por qué son importantes las responsabilidades dentro de una comunidad?",
      opciones: ["Porque garantizan el orden y el respeto mutuo", "Porque eliminan la necesidad de votar", "Porque evitan que existan leyes", "Porque restringen los derechos"],
      correcta: 0
    },
    {
      pregunta: "Una actitud contraria a los deberes ciudadanos sería:",
      opciones: ["Participar constructivamente", "Respetar los espacios públicos", "Vandalizar la propiedad común", "Practicar la tolerancia"],
      correcta: 2
    }
  ],
  2: [ // Valores ciudadanos
    {
      pregunta: "¿Cuál es un valor democrático fundamental en la sociedad costarricense?",
      opciones: ["El autoritarismo", "La tolerancia y la paz", "El individualismo extremo", "El secreto absoluto"],
      correcta: 1
    },
    {
      pregunta: "Los valores democráticos fomentan principalmente:",
      opciones: ["La imposición de ideas por la fuerza", "La convivencia armónica y el respeto a la diversidad", "La división absoluta de las comunidades", "La discriminación institucional"],
      correcta: 1
    },
    {
      pregunta: "¿Qué rol juega el respeto mutuo en la ciudadanía?",
      opciones: ["Es la base para que florezcan los derechos de todos", "Es irrelevante para la política", "Solo aplica en época de elecciones", "Impide la libre expresión"],
      correcta: 0
    }
  ],
  3: [ // Historia de la democracia en Costa Rica
    {
      pregunta: "¿Qué fecha histórica en Costa Rica es considerada un hito de las libertades públicas y electorales?",
      opciones: ["15 de setiembre de 1821", "7 de noviembre de 1889", "11 de abril de 1856", "25 de julio de 1824"],
      correcta: 1
    },
    {
      pregunta: "¿En qué año se promulgó la Constitución Política vigente en Costa Rica?",
      opciones: ["1821", "1949", "1989", "2000"],
      correcta: 1
    },
    {
      pregunta: "La conquista del sufragio femenino en nuestra historia garantizó:",
      opciones: ["Que solo votaran los varones mayores de edad", "El derecho al voto y la participación política activa de las mujeres", "La supresión del Tribunal Supremo de Elecciones", "El fin de los partidos políticos"],
      correcta: 1
    }
  ],
  4: [ // Por qué la democracia y la política son importantes
    {
      pregunta: "¿En quién reside la soberanía popular según el marco democrático costarricense?",
      opciones: ["En el Presidente exclusivamente", "En el pueblo", "En las fuerzas armadas", "En los organismos internacionales"],
      correcta: 1
    },
    {
      pregunta: "El principio del Estado de Derecho establece que:",
      opciones: ["Gobernantes y ciudadanos están subordinados por igual a la ley", "El mandatario de turno puede violar las leyes", "Las normas no se aplican a los funcionarios públicos", "Los jueces deciden sin basarse en reglas"],
      correcta: 0
    },
    {
      pregunta: "¿Por qué es crucial la participación política cotidiana?",
      opciones: ["Para influir en las decisiones que afectan el bienestar común", "Para buscar privilegios personales", "Para evitar que existan leyes", "Para sustituir al Poder Judicial"],
      correcta: 0
    }
  ],
  5: [ // Funcionamiento de los tres poderes
    {
      pregunta: "¿Quiénes integran principalmente el Poder Ejecutivo en Costa Rica?",
      opciones: ["Los 57 Diputados", "El Presidente, los Vicepresidentes y los Ministros de Gobierno", "Los Magistrados de la Corte Suprema", "Los Alcaldes municipales"],
      correcta: 1
    },
    {
      pregunta: "¿Dónde se ubica la sede principal del Poder Legislativo (Asamblea Legislativa)?",
      opciones: ["Casa Presidencial en Zapote", "Cuesta de Moras en San José", "Barrio González Lahmann", "El edificio de la Corte"],
      correcta: 1
    },
    {
      pregunta: "La función primordial del Poder Judicial es:",
      opciones: ["Redactar el Presupuesto Nacional", "Administrar justicia de manera imparcial y hacer cumplir las leyes", "Aprobar los proyectos de ley", "Dirigir la política exterior"],
      correcta: 1
    }
  ],
  6: [ // Organización del gobierno
    {
      pregunta: "¿Cuál es el órgano independiente encargado de organizar y garantizar los procesos electorales en Costa Rica?",
      opciones: ["El Ministerio de Hacienda", "El Tribunal Supremo de Elecciones (TSE)", "La Presidencia de la República", "La Contraloría General"],
      correcta: 1
    },
    {
      pregunta: "El deber ético supremo de las autoridades gubernamentales es:",
      opciones: ["Servir al pueblo y velar por el bienestar común", "Beneficiar a un grupo selecto", "Perpetuarse en el poder sin elecciones", "Ocultar la información pública"],
      correcta: 0
    },
    {
      pregunta: "La alternancia periódica en el ejercicio del poder busca:",
      opciones: ["Evitar la concentración de poder renovando a los gobernantes de forma pacífica", "Aumentar los impuestos anualmente", "Impedir la participación ciudadana", "Eliminar los gobiernos locales"],
      correcta: 0
    }
  ]
};

const preguntasGenerales = [
  {
    pregunta: "¿Qué es la democracia?",
    opciones: ["El gobierno de una sola persona", "Un sistema donde participan los ciudadanos", "Eliminar las elecciones", "No tener leyes"],
    correcta: 1
  },
  {
    pregunta: "¿Qué permite el voto?",
    opciones: ["Participar en decisiones políticas", "Eliminar derechos", "Evitar elecciones", "Quitar leyes"],
    correcta: 0
  },
  {
    pregunta: "¿Qué es un ciudadano?",
    opciones: ["Una persona sin derechos", "Un partido político", "Una institución", "Una persona con derechos y responsabilidades"],
    correcta: 3
  }
];

function Trivia({ idModulo = 1, volver }) {
  // Convertimos a número por seguridad para que coincida exactamente con las llaves del objeto
  const moduloKey = Number(idModulo) || 1;
  const preguntasActuales = bancoPreguntasPorModulo[moduloKey] || preguntasGenerales;

  const [preguntas, setPreguntas] = useState(preguntasActuales);
  const [actual, setActual] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [puntos, setPuntos] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(6);

  // Cada vez que cambie `idModulo` desde la vista exterior, actualizamos el banco al instante
  useEffect(() => {
    const nuevas = bancoPreguntasPorModulo[Number(idModulo)] || preguntasGenerales;
    setPreguntas(nuevas);
    setActual(0);
    setPuntos(0);
    setResultado(null);
    setTerminado(false);
    setTiempoRestante(6);
  }, [idModulo]);

  const pregunta = preguntas[actual] || preguntas[0];
  const puntajeMaximo = preguntas.length * 10;

  // Manejo del cronómetro de cada pregunta
  useEffect(() => {
    if (terminado || resultado !== null) return;

    if (tiempoRestante === 0) {
      setResultado(-1); // Tiempo agotado
      const temporizadorSiguiente = setTimeout(() => {
        siguiente();
      }, 1200);
      return () => clearTimeout(temporizadorSiguiente);
    }

    const timer = setInterval(() => {
      setTiempoRestante((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [tiempoRestante, terminado, resultado]);

  if (terminado) {
    return (
      <div className="trivia-card-final">
        <div className="trivia-box-final">
          <h1 className="titulo-final">Juego terminado</h1>

          <p className="puntaje-final">Puntaje: {puntos}/{puntajeMaximo}</p>

          <p className="mensaje-final">
            {puntos === puntajeMaximo
              ? "¡Excelente! Dominaste por completo este módulo."
              : puntos >= (puntajeMaximo * 0.6)
              ? "¡Muy bien! Tienes buenos conocimientos del módulo."
              : "Debes repasar un poco más e intentarlo de nuevo."}
          </p>

          <button
            onClick={() => {
              setActual(0);
              setPuntos(0);
              setResultado(null);
              setTerminado(false);
              setTiempoRestante(6);
            }}
            className="btn-accion-principal"
          >
            Volver a jugar
          </button>

          <button
            onClick={volver}
            className="btn-accion-principal"
            style={{ marginTop: "1rem", backgroundColor: "#39265c" }}
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  function siguiente() {
    if (actual < preguntas.length - 1) {
      setActual((prev) => prev + 1);
      setResultado(null);
      setTiempoRestante(6);
    } else {
      setTerminado(true);
    }
  }

  function responder(index) {
    if (resultado !== null) return;

    setResultado(index);

    if (index === pregunta.correcta) {
      setPuntos((prev) => prev + 10);
    }
  }

  // Mensajes textuales para los últimos 3 segundos
  let mensajeTiempo = "";
  if (tiempoRestante === 3) mensajeTiempo = "¡Piensa rápido!";
  if (tiempoRestante === 2) mensajeTiempo = "¡Ya casi se acaba el tiempo!";
  if (tiempoRestante === 1) mensajeTiempo = "¡Último segundo!";
  if (tiempoRestante === 0) mensajeTiempo = "¡Tiempo agotado!";

  // Cálculo del porcentaje consumido para el anillo morado
  const porcentajeTiempo = ((6 - tiempoRestante) / 6) * 360;

  return (
    <div className="trivia-container">
      <button onClick={volver} className="btn-volver">
        Volver
      </button>

      {/* CRONÓMETRO Y ADVERTENCIA UBICADOS ARRIBA */}
      <div className="cronometro-wrapper">
        <div
          className="cronometro-circulo"
          style={{
            background: `conic-gradient(#8D7BE8 ${porcentajeTiempo}deg, #ffffff 0deg)`
          }}
        >
          <div className={`cronometro-interno ${tiempoRestante <= 3 ? "cronometro-alerta" : "cronometro-normal"}`}>
            {tiempoRestante}
          </div>
        </div>

        {mensajeTiempo && (
          <div className={`alerta-tiempo-badge ${tiempoRestante === 0 ? "alerta-agotado" : "alerta-advertencia"}`}>
            {mensajeTiempo}
          </div>
        )}
      </div>

      {/* CONTENEDOR PRINCIPAL DE LA TRIVIA */}
      <div className="agora-trivia-card">
        <h1 className="agora-trivia-titulo">
          { "Trivia"}
        </h1>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <p className="agora-trivia-puntos" style={{ margin: 0 }}>
            Puntaje: {puntos}
          </p>
          <p className="agora-trivia-progreso" style={{ margin: 0 }}>
            Pregunta {actual + 1} de {preguntas.length}
          </p>
        </div>

        <h2 className="agora-trivia-pregunta">{pregunta.pregunta}</h2>

        <div className="trivia-opciones-space">
          {pregunta.opciones.map((opcion, index) => {
            let claseEstado = "";

            if (resultado !== null && resultado >= 0) {
              if (index === pregunta.correcta) {
                claseEstado = "correcta";
              } else if (resultado === index) {
                claseEstado = "incorrecta";
              }
            } else if (resultado === -1 && index === pregunta.correcta) {
              claseEstado = "correcta";
            }

            return (
              <button
                key={index}
                onClick={() => responder(index)}
                className={`trivia-opcion-btn ${claseEstado}`}
                disabled={resultado !== null}
              >
                {opcion}
              </button>
            );
          })}
        </div>

        <button
          onClick={siguiente}
          disabled={resultado === null}
          className="btn-accion-principal"
          style={{ marginTop: "15px" }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Trivia;
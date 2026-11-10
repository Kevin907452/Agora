import { useState, useEffect } from "react";
import "./verdaderoofalso.css";

// Banco de casos de Verdadero o Falso organizados por ID de Módulo (1 a 6)
const bancoFalsoVerdaderoPorModulo = {
  1: [ // Módulo 1: Deberes ciudadanos
    {
      caso: "Un ciudadano decide pagar sus impuestos a tiempo y cuidar los espacios públicos de su comunidad.",
      pregunta: "¿Esta actitud representa el cumplimiento de un deber ciudadano?",
      respuesta: true
    },
    {
      caso: "Una persona cree que las leyes solo aplican para los demás y que él puede ignorarlas sin consecuencias.",
      pregunta: "¿Esta conducta es coherente con una ciudadanía responsable?",
      respuesta: false
    },
    {
      caso: "Los deberes cívicos son tan importantes como los derechos porque permiten una convivencia ordenada.",
      pregunta: "¿Esta afirmación es verdadera?",
      respuesta: true
    }
  ],
  2: [ // Módulo 2: Valores ciudadanos
    {
      caso: "En una discusión escolar, un estudiante tolera las opiniones de sus compañeros aunque no piense igual.",
      pregunta: "¿El respeto y la tolerancia son valores democráticos esenciales?",
      respuesta: true
    },
    {
      caso: "Un grupo de vecinos decide imponer su postura por la fuerza sin escuchar a la minoría afectada.",
      pregunta: "¿Esta acción refleja los valores fundamentales de la democracia?",
      respuesta: false
    },
    {
      caso: "La solidaridad y el diálogo constructivo ayudan a fortalecer la paz en la comunidad.",
      pregunta: "¿Es correcto afirmar esto?",
      respuesta: true
    }
  ],
  3: [ // Módulo 3: Historia de la democracia en Costa Rica
    {
      pregunta: "¿La fecha del 7 de noviembre de 1889 es considerada un hito histórico en Costa Rica por la defensa de las libertades públicas?",
      caso: "Se conmemora el respeto a la voluntad popular y cívica en la historia del país.",
      respuesta: true
    },
    {
      caso: "La Constitución Política de 1949 mantuvo la exclusión del voto para las mujeres durante varias décadas más.",
      pregunta: "¿Es verdadero este hecho histórico?",
      respuesta: false
    },
    {
      pregunta: "¿La abolición del ejército en 1948 permitió destinar mayores recursos a la educación y la salud?",
      caso: "Costa Rica decidió disolver sus fuerzas militares constitucionalmente.",
      respuesta: true
    }
  ],
  4: [ // Módulo 4: Por qué la democracia y la política son importantes
    {
      caso: "Un ciudadano afirma que no vale la pena informarse sobre las propuestas de gobierno porque su opinión no cuenta.",
      pregunta: "¿Esta idea fortalece la participación y el control democrático?",
      respuesta: false
    },
    {
      pregunta: "¿El principio de igualdad ante la ley garantiza que gobernantes y ciudadanos deben respetar las mismas normas?",
      caso: "Nadie está por encima de la ley en un Estado de Derecho.",
      respuesta: true
    },
    {
      caso: "La rendición de cuentas y la transparencia sirven únicamente para entorpecer el trabajo del gobierno.",
      pregunta: "¿Es correcta esta afirmación?",
      respuesta: false
    }
  ],
  5: [ // Módulo 5: Funcionamiento de los tres poderes
    {
      caso: "La Asamblea Legislativa (Poder Legislativo) tiene como función principal redactar, discutir y aprobar las leyes de la República.",
      pregunta: "¿Esta atribución corresponde a dicho poder?",
      respuesta: true
    },
    {
      caso: "Los Magistrados de la Corte Suprema de Justicia son los encargados de dirigir el Poder Ejecutivo y los ministerios.",
      pregunta: "¿Es correcta la función descrita para el Poder Judicial?",
      respuesta: false
    },
    {
      pregunta: "¿El Poder Ejecutivo está conformado por el Presidente de la República, los Vicepresidentes y los Ministros?",
      caso: "Se encargan de la administración general y la política pública del país.",
      respuesta: true
    }
  ],
  6: [ // Módulo 6: Organización del gobierno
    {
      pregunta: "¿El Tribunal Supremo de Elecciones (TSE) es un organismo independiente encargado de garantizar la transparencia de los comicios?",
      caso: "Organiza y vigila los procesos electorales en Costa Rica.",
      respuesta: true
    },
    {
      caso: "La alternancia en el poder significa que un gobernante puede reelegirse de forma indefinida cuantas veces quiera sin votaciones.",
      pregunta: "¿Representa esto un principio democrático?",
      respuesta: false
    },
    {
      pregunta: "¿Las municipalidades forman parte del régimen municipal y atienden los servicios locales de cada cantón?",
      caso: "Gobiernan de manera descentralizada a nivel local.",
      respuesta: true
    }
  ]
};

// Casos generales por defecto si no se recibe un idModulo
const preguntasGenerales = [
  {
    caso: "Carlos vota en las elecciones para elegir a sus representantes.",
    pregunta: "¿El voto es una forma de participación ciudadana?",
    respuesta: true
  },
  {
    caso: "Un gobierno elimina las elecciones y permite que una sola persona tome todas las decisiones.",
    pregunta: "¿Este sistema representa una democracia?",
    respuesta: false
  }
];

function VerdaderoFalso({ idModulo = 1, volver }) {
  const moduloKey = Number(idModulo) || 1;
  const preguntasModuloActual = bancoFalsoVerdaderoPorModulo[moduloKey] || preguntasGenerales;

  const [preguntas, setPreguntas] = useState(preguntasModuloActual);
  const [actual, setActual] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [puntos, setPuntos] = useState(0);
  const [terminado, setTerminado] = useState(false);

  // Sincroniza y reinicia el juego al cambiar de módulo desde la vista externa
  useEffect(() => {
    const nuevasPreguntas = bancoFalsoVerdaderoPorModulo[Number(idModulo)] || preguntasGenerales;
    setPreguntas(nuevasPreguntas);
    setActual(0);
    setRespuesta(null);
    setPuntos(0);
    setTerminado(false);
  }, [idModulo]);

  const preguntaActual = preguntas[actual] || preguntas[0];
  const puntajeMaximo = preguntas.length * 10;

  function responder(valor) {
    if (respuesta !== null) {
      return;
    }

    setRespuesta(valor);

    if (valor === preguntaActual.respuesta) {
      setPuntos(puntos + 10);
    }
  }

  function siguiente() {
    if (actual < preguntas.length - 1) {
      setActual(actual + 1);
      setRespuesta(null);
    } else {
      setTerminado(true);
    }
  }

  function volverAJugar() {
    setActual(0);
    setRespuesta(null);
    setPuntos(0);
    setTerminado(false);
  }

  if (terminado) {
    return (
      <div className="vf-card-final">
        <div className="vf-box-final">
          <h1 className="titulo-final">
            Juego terminado
          </h1>

          <p className="puntaje-final">
            Puntaje: {puntos}/{puntajeMaximo}
          </p>

          <p className="mensaje-final">
            {puntos === puntajeMaximo
              ? "¡Excelente análisis! Dominaste este módulo."
              : puntos >= (puntajeMaximo * 0.6)
              ? "Muy bien, tienes buenos conocimientos."
              : "Debes repasar un poco más el contenido."}
          </p>

          <button onClick={volverAJugar} className="btn-accion-principal">
            Volver a jugar
          </button>

          <button
            onClick={volver}
            className="btn-accion-principal"
            style={{ marginTop: "0.75rem", backgroundColor: "#39265c" }}
          >
            Volver a juegos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vf-container">
      <button onClick={volver} className="btn-volver">
        Volver
      </button>

      <div className="agora-vf-card">
        <h1 className="agora-vf-titulo">
          {idModulo ? `Verdadero o Falso - Módulo ${idModulo}` : "Verdadero o Falso"}
        </h1>

        <p className="agora-vf-puntos">
          Puntaje: {puntos}
        </p>

        <p className="agora-vf-progreso">
          Caso {actual + 1} de {preguntas.length}
        </p>

        <div className="vf-caso-box">
          <h2 className="vf-caso-titulo">Situación:</h2>
          <p className="vf-caso-texto">{preguntaActual.caso}</p>
        </div>

        <h3 className="agora-vf-pregunta">
          {preguntaActual.pregunta}
        </h3>

        <div className="vf-botones-group">
          <button
            onClick={() => responder(true)}
            className={`btn-vf-opcion ${
              respuesta === true
                ? preguntaActual.respuesta === true
                  ? "correcta"
                  : "incorrecta"
                : "btn-verdadero"
            }`}
          >
            Verdadero
          </button>

          <button
            onClick={() => responder(false)}
            className={`btn-vf-opcion ${
              respuesta === false
                ? preguntaActual.respuesta === false
                  ? "correcta"
                  : "incorrecta"
                : "btn-falso"
            }`}
          >
            Falso
          </button>
        </div>

        {respuesta !== null && (
          <div className="vf-feedback-box">
            {respuesta === preguntaActual.respuesta ? (
              <p className="vf-feedback-correcto">¡Correcto!</p>
            ) : (
              <p className="vf-feedback-incorrecto">Incorrecto</p>
            )}

            <p className="vf-feedback-solucion">
              La respuesta correcta es:{" "}
              {preguntaActual.respuesta ? "Verdadero" : "Falso"}
            </p>
          </div>
        )}

        <button
          onClick={siguiente}
          disabled={respuesta === null}
          className="btn-accion-principal"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default VerdaderoFalso;
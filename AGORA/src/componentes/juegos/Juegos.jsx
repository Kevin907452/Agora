import { useState, useCallback } from "react";
import { useParams } from "react-router-dom"; // <-- 1. Importamos useParams
import "./juegos.css";

import Trivia from "./Trivia";
import Memoria from "./Memoria";
import VerdaderoFalso from "./VerdaderoFalso";

function Juegos({ volver }) {
  const { id } = useParams(); // <-- 2. Capturamos el id del módulo de la URL (ej: /modulos/3/juegos -> id = 3)
  const moduloActual = Number(id) || 1;

  const [juegoActual, setJuegoActual] = useState("menu");

  const attrStringIconos =
    '{"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#000000FF","group-2":"#8D7BE8FF","background":"#FFFFFF00"}}';

  const setIconAttrs = useCallback((node) => {
    if (node) {
      node.setAttribute("attributes", attrStringIconos);
    }
  }, []);

  if (juegoActual === "trivia") {
    // <-- 3. Le pasamos rigurosamente el id del módulo actual a la Trivia
    return <Trivia idModulo={moduloActual} volver={() => setJuegoActual("menu")} />;
  }

  if (juegoActual === "memoria") {
    return <Memoria modulo={moduloActual} volver={() => setJuegoActual("menu")} />;
  }

  if (juegoActual === "verdadero") {
    return <VerdaderoFalso idModulo={moduloActual} volver={() => setJuegoActual("menu")} />;
  }

  const juegos = [
    {
      id: "trivia",
      nombre: "Trivia",
      descripcion: "Piensa rápido",
      srcIcono: "https://animatedicons.co/get-icon?name=Academic%20Background&style=minimalistic&token=fcb0569d-9cc8-4c8a-bbfa-cf46744e4770",
    },
    {
      id: "memoria",
      nombre: "Memoria Ciudadana",
      descripcion: "Encuentra las parejas correctas.",
      srcIcono: "https://animatedicons.co/get-icon?name=Imaginary&style=minimalistic&token=52c73b94-1f22-4341-babe-ce7b65f7ae66",
    },
    {
      id: "verdadero",
      nombre: "Verdadero o Falso",
      descripcion: "Demuestra cuánto sabes.",
      srcIcono: "https://animatedicons.co/get-icon?name=gamepad&style=minimalistic&token=5b345b64-c0a8-4206-aff6-409a8aa938fa",
    },
  ];

  return (
    <div className="agora-juegos-container">
      <header className="agora-header">
        <h1 className="agora-titulo-header">
          Sala de Juegos
        </h1>
      </header>

      <main className="agora-main-grid">
        {juegos.map((juego, index) => (
          <div key={index} className="agora-tarjeta">
            <div className="agora-icono-box">
              <animated-icons
                ref={setIconAttrs}
                src={juego.srcIcono}
                trigger="loop"
                height="120"
                width="120"
              ></animated-icons>
            </div>

            <h2 className="agora-tarjeta-titulo">{juego.nombre}</h2>
            <p className="agora-tarjeta-desc">{juego.descripcion}</p>

            <button
              onClick={() => setJuegoActual(juego.id)}
              className="agora-btn-jugar"
            >
              Jugar
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Juegos;
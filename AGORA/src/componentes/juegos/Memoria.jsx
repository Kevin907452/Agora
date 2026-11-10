import { useState } from "react";
import "./memoria.css";


import m1_1 from "./iconos/democracia.png";
import m1_2 from "./iconos/voto.png";
import m1_3 from "./iconos/justicia.png";
import m1_4 from "./iconos/ley.png";
import m1_5 from "./iconos/ciudadano.png";
import m1_6 from "./iconos/gobierno.png";
import m1_7 from "./iconos/participacion.png";
import m1_8 from "./iconos/constitucion.png";


import m2_1 from "./iconos/v1.png";
import m2_2 from "./iconos/v2.png";
import m2_3 from "./iconos/v3.png";
import m2_4 from "./iconos/v4.png";
import m2_5 from "./iconos/v5.png";
import m2_6 from "./iconos/v6.png";
import m2_7 from "./iconos/v7.png";
import m2_8 from "./iconos/v8.png";


import m3_1 from "./iconos/h1.png";
import m3_2 from "./iconos/h2.png";
import m3_3 from "./iconos/h3.png";
import m3_4 from "./iconos/h4.png";
import m3_5 from "./iconos/h5.png";
import m3_6 from "./iconos/h6.png";
import m3_7 from "./iconos/h7.png";
import m3_8 from "./iconos/h8.png";


import m4_1 from "./iconos/d1.png";
import m4_2 from "./iconos/d2.png";
import m4_3 from "./iconos/d3.png";
import m4_4 from "./iconos/d4.png";
import m4_5 from "./iconos/d5.png";
import m4_6 from "./iconos/d6.png";
import m4_7 from "./iconos/d7.png";
import m4_8 from "./iconos/d8.png";


import m5_1 from "./iconos/t1.png";
import m5_2 from "./iconos/t2.png";
import m5_3 from "./iconos/t3.png";
import m5_4 from "./iconos/t4.png";
import m5_5 from "./iconos/t5.png";
import m5_6 from "./iconos/t6.png";
import m5_7 from "./iconos/t7.png";
import m5_8 from "./iconos/t8.png";

import m6_1 from "./iconos/g1.png";
import m6_2 from "./iconos/g2.png";
import m6_3 from "./iconos/g3.png";
import m6_4 from "./iconos/g4.png";
import m6_5 from "./iconos/g5.png";
import m6_6 from "./iconos/g6.png";
import m6_7 from "./iconos/g7.png";
import m6_8 from "./iconos/g8.png";

const obtenerCartasPorModulo = (modulo) => {
  let iconosValores = [];

  switch (Number(modulo)) {
    case 2:
      iconosValores = [
        { id: 1, nombre: "Val2_1", icono: m2_1 }, { id: 2, nombre: "Val2_1", icono: m2_1 },
        { id: 3, nombre: "Val2_2", icono: m2_2 }, { id: 4, nombre: "Val2_2", icono: m2_2 },
        { id: 5, nombre: "Val2_3", icono: m2_3 }, { id: 6, nombre: "Val2_3", icono: m2_3 },
        { id: 7, nombre: "Val2_4", icono: m2_4 }, { id: 8, nombre: "Val2_4", icono: m2_4 },
        { id: 9, nombre: "Val2_5", icono: m2_5 }, { id: 10, nombre: "Val2_5", icono: m2_5 },
        { id: 11, nombre: "Val2_6", icono: m2_6 }, { id: 12, nombre: "Val2_6", icono: m2_6 },
        { id: 13, nombre: "Val2_7", icono: m2_7 }, { id: 14, nombre: "Val2_7", icono: m2_7 },
        { id: 15, nombre: "Val2_8", icono: m2_8 }, { id: 16, nombre: "Val2_8", icono: m2_8 },
      ];
      break;
    case 3:
      iconosValores = [
        { id: 1, nombre: "Hist_1", icono: m3_1 }, { id: 2, nombre: "Hist_1", icono: m3_1 },
        { id: 3, nombre: "Hist_2", icono: m3_2 }, { id: 4, nombre: "Hist_2", icono: m3_2 },
        { id: 5, nombre: "Hist_3", icono: m3_3 }, { id: 6, nombre: "Hist_3", icono: m3_3 },
        { id: 7, nombre: "Hist_4", icono: m3_4 }, { id: 8, nombre: "Hist_4", icono: m3_4 },
        { id: 9, nombre: "Hist_5", icono: m3_5 }, { id: 10, nombre: "Hist_5", icono: m3_5 },
        { id: 11, nombre: "Hist_6", icono: m3_6 }, { id: 12, nombre: "Hist_6", icono: m3_6 },
        { id: 13, nombre: "Hist_7", icono: m3_7 }, { id: 14, nombre: "Hist_7", icono: m3_7 },
        { id: 15, nombre: "Hist_8", icono: m3_8 }, { id: 16, nombre: "Hist_8", icono: m3_8 },
      ];
      break;
    case 4:
      iconosValores = [
        { id: 1, nombre: "Dem_1", icono: m4_1 }, { id: 2, nombre: "Dem_1", icono: m4_1 },
        { id: 3, nombre: "Dem_2", icono: m4_2 }, { id: 4, nombre: "Dem_2", icono: m4_2 },
        { id: 5, nombre: "Dem_3", icono: m4_3 }, { id: 6, nombre: "Dem_3", icono: m4_3 },
        { id: 7, nombre: "Dem_4", icono: m4_4 }, { id: 8, nombre: "Dem_4", icono: m4_4 },
        { id: 9, nombre: "Dem_5", icono: m4_5 }, { id: 10, nombre: "Dem_5", icono: m4_5 },
        { id: 11, nombre: "Dem_6", icono: m4_6 }, { id: 12, nombre: "Dem_6", icono: m4_6 },
        { id: 13, nombre: "Dem_7", icono: m4_7 }, { id: 14, nombre: "Dem_7", icono: m4_7 },
        { id: 15, nombre: "Dem_8", icono: m4_8 }, { id: 16, nombre: "Dem_8", icono: m4_8 },
      ];
      break;
    case 5:
      iconosValores = [
        { id: 1, nombre: "Pod_1", icono: m5_1 }, { id: 2, nombre: "Pod_1", icono: m5_1 },
        { id: 3, nombre: "Pod_2", icono: m5_2 }, { id: 4, nombre: "Pod_2", icono: m5_2 },
        { id: 5, nombre: "Pod_3", icono: m5_3 }, { id: 6, nombre: "Pod_3", icono: m5_3 },
        { id: 7, nombre: "Pod_4", icono: m5_4 }, { id: 8, nombre: "Pod_4", icono: m5_4 },
        { id: 9, nombre: "Pod_5", icono: m5_5 }, { id: 10, nombre: "Pod_5", icono: m5_5 },
        { id: 11, nombre: "Pod_6", icono: m5_6 }, { id: 12, nombre: "Pod_6", icono: m5_6 },
        { id: 13, nombre: "Pod_7", icono: m5_7 }, { id: 14, nombre: "Pod_7", icono: m5_7 },
        { id: 15, nombre: "Pod_8", icono: m5_8 }, { id: 16, nombre: "Pod_8", icono: m5_8 },
      ];
      break;
    case 6:
      iconosValores = [
        { id: 1, nombre: "Gob_1", icono: m6_1 }, { id: 2, nombre: "Gob_1", icono: m6_1 },
        { id: 3, nombre: "Gob_2", icono: m6_2 }, { id: 4, nombre: "Gob_2", icono: m6_2 },
        { id: 5, nombre: "Gob_3", icono: m6_3 }, { id: 6, nombre: "Gob_3", icono: m6_3 },
        { id: 7, nombre: "Gob_4", icono: m6_4 }, { id: 8, nombre: "Gob_4", icono: m6_4 },
        { id: 9, nombre: "Gob_5", icono: m6_5 }, { id: 10, nombre: "Gob_5", icono: m6_5 },
        { id: 11, nombre: "Gob_6", icono: m6_6 }, { id: 12, nombre: "Gob_6", icono: m6_6 },
        { id: 13, nombre: "Gob_7", icono: m6_7 }, { id: 14, nombre: "Gob_7", icono: m6_7 },
        { id: 15, nombre: "Gob_8", icono: m6_8 }, { id: 16, nombre: "Gob_8", icono: m6_8 },
      ];
      break;
    default:
      // Módulo 1 por defecto
      iconosValores = [
        { id: 1, nombre: "Democracia", icono: m1_1 }, { id: 2, nombre: "Democracia", icono: m1_1 },
        { id: 3, nombre: "Voto", icono: m1_2 }, { id: 4, nombre: "Voto", icono: m1_2 },
        { id: 5, nombre: "Justicia", icono: m1_3 }, { id: 6, nombre: "Justicia", icono: m1_3 },
        { id: 7, nombre: "Ley", icono: m1_4 }, { id: 8, nombre: "Ley", icono: m1_4 },
        { id: 9, nombre: "Ciudadano", icono: m1_5 }, { id: 10, nombre: "Ciudadano", icono: m1_5 },
        { id: 11, nombre: "Gobierno", icono: m1_6 }, { id: 12, nombre: "Gobierno", icono: m1_6 },
        { id: 13, nombre: "Participación", icono: m1_7 }, { id: 14, nombre: "Participación", icono: m1_7 },
        { id: 15, nombre: "Constitución", icono: m1_8 }, { id: 16, nombre: "Constitución", icono: m1_8 },
      ];
      break;
  }

  return [...iconosValores].sort(() => Math.random() - 0.5);
};

function Memoria({ volver, modulo = 1 }) {
  const [cartas, setCartas] = useState(() => obtenerCartasPorModulo(modulo));

  const [seleccionadas, setSeleccionadas] = useState([]);
  const [bloqueadas, setBloqueadas] = useState([]);
  const [bloqueo, setBloqueo] = useState(false);
  const [parejasEncontradas, setParejasEncontradas] = useState(0);
  const [ganador, setGanador] = useState(false);

  function volverAJugar() {
    setCartas(obtenerCartasPorModulo(modulo));
    setSeleccionadas([]);
    setBloqueadas([]);
    setParejasEncontradas(0);
    setGanador(false);
  }

  function elegirCarta(carta) {
    if (
      bloqueo ||
      seleccionadas.length === 2 ||
      bloqueadas.includes(carta.id) ||
      seleccionadas.includes(carta)
    ) {
      return;
    }

    const nuevas = [...seleccionadas, carta];
    setSeleccionadas(nuevas);

    if (nuevas.length === 2) {
      if (nuevas[0].nombre === nuevas[1].nombre) {
        const nuevasBloqueadas = [...bloqueadas, nuevas[0].id, nuevas[1].id];
        setBloqueadas(nuevasBloqueadas);
        setParejasEncontradas(parejasEncontradas + 1);
        setSeleccionadas([]);

        if (parejasEncontradas + 1 === 8) {
          setGanador(true);
        }
      } else {
        setBloqueo(true);
        setTimeout(() => {
          setSeleccionadas([]);
          setBloqueo(false);
        }, 1000);
      }
    }
  }

  return (
    <div className="memoria-container">
      <button onClick={volver} className="btn-volver">
        Volver
      </button>

      <div className="agora-card">
        <h1 className="agora-titulo">Memoria Ciudadana - Módulo {modulo}</h1>

        <p className="agora-contador">
          Parejas encontradas: {parejasEncontradas}/8
        </p>

        {ganador && (
          <div className="ganador-banner">
            <h2 className="ganador-titulo">¡Felicidades!</h2>
            <p className="ganador-texto">Encontraste todas las parejas del Módulo {modulo}.</p>
            <button onClick={volverAJugar} className="btn-reiniciar">
              Volver a jugar
            </button>
          </div>
        )}

        <div className="cartas-grid">
          {cartas.map((carta) => {
            const estaRevelada =
              seleccionadas.includes(carta) || bloqueadas.includes(carta.id);

            return (
              <button
                key={carta.id}
                onClick={() => elegirCarta(carta)}
                className={`carta-btn ${estaRevelada ? "revelada" : ""}`}
              >
                {estaRevelada ? (
                  <img
                    src={carta.icono}
                    alt={carta.nombre}
                    className="carta-icono"
                  />
                ) : (
                  "?"
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Memoria;
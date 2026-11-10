import { useEffect, useState } from "react";
import "./graficosQuiz.css";

// =========================================================
// GRÁFICOS DE RESULTADOS
// =========================================================

function sinAnimacion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useContador(objetivo, duracion = 1100) {
  const final = Number(objetivo) || 0;
  const [valor, setValor] = useState(sinAnimacion() ? final : 0);

  useEffect(() => {
    if (sinAnimacion()) {
      setValor(final);
      return undefined;
    }
    let cuadro;
    const inicio = performance.now();
    const paso = (ahora) => {
      const avance = Math.min(1, (ahora - inicio) / duracion);
      const suave = 1 - Math.pow(1 - avance, 3);
      setValor(Math.round(final * suave));
      if (avance < 1) cuadro = requestAnimationFrame(paso);
    };
    cuadro = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(cuadro);
  }, [final, duracion]);

  return valor;
}

function useListo(retraso = 120) {
  const [listo, setListo] = useState(sinAnimacion());
  useEffect(() => {
    const espera = window.setTimeout(() => setListo(true), retraso);
    return () => window.clearTimeout(espera);
  }, [retraso]);
  return listo;
}

// =========================================================
// COLUMNAS DE AFINIDAD
// =========================================================
export function ColumnasAfinidad({ ranking = [] }) {
  const listo = useListo(150);
  if (!ranking.length) return null;
  const mejor = ranking[0].afinidad;

  return (
    <div className="gq-columnas" role="img" aria-label="Afinidad con cada partido">
      {ranking.map((partido, i) => (
        <div className="gq-columna" key={partido.id_partido ?? i}>
          <span className="gq-columna-valor">{partido.afinidad}%</span>
          <div className="gq-columna-carril">
            <div
              className={`gq-columna-relleno ${partido.afinidad === mejor ? "gq-columna-relleno--mejor" : ""}`}
              style={{
                height: listo ? `${Math.max(partido.afinidad, 4)}%` : "0%",
                transitionDelay: `${i * 0.12}s`,
              }}
            />
          </div>
          <span className="gq-columna-nombre" title={partido.nombre}>
            {partido.nombre}
          </span>
        </div>
      ))}
    </div>
  );
}

// =========================================================
// CONFETI
// =========================================================
const COLORES_CONFETI = ["#7d67ec", "#9571dd", "#33a474", "#f2b84b", "#e0607e", "#a5d3ee"];

export function Confeti({ activo = true, cantidad = 36 }) {
  if (!activo || sinAnimacion()) return null;
  return (
    <div className="gq-confeti" aria-hidden="true">
      {Array.from({ length: cantidad }).map((_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 97) % 100}%`,
            background: COLORES_CONFETI[i % COLORES_CONFETI.length],
            animationDelay: `${(i % 9) * 0.09}s`,
            animationDuration: `${1.8 + (i % 5) * 0.25}s`,
            "--gq-giro": `${(i % 2 ? 1 : -1) * (180 + (i % 4) * 90)}deg`,
            "--gq-deriva": `${((i % 7) - 3) * 14}px`,
          }}
        />
      ))}
    </div>
  );
}

export default Confeti;
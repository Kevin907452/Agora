import { useCallback, useEffect, useRef, useState } from "react";
import Tablero from "./ideas/Tablero";
import NavbarProfesor from "./NavbarProfesor";
import { pedir } from "../utils/api";
import { esDocente } from "../utils/personas";
import "./comunidad.css";

const ESPERA = 8000;

const obtenerUsuarioLogueado = () => {
  try {
    const guardado = localStorage.getItem("usuario") || localStorage.getItem("agora-usuario");
    return guardado ? JSON.parse(guardado) : null;
  } catch (error) {
    return null;
  }
};

function CajaIdeas() {
  const [persona] = useState(obtenerUsuarioLogueado());
  const [ideas, setIdeas] = useState(null);
  const [aviso, setAviso] = useState(""); 
  const [errorAccion, setErrorAccion] = useState("");
  const [nueva, setNueva] = useState(null); 

  const version = useRef(0);

  const cargarIdeas = useCallback(async () => {
    const alEmpezar = version.current;
    try {
      const datos = await pedir("/api/ideas");
      if (alEmpezar !== version.current) return;
      setIdeas(datos.ideas || datos);
      setAviso("");
    } catch (error) {
      if (alEmpezar === version.current) setAviso(error.message);
    }
  }, []);

  useEffect(() => {
    cargarIdeas();
  }, [cargarIdeas]);

  useEffect(() => {
    const reloj = window.setInterval(() => {
      if (!document.hidden) cargarIdeas();
    }, ESPERA);
    return () => window.clearInterval(reloj);
  }, [cargarIdeas]);

  const cambiar = async (accion) => {
    version.current += 1;
    setErrorAccion("");
    try {
      return await accion();
    } catch (error) {
      throw error;
    } finally {
      version.current += 1;
      await cargarIdeas();
    }
  };

  const enviar = async (texto) => {
    if (!persona || !persona.id_usuario) {
      throw new Error("Debes iniciar sesión para enviar una idea.");
    }
    const respuesta = await cambiar(() =>
      pedir("/api/ideas", "POST", { id_usuario: persona.id_usuario, comentario: texto })
    );
    const id_idea = respuesta.id_idea;
    setNueva(id_idea);
    window.setTimeout(() => setNueva((actual) => (actual === id_idea ? null : actual)), 4000);
  };

  const eliminar = (idea) => {
    cambiar(() => pedir(`/api/ideas/${idea.id_idea}`, "DELETE")).catch(
      (error) => setErrorAccion(error.message)
    );
  };

  return (
    <>
      <NavbarProfesor />
      <main className="caja-pagina">
        {aviso && (
          <div className="aviso" role="status">
            <p>
              <strong>Sin conexión con la base de datos.</strong> {aviso}
            </p>
            <button type="button" className="aviso-boton" onClick={cargarIdeas}>
              Reintentar
            </button>
          </div>
        )}

        {errorAccion && (
          <p className="error-accion" role="alert">
            {errorAccion}
          </p>
        )}

        {ideas ? (
          <Tablero
            ideas={ideas}
            yo={persona ? persona.id_usuario : null}
            modero={Boolean(persona) && esDocente(persona)}
            nueva={nueva}
            onEliminar={eliminar}
          />
        ) : (
          !aviso && <p className="cargando">Cargando ideas…</p>
        )}
      </main>
    </>
  );
}

export default CajaIdeas;
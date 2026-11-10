import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Proponer from "./ideas/Proponer";
import Tablero from "./ideas/Tablero";
import logoA from "../assets/logoA.png";
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

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const scriptId = "animated-icons-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://animatedicons.co/scripts/embed-animated-icons.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const attrString =
    '{"variationThumbColour":"#8D7BE8","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#8D7BE8","group-2":"#000000","background":"#FFFFFF00"}}';

  const setIconAttrs = useCallback((node) => {
    if (node) {
      node.setAttribute("attributes", attrString);
    }
  }, []);

  return (
    <nav className="navbar-estudiante">
      <div className="navbar-logo">
        <img src={logoA} alt="Logo de Ágora" />
        <span>Ágora</span>
      </div>

      <button
        className={`hamburger-btn ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-links ${isOpen ? "active" : ""}`}>
        <Link to="/indexestudiante" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=Thank%20you&style=minimalistic&token=eb0b9e1a-e71e-4b20-a7dc-7c38f678e237"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Inicio</span>
        </Link>

        <Link to="/modulos" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=checklist&style=minimalistic&token=0d874aa3-6ae4-45c8-9949-aca91ae5739d"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Módulos</span>
        </Link>

        <Link to="/calendario" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=calendar%20V3&style=minimalistic&token=4c41ae18-3a92-43bc-b097-59c6f2c21510"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Calendario</span>
        </Link>

        <Link to="/comunidad" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=Audience%20Reach&style=minimalistic&token=a566e2c2-ed78-4e8f-9adb-3283a20f035c"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Comunidad</span>
        </Link>

        <Link to="/notas" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=Report%20V2&style=minimalistic&token=1869947d-0b96-4314-9dd7-a86ec7a829ff"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Notas</span>
        </Link>
      </div>
    </nav>
  );
}

function CajaIdeas() {
  const [baseDeDatos, setBaseDeDatos] = useState("agora");
  const [usuariosCargados, setUsuariosCargados] = useState(true);
  const [persona] = useState(obtenerUsuarioLogueado());
  const [ideas, setIdeas] = useState(null);
  const [aviso, setAviso] = useState(""); 
  const [errorAccion, setErrorAccion] = useState("");
  const [nueva, setNueva] = useState(null); 

  // Nuevo estado para controlar la alerta de palabras prohibidas
  const [alertaGroseria, setAlertaGroseria] = useState(false);

  const version = useRef(0);

  const cargarIdeas = useCallback(async () => {
    const alEmpezar = version.current;
    try {
      const datos = await pedir("/api/ideas");
      if (alEmpezar !== version.current) return;
      setIdeas(datos.ideas || datos);
      setBaseDeDatos(datos.baseDeDatos || "agora");
      setUsuariosCargados(true);
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

    // Lista de palabras prohibidas o groserías a filtrar
    const palabrasProhibidas = ["puta", "puto", "mierda", "hueputa", "hpta", "idiota", "estupido", "imbecil"];
    
    // Normalizamos el texto (eliminamos tildes y pasamos a minúsculas para una revisión efectiva)
    const textoNormalizado = texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    // Verificamos si alguna palabra prohibida está contenida en el texto
    const contieneGroseria = palabrasProhibidas.some((palabra) => 
      new RegExp(`\\b${palabra}\\b`, "i").test(textoNormalizado) || textoNormalizado.includes(palabra)
    );

    if (contieneGroseria) {
      setAlertaGroseria(true); // Muestra el cuadro con la imagen agevil.png
      return; // Detiene el envío
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
      <Navbar />
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

{/* CUADRO DE ALERTA DE LENGUAJE INADECUADO */}
        {alertaGroseria && (
          <div className="modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
          }}>
            <div className="modal-contenido" style={{
              backgroundColor: '#fff', padding: '40px 32px', borderRadius: '18px', textAlign: 'center', maxWidth: '520px', width: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
            }}>
              <img 
                src={require("../assets/agevil.png")} 
                alt="Aviso de respeto" 
                style={{ width: '190px', height: '200px', marginBottom: '24px', objectFit: 'contain' }} 
              />
              <h2 style={{ color: '#39265c', marginBottom: '14px', fontSize: '24px' }}>¡Atención con el lenguaje!</h2>
              <p style={{ color: '#4b5563', marginBottom: '28px', fontSize: '17px', lineHeight: '1.5' }}>
                Eso no se puede publicar. Debes mantener el respeto y utilizar un lenguaje adecuado en la comunidad de Ágora.
              </p>
              <button 
                onClick={() => setAlertaGroseria(false)}
                style={{
                  backgroundColor: '#8D7BE8', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '10px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold'
                }}
              >
                Entendido
              </button>
            </div>
          </div>
        )}

        <div className="portada">
          <div className="portada-texto">
            <h1 className="portada-titulo">¿Qué te gustaría que cambiara en el colegio?</h1>
            <p className="portada-bajada">
              Escribe tu idea en la caja. El gobierno estudiantil revisa todas las
              ideas que llegan aquí, y cualquiera puede leerlas en el tablero.
            </p>
            <ul className="portada-pasos">
              <li>
                Escribe lo que te gustaría que se implementara.
              </li>
              <li>
                El gobierno estudiantil las lee para saber qué quieren los estudiantes.
              </li>
              <li>
                Escribe con respeto y lenguaje adecuado, de lo contrario vendrán consecuencias
              </li>
            </ul>
          </div>

          <Proponer
            usuarios={usuariosCargados}
            persona={persona}
            onEnviar={enviar}
            bloqueado={Boolean(aviso) || !persona}
          />
        </div>

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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import agorita from "../assets/agorita.png";

function Login() {
    const navigate = useNavigate();

    const [modo, setModo] = useState("login");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [rol, setRol] = useState("");
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const cambiarModo = (nuevoModo) => {
        setModo(nuevoModo);
        setError("");
        setMensaje("");
        setNombre("");
        setApellido("");
        setCorreo("");
        setContrasena("");
        setRol("");
    };

    // =========================================================
    // GOOGLE IDENTITY SERVICES + RENDERIZADO OFICIAL
    // =========================================================
    useEffect(() => {
        const inicializarGoogle = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: "801082715265-u9p0lg3ipqjcg7tl6h7tb806qlgm72jb.apps.googleusercontent.com",
                    callback: manejarRespuestaGoogle,
                    auto_select: false,
                    use_fedcm_for_prompt: false // Desactiva FedCM para evitar restricciones locales
                });

                // Renderizamos el botón oficial en el div con id "googleBtnContainer"
                const btnContainer = document.getElementById("googleBtnContainer");
                if (btnContainer) {
                    window.google.accounts.id.renderButton(
                        btnContainer,
                        {
                            theme: "outline",
                            size: "large",
                            text: "continue_with",
                            shape: "rectangular",
                            width: "100%"
                        }
                    );
                }
            }
        };

        if (window.google) {
            inicializarGoogle();
        } else {
            let script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
            if (!script) {
                script = document.createElement("script");
                script.src = "https://accounts.google.com/gsi/client";
                script.async = true;
                script.defer = true;
                document.head.appendChild(script);
            }
            script.onload = inicializarGoogle;
        }
    }, [modo]); // Se vuelve a renderizar si se cambia el modo

    const manejarRespuestaGoogle = async (response) => {
        try {
            setLoading(true);
            setError("");

            // Decodificar el token JWT de Google
            const base64Url = response.credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const datosGoogle = JSON.parse(jsonPayload);
            const correoLimpio = datosGoogle.email.trim().toLowerCase();

            // REGLA: Si el correo termina exactamente en @cedesdonbosco.ed.cr (y NO en @est.cedesdonbosco.ed.cr) -> Profesor
            // Cualquier otro correo que ingrese será considerado Estudiante.
            const esProfesor = correoLimpio.endsWith("@cedesdonbosco.ed.cr") && !correoLimpio.endsWith("@est.cedesdonbosco.ed.cr");
            const rolAsignado = esProfesor ? "profesor" : "estudiante";

            const res = await fetch("http://localhost:3000/api/google-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    correo: correoLimpio,
                    nombre: datosGoogle.given_name || "Usuario",
                    apellido: datosGoogle.family_name || "Ágora",
                    rol: rolAsignado
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.mensaje || "Error en autenticación con Google.");

            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            if (data.token) localStorage.setItem("agora_token", data.token);

            setMensaje("¡Acceso exitoso con Google!");

            setTimeout(() => {
                if (data.usuario.rol === "profesor") {
                    navigate("/indexprofesor");
                } else {
                    navigate("/indexestudiante"); // Redirige a perfil de estudiante por defecto
                }
            }, 1000);

        } catch (err) {
            console.error(err);
            setError(err.message || "No se pudo iniciar sesión con Google.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegistro = async (e) => {
        e.preventDefault();
        setError("");
        setMensaje("");

        if (!nombre.trim() || !apellido.trim() || !correo.trim() || !contrasena.trim()) {
            setError("Por favor completa todos los campos.");
            return;
        }

        const correoLimpio = correo.trim().toLowerCase();
        
        // Si no selecciona rol manualmente en el formulario, aplica la misma regla por defecto
        let rolCalculado = rol;
        if (!rolCalculado) {
            const esProfesor = correoLimpio.endsWith("@cedesdonbosco.ed.cr") && !correoLimpio.endsWith("@est.cedesdonbosco.ed.cr");
            rolCalculado = esProfesor ? "profesor" : "estudiante";
        }

        if (contrasena.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/api/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: nombre.trim(),
                    apellido: apellido.trim(),
                    correo: correoLimpio,
                    contrasena,
                    rol: rolCalculado,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.mensaje || "No se pudo crear la cuenta.");

            setMensaje("¡Cuenta creada correctamente!");
            setTimeout(() => {
                if (rolCalculado === "profesor") {
                    navigate("/indexprofesor");
                } else {
                    navigate("/indexestudiante");
                }
            }, 1000);

        } catch (err) {
            console.error(err);
            setError(err.message || "No se pudo conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setMensaje("");

        if (!correo.trim() || !contrasena.trim()) {
            setError("Ingresa tu correo y contraseña.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo: correo.trim(), contrasena }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.mensaje || "Correo o contraseña incorrectos.");

            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            if (data.token) localStorage.setItem("agora_token", data.token);

            if (data.usuario.rol === "profesor") navigate("/indexprofesor");
            else navigate("/indexestudiante");

        } catch (err) {
            console.error(err);
            setError(err.message || "No se pudo iniciar sesión.");
        } finally {
            setLoading(false);
        }
    };

    const handleGuest = () => { navigate("/"); };

    return (
        <main className="login-page">
            <div className="login-card">
                <section className="welcome-panel">
                    <div className="welcome-content">
                        <h1>Bienvenid@<br /><span>a Ágora</span></h1>
                        <div className="welcome-line"></div>
                        <p className="welcome-description">
                            ¡Aquí aprenderás sobre política y democracia, además podrás participar directamente en los procesos democráticos del colegio!
                        </p>
                        <div className="mascot-wrapper">
                            <div className="mascot-circle"></div>
                            <img src={agorita} alt="Agorita, mascota de Ágora" className="agorita" />
                        </div>
                    </div>
                </section>

                <section className="login-panel">
                    <div className="login-content">
                        <div className="auth-tabs">
                            <button
                                type="button"
                                className={modo === "login" ? "auth-tab active" : "auth-tab"}
                                onClick={() => cambiarModo("login")}
                            >
                                Iniciar sesión
                            </button>
                            <button
                                type="button"
                                className={modo === "registro" ? "auth-tab active" : "auth-tab"}
                                onClick={() => cambiarModo("registro")}
                            >
                                Crear cuenta
                            </button>
                        </div>

                        <div className="login-header">
                            <h2>{modo === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>
                            <p>{modo === "login" ? "Ingresa a tu cuenta para continuar" : "Regístrate para comenzar a utilizar Ágora"}</p>
                        </div>

                        {/* CONTENEDOR DONDE GOOGLE RENDERIZA SU BOTÓN OFICIAL */}
                        <div id="googleBtnContainer"></div>

                        <div className="separator" style={{ margin: "15px 0" }}>
                            <span></span>
                            <p>o</p>
                            <span></span>
                        </div>

                        <form onSubmit={modo === "login" ? handleLogin : handleRegistro}>
                            {modo === "registro" && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="nombre">Nombre</label>
                                        <div className="input-container">
                                            <input id="nombre" type="text" placeholder="Ingresa tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="apellido">Apellido</label>
                                        <div className="input-container">
                                            <input id="apellido" type="text" placeholder="Ingresa tu apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label htmlFor="correo">Correo electrónico</label>
                                <div className="input-container">
                                    <input id="correo" type="email" placeholder="tu.correo@cedesdonbosco.ed.cr" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="contrasena">Contraseña</label>
                                <div className="input-container">
                                    <input id="contrasena" type={mostrarContrasena ? "text" : "password"} placeholder="Ingresa tu contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                                    <button type="button" className="show-password" onClick={() => setMostrarContrasena(!mostrarContrasena)}>
                                        {mostrarContrasena ? "👁" : "👁‍🗨"}
                                    </button>
                                </div>
                            </div>

                            {modo === "registro" && (
                                <div className="form-group">
                                    <label htmlFor="rol">Rol (Opcional)</label>
                                    <div className="input-container">
                                        <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
                                            <option value="">Detectar automáticamente (Estudiante por defecto)</option>
                                            <option value="estudiante">Estudiante</option>
                                            <option value="profesor">Profesor</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {error && <div className="login-error">{error}</div>}
                            {mensaje && <div className="login-success">{mensaje}</div>}

                            <button type="submit" className="login-button" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        {modo === "login" ? "Iniciando sesión..." : "Creando cuenta..."}
                                    </>
                                ) : (
                                    <>
                                        {modo === "login" ? "Iniciar sesión" : "Crear cuenta"}
                                        <span className="arrow">→</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="guest-container">
                            <div className="separator">
                                <span></span>
                                <p>o</p>
                                <span></span>
                            </div>
                          
                        </div>

                        <div className="login-footer">
                            
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Login;
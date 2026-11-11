import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import agorita from "../assets/agorita.png";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

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

    // =========================================================
    // CAPTURAR EL CÓDIGO DE GOOGLE AL VOLVER DE LA REDIRECCIÓN
    // =========================================================
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');

        if (code) {
            // Limpiamos la URL para que no se quede el código colgado
            window.history.replaceState({}, document.title, window.location.pathname);
            
            setLoading(true);
            setMensaje("Verificando con Google...");

            fetch('/api/google-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            })
            .then(res => res.json())
            .then(data => {
                if (!data.token) throw new Error(data.mensaje || "Error en autenticación.");
                
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
                localStorage.setItem("agora_token", data.token);
                
                if (data.usuario.rol === 'profesor') navigate('/indexprofesor');
                else navigate('/indexestudiante');
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
        }
    }, [location, navigate]);

    const cambiarModo = (nuevoModo) => {
        setModo(nuevoModo);
        setError("");
        setMensaje("");
    };

    const handleRegistro = async (e) => {
        e.preventDefault();
        setError(""); setMensaje("");
        if (!nombre || !apellido || !correo || !contrasena) return setError("Completa todos los campos.");
        
        let rolCalculado = rol || (correo.trim().toLowerCase().endsWith("@cedesdonbosco.ed.cr") ? "profesor" : "estudiante");

        try {
            setLoading(true);
            const res = await fetch("/api/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, apellido, correo: correo.trim().toLowerCase(), contrasena, rol: rolCalculado }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.mensaje);
            
            setMensaje("¡Cuenta creada! Iniciando sesión...");
            setTimeout(() => navigate(rolCalculado === 'profesor' ? '/indexprofesor' : '/indexestudiante'), 1000);
        } catch (err) { setError(err.message); } 
        finally { setLoading(false); }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); setMensaje("");
        if (!correo || !contrasena) return setError("Ingresa correo y contraseña.");

        try {
            setLoading(true);
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo: correo.trim(), contrasena }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.mensaje);

            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            localStorage.setItem("agora_token", data.token);
            navigate(data.usuario.rol === 'profesor' ? '/indexprofesor' : '/indexestudiante');
        } catch (err) { setError(err.message); } 
        finally { setLoading(false); }
    };

    return (
        <main className="login-page">
            <div className="login-card">
                <section className="welcome-panel">
                    <div className="welcome-content">
                        <h1>Bienvenid@<br /><span>a Ágora</span></h1>
                        <div className="welcome-line"></div>
                        <p className="welcome-description">¡Aquí aprenderás sobre política y democracia, además podrás participar directamente en los procesos democráticos del colegio!</p>
                        <div className="mascot-wrapper">
                            <div className="mascot-circle"></div>
                            <img src={agorita} alt="Agorita" className="agorita" />
                        </div>
                    </div>
                </section>

                <section className="login-panel">
                    <div className="login-content">
                        <div className="auth-tabs">
                            <button type="button" className={modo === "login" ? "auth-tab active" : "auth-tab"} onClick={() => cambiarModo("login")}>Iniciar sesión</button>
                            <button type="button" className={modo === "registro" ? "auth-tab active" : "auth-tab"} onClick={() => cambiarModo("registro")}>Crear cuenta</button>
                        </div>

                        <div className="login-header">
                            <h2>{modo === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>
                            <p>{modo === "login" ? "Ingresa a tu cuenta para continuar" : "Regístrate para utilizar Ágora"}</p>
                        </div>

                        {/* BOTÓN DE GOOGLE ESTIRADO Y CENTRADO */}
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "15px" }}>
                            <GoogleLogin
                                onSuccess={() => {}} // No se usa en modo redirect
                                onError={() => setError("Error con Google.")}
                                ux_mode="redirect"
                                width="380"
                                theme="outline"
                                size="large"
                                text="continue_with"
                                shape="rectangular"
                            />
                        </div>

                        <div className="separator" style={{ margin: "15px 0" }}><span></span><p>o</p><span></span></div>

                        <form onSubmit={modo === "login" ? handleLogin : handleRegistro}>
                            {modo === "registro" && (
                                <>
                                    <div className="form-group"><label>Nombre</label><input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} /></div>
                                    <div className="form-group"><label>Apellido</label><input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} /></div>
                                </>
                            )}

                            <div className="form-group"><label>Correo electrónico</label><input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} /></div>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <div className="input-container">
                                    <input type={mostrarContrasena ? "text" : "password"} value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                                    <button type="button" onClick={() => setMostrarContrasena(!mostrarContrasena)}>{mostrarContrasena ? "👁" : "👁‍🗨"}</button>
                                </div>
                            </div>

                            {error && <div className="login-error">{error}</div>}
                            {mensaje && <div className="login-success">{mensaje}</div>}

                            <button type="submit" className="login-button" disabled={loading}>
                                {loading ? "Procesando..." : (modo === "login" ? "Iniciar sesión" : "Crear cuenta")}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Login;
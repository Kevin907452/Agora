import React, { useEffect, useState } from 'react';
import './partidos.css';

export function Card({ partido, onClick }) {
  if (!partido) return null;

  // Si la base de datos tiene la ruta, la usamos. Si no, usamos una por defecto.
  let rutaImagen = '/par1.png'; 
  if (partido.bandera_url) {
    if (partido.bandera_url.startsWith('data:image') || partido.bandera_url.startsWith('http')) {
      rutaImagen = partido.bandera_url;
    } else if (partido.bandera_url.startsWith('/')) {
      rutaImagen = partido.bandera_url;
    } else {
      rutaImagen = `/${partido.bandera_url}`;
    }
  }

  return (
    <div 
      className="card" 
      onClick={() => onClick(partido)}
      style={{ 
        backgroundImage: `url("${rutaImagen}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="contenido">
        <h2 className="titulo">{partido.nombre}</h2>
        <h4 className="sub">Partido Político</h4>
        <p className="descrip">{partido.descripcion}</p>
      </div>
    </div>
  );
}

export default function PartidosSection() {
  const [partidos, setPartidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);
  const [detallePartido, setDetallePartido] = useState({ miembros: [], propuestas: [] });
  const [cargandoDetalle, setCargandoDetalle] = useState(false);

  useEffect(() => {
    // ⚠️ RUTA RELATIVA VITAL PARA QUE FUNCIONE EN RENDER
    fetch('/api/partidos')
      .then((res) => {
        if (!res.ok) throw new Error(`Servidor devolvió status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setPartidos(data);
        else setErrorMsg('Formato de datos no válido.');
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al conectar con la API:', err);
        setErrorMsg(err.message);
        setCargando(false);
      });
  }, []);

  const abrirModal = (partido) => {
    setPartidoSeleccionado(partido);
    setCargandoDetalle(true);

    fetch(`/api/partidos/${partido.id_partido}`)
      .then((res) => res.json())
      .then((data) => {
        setDetallePartido({
          miembros: data.miembros || [],
          propuestas: data.propuestas || []
        });
        setCargandoDetalle(false);
      })
      .catch((err) => {
        console.error('Error al obtener detalle del partido:', err);
        setCargandoDetalle(false);
      });
  };

  const cerrarModal = () => {
    setPartidoSeleccionado(null);
    setDetallePartido({ miembros: [], propuestas: [] });
  };

  return (
    <div className="seccion-partidos-container">
      <div className="titulo-principal">
        <h1>Conoce a los partidos políticos</h1>
      </div>
      
      <div className="partidos-grid">
        {cargando ? (
          <p style={{ color: '#4a386d', fontWeight: 'bold' }}>Cargando partidos...</p>
        ) : errorMsg ? (
          <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {errorMsg}</p>
        ) : partidos.length === 0 ? (
          <p style={{ color: '#4a386d' }}>No hay partidos registrados en la base de datos.</p>
        ) : (
          partidos.map((partido) => (
            <Card key={partido.id_partido} partido={partido} onClick={abrirModal} />
          ))
        )}
      </div>

      {partidoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={cerrarModal}>&times;</button>
            
            <div className="modal-header">
              <img 
                src={partidoSeleccionado.bandera_url || '/par1.png'} 
                alt={`Bandera ${partidoSeleccionado.nombre}`} 
                className="modal-bandera"
                onError={(e) => { e.target.onerror = null; e.target.src = '/par1.png'; }}
              />
              <div className="modal-header-info">
                <h2>{partidoSeleccionado.nombre}</h2>
                <p>{partidoSeleccionado.descripcion}</p>
              </div>
            </div>

            <div className="modal-body">
              {cargandoDetalle ? (
                <p className="loading-text">Cargando información del partido...</p>
              ) : (
                <>
                  <div className="modal-seccion">
                    <h3>Candidatos a la directiva-----</h3>
                    {detallePartido.miembros.length === 0 ? (
                      <p className="empty-text">No hay miembros asignados.</p>
                    ) : (
                      <div className="miembros-grid">
                        {detallePartido.miembros.map((m, index) => (
                          <div key={index} className="miembro-card">
                            <span className="cargo">{m.cargo.replace('_', ' ')}</span>
                            <span className="nombre">{m.nombre} {m.apellido}</span>
                            {m.curso_nombre && <small className="curso">{m.curso_nombre}</small>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="modal-seccion">
                    <h3>Propuestas---</h3>
                    {detallePartido.propuestas.length === 0 ? (
                      <p className="empty-text">No hay propuestas registradas.</p>
                    ) : (
                      <ul className="propuestas-lista">
                        {detallePartido.propuestas.map((p, index) => (
                          <li key={index} className="propuesta-item">
                            <strong>{p.titulo}</strong>
                            <p>{p.descripcion}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
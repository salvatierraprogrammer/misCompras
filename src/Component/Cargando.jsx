import React from 'react';
import './Css/Cargando.css';

function Cargando() {
  return (
    <div id="modal">
      <div id="contenedor">
        <div className="contenedor-loader">
          <div className="loader"></div>
        </div>
        <div className="cargando">Cargando...</div>
      </div>
    </div>
  );
}

export default Cargando;
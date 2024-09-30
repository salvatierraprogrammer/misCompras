import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'; 

const Footer = () => {
  return (
    <footer style={estilos.footer}>
      <div style={estilos.container}>
        <div style={estilos.links}>
          <h4 style={estilos.titulo}>Enlaces útiles</h4>
          <ul style={estilos.listaEnlaces}>
            <li><a href="/terminos" style={estilos.enlace}>Términos de Servicio</a></li>
            <li><a href="/privacidad" style={estilos.enlace}>Política de Privacidad</a></li>
            <li><a href="/contacto" style={estilos.enlace}>Contacto</a></li>
          </ul>
        </div>
        <div style={estilos.redesSociales}>
          <h4 style={estilos.titulo}>Síguenos</h4>
          <div style={estilos.iconos}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={estilos.icono} aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={estilos.icono} aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={estilos.icono} aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
      <p style={estilos.copyright}>© {new Date().getFullYear()} Tu Compañía. Todos los derechos reservados.</p>
    </footer>
  );
};

// Estilos del footer
const estilos = {
  footer: {
    backgroundColor: '#2c3e50', // Cambié el color de fondo a un azul oscuro
    color: '#ecf0f1', // Cambié el color del texto a un gris claro
    padding: '40px 0', // Aumenté el padding
    textAlign: 'center',
    borderTop: '1px solid #34495e', // Cambié el color de la línea superior
    marginTop: '20px',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 20px',
  },
  links: {
    marginBottom: '20px',
  },
  redesSociales: {
    marginBottom: '20px',
  },
  listaEnlaces: {
    listStyleType: 'none',
    padding: 0,
  },
  enlace: {
    textDecoration: 'none',
    color: '#ecf0f1', // Cambié el color de los enlaces a gris claro
    transition: 'color 0.2s',
    fontSize: '1.0em', 
  },
  iconos: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px', // Aumenté el espacio entre iconos
  },
  icono: {
    fontSize: '30px', // Aumenté el tamaño del icono
    color: '#ecf0f1', // Color del icono
    transition: 'color 0.2s',
  },
  titulo: {
    fontSize: '1.5em', // Aumenté el tamaño del título
    margin: '10px 0',
  },
  copyright: {
    marginTop: '20px',
    fontSize: '0.9em',
    color: '#bdc3c7', // Cambié el color del texto de copyright
  },
};

// Efecto hover para enlaces y iconos
estilos.enlace.hover = {
  color: '#3498db', // Color para el hover del enlace
};

estilos.icono.hover = {
  color: '#3498db', // Color para el hover del icono
};

export default Footer;
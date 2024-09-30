import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/Firebase_auth'; // Ensure the import path is correct
import { FaSignInAlt, FaSignOutAlt, FaHome } from 'react-icons/fa'; // Importing icons
import shop from '../assets/shop.png'; // Importa el logo

function Header({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogout = async () => {
    const confirmation = window.confirm("¿Estás seguro de que quieres cerrar sesión?");
    if (confirmation) {
      await auth.signOut();
      localStorage.removeItem('userId'); // Remove userId from localStorage
      setIsAuthenticated(false); // Update authentication status
      console.log('User logged out');
      navigate('/login'); // Redirect to home after logout
    }
  };

  return (
    <header style={estilos.header}>
      <button onClick={handleHomeClick} style={estilos.titulo}>
        <div style={estilos.logoContainer}>
          <img src={shop} alt="Shop Logo" style={estilos.logo} />
          <h1 style={estilos.tituloTexto}>Mis Compras</h1>
        </div>
      </button>
      <div style={estilos.buttonContainer}>
        {isAuthenticated ? (
          <button onClick={handleLogout} style={estilos.botonLogin}>
            <FaSignOutAlt style={estilos.icon} /> Cerrar sesión
          </button>
        ) : (
          <button onClick={handleLoginClick} style={estilos.botonLogin}>
            <FaSignInAlt style={estilos.icon} /> Iniciar sesión
          </button>
        )}
      </div>
    </header>
  );
}

const estilos = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', // Center align items vertically
    width: '100%',
    padding: '15px 20px', // Increased padding for more space
    boxSizing: 'border-box',
    position: 'relative', // Allows for absolute positioning of elements if needed
  },
  titulo: {
    margin: '0',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#2c3e50',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '40px', // Ajusta el tamaño de la imagen
    height: '40px',
    marginRight: '10px', // Espacio entre el logo y el texto
  },
  tituloTexto: {
    margin: '0',
    fontSize: '24px', // Increased font size for the title
    color: '#2c3e50',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center', // Center align buttons
  },
  botonLogin: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
    transition: 'background-color 0.3s', // Smooth transition for hover effect
  },
  botonLoginHover: {
    backgroundColor: '#45a049', // Darker green on hover
  },
  icon: {
    marginRight: '5px', // Space between icon and text
  },
};

export default Header;
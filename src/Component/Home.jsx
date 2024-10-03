import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebase_auth'; // Adjust the import path if necessary
import ListMisCompras from './ListMisCompras';
import Cargando from './Cargando';
import fondo from '../assets/fondo.png';
import primera from '../assets/primera.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faAndroid } from '@fortawesome/free-brands-svg-icons'; // Import the Android icon

function Home() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      console.log('User ID from localStorage:', storedUserId);
      setLoading(false);
    } else {
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
        console.log('User ID from auth:', user.uid);
      } else {
        console.log('No user is signed in.');
      }
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Cargando />; // Loading state
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Mi lista de compras</h1>
      {userId ? (
        <ListMisCompras userId={userId} />
      ) : (
        <div style={estilos.noDatosContainer}>
          <div style={estilos.contenedor}>
            <h1 style={estilos.noDatosTexto}>¡Bienvenido a tu lista de compras!</h1>
            
            <p style={estilos.noDatosTexto}>
              Agrega tu primer supermercado.
            </p>
            <img src={primera} alt="No data available" style={estilos.noDataImage} />
          </div>
          <p style={estilos.noDatosTexto}>
            <FontAwesomeIcon icon={faAndroid} style={{ marginRight: '5px' }} />
            Disponible en Android. 
            <a 
              href="https://drive.google.com/file/d/1sSEXt5JWVBSrkVzcKSn5v8nVO6C6xi66/view?usp=sharing" 
              style={{ color: '#007BFF', textDecoration: 'underline' }} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Descarga la app.
            </a>
          </p>
          <img src={fondo} alt="No data available" style={estilos.noDataImage} />
        
        </div>
      )}
    </div>
  );
}

// Define your styles here
const estilos = {
  noDatosContainer: {
    textAlign: 'center',
    marginTop: '20px',
    padding: '20px',
  },
  noDataImage: {
    maxWidth: '100%',
    marginBottom: '10px',
  },
  noDatosTexto: {
    color: '#666',
    margin: '10px 0',
  },
};

export default Home;
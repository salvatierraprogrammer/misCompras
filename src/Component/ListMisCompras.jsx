import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import AgregarSuperMercado from './AgregarSuperMercado'; 
import { useGetListaDeComprasQuery, useCreateCompraMutation, useDeleteCompraMutation } from '../service/ecApi';
import Cargando from './Cargando.jsx';
import fondo from '../assets/fondo.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importar FontAwesomeIcon
import { faAndroid } from '@fortawesome/free-brands-svg-icons'; // Importar el ícono de Android

function ListMisCompras({ userId }) {
  const { data: compras, error, isLoading } = useGetListaDeComprasQuery();
  const [createCompra] = useCreateCompraMutation();
  const [deleteCompra] = useDeleteCompraMutation();
  const [documentos, setDocumentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (compras) {
      const filteredDocs = compras.filter(compra => compra.userId === userId);
      setDocumentos(filteredDocs);
    }
  }, [compras, userId]);

  const eliminarCompra = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta compra?');
    if (confirmacion) {
      try {
        await deleteCompra(id).unwrap(); 
        setDocumentos(prev => prev.filter((compra) => compra.id !== id));
      } catch (e) {
        console.error('Error deleting purchase:', e);
      }
    }
  };

  const irADetalleSupermercado = (id) => {
    navigate(`/detalle-supermercado/${id}`);
  };

  const agregarSupermercado = async (nombre) => {
    try {
      const nuevoSupermercado = {
        supermercado: nombre,
        userId: userId,
      };
      const result = await createCompra(nuevoSupermercado).unwrap(); 
      console.log('Supermercado added successfully:', result);
  
      // Actualizar el estado local para que se vea reflejado el nuevo supermercado en la lista
      setDocumentos((prevDocumentos) => [...prevDocumentos, result]);
    } catch (e) {
      console.error('Error adding supermercado:', e);
    }
  };

  if (isLoading) return <Cargando />;
  if (error) return <h1>Error al cargar los datos</h1>;

  if (documentos.length === 0) {
    return (
      <div style={estilos.noDatosContainer}>
        <div style={estilos.contenedor}>
          <h1 style={estilos.noDatosTexto}>¡Bienvenido a tu lista de compras!</h1>
          <p style={estilos.noDatosTexto}>
          <AgregarSuperMercado onAddSupermercado={agregarSupermercado} />
           
          </p>
       
        </div>
        <img src={fondo} alt="No data available" style={estilos.noDataImage} />
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
      </div>
    );
  }

  return (
    <div style={estilos.container}>
      <AgregarSuperMercado onAddSupermercado={agregarSupermercado} />
      {documentos.map((doc) => (
        <div key={doc.id} style={estilos.card}>
          <h2 
            onClick={() => irADetalleSupermercado(doc.id)} 
            style={estilos.titulo}
          >
            {doc.supermercado}
          </h2>
          <h2 
            onClick={() => irADetalleSupermercado(doc.id)} 
            style={estilos.titulo}
          >
            <p>$ { doc.total || 0}</p> {/* Mostrar total o 0 si está indefinido */}
          </h2>
          <button 
            onClick={() => eliminarCompra(doc.id)} 
            style={estilos.botonEliminar}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

// Define tus estilos aquí
const estilos = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '8px',
  },
  noDatos: {
    textAlign: 'center',
    color: '#666',
    marginTop: '20px',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', 
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  botonEliminar: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.2s',
  },
  botonEliminarHover: {
    backgroundColor: '#e60000', 
  },
  titulo: {
    cursor: 'pointer',
    fontSize: '1.2em',
    color: '#333',
    margin: '0',
    flex: 1,
    transition: 'color 0.2s',
  },
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

export default ListMisCompras;
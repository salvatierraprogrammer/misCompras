import React, { useState, useEffect } from 'react';
import CargarDatosApi from '../Api';

function ViewDatosUsers() {
  const [datoApi, setDatoApi] = useState({ users: [] }); // Mantén el estado como un array
  
  useEffect(() => {
    CargarDatosApi().then(dataAp => {
      setDatoApi(dataAp); 
    });
  }, []);

  
  if (datoApi.length === 0) {
    return <h1>No hay users</h1>;
  }

  return (
    <div style={styles.container}>
      {datoApi.users && datoApi.users.map((item) => (
        <div key={item.id} style={styles.card}>
          <h1 style={styles.id}>{item.id}</h1>
          <img src={item.image} alt={`${item.firstName} ${item.lastName}`} style={styles.image} />
          <h2 style={styles.name}>{item.firstName} {item.lastName}</h2>
          <ul style={styles.detailsList}>
            <li style={styles.detailItem}><strong>Email:</strong> {item.email}</li>
            <li style={styles.detailItem}><strong>Gender:</strong> {item.gender}</li>
            <li style={styles.detailItem}><strong>Role:</strong> {item.role}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    padding: '20px',
    textAlign: 'center',
    width: '250px',
  },
  id: {
    fontSize: '18px',
    color: '#888',
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '15px',
  },
  name: {
    fontSize: '22px',
    margin: '10px 0',
    color: '#333',
  },
  detailsList: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'left',
  },
  detailItem: {
    marginBottom: '10px',
    fontSize: '16px',
    color: '#555',
  },
};

export default ViewDatosUsers;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Firebase/Firebase_auth'; // Asegúrate de importar correctamente tu configuración de Firebase
import { doc, getDoc } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Typography, TextField, Button, Card, CardContent, Alert, Box } from '@mui/material';
import shop from '../../assets/shop.png'; // Importar la imagen del logo
import Cargando from '../Cargando';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      localStorage.setItem('userId', user.uid);
      console.log('User ID:', user.uid);
      
      const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
      
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const user = auth.currentUser;
      if (user) {
        setIsAuthenticated(true);
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate, setIsAuthenticated]);

  if (loading) {
    return (
      <Container
        maxWidth="sm"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
       <Cargando/>
      </Container>
    );
  }

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
      <Card sx={{ 
        border: '2px solid #4CAF50', 
        borderRadius: '8px',        
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
      }}>
        {/* Añadir el logo encima del título "Iniciar Sesión" */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <img src={shop} alt="Shop Logo" style={{ width: '100px', height: '100px' }} />
        </Box>
        
        <Typography variant="h4" align="center" sx={{ marginTop: 2 }} gutterBottom>
          Iniciar Sesión
        </Typography>
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Correo Electrónico"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Iniciar Sesión
            </Button>
            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                ¿No tienes cuenta?{' '}
                <Link to="/crearCuenta">
                  Crear Cuenta
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
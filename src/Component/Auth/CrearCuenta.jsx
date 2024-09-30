import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Firebase/Firebase_auth'; // Asegúrate de importar correctamente tu configuración de Firebase y Firestore
import { doc, setDoc } from 'firebase/firestore';
import { Container, Typography, TextField, Button, Card, CardContent, Alert, Box, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import FaceIcon from '@mui/icons-material/Face';

const CrearCuenta = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        setError(null); // Resetear error al iniciar el registro

        // Validaciones
        if (!nombre.trim()) return setError('Por favor, ingresa tu nombre.');
        if (!email.trim()) return setError('Por favor, ingresa tu correo electrónico.');
        
        if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.');
        if (password !== confirmPassword) return setError('Las contraseñas no coinciden.');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return setError('Ingresa un correo electrónico válido.');
        }

        try {
            // Crear el usuario en Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Guardar información adicional en Firestore
            await setDoc(doc(db, 'usuarios', user.uid), {
                nombre,
                userId: user.uid,
                email,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2WjS_hXJ9gKTPO0DP2wQa9ho1mxaq2aynxQ&s',
                estado: 'activo',
            });

            // Navegar a la pantalla de inicio de sesión después del registro exitoso
            navigate('/login');
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            setError('Hubo un problema al crear el usuario. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Crear Cuenta
            </Typography>
            <Card>
                <CardContent>
                    <form onSubmit={handleRegister}>
                        <Box mb={2}>
                            <TextField
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FaceIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Correo Electrónico"
                                variant="outlined"
                                fullWidth
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Confirmar Contraseña"
                                variant="outlined"
                                fullWidth
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        {error && <Alert severity="error">{error}</Alert>}
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Crear Cuenta
                        </Button>
                        <Box mt={2} textAlign="center">
                            <Typography variant="body2">
                                ¿Ya tienes cuenta?{' '}
                                <Link to="/login">
                                    Iniciar Sesión
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default CrearCuenta;
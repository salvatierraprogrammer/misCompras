import React, { useState } from 'react';
import '../../public/css/AgregarSuperMercado.css'; // Asegúrate de agregar los estilos adecuados

function AgregarSuperMercado({ onAddSupermercado }) {
    const [nombreSupermercado, setNombreSupermercado] = useState('');

    const handleAddSupermercado = (e) => {
        e.preventDefault();
        if (nombreSupermercado) {
            onAddSupermercado(nombreSupermercado);
            setNombreSupermercado('');
        } else {
            alert('Por favor, ingresa el nombre del supermercado.');
        }
    };

    return (
        <div className='formContainer'>
            <h2>Agregar Supermercado</h2>
            <form onSubmit={handleAddSupermercado}>
                <div className='container-button'>
                    <input
                        placeholder='Nombre del supermercado'
                        className='inputText'
                        value={nombreSupermercado}
                        onChange={(e) => setNombreSupermercado(e.target.value)}
                    />
                    <button type='submit' className='buttonAdd'>+</button>
                </div>
            </form>
        </div>
    );
}

export default AgregarSuperMercado;
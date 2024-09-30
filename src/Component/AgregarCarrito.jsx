import React, { useState } from 'react';
import '../../public/css/AgregarCarrito.css';

function AgregarCarrito({ onAddProduct }) {
    const [nombreProduct, setNombreProduct] = useState('');
    const [precioProduct, setPrecioProduct] = useState('');
    const [cantidadProduct, setCantidadProduct] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (nombreProduct && precioProduct && cantidadProduct) {
            onAddProduct({
                nombre: nombreProduct,
                precio: parseFloat(precioProduct),
                cantidad: parseInt(cantidadProduct, 10),
            });
            setNombreProduct('');
            setPrecioProduct('');
            setCantidadProduct('');
            setShowModal(false); // Cerrar el modal después de agregar
        } else {
            alert('Por favor, complete todos los campos.');
        }
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)} className='buttonAdd'>Agregar Producto</button>

            {showModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Agregar Producto</h2>
                        <form onSubmit={handleAddProduct}>
                            <input
                                placeholder='Nombre del producto'
                                className='inputText'
                                value={nombreProduct}
                                onChange={(e) => setNombreProduct(e.target.value)}
                            />
                            <input
                                placeholder='Precio del producto'
                                className='inputText'
                                value={precioProduct}
                                onChange={(e) => setPrecioProduct(e.target.value)}
                            />
                            <input
                                placeholder='Cantidad del producto'
                                className='inputText'
                                value={cantidadProduct}
                                onChange={(e) => setCantidadProduct(e.target.value)}
                            />
                            <div className='modal-footer'>
                                <button type='submit'>Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AgregarCarrito;
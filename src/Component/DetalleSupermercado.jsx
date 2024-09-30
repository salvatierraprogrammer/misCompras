import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '../Firebase/Firebase_auth';
import AgregarCarrito from './AgregarCarrito';
import ModalPdf from './ModalPdf';
import Cargando from './Cargando';

import './Css/DetalleSupermercado.css';
function DetalleSupermercado() {
  const { id } = useParams(); // Obtener el ID de la URL
  const [compra, setCompra] = useState({ productos: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchCompra = async () => {
      try {
        const docRef = doc(db, 'listado_compras', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCompra({
            ...data,
            total: parseFloat(data.total) || 0,
            productos: data.productos || [],
          });
        } else {
          console.log('No hay documento!');
          setCompra({ productos: [], total: 0 });
        }
      } catch (e) {
        console.error('Error al obtener el documento:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchCompra();
  }, [id, db]);

  const handleAddProduct = async (newProduct) => {
    try {
      const productoValido = {
        ...newProduct,
        precio: parseFloat(newProduct.precio) || 0,
        cantidad: parseInt(newProduct.cantidad) || 0,
      };

      const docRef = doc(db, 'listado_compras', id);
      const newTotal = (compra.total || 0) + productoValido.precio * productoValido.cantidad;
      await updateDoc(docRef, {
        productos: [...(compra.productos || []), productoValido],
        total: newTotal,
      });

      setCompra((prevCompra) => ({
        ...prevCompra,
        productos: [...(prevCompra.productos || []), productoValido],
        total: newTotal,
      }));
    } catch (e) {
      console.error('Error al agregar producto:', e);
    }
  };

  const handleRemoveProduct = async (index) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const productoAEliminar = compra.productos[index];
        const updatedProducts = compra.productos.filter((_, i) => i !== index);
        const updatedTotal = updatedProducts.reduce((total, producto) => {
          const precio = parseFloat(producto.precio) || 0;
          const cantidad = parseInt(producto.cantidad) || 0;
          return total + precio * cantidad;
        }, 0);

        const docRef = doc(db, 'listado_compras', id);
        await updateDoc(docRef, {
          productos: updatedProducts,
          total: updatedTotal,
        });

        setCompra((prevCompra) => ({
          ...prevCompra,
          productos: updatedProducts,
          total: updatedTotal,
        }));
      } catch (e) {
        console.error('Error al eliminar producto:', e);
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <Cargando />;
  }

  if (!compra) {
    return <h1>Compra no encontrada</h1>;
  }

  return (
    <div className="container">
      <h1 className="heading">Detalle de la Compra</h1>
      <p className="supermercado">Supermercado: <span>{compra.supermercado}</span></p>
      <h2 className="subheading">Productos</h2>
      {compra.productos.length === 0 ? (
        <p className="noProducts">No hay productos en esta compra.</p>
      ) : (
        <ul className="productList">
          {compra.productos.map((producto, index) => (
            <li key={index} className="productItem">
              <span className="productName">Producto: {producto.nombre}</span>
              <span className="productQuantity">Cantidad: {producto.cantidad || 'N/A'}</span>
              <span className="productPrice">Precio: {producto.precio || '0'}$</span>
              <button
                onClick={() => handleRemoveProduct(index)}
                className="deleteButton"
              >
                &times;
              </button>
            </li>
          ))}
          <li className="total">Total: {compra.total.toFixed(2)}$</li>
        </ul>
      )}
      <div className="buttonsContainer">
        <AgregarCarrito onAddProduct={handleAddProduct} />
        <button onClick={handleOpenModal} className="pdfButton">Generar PDF</button>
        <ModalPdf isOpen={isModalOpen} onClose={handleCloseModal} total={compra.total} supermercado={compra.supermercado} productos={compra.productos} />
      </div>
    </div>
  );
}

export default DetalleSupermercado;
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Necesario para generar tablas en PDF

function ModalPdf({ isOpen, supermercado, onClose, total, productos = [] }) {
  const [numPersons, setNumPersons] = useState(1);
  console.log(supermercado);

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const amountPerPerson = total / numPersons;

    // Agregar el título
    doc.setFontSize(22);
    doc.text('Factura de Compra', 14, 20);

    // Agregar información del supermercado
    doc.setFontSize(16);
    doc.text(`Supermercado: ${supermercado}`, 14, 30);

    // Verificar si productos es un array válido
    if (Array.isArray(productos) && productos.length > 0) {
      // Agregar tabla de productos
      const tableData = productos.map(producto => [
        producto.nombre || 'Sin Nombre',
        producto.cantidad || 0,
        `${producto.precio?.toFixed(2) || '0.00'}$`,
        `${(producto.precio * (producto.cantidad || 1)).toFixed(2)}$`
      ]);

      doc.autoTable({
        startY: 50,
        head: [['Nombre', 'Cantidad', 'Precio', 'Subtotal']],
        body: tableData,
        margin: { top: 50 },
      });
    } else {
      // Agregar mensaje si no hay productos
      doc.text('No hay productos para mostrar.', 14, 50);
    }

    // Agregar total y división entre personas
    doc.setFontSize(16);
    doc.text(`Total: ${total.toFixed(2)}$`, 14, doc.autoTable.previous.finalY + 10);
    doc.text(`Dividido entre ${numPersons} persona(s): ${amountPerPerson.toFixed(2)}$`, 14, doc.autoTable.previous.finalY + 20);

    // Generar el PDF
    doc.save('factura_compra.pdf');
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Generar PDF</h2>
        <label>
          Dividir total entre cuántas personas?
          <input
            type="number"
            value={numPersons}
            min="1"
            onChange={(e) => setNumPersons(parseInt(e.target.value, 10))}
            style={styles.input}
          />
        </label>
        <button onClick={handleGeneratePDF} style={styles.button}>Generar PDF</button>
        <button onClick={onClose} style={styles.closeButton}>Cerrar</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '300px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '10px',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  closeButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ModalPdf;
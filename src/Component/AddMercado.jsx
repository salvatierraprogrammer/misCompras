import React, { useState } from 'react'
import '../../public/css/addMercado.css';

function AddMercado() {
    const [nombreMercado, setNombreMercado] = useState();
    const [nombreProduct, setNombreProduct] = useState();
    const [precioProduct, setPrecioProduct] = useState();
    const [cantidadProduct, setCantidadProduct] = useState();
    
    const [ListText, setListListText] = useState([])
   

    function createListText(nombreMercado, nombreProduct, precioProduct, cantidadProduct){
        setListListText([...ListText,
             nombreMercado,
             nombreProduct,
             precioProduct,
             cantidadProduct
            ])
    }
    console.log(ListText)

    const handlerButton = (e) => {
        e.preventDefault();
        createListText(
            nombreMercado,
            nombreProduct,
            precioProduct,
            cantidadProduct
        )
    } 
  return (
    <div className='container'>
        <form onSubmit={handlerButton}>
        <input
         placeholder='Nombre del super mercado'
         className='inputText'
         onChange={(e) => setNombreMercado(e.target.value) }
         />
          <input
         placeholder='Escribe aqui nombre de producto'
         className='inputText'
         onChange={(e) => setNombreProduct(e.target.value) }
         />
          <input
         placeholder='Escribe aqui precio de producto'
         className='inputText'
         onChange={(e) => setPrecioProduct(e.target.value) }
         />
          <input
         placeholder='Escribe aqui cantidad de producto'
         className='inputText'
         onChange={(e) => setCantidadProduct(e.target.value) }
         />
         <button type='submit'>Boton</button>
        </form>
        <div>
            {ListText.map((item, index) => (
                <div key={index}>
                    <p>{item}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AddMercado
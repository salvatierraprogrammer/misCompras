async function CargarDatosApi() {
    const response = await fetch('https://dummyjson.com/users'); // Cambiar a un endpoint que devuelva un array
    const dataAp = await response.json();
    return dataAp;
  }
  
  export default CargarDatosApi;
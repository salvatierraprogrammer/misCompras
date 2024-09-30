import { createApi } from '@reduxjs/toolkit/query/react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase_auth'; // Ensure this path is correct

// Configuración de la API
export const ecApi = createApi({
  reducerPath: "ecApi",
  endpoints: (builder) => ({
    // Consulta de usuarios desde Firestore
    getUsuarios: builder.query({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(collection(db, "usuarios"));
          const usuarios = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          return { data: usuarios };
        } catch (error) {
          console.error("Error fetching users: ", error);
          return { error: { message: error.message } };
        }
      },
    }),
    getListaDeCompras: builder.query({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(collection(db, "listado_compras"));
          const compras = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          return { data: compras };
        } catch (error) {
          console.error("Error fetching compras: ", error);
          return { error: { message: error.message } };
        }
      },
    }),
    // Crear un nuevo supermercado
    createCompra: builder.mutation({
      async queryFn(newCompra) {
        try {
          const docRef = await addDoc(collection(db, 'listado_compras'), newCompra);
          return { data: { id: docRef.id, ...newCompra } }; // Return the new data with its ID
        } catch (error) {
          console.error("Error creating compra: ", error);
          return { error: { message: error.message } };
        }
      },
    }),
    // Eliminar un supermercado
    deleteCompra: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, 'listado_compras', id));
          return { data: id }; // Return the ID of the deleted item
        } catch (error) {
          console.error("Error deleting compra: ", error);
          return { error: { message: error.message } };
        }
      },
    }),
  }),
});

// Exportaciones de consultas y mutaciones para ser utilizadas en componentes
export const {
  useGetUsuariosQuery,
  useGetListaDeComprasQuery,
  useCreateCompraMutation,
  useDeleteCompraMutation
} = ecApi;
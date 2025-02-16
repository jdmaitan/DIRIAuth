import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MenuItem } from "../entities/entities";
import { db } from "../firebaseConfig";
import { ref, push } from "firebase/database";
import logger from "../services/logger";

interface MenuState
{
    menuItems: MenuItem[];
    loading: boolean;
    error: string | null;
    message: string | null;
}

const initialState: MenuState = {
    menuItems: [ // Datos iniciales de los items del menú.
        {
            id: 1,
            name: "Hamburguesa de Pollo",
            quantity: 40,
            description: "Pollo frito y mayonesa",
            price: 24,
            image: "hamburguesa.jpeg"
        },
        {
            id: 2,
            name: "Pizza Margarita",
            quantity: 30,
            description: "Tomate, mozzarella y albahaca",
            price: 35,
            image: "margarita.jpg"
        },
        {
            id: 3,
            name: "Tacos al Pastor",
            quantity: 50,
            description: "Cerdo adobado con piña y cilantro",
            price: 18,
            image: "tacos.jpg"
        },
        {
            id: 4,
            name: "Ensalada César",
            quantity: 25,
            description: "Lechuga, pollo y aderezo César",
            price: 22,
            image: "ensalada.jpg"
        }
    ],
    loading: false, // Indica si se está realizando una petición.
    error: null, // Almacena mensajes de error.
    message: null // Almacena mensajes de información/éxito.
};

// AsyncThunk para guardar el pedido en Firebase.
export const orderItemAsync = createAsyncThunk("menu/orderItem",
    async ({ orderedItem, orderedQuantity }: { orderedItem: MenuItem; orderedQuantity: number }) =>
    {
        const ordersRef = ref(db, "orders"); // Referencia al nodo "orders" en la base de datos.
        const orderToSave = { // Objeto con los datos del pedido a guardar.
            id: orderedItem.id,
            name: orderedItem.name,
            orderedQuantity,
            unitPrice: orderedItem.price,
            totalPrice: orderedQuantity * orderedItem.price
        };

        await push(ordersRef, orderToSave) // Guarda el pedido en Firebase.
            .then(result => logger.info(`Pedido guardado. URL: ${result}`)); // Registra un mensaje de éxito.
        return { orderedItem, orderedQuantity }; // Retorna los datos del pedido.
    }
);

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        clearMessage: (state) =>
        { // Limpia el mensaje de la orden.
            state.message = null;
        }
    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(orderItemAsync.pending, (state) =>
            { // Caso pendiente de la petición.
                state.loading = true; // Establece loading a true.
                state.message = "Enviando pedido..."; // Mensaje de "Enviando pedido".
                state.error = null; // Limpia errores anteriores.
            })
            .addCase(orderItemAsync.fulfilled, (state, action) =>
            { // Caso de petición exitosa.
                state.loading = false; // Establece loading a false.
                state.message = "Pedido enviado con éxito"; // Mensaje de éxito.
                const { orderedItem, orderedQuantity } = action.payload; // Obtiene los datos del pedido.
                // Actualiza la cantidad de items en el menú.
                state.menuItems = state.menuItems.map((menuItem) =>
                    menuItem.id === orderedItem.id ? { ...menuItem, quantity: menuItem.quantity - orderedQuantity } : menuItem
                );
            })
            .addCase(orderItemAsync.rejected, (state) =>
            { // Caso de petición fallida.
                state.loading = false; // Establece loading a false.
                state.message = null; // Limpia mensajes anteriores.
                state.error = "Error al enviar el pedido. Intente nuevamente."; // Mensaje de error.
            });
    }
});


export const { clearMessage } = menuSlice.actions; // Exporta la acción clearMessage.
export default menuSlice.reducer; // Exporta el reducer.
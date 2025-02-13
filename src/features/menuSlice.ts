import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MenuItem } from "../entities/entities";
import { getDatabase, push, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import logger from "../services/logger";

interface MenuState
{
    menuItems: MenuItem[];
    loading: boolean;
    error: string | null;
    message: string | null;
}

const initialState: MenuState = {
    menuItems: [
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
    loading: false,
    error: null,
    message: null
};

const firebaseConfig = {
    apiKey: "AIzaSyC2eim7o52-1qm8JHc8KpeReeMtmvILGdU",
    authDomain: "comidadiri.firebaseapp.com",
    databaseURL: "https://comidadiri-default-rtdb.firebaseio.com",
    projectId: "comidadiri",
    storageBucket: "comidadiri.firebasestorage.app",
    messagingSenderId: "647627909900",
    appId: "1:647627909900:web:fab8cb7fec7c7015153729",
    measurementId: "G-WFB7HSTPQD"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//El asyncThunk se usa para la llamada al la API de firebase
export const orderItemAsync = createAsyncThunk("menu/orderItem",
    async ({ orderedItem, orderedQuantity }: { orderedItem: MenuItem; orderedQuantity: number }) =>
    {
        const ordersRef = ref(db, "orders");
        const orderToSave = {
            id: orderedItem.id,
            name: orderedItem.name,
            orderedQuantity,
            unitPrice: orderedItem.price,
            totalPrice: orderedQuantity * orderedItem.price
        };

        await push(ordersRef, orderToSave)
            .then(result => logger.info(`Se han guardado los datos exitosamente en la base de datos. URL de consulta: ${result}`));
        return { orderedItem, orderedQuantity };
    }
);

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        clearMessage: (state) =>
        {
            state.message = null;
        }
    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(orderItemAsync.pending, (state) =>
            {
                state.loading = true;
                state.message = "Enviando pedido...";
                state.error = null;
            })
            .addCase(orderItemAsync.fulfilled, (state, action) =>
            {
                //Una vez que se se logra con exito el guardado en la base de
                //datos de firebase, se modifica el estado con redux
                state.loading = false;
                state.message = "Pedido enviado con éxito";
                const { orderedItem, orderedQuantity } = action.payload;
                state.menuItems = state.menuItems.map((menuItem) =>
                    menuItem.id === orderedItem.id ? { ...menuItem, quantity: menuItem.quantity - orderedQuantity } : menuItem
                );
            })
            .addCase(orderItemAsync.rejected, (state) =>
            {
                state.loading = false;
                state.message = null;
                state.error = "Error al enviar el pedido. Intente nuevamente.";
            });
    }
});


export const { clearMessage } = menuSlice.actions;
export default menuSlice.reducer;

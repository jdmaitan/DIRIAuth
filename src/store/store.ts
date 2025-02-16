import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "../features/menuSlice";
import loggerMiddleware from "../middleware/loggerMiddleware";

// Configura la tienda Redux con los reducers y middlewares.
export const store = configureStore({
    reducer: {
        menu: menuReducer, // Reducer para la gestión del menú.
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loggerMiddleware), // Middleware para el registro de acciones (logging).
});

// Define los tipos para el estado raíz y el dispatch de la aplicación.
export type RootState = ReturnType<typeof store.getState>; // Tipo para el estado global de la aplicación.
export type AppDispatch = typeof store.dispatch; // Tipo para la función dispatch, para despachar acciones.
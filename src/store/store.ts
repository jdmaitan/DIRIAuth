import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "../features/menuSlice";
import loggerMiddleware from "../middleware/loggerMiddleware";

export const store = configureStore({
    reducer: {
        menu: menuReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

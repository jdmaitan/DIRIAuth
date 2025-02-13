import { Middleware } from "@reduxjs/toolkit";

//Se utiliza el middleware para guardar los cambios de estado de redux
const loggerMiddleware: Middleware = (store) => (next) => (action) =>
{
    console.log("%cEstado anterior:", "color: orange;", store.getState());

    const result = next(action);

    console.log("%cSiguiente estado:", "color: cyan;", store.getState());
    console.groupEnd();

    return result;
};

export default loggerMiddleware;

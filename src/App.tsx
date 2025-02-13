import React from 'react';
import { Suspense, useState } from 'react'
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import './App.css'

const MenuPage = React.lazy(() => import('./components/MenuPage/MenuPage'));

function App()
{
    //Se obtienen los objetos del menú desde el estado de redux
    const menuItems = useSelector((state: RootState) => state.menu.menuItems);
    const [showMenuPage, setShowMenuPage] = useState(false);

    return (
        <div className="App">
            <button className="toggleButton"
                onClick={() => setShowMenuPage(!showMenuPage)}>
                {showMenuPage ? "Mostrar stock de productos" : "Mostrar menú"}
            </button>

            <h1 className="title">Comida Rápida Online</h1>

            {!showMenuPage && (
                <>
                    <h4 className="subTitle">Disponibilidad de platos</h4>
                    <ul className="ulApp">
                        {menuItems.map((menuItem) => (
                            <li key={menuItem.id} className="liApp">
                                <p>{menuItem.name}</p>
                                <p>Stock:{menuItem.quantity}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {showMenuPage &&
                <Suspense fallback={<div>Cargando menú...</div>}>
                    <MenuPage />
                </Suspense>
            }

        </div>
    );
}

export default App

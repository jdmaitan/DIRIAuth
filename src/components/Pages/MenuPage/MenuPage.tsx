import { useState } from 'react';
import { useSelector } from "react-redux";
import { MenuItem } from '../../../entities/entities';
import OrderPage from '../OrderPage/OrderPage';
import { RootState } from "../../../store/store";
import './MenuPage.css';

function MenuPage()
{
    const menuItems = useSelector((state: RootState) => state.menu.menuItems); // Obtiene los items del menú desde Redux.
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null); // Estado para el item seleccionado.

    const handleMenuItemClick = (menuItem: MenuItem) =>
    { // Handler para clicks en items del menú.
        setSelectedMenuItem(menuItem);
    };

    return (
        <div className='menuContainer'> {/* Contenedor principal del menú. */}
            {!selectedMenuItem ? ( // Si no hay item seleccionado, muestra el menú.
                <>
                    <h2>Menú</h2>
                    <h4 className="foodTitle">Pulsa sobre cada producto para añadirlo</h4>
                    <ul className="ulFoods">
                        {menuItems.map((menuItem) => (
                            <li key={menuItem.id}
                                className="liFoods"
                                onClick={() => handleMenuItemClick(menuItem)}> {/* Click handler para seleccionar item. */}
                                <img
                                    className="foodImg"
                                    src={`images/${menuItem.image}`}
                                    alt={menuItem.name}
                                />
                                <div className="foodItem">
                                    <p className="foodDesc">{menuItem.description}</p>
                                    <p className="foodPrice">{menuItem.price}$</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : ( // Si hay item seleccionado, muestra la página de la orden.
                <OrderPage selectedMenuItem={selectedMenuItem}
                    onReturnToMenu={() => setSelectedMenuItem(null)} />
            )}
        </div>
    );
}

export default MenuPage;
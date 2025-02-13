import { useState } from 'react';
import { useSelector } from "react-redux";
import { MenuItem } from '../../entities/entities';
import OrderPage from '../OrderPage/OrderPage';
import { RootState } from "../../store/store";
import './MenuPage.css';

function MenuPage()
{
    const menuItems = useSelector((state: RootState) => state.menu.menuItems);
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

    const handleMenuItemClick = (menuItem: MenuItem) =>
    {
        setSelectedMenuItem(menuItem);
    };

    return (
        <>
            {!selectedMenuItem ? (
                <>
                    <h2>Menú</h2>
                    <h4 className="foodTitle">Pulsa sobre cada producto para añadirlo</h4>
                    <ul className="ulFoods">
                        {menuItems.map((menuItem) => (
                            <li key={menuItem.id}
                                className="liFoods"
                                onClick={() => handleMenuItemClick(menuItem)}>
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
            ) 
            :
            (
                <OrderPage selectedMenuItem={selectedMenuItem}
                    onReturnToMenu={() => setSelectedMenuItem(null)}
                />
            )}
        </>
    );
}

export default MenuPage;
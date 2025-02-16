import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import './stockPage.css'

function App()
{
    //Se obtienen los objetos del menú desde el estado de redux
    const menuItems = useSelector((state: RootState) => state.menu.menuItems);

    return (
        <div className="StockPage">
            <h4 className="subTitle">Disponibilidad de platos</h4>
            <ul className="stockList">
                {menuItems.map((menuItem) => (
                    <li key={menuItem.id} className="stockItem">
                        <p>{menuItem.name}</p>
                        <p>Stock:{menuItem.quantity}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App
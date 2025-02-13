import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, orderItemAsync } from "../../features/menuSlice";
import { MenuItem } from "../../entities/entities";
import { AppDispatch, RootState } from "../../store/store";
import "./OrderPage.css";

interface OrderPageProps
{
	selectedMenuItem: MenuItem;
	onReturnToMenu: () => void;
}

function OrderPage({ selectedMenuItem, onReturnToMenu }: OrderPageProps)
{
	//Se obtienen los elementos que nos interesan del estado desde el slice de redux
	const { loading, message, error } = useSelector((state: RootState) => state.menu);
	const dispatch = useDispatch<AppDispatch>();
	const [orderQuantity, setOrderQuantity] = useState(1);
	const [orderSent, setOrderSent] = useState(false);

	const handleOrderQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) =>
	{
		const newOrderQuantity = parseInt(event.target.value, 10);
		setOrderQuantity(isNaN(newOrderQuantity) || newOrderQuantity < 1 ? 1 : newOrderQuantity);
	};

	const handleSubmitOrder = () =>
	{
		//Se utilizan el disptach para llamar el asyncThunk con el item del menú deseado y la cantidad
		dispatch(orderItemAsync({ orderedItem: selectedMenuItem, orderedQuantity: orderQuantity }))
		.then(() =>
		{
			setOrderSent(true);
		});
	};

	//Se usa una action en el reducer para limpiar el mensaje mostrado cada vez que se regresa al menú
	const handleReturnToMenu = () => {
		dispatch(clearMessage());
		onReturnToMenu();
	};

	return (
		<div className="food-order-container">
			<div className="food-details">
				<h4>{selectedMenuItem.name}</h4>
				<div className="food-image-container">
					<img src={`images/${selectedMenuItem.image}`}
						alt={selectedMenuItem.name}
						className="food-image" />
				</div>
				<p>{selectedMenuItem.description}</p>
				<p className="food-price">{(selectedMenuItem.price * orderQuantity).toFixed(2)}€</p>
				<div className="quantity-controls">
					<label htmlFor="quantity">Cantidad:</label>
					<input type="number"
						id="quantity"
						value={orderQuantity}
						onChange={handleOrderQuantityChange} 
						min="1" />
				</div>

				<div className="buttons-container">
					<button className="order-button"
						onClick={handleSubmitOrder}
						disabled={loading || orderSent}>
						{orderSent ? "Pedido enviado" : loading ? "Enviando..." : "Enviar pedido"}
					</button>
					<button onClick={handleReturnToMenu}
						className="return-button">
						Volver al menú
					</button>
				</div>

				{/* Se usan las propiedades del estado del slice para mostrar mensajes según el estado
				de las funciones asíncronas */}
				{message && <p className="order-confirmation">{message}</p>}
				{error && <p className="error-message">{error}</p>}
			</div>
		</div>
	);
}

export default OrderPage;
import React from 'react';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page-container">
      <div className="welcome-message">
        <h1>Bienvenido al restaurante XYZ</h1>
        <p>Por favor, haga login para acceder al menú de pedidos.</p>
      </div>
      <div className="restaurant-image">
        <img src={`${import.meta.env.BASE_URL}images/restaurantLogo.png`} alt="Restaurant XYZ" />
      </div>
    </div>
  );
};

export default HomePage;
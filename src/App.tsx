import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import Navbar from './components/Navbar/navbar';
import HomePage from './components/Pages/HomePage/homePage';
import './App.css';
import LoginPage from './components/Pages/LoginPage/loginPage';
import SignUpPage from './components/Pages/SignUpPage/signUpPage';
import AdminPage from './components/Pages/AdminPage/adminPage';
import MenuPage from './components/Pages/MenuPage/MenuPage';
import ProtectedRoute from './components/routes/protectedRoute';
import AdminRoute from './components/routes/adminRoute';
import StockPage from './components/Pages/StockPage/stockPage';

const App: React.FC = () =>
{
    return (
        <AuthProvider> {/* Proveedor de autenticación para gestionar el estado del usuario. */}
            <Router> {/* Enrutador principal de la aplicación. */}
                <Navbar /> {/* Barra de navegación común en toda la app. */}
                <div className="main-content"> {/* Contenido principal de cada página. */}
                    <Routes> {/* Define las rutas de la aplicación. */}
                        <Route path="/" element={<HomePage />} /> {/* Ruta para la página de inicio. */}
                        <Route path="/login" element={<LoginPage />} /> {/* Ruta para la página de login. */}
                        <Route path="/signUp" element={<SignUpPage />} /> {/* Ruta para la página de registro. */}
                        <Route path="/menu" element={
                            <ProtectedRoute>
                                <MenuPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/stock" element={
                            <AdminRoute> {/* Ruta protegida para administradores. */}
                                <StockPage /> {/* Página de stock, solo accesible para administradores. */}
                            </AdminRoute>
                        } />
                        <Route path="/admin" element={
                            <AdminRoute> {/* Ruta protegida para administradores. */}
                                <AdminPage /> {/* Página de administración, solo accesible para administradores. */}
                            </AdminRoute>
                        } />
                        <Route path="*" element={<HomePage />} /> {/* Ruta comodín, redirige a inicio si la ruta no existe. */}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
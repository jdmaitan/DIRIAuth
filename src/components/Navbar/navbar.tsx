import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { authService } from '../../services/AuthService';
import './navbar.css';
import { Role } from '../../services/interfaces/IAuthService';

const Navbar: React.FC = () =>
{
    const { user, roles } = useContext(AuthContext); // Obtiene usuario y roles del contexto.
    const navigate = useNavigate(); // Hook para la navegación.

    const handleLogout = async () =>
    { // Función para cerrar sesión.
        try
        {
            await authService.signOut(); // Llama al servicio de autenticación para cerrar sesión.
            navigate('/login'); // Redirige al usuario a la página de login.
        } catch (error)
        {
            console.error("Error al cerrar sesión:", error); // Maneja errores de cierre de sesión.
        }
    };

    return (
        <nav className="navbar">
            <ul className="nav-menu">
                <li><Link to="/">Home</Link></li> {/* Enlace a la página principal. */}
                {/* Enlaces condicionales según el rol y estado de autenticación. */}
                {user && roles && (roles.includes(Role.USER) || roles.includes(Role.ADMIN)) && (
                    <li><Link to="/menu">Menu</Link></li> // Enlace al menú (usuarios y admins).
                )}
                {user && roles && roles.includes(Role.ADMIN) && (
                    <li><Link to="/stock">Stock</Link></li> // Enlace al stock (solo admins).
                )}
                {user && roles && roles.includes(Role.ADMIN) && (
                    <li><Link to="/admin">Admin</Link></li> // Enlace a la administración (solo admins).
                )}
                {!user && <li><Link to="/login">Login</Link></li>} {/* Enlace a login (si no autenticado). */}
                {!user && <li><Link to="/signUp">Registro</Link></li>} {/* Enlace a registro (si no autenticado). */}
                {user && <li><button onClick={handleLogout}>Logout</button></li>} {/* Botón de logout. */}
            </ul>
        </nav>
    );
};

export default Navbar;
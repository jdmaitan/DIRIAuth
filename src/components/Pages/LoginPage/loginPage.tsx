import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/AuthService';
import './loginPage.css';

const LoginPage: React.FC = () =>
{
    const [email, setEmail] = useState<string>(""); // Estado para el email.
    const [password, setPassword] = useState<string>(""); // Estado para la contraseña.
    const [error, setError] = useState<string>(""); // Estado para mensajes de error.
    const navigate = useNavigate(); // Hook para la navegación.

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault(); // Evita la recarga de la página.
        setError(""); // Limpia mensajes de error anteriores.

        try
        {
            const userCredential = await authService.signIn(email, password); // Inicia sesión.
            console.log("Usuario autenticado:", userCredential.user); // Muestra mensaje en consola.
            navigate('/menu'); // Redirige al menú.
        } catch (error: any)
        {
            console.error("Error al iniciar sesión:", error); // Muestra mensaje de error en la consola.
            setError(error.message); // Establece el mensaje de error.
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="login-title">Iniciar Sesión</h2> {/* Título del formulario. */}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                /> {/* Campo de email. */}
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                /> {/* Campo de contraseña. */}
                <button type="submit" className="login-button">Ingresar</button> {/* Botón de login. */}
                {error && <p className="error-message">{error}</p>} {/* Mensaje de error (condicional). */}
            </form>
        </div>
    );
};

export default LoginPage;
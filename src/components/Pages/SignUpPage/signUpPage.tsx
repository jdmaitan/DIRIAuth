import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/AuthService';
import './signUpPage.css';
import { userService } from '../../../services/UserService';

const SignUpPage: React.FC = () =>
{
    const [email, setEmail] = useState<string>(""); // Estado para el email.
    const [password, setPassword] = useState<string>(""); // Estado para la contraseña.
    const [error, setError] = useState<string>(""); // Estado para mensajes de error.
    const [success, setSuccess] = useState<string>(""); // Estado para mensajes de éxito.
    const navigate = useNavigate(); // Hook para la navegación.

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault(); // Evita la recarga de la página.
        setError(""); // Limpia mensajes de error anteriores.

        try
        {
            const userCredential = await authService.signUp(email, password); // Registra al usuario.
            console.log("Usuario registrado:", userCredential.user); // Muestra mensaje en consola.
            await userService.setUserRoles(userCredential.user.uid, { // Asigna roles al usuario.
                email: userCredential.user.email,
                roles: { admin: false }
            });
            setSuccess('Registro exitoso. Redirigiendo al menu...'); // Mensaje de éxito.
            setTimeout(() =>
            {
                navigate('/menu'); // Redirige al menú tras un breve tiempo.
            }, 2000);
        } catch (error: any)
        {
            console.error("Error al registrarse:", error); // Muestra mensaje de error en la consola.
            setError(error.message); // Establece el mensaje de error.
        }
    };

    return (
        <div className="signUp-container">
            <form className="signUp-form" onSubmit={handleRegister}>
                <h2 className="signUp-title">Registrarse</h2> {/* Título del formulario. */}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signUp-input"
                /> {/* Campo de email. */}
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signUp-input"
                /> {/* Campo de contraseña. */}
                <button type="submit" className="signUp-button">Registrarse</button> {/* Botón de registro. */}
                {error && <p className="error-message">{error}</p>} {/* Mensaje de error (condicional). */}
                {success && <p className="success-message">{success}</p>} {/* Mensaje de éxito (condicional). */}
            </form>
        </div>
    );
};

export default SignUpPage;
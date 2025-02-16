import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services/AuthService';
import { Role } from '../services/interfaces/IAuthService';

// Interfaz para las propiedades del contexto: usuario y roles.
interface AuthContextProps {
    user: any | null;
    roles: Role[] | null;
}

// Crea el contexto de autenticación.
export const AuthContext = createContext<AuthContextProps>({ user: null, roles: null });

// Interfaz para las propiedades del proveedor: children.
interface AuthProviderProps {
    children: ReactNode;
}

// Componente proveedor del contexto de autenticación.
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    // Estados para el usuario y roles.
    const [user, setUser] = useState<any | null>(null);
    const [roles, setRoles] = useState<Role[] | null>(null);

    // Efecto para la suscripción al cambio de estado de autenticación.
    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged(async (currentUser) => {
            setUser(currentUser); // Establece el usuario.

            if (currentUser) {
                try {
                    const userRoles = await authService.getUserRoles(currentUser); // Obtiene los roles.
                    setRoles(userRoles); // Establece los roles.
                } catch (error) {
                    console.error('Error al obtener los roles:', error);
                    setRoles(null); // Maneja el error.
                }
            } else {
                setRoles(null); // Limpia los roles si no hay usuario.
            }
        });

        return unsubscribe; // Función de cancelación de la suscripción.
    }, []);

    // Proveedor del contexto con valores de usuario y roles.
    return (
        <AuthContext.Provider value={{ user, roles }}>
            {children}
        </AuthContext.Provider>
    );
};
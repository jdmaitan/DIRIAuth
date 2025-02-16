import React, { useEffect, useState } from "react";
import { userService } from "../../../services/UserService";
import './AdminPage.css'; // Import your CSS file

interface User
{
    uid: string;
    email: string;
    roles: { admin: boolean };
}

const AdminPage: React.FC = () =>
{
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>("");

    const fetchUsers = async () =>
    {
        try
        {
            const usersData = await userService.getAllUsers();
            const usersArray: User[] = Object.entries(usersData).map(([uid, data]) => ({
                uid,
                email: data.email,
                roles: data.roles || { admin: false },
            }));
            setUsers(usersArray);
        } catch (error)
        {
            console.error("Error fetching users:", error);
            setError("Error al cargar usuarios");
        }
    };

    const handleToggleAdmin = async (uid: string, isAdmin: boolean) =>
    {
        try
        {
            await userService.updateUserAdminRole(uid, isAdmin);
            fetchUsers();
        } catch (error)
        {
            console.error("Error updating role:", error);
            setError("No se pudo actualizar el rol");
        }
    };

    useEffect(() =>
    {
        fetchUsers();
    }, []);

    return (
        <div className="admin-panel-container"> {/* Container class */}
            <h1 className="admin-panel-title">Administración</h1>
            <h2 className="admin-panel-subtitle">Panel de Administración</h2>

            {error && <p className="admin-panel-error">{error}</p>} {/* Error message class */}

            <table className="admin-panel-table"> {/* Table class */}
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>¿Es Admin?</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.uid}>
                            <td>{user.email}</td>
                            <td>{user.roles.admin ? "Sí" : "No"}</td>
                            <td>
                                {user.roles.admin ? (
                                    <button className="admin-panel-button" onClick={() => handleToggleAdmin(user.uid, false)}>
                                        Remover Admin
                                    </button>
                                ) : (
                                    <button className="admin-panel-button" onClick={() => handleToggleAdmin(user.uid, true)}>
                                        Añadir Admin
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
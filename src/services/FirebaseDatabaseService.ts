import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../firebaseConfig';
import { Role } from './interfaces/IAuthService';
import { IUserDatabaseService } from './interfaces/IUserDatabaseService';

export class FirebaseDatabaseService implements IUserDatabaseService
{
    async getUserRoles(uid: string): Promise<Role[]>
    {
        const db = getDatabase(app); // Obtiene la instancia de la base de datos.
        const rolesRef = ref(db, `users/${uid}/roles`); // Crea una referencia al nodo de roles del usuario.
        const snapshot = await get(rolesRef); // Obtiene los datos del nodo de roles.

        if (snapshot.exists())
        { // Verifica si existen datos en el snapshot.
            const rolesData = snapshot.val(); // Obtiene los datos de roles como un objeto.
            const roles: Role[] = []; // Inicializa un array para los roles.

            if (rolesData.admin === true)
            { // Verifica si el rol 'admin' es verdadero.
                roles.push(Role.ADMIN); // Agrega el rol ADMIN al array.
            }

            if (roles.length === 0)
            { // Si no se encontró ningún rol específico.
                roles.push(Role.USER); // Asigna el rol USER por defecto.
            }

            return roles; // Retorna el array de roles.
        }

        return [Role.USER]; // Retorna el rol USER por defecto si no existen datos.
    }
}
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../firebaseConfig';
import { Role } from './IAuthService';
import { IUserDatabaseService } from './IUserDatabaseService';

export class FirebaseDatabaseService implements IUserDatabaseService
{
    async getUserRoles(uid: string): Promise<Role[]>
    {
        const db = getDatabase(app);
        const rolesRef = ref(db, `users/${uid}/roles`); // Corrected template literal syntax
        const snapshot = await get(rolesRef);

        if (snapshot.exists())
        {
            const rolesData = snapshot.val();
            const roles: Role[] = [];

            if (rolesData.admin === true)
            { // or rolesData.admin === true, depending on data type
                roles.push(Role.ADMIN);
            }

            // Aquí se pueden agregar otros roles según se requiera.

            if (roles.length === 0)
            {
                // Si no se ha asignado ningún rol, se asume el rol de usuario.
                roles.push(Role.USER);
            }

            return roles;
        }

        return [Role.USER]; // Return default user role if snapshot doesn't exist
    }
}
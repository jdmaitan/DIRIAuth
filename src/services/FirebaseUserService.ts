import { IUserService } from "./interfaces/IUserService";
import { getDatabase, ref, get, update, set } from "firebase/database";
import { app } from "../firebaseConfig";

export class FirebaseUserService implements IUserService
{
    private db;

    constructor()
    {
        this.db = getDatabase(app); // Obtiene la instancia de la base de datos de Firebase.
    }

    async getAllUsers(): Promise<{ [uid: string]: any }>
    {
        const usersRef = ref(this.db, "users"); // Crea una referencia al nodo 'users' en la base de datos.
        const snapshot = await get(usersRef); // Obtiene los datos del nodo 'users'.

        if (snapshot.exists())
        {
            return snapshot.val(); // Retorna un objeto con todos los usuarios almacenados.
        }
        return {}; // Retorna un objeto vacío si no existen usuarios.
    }

    async updateUserAdminRole(uid: string, isAdmin: boolean): Promise<void>
    {
        const userRolesRef = ref(this.db, `users/${uid}/roles`); // Crea referencia al nodo 'roles' del usuario específico.
        await update(userRolesRef, { admin: isAdmin }); // Actualiza el rol 'admin' del usuario.
    }

    async setUserRoles(uid: string, data: any): Promise<void>
    {
        const userRef = ref(this.db, `users/${uid}`); // Crea referencia al nodo del usuario específico.
        const snapshot = await get(userRef); // Obtiene los datos del usuario.

        if (!snapshot.exists())
        {
            await set(userRef, data); // Si el usuario no existe, lo crea con los datos proporcionados.
        } else
        {
            await update(userRef, data); // Si el usuario existe, actualiza sus datos.
        }
    }
}
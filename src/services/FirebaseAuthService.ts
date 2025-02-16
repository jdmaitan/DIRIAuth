import { IAuthService, Role } from './interfaces/IAuthService';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebaseConfig';
import { FirebaseDatabaseService } from "./FirebaseDatabaseService";

const auth = getAuth(app);

export class FirebaseAuthService implements IAuthService
{
    private databaseService: FirebaseDatabaseService;

    constructor()
    {
        this.databaseService = new FirebaseDatabaseService(); // Instancia el servicio de base de datos.
    }

    signIn(email: string, password: string): Promise<any>
    {
        return signInWithEmailAndPassword(auth, email, password); // Inicia sesión con email y contraseña.
    }

    signUp(email: string, password: string): Promise<any>
    {
        return createUserWithEmailAndPassword(auth, email, password); // Crea un nuevo usuario con email y contraseña.
    }

    signOut(): Promise<void>
    {
        return signOut(auth); // Cierra la sesión del usuario.
    }

    onAuthStateChanged(callback: (user: any) => void): () => void
    {
        return onAuthStateChanged(auth, callback); // Escucha cambios en el estado de autenticación del usuario.
    }

    getCurrentUser(): any | null
    {
        return auth.currentUser; // Obtiene el usuario autenticado actual.
    }

    async getUserRoles(user: any): Promise<Role[]>
    {
        // Rol ADMIN por defecto para el usuario admin@admin.com.
        if (user.email === 'admin@admin.com')
        {
            return [Role.ADMIN];
        }

        // Obtiene los roles del usuario desde la base de datos.
        return this.databaseService.getUserRoles(user.uid);
    }
}
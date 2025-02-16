export interface IUserService
{
    getAllUsers(): Promise<{ [uid: string]: any }>;
    updateUserAdminRole(uid: string, isAdmin: boolean): Promise<void>;
    setUserRoles(uid: string, data: any): Promise<void>;
}
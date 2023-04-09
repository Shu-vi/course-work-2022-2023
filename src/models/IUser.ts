export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    canAccessClosed: boolean;
    isClosed: boolean;
}
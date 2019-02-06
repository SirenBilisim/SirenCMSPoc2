export class LocalUser {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token?: string;
    roleList: string[];
}
export interface IAuthValues {
    email: string;
    username: string;
    password: string;
}

export interface IRegisteredUser {
    id: number;
    email: string;
    username: string;
    token: string;
}

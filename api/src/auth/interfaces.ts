export interface IAuthValues {
    email: string;
    username: string;
    password: string;
}

export interface IRegisteredUser {
    userId: string;
    email: string;
    username: string;
    token: string;
    avatarPath?: string;
}

export interface IJWTokens {
    accessToken: string;
    refreshToken: string;
}

export interface IAuthValues {
    email: string;
    password: string;
}

export interface IRegisteredUser {
    id: number;
    email: string;
    accessToken: string;
    refreshToken: string;
}

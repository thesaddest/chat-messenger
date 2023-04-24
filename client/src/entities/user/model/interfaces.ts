export interface IUser {
    userId: string;
    email: string;
    username: string;
    token: string;
    avatarPath: string;
}

export interface IChangeAvatarPayload {
    username: string;
    formData: FormData;
}

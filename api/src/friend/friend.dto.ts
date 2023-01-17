import { IsBoolean, IsString } from "class-validator";

export class FriendDto {
    @IsString()
    userBehindFriend: string;

    @IsString()
    username: string;

    @IsString()
    addedBy: string;

    @IsBoolean()
    connected: boolean;
}

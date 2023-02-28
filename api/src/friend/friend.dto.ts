import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class FriendDto {
    @IsString()
    @IsNotEmpty()
    userBehindFriend: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    addedBy: string;

    @IsBoolean()
    @IsNotEmpty()
    connected: boolean;
}

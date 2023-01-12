import { IsBoolean, IsNumber, IsString } from "class-validator";

export class FriendDto {
    @IsNumber()
    id: number;

    @IsString()
    username: string;

    @IsString()
    addedBy: string;

    @IsBoolean()
    connected: boolean;
}

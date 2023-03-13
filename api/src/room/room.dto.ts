import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class RoomDto {
    @IsString()
    @IsNotEmpty()
    roomId: string;

    @IsString()
    @MinLength(3)
    roomName: string;

    @IsString()
    createdBy: string;
}

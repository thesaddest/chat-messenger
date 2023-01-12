import { IsNotEmpty, IsString } from "class-validator";

export class MessageDto {
    @IsString()
    @IsNotEmpty()
    to: string;

    @IsString()
    @IsNotEmpty()
    from: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class MessageDto {
    @IsNumber()
    @IsNotEmpty()
    to: string;

    @IsString()
    @IsNotEmpty()
    from: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
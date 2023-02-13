import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class MessageDto {
    @IsString()
    @IsNotEmpty()
    messageId: string;

    @IsNumber()
    @IsNotEmpty()
    to: string;

    @IsString()
    @IsNotEmpty()
    from: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsBoolean()
    @IsNotEmpty()
    isMessageSelected: boolean;

    @IsBoolean()
    @IsNotEmpty()
    isMessageRead: boolean;
}

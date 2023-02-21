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
    isMessageSelected?: boolean;

    @IsBoolean()
    @IsNotEmpty()
    isMessageRead: boolean;

    @IsBoolean()
    @IsNotEmpty()
    isMessageForwarded: boolean;

    @IsString()
    @IsNotEmpty()
    forwardedFrom?: string;

    @IsString()
    @IsNotEmpty()
    prevMessageContent?: string;

    @IsString()
    @IsNotEmpty()
    prevMessageFrom?: string;
}

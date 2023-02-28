import { IsString } from "class-validator";

export class FileDto {
    @IsString()
    fileId: string;

    @IsString()
    name: string;

    @IsString()
    mimetype: string;

    @IsString()
    location: string;

    @IsString()
    attachedBy: string;
}

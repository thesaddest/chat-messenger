import { IsString } from "class-validator";
import { FileType } from "../common/enums/file-type.enum.js";

export class FileDto {
    @IsString()
    fileId: string;

    @IsString()
    name: string;

    @IsString()
    mimetype: FileType;

    @IsString()
    location: string;

    @IsString()
    attachedBy: string;
}

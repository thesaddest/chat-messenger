import { File } from "./file.entity.js";
import { User } from "../user/user.entity.js";
import { BaseFile } from "./interfaces.js";
import { AppDataSource } from "../db/database.js";
import { v4 as uuidv4 } from "uuid";
import { FileDto } from "./file.dto.js";

class FileService {
    async uploadFiles(files: Express.MulterS3.File[], user: User): Promise<FileDto[]> {
        const convertedFiles = await Promise.all(files.map((file) => this.convertMulterFilesIntoBaseFile(file, user)));
        const savedFiles = await Promise.all(convertedFiles.map((file) => this.createFileInDb(file)));

        return savedFiles.map((file) => ({
            fileId: file.fileId,
            name: file.name,
            mimetype: file.mimetype,
            location: file.location,
            attachedBy: file.attachedBy,
        }));
    }

    async convertMulterFilesIntoBaseFile(file: Express.MulterS3.File, user: User): Promise<BaseFile> {
        return {
            name: file.key,
            mimetype: file.mimetype,
            location: file.location,
            attachedBy: user,
        };
    }

    async createFileInDb(file: BaseFile): Promise<File> {
        const fileRepository = AppDataSource.getRepository(File);
        const fileToSave = {
            name: file.name,
            mimetype: file.mimetype,
            fileId: uuidv4(),
            location: file.location,
            attachedBy: file.attachedBy.userId,
            user: file.attachedBy,
        };
        return await fileRepository.save(fileToSave);
    }
}

export const fileService = new FileService();

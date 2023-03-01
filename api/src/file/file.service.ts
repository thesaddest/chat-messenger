import { File } from "./file.entity.js";
import { User } from "../user/user.entity.js";
import { BaseFile } from "./interfaces.js";
import { AppDataSource } from "../db/database.js";
import { v4 as uuidv4 } from "uuid";

class FileService {
    async uploadFiles(files: Express.MulterS3.File[], user: User): Promise<File[]> {
        const convertedFiles = await Promise.all(files.map((file) => this.convertMulterFilesIntoBaseFile(file, user)));
        return await Promise.all(convertedFiles.map((file) => this.createFileInDb(file)));
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
            attachedBy: file.attachedBy.username,
            user: file.attachedBy,
        };
        return await fileRepository.save(fileToSave);
    }
}

export const fileService = new FileService();

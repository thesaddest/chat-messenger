import { File } from "./file.entity.js";
import { User } from "../user/user.entity.js";
import { BaseFile } from "./interfaces.js";
import { AppDataSource } from "../db/database.js";

class FileService {
    async uploadFiles(files: Express.Multer.File[], user: User) {
        const convertedFiles = await Promise.all(files.map((file) => this.convertMulterFilesIntoBaseFile(file, user)));

        for (const convertedFile of convertedFiles) {
            await this.createFileInDb(convertedFile);
        }
    }

    async convertMulterFilesIntoBaseFile(file: Express.Multer.File, user: User): Promise<BaseFile> {
        return {
            name: file.filename,
            mimetype: file.mimetype,
            user: user,
        };
    }

    async createFileInDb(file: BaseFile): Promise<File> {
        const fileRepository = AppDataSource.getRepository(File);
        return await fileRepository.save(file);
    }
}

export const fileService = new FileService();

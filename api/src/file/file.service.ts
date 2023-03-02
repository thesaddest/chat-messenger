import { File } from "./file.entity.js";
import { User } from "../user/user.entity.js";
import { BaseFile } from "./interfaces.js";
import { AppDataSource } from "../db/database.js";
import { v4 as uuidv4 } from "uuid";
import { FileDto } from "./file.dto.js";
import { getFileTypeEnum } from "../common/utils/file.js";

class FileService {
    async uploadFiles(files: Express.MulterS3.File[], user: User): Promise<FileDto[]> {
        const convertedFiles = await Promise.all(files.map((file) => this.convertMulterFilesIntoBaseFile(file, user)));
        const uploadedFiles = await Promise.all(convertedFiles.map((file) => this.createFileInDb(file)));

        return uploadedFiles.map((uploadedFile) => ({
            fileId: uploadedFile.fileId,
            name: uploadedFile.name,
            mimetype: uploadedFile.mimetype,
            location: uploadedFile.location,
            attachedBy: uploadedFile.attachedBy,
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
            mimetype: getFileTypeEnum(file.name),
            fileId: uuidv4(),
            location: file.location,
            attachedBy: file.attachedBy.username,
            user: file.attachedBy,
        };
        return await fileRepository.save(fileToSave);
    }

    async deleteFiles(files: File[]): Promise<File[]> {
        const fileRepository = AppDataSource.getRepository(File);

        return await fileRepository.remove(files);
    }
}

export const fileService = new FileService();

import { File } from "./file.entity.js";
import { User } from "../user/user.entity.js";
import { BaseFile } from "./interfaces.js";
import { AppDataSource } from "../db/database.js";
import { v4 as uuidv4 } from "uuid";
import { FileDto } from "./file.dto.js";
import { getFileNameAfterMulterMiddleware, getFileTypeEnum } from "../common/utils/file.js";
import { s3Service } from "../s3/s3.service.js";
import { FileType } from "../common/enums/file-type.enum.js";

class FileService {
    async uploadFiles(files: Express.MulterS3.File[], user: User): Promise<FileDto[]> {
        const convertedFiles = await Promise.all(files.map((file) => this.convertMulterFilesIntoBaseFile(file, user)));
        const uploadedFiles = await Promise.all(convertedFiles.map((file) => this.createFileInDb(file)));

        return uploadedFiles.map((uploadedFile) => ({
            fileId: uploadedFile.fileId,
            name: uploadedFile.name,
            s3Key: uploadedFile.s3Key,
            mimetype: uploadedFile.mimetype,
            location: uploadedFile.location,
            attachedBy: uploadedFile.attachedBy,
            streamUrl: uploadedFile.streamUrl,
        }));
    }

    async uploadSingleFile(file: Express.MulterS3.File, user: User): Promise<FileDto> {
        const convertedFile = await this.convertMulterFilesIntoBaseFile(file, user);
        const uploadedFile = await this.createFileInDb(convertedFile);

        return {
            fileId: uploadedFile.fileId,
            name: uploadedFile.name,
            s3Key: uploadedFile.s3Key,
            mimetype: uploadedFile.mimetype,
            location: uploadedFile.location,
            attachedBy: uploadedFile.attachedBy,
            streamUrl: uploadedFile.streamUrl,
        };
    }

    async convertMulterFilesIntoBaseFile(file: Express.MulterS3.File, user: User): Promise<BaseFile> {
        return {
            name: getFileNameAfterMulterMiddleware(file.key),
            s3key: file.key,
            mimetype: file.mimetype,
            location: file.location,
            attachedBy: user,
        };
    }

    async createFileInDb(file: BaseFile): Promise<File> {
        const fileRepository = AppDataSource.getRepository(File);
        const mimetype = getFileTypeEnum(file.name);

        const fileToSave = {
            s3Key: file.s3key,
            name: file.name,
            mimetype: mimetype,
            fileId: uuidv4(),
            location: file.location,
            attachedBy: file.attachedBy.username,
            user: file.attachedBy,
            streamUrl:
                mimetype === FileType.VIDEO ? `${process.env.AWS_CLOUDFRONT_DISTRIBUTION_DOMAIN}/${file.s3key}` : null,
        };
        return await fileRepository.save(fileToSave);
    }

    async deleteFiles(files: File[]): Promise<File[]> {
        const fileRepository = AppDataSource.getRepository(File);

        for (const file of files) {
            await s3Service.deleteObject(file.s3Key);
        }

        return await fileRepository.remove(files);
    }
}

export const fileService = new FileService();

import { DeleteObjectCommand, DeleteObjectCommandOutput, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const AWS_STEGANOGRAPHY_FOLDER_NAME = "STEGANOGRAPHY";

class S3Service {
    private readonly s3: S3Client;
    private readonly bucketName: string;
    private readonly uploadedObjectUrl: string;

    constructor() {
        this.s3 = new S3Client({
            credentials: {
                accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
                secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY,
            },
            region: process.env.AWS_REGION,
        });
        this.bucketName = process.env.AWS_BUCKET_NAME;
        this.uploadedObjectUrl = `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com`;
    }

    async deleteObject(fileKey: string): Promise<DeleteObjectCommandOutput> {
        const deleteCommand = new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: `${fileKey}`,
        });

        return await this.s3.send(deleteCommand);
    }

    async uploadImageWithHiddenMessage(username: string, fileBuffer: Buffer): Promise<string> {
        const fileKey = `${username}/${AWS_STEGANOGRAPHY_FOLDER_NAME}/${uuidv4()}.png`;

        const uploadCommand = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: fileKey,
            Body: fileBuffer,
        });
        await this.s3.send(uploadCommand);

        return await this.getUploadedObjectUrl(fileKey);
    }

    async getUploadedObjectKey(uploadedObjectUrl: string): Promise<string> {
        return uploadedObjectUrl.replace(`${this.uploadedObjectUrl}/`, "");
    }

    private async getUploadedObjectUrl(fileKey: string): Promise<string> {
        return `${this.uploadedObjectUrl}/${fileKey}`;
    }
}

export const s3Service = new S3Service();

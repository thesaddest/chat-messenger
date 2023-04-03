import { DeleteObjectCommand, DeleteObjectCommandOutput, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

class S3Service {
    private readonly s3: S3Client;
    private readonly bucketName: string;

    constructor() {
        this.s3 = new S3Client({
            credentials: {
                accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
                secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY,
            },
            region: process.env.AWS_REGION,
        });
        this.bucketName = process.env.AWS_BUCKET_NAME;
    }

    async deleteObject(fileKey: string): Promise<DeleteObjectCommandOutput> {
        const deleteCommand = new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: `${fileKey}`,
        });

        return await this.s3.send(deleteCommand);
    }

    async uploadImageWithHiddenMessage(fileKey: string, fileBuffer: Buffer): Promise<string> {
        const uploadCommand = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: `${fileKey}`,
            Body: fileBuffer,
        });
        await this.s3.send(uploadCommand);

        return await this.getUploadedObjectUrl(fileKey);
    }

    private async getUploadedObjectUrl(fileKey: string): Promise<string> {
        return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    }
}

export const s3Service = new S3Service();

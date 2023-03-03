import { DeleteObjectCommand, DeleteObjectCommandOutput, S3Client } from "@aws-sdk/client-s3";

class S3Service {
    private s3: S3Client;
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
}

export const s3Service = new S3Service();

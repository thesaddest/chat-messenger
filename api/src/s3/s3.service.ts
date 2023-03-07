import {
    DeleteObjectCommand,
    DeleteObjectCommandOutput,
    S3Client,
    CreateMultipartUploadCommand,
    UploadPartCommand,
    CompleteMultipartUploadCommand,
    UploadPartCommandOutput,
} from "@aws-sdk/client-s3";

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

    async getMultipartUploadId(fileKey: string): Promise<string> {
        const multipartUploadCommand = await this.s3.send(
            new CreateMultipartUploadCommand({
                Bucket: this.bucketName,
                Key: fileKey,
            }),
        );

        return multipartUploadCommand.UploadId;
    }

    async uploadPartData(data: Buffer, fileKey: string, uploadId: string, i: number): Promise<UploadPartCommandOutput> {
        return await this.s3
            .send(
                new UploadPartCommand({
                    Bucket: this.bucketName,
                    Key: fileKey,
                    UploadId: uploadId,
                    Body: data,
                    PartNumber: i + 1,
                }),
            )
            .then((d) => {
                return d;
            });
    }

    async completeMultipartUpload(uploadResults: UploadPartCommandOutput[], fileKey: string, uploadId: string) {
        return await this.s3.send(
            new CompleteMultipartUploadCommand({
                Bucket: this.bucketName,
                Key: fileKey,
                UploadId: uploadId,
                MultipartUpload: {
                    Parts: uploadResults.map(({ ETag }, i) => ({
                        ETag,
                        PartNumber: i + 1,
                    })),
                },
            }),
        );
    }
}

export const s3Service = new S3Service();

import multer from "multer";
import { v4 } from "uuid";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
});

const s3storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        cb(null, v4() + file.originalname);
    },
});

export const multerUploadMiddleware = multer({ storage: s3storage });

import multer from "multer";
import { v4 } from "uuid";

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, v4() + file.originalname);
    },
});

export const multerUpload = multer({ storage: storage });

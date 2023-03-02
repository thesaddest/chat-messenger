import { FileType } from "../enums/file-type.enum.js";
import mime from "mime-types";

export const getFileTypeEnum = (fileName: string) => {
    const mimeLookupResult = mime.lookup(fileName);
    if (typeof mimeLookupResult === "string") {
        switch (mimeLookupResult) {
            case mimeLookupResult.match("image/*")?.input:
                return FileType.IMAGE;
            case mimeLookupResult.match("audio/*")?.input:
                return FileType.AUDIO;
            case mimeLookupResult.match("video/*")?.input:
                return FileType.VIDEO;
            case mimeLookupResult.match("application/*")?.input:
                return FileType.DOCUMENT;
            case mimeLookupResult.match("text/*")?.input:
                return FileType.DOCUMENT;
        }
    }
};

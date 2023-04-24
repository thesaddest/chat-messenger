import { useCallback } from "react";
import { UploadChangeParam } from "antd/es/upload";
import { message } from "antd";

export const useFileLoadingMessage = () => {
    return useCallback((info: UploadChangeParam) => {
        if (info.file.status === "uploading") {
            message.loading({
                key: `${info.file.uid}`,
                content: `${info.file.name} file is loading`,
                duration: 0,
            });
        }
        if (info.file.status === "done") {
            message.destroy(`${info.file.uid}`);
            message.success(`${info.file.name} uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    }, []);
};

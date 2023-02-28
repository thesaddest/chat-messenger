import { Button, Upload } from "antd";
import { UploadRequestOption } from "rc-upload/lib/interface";

import { FolderAdd } from "../../shared/ui";

export const FileUpload = () => {
    const handleFileUpload = ({ file }: UploadRequestOption) => {
        console.log(file);
    };
    return (
        <Upload multiple customRequest={handleFileUpload} showUploadList={false}>
            <Button>
                <FolderAdd />
            </Button>
        </Upload>
    );
};

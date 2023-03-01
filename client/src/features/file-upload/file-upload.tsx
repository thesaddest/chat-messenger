import { Button, Form, Upload } from "antd";

import { FolderAdd } from "../../shared/ui";

export const FileUpload = () => {
    return (
        <Form.Item name="uploadedFiles" valuePropName="fileList" getValueFromEvent={({ fileList }) => fileList}>
            <Upload multiple customRequest={() => {}} showUploadList={false}>
                <Button>
                    <FolderAdd />
                </Button>
            </Upload>
        </Form.Item>
    );
};

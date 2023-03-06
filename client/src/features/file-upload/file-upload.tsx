import { Form, message, Upload } from "antd";
import styled from "styled-components";
import { memo, useCallback } from "react";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { UploadChangeParam } from "antd/es/upload";

import { FileAdd, InputButton } from "../../shared/ui";
import { useAppDispatch } from "../../shared/lib/hooks";
import { uploadSingleFile } from "../../entities/file";

interface IFileUploadProps {
    username: string;
}

const StyledFormItemButtonContainer = styled(Form.Item)`
    display: flex;
    justify-content: end;
    align-items: center;
    height: 100%;
    margin: 0;
    padding-left: 0.15rem;

    @media only screen and (min-width: 1080px) {
        .ant-form-item-row {
            width: 40px;
        }
    }
`;

export const FileUpload = memo<IFileUploadProps>(({ username }) => {
    const dispatch = useAppDispatch();
    const customRequest = useCallback(
        async (options: UploadRequestOption) => {
            try {
                if (options.onSuccess && options.file) {
                    const data = await dispatch(uploadSingleFile({ file: options.file, username: username }));
                    options.onSuccess(data);
                }
            } catch (error) {
                message.error(`${error}, file upload failed.`);
            }
        },
        [dispatch, username],
    );

    const handleChange = useCallback((info: UploadChangeParam) => {
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    }, []);

    return (
        <StyledFormItemButtonContainer
            name="uploadedFiles"
            valuePropName="fileList"
            getValueFromEvent={({ fileList }) => fileList}
        >
            <Upload customRequest={customRequest} onChange={handleChange} multiple>
                <InputButton icon={<FileAdd />} type={"default"} />
            </Upload>
        </StyledFormItemButtonContainer>
    );
});

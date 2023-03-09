import { memo, useCallback } from "react";
import { Form, message, Upload } from "antd";
import styled from "styled-components";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { UploadChangeParam, RcFile } from "antd/es/upload";

import { FileAdd, InputButton } from "../../shared/ui";
import { useAppDispatch } from "../../shared/lib/hooks";
import { addPendingFile, uploadSingleFile } from "../../entities/file";

interface IFileUploadProps {
    username: string;
    friendIdActiveKey: string;
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

export const FileUpload = memo<IFileUploadProps>(({ username, friendIdActiveKey }) => {
    const dispatch = useAppDispatch();

    const customRequest = useCallback(
        async (options: UploadRequestOption) => {
            try {
                if (options.onSuccess && options.file) {
                    const file = options.file as RcFile;
                    dispatch(addPendingFile({ uid: file.uid, name: file.name, friendIdActiveKey: friendIdActiveKey }));
                    const data = await dispatch(uploadSingleFile({ file: file, username: username }));
                    options.onSuccess(data);
                }
            } catch (error) {
                message.error(`${error}, file upload failed.`);
            }
        },
        [dispatch, friendIdActiveKey, username],
    );

    const handleChange = useCallback((info: UploadChangeParam) => {
        if (info.file.status === "uploading") {
            message.loading({ key: `${info.file.uid}`, content: `${info.file.name} file is loading`, duration: 0 });
        }
        if (info.file.status === "done") {
            message.destroy(`${info.file.uid}`);
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
            <Upload customRequest={customRequest} onChange={handleChange} multiple maxCount={10} showUploadList={false}>
                <InputButton icon={<FileAdd />} type={"default"} />
            </Upload>
        </StyledFormItemButtonContainer>
    );
});

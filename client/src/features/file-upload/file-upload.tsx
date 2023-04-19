import { memo, useCallback } from "react";
import { Form, message, Upload } from "antd";
import styled from "styled-components";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { RcFile } from "antd/es/upload";
import { FileAddOutlined } from "@ant-design/icons";

import { InputButton } from "../../shared/ui";
import { useAppDispatch, useFileLoadingMessage } from "../../shared/lib/hooks";
import { addPendingFile, uploadSingleFile } from "../../entities/file";
import { SIZES } from "../../shared/const";

interface IFileUploadProps {
    username: string;
    chatId: string;
}

const StyledFormItemButtonContainer = styled(Form.Item)`
    display: flex;
    justify-content: end;
    align-items: center;
    height: 100%;
    margin: 0;
    padding-left: 0.15rem;

    @media only screen and (min-width: ${SIZES.DESKTOP}) {
        .ant-form-item-row {
            width: 40px;
        }
    }
`;

export const FileUpload = memo<IFileUploadProps>(({ username, chatId }) => {
    const dispatch = useAppDispatch();
    const handleChange = useFileLoadingMessage();

    const customRequest = useCallback(
        async (options: UploadRequestOption) => {
            try {
                if (options.onSuccess && options.file) {
                    const file = options.file as RcFile;
                    dispatch(addPendingFile({ uid: file.uid, name: file.name, friendIdActiveKey: chatId }));
                    const data = await dispatch(
                        uploadSingleFile({
                            file: file,
                            username: username,
                            friendIdActiveKey: chatId,
                        }),
                    );
                    options.onSuccess(data);
                }
            } catch (error) {
                message.error(`${error}, file upload failed.`);
            }
        },
        [dispatch, chatId, username],
    );

    return (
        <StyledFormItemButtonContainer
            name="uploadedFiles"
            valuePropName="fileList"
            getValueFromEvent={({ fileList }) => fileList}
        >
            <Upload customRequest={customRequest} onChange={handleChange} multiple maxCount={10} showUploadList={false}>
                <InputButton icon={<FileAddOutlined />} type={"default"} />
            </Upload>
        </StyledFormItemButtonContainer>
    );
});

import { Form, Upload } from "antd";
import styled from "styled-components";
import { memo } from "react";

import { FileAdd, InputButton } from "../../shared/ui";

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

export const FileUpload = memo(() => {
    return (
        <StyledFormItemButtonContainer
            name="uploadedFiles"
            valuePropName="fileList"
            getValueFromEvent={({ fileList }) => fileList}
        >
            <Upload multiple customRequest={() => {}} showUploadList={false}>
                <InputButton icon={<FileAdd />} type={"default"} />
            </Upload>
        </StyledFormItemButtonContainer>
    );
});

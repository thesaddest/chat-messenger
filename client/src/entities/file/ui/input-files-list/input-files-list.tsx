import React, { memo, useMemo } from "react";
import styled from "styled-components";
import {
    FileImageOutlined,
    VideoCameraOutlined,
    PlayCircleOutlined,
    FileOutlined,
    FileDoneOutlined,
} from "@ant-design/icons";

import { Dropdown, MenuProps } from "antd";

import { FileType, IFile } from "../../model";

interface IInputFilesListProps {
    uploadedFiles: IFile[];
}

const StyledContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: row;
`;

const switchRenderedCard = (attachedFile: IFile): JSX.Element => {
    switch (attachedFile.mimetype) {
        case FileType.IMAGE:
            return <FileImageOutlined />;
        case FileType.VIDEO:
            return <VideoCameraOutlined />;
        case FileType.AUDIO:
            return <PlayCircleOutlined />;
        default:
            return <FileOutlined />;
    }
};

export const InputFilesList = memo<IInputFilesListProps>(({ uploadedFiles }) => {
    const items: MenuProps["items"] = useMemo(
        () =>
            uploadedFiles.map((uploadedFile) => ({
                key: uploadedFile.fileId,
                label: (
                    <div>
                        {switchRenderedCard(uploadedFile)} {uploadedFile.originalName}
                    </div>
                ),
            })),
        [uploadedFiles],
    );

    return (
        <StyledContainer>
            {uploadedFiles.length > 0 && (
                <Dropdown trigger={["hover", "click"]} menu={{ items }}>
                    <FileDoneOutlined />
                </Dropdown>
            )}
        </StyledContainer>
    );
});

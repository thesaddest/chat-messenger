import React, { memo, useMemo } from "react";
import styled from "styled-components";
import {
    FileImageOutlined,
    VideoCameraOutlined,
    PlayCircleOutlined,
    FileOutlined,
    PaperClipOutlined,
} from "@ant-design/icons";

import { Button, Dropdown, MenuProps } from "antd";

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

export const UploadedFilesList = memo<IInputFilesListProps>(({ uploadedFiles }) => {
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
            {!!uploadedFiles.length && (
                <Dropdown trigger={["click", "hover"]} menu={{ items }}>
                    <Button
                        type={"ghost"}
                        icon={<PaperClipOutlined style={{ color: "gray" }} />}
                        shape={"circle"}
                        size={"large"}
                    />
                </Dropdown>
            )}
        </StyledContainer>
    );
});

import { memo } from "react";
import styled from "styled-components";

import { FileType, IFile } from "../../model";
import { AttachedFileImage } from "../attached-file-image";
import { AttachedFileVideo } from "../attached-file-video";
import { AttachedFileDocument } from "../attached-file-document";
import { AttachedFileAudio } from "../attached-file-audio";

interface IAttachedFileListProps {
    attachedFilesAfterUpload: IFile[];
}

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
`;

const StyledItemContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 0.5rem 0 0.5rem 0;
`;

const switchRenderedCard = (attachedFile: IFile): JSX.Element => {
    switch (attachedFile.mimetype) {
        case FileType.IMAGE:
            return <AttachedFileImage attachedFile={attachedFile} />;
        case FileType.VIDEO:
            return <AttachedFileVideo attachedFile={attachedFile} />;
        case FileType.AUDIO:
            return <AttachedFileAudio attachedFile={attachedFile} />;
        default:
            return <AttachedFileDocument attachedFile={attachedFile} />;
    }
};

export const AttachedFileList = memo<IAttachedFileListProps>(({ attachedFilesAfterUpload }) => {
    return (
        <StyledContainer>
            {attachedFilesAfterUpload.map((attachedFile) => (
                <StyledItemContainer key={attachedFile.name}>{switchRenderedCard(attachedFile)}</StyledItemContainer>
            ))}
        </StyledContainer>
    );
});

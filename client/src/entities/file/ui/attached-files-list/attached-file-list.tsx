import { memo } from "react";

import { IFile } from "../../model";

interface IAttachedFileListProps {
    attachedFilesAfterUpload: IFile[];
}

export const AttachedFileList = memo<IAttachedFileListProps>(({ attachedFilesAfterUpload }) => {
    return <div></div>;
});

import { useCallback } from "react";
import { RcFile } from "antd/es/upload";
import { message, Upload } from "antd";
import { UploadRequestOption } from "rc-upload/lib/interface";

import { changeAvatar } from "../../../../entities/user";
import { Edit, SharedAvatar } from "../../../../shared/ui";
import { useAppDispatch, useFileLoadingMessage } from "../../../../shared/lib/hooks";

interface IAvatarUploadProps {
    username: string;
    onSuccess: (filename: string) => void;
}

const FILE_TYPES = ".png,.jpeg,.jpg";

export const AvatarUpload = ({ username, onSuccess }: IAvatarUploadProps) => {
    const handleChange = useFileLoadingMessage();
    const dispatch = useAppDispatch();

    const customRequest = useCallback(
        async (options: UploadRequestOption) => {
            try {
                if (options.onSuccess && options.file) {
                    const file = options.file as RcFile;
                    const formData = new FormData();
                    formData.append("file", file);
                    await dispatch(changeAvatar({ formData, username }));
                    onSuccess(file.name);
                }
            } catch (error) {
                message.error(`${error}, file upload failed.`);
            }
        },
        [dispatch, onSuccess, username],
    );

    return (
        <Upload customRequest={customRequest} onChange={handleChange} showUploadList={false} accept={FILE_TYPES}>
            <SharedAvatar>
                <Edit />
            </SharedAvatar>
        </Upload>
    );
};

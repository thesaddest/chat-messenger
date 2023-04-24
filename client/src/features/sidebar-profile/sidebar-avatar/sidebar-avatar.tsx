import { memo, useCallback, useState } from "react";
import styled from "styled-components";
import { message, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadRequestOption } from "rc-upload/lib/interface";

import { useAppDispatch, useFileLoadingMessage } from "../../../shared/lib/hooks";
import { ChatNameFirstLetter, Edit, SharedAvatar } from "../../../shared/ui";
import { changeAvatar } from "../../../entities/user";

interface ISidebarAvatarProps {
    username: string;
    avatarPath?: string;
}

const FILE_TYPES = ".png,.jpeg,.jpg";

const StyledAvatarContainer = styled.div<{ isHover: boolean }>`
    cursor: ${({ isHover }) => (isHover ? "pointer" : "auto")};
`;

export const SidebarAvatar = memo<ISidebarAvatarProps>(({ username, avatarPath }) => {
    const handleChange = useFileLoadingMessage();
    const dispatch = useAppDispatch();
    const [isHover, setIsHover] = useState<boolean>(false);
    const customRequest = useCallback(
        async (options: UploadRequestOption) => {
            try {
                if (options.onSuccess && options.file) {
                    const file = options.file as RcFile;
                    const formData = new FormData();
                    formData.append("file", file);
                    await dispatch(changeAvatar({ formData: formData, username: username }));
                    options.onSuccess(file.name);
                }
            } catch (error) {
                message.error(`${error}, file upload failed.`);
            }
        },
        [dispatch, username],
    );

    const onHover = useCallback(() => {
        setIsHover(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setIsHover(false);
    }, []);

    return (
        <StyledAvatarContainer onMouseEnter={onHover} isHover={isHover} onMouseLeave={onMouseLeave}>
            <Upload customRequest={customRequest} onChange={handleChange} showUploadList={false} accept={FILE_TYPES}>
                {isHover ? (
                    <SharedAvatar width={"54px"} height={"54px"}>
                        <Edit />
                    </SharedAvatar>
                ) : avatarPath ? (
                    <SharedAvatar width={"54px"} height={"54px"} src={avatarPath} />
                ) : (
                    <SharedAvatar>
                        <ChatNameFirstLetter username={username} />
                    </SharedAvatar>
                )}
            </Upload>
        </StyledAvatarContainer>
    );
});

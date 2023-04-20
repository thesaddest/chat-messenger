import { memo, useCallback, useState } from "react";
import styled from "styled-components";
import { message, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadRequestOption } from "rc-upload/lib/interface";

import { useFileLoadingMessage } from "../../../shared/lib/hooks";
import { ChatNameFirstLetter, Edit, SharedAvatar } from "../../../shared/ui";
import UserService from "../../../entities/user/api/user.service";

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
    const [isHover, setIsHover] = useState<boolean>(false);
    const customRequest = useCallback(
        async (options: UploadRequestOption) => {
            try {
                if (options.onSuccess && options.file) {
                    const file = options.file as RcFile;
                    const formData = new FormData();
                    formData.append("file", file);
                    const { data } = await UserService.changeAvatar(formData, username);
                    options.onSuccess(data);
                }
            } catch (error) {
                message.error(`${error}, file upload failed.`);
            }
        },
        [username],
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
                <SharedAvatar>
                    {isHover ? (
                        <Edit fontSize={"22px"} />
                    ) : avatarPath ? (
                        <img src={avatarPath} alt={username} />
                    ) : (
                        <ChatNameFirstLetter username={username} />
                    )}
                </SharedAvatar>
            </Upload>
        </StyledAvatarContainer>
    );
});

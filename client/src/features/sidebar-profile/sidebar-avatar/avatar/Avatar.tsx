import { ChatNameFirstLetter, SharedAvatar } from "../../../../shared/ui";
import { IAvatarProps } from "../interfaces";

export const Avatar = ({ username, avatarPath }: IAvatarProps) => {
    return (
        <SharedAvatar src={avatarPath}>{avatarPath ? null : <ChatNameFirstLetter username={username} />}</SharedAvatar>
    );
};

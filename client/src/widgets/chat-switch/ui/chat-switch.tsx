import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { Switch } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";

import { ChatType } from "../../../pages/home";

interface IChatSwitchProps {
    chatType: ChatType;
    setChatType: Dispatch<SetStateAction<ChatType>>;
}

export const ChatSwitch = memo<IChatSwitchProps>(({ chatType, setChatType }) => {
    const handleClick = useCallback(
        () => setChatType(chatType === ChatType.FRIEND ? ChatType.ROOM : ChatType.FRIEND),
        [chatType, setChatType],
    );

    return (
        <Switch
            onClick={handleClick}
            checkedChildren={<UserOutlined />}
            unCheckedChildren={<TeamOutlined />}
            defaultChecked
        />
    );
});

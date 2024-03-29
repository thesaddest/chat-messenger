import { memo, useCallback } from "react";
import styled from "styled-components";
import { notification } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import { MenuButton } from "../../shared/ui";
import { IMessage } from "../../entities/message";

interface ICopyMessageProps {
    selectedMessage: IMessage;
}

const StyledButtonContainer = styled.div`
    padding: 0.25rem;
`;

type NotificationType = "success" | "info" | "warning" | "error";

export const CopyMessage = memo<ICopyMessageProps>(({ selectedMessage }) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = useCallback(
        (type: NotificationType) => {
            api[type]({
                message: "Message was copied successfully ",
                duration: 1,
            });
        },
        [api],
    );

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(selectedMessage.content);
        openNotificationWithIcon("success");
    }, [openNotificationWithIcon, selectedMessage]);

    return (
        <StyledButtonContainer>
            {contextHolder}
            <MenuButton onClick={handleCopy} type="dashed">
                <CopyOutlined /> Copy
            </MenuButton>
        </StyledButtonContainer>
    );
});

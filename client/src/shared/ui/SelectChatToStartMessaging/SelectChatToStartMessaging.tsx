import { memo } from "react";
import { Empty } from "antd";
import styled from "styled-components";

const StyledEmpty = styled(Empty)`
    position: absolute;
    left: 60%;
    top: 50%;
    transform: translate(-50%, -60%);

    span {
        color: whitesmoke;
        border: 1px solid lightgray;
        background: lightgray;
        border-radius: 45px;
        padding: 0.25rem;
    }
`;

export const SelectChatToStartMessaging = memo(() => {
    return (
        <StyledEmpty
            image={Empty.PRESENTED_IMAGE_DEFAULT}
            description={<span>Select a chat to start messaging</span>}
        />
    );
});

import { memo } from "react";
import { Empty } from "antd";
import styled from "styled-components";

import { COLORS } from "../../const";

const StyledEmpty = styled(Empty)`
    position: absolute;
    left: 60%;
    top: 50%;
    transform: translate(-50%, -60%);

    span {
        color: ${COLORS.MAIN_WHITE};
        border: 1px solid ${COLORS.LIGHTGREY};
        background: ${COLORS.LIGHTGREY};
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

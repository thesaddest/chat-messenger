import { CheckOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { memo } from "react";

import { COLORS } from "../../../const";

interface IMessageReadCheckProps {
    isMessageRead?: boolean;
}

const StyledIsMessageReadContainer = styled.div<IMessageReadCheckProps>`
    position: absolute;
    color: ${(props) => (props.isMessageRead ? `${COLORS.MAIN_WHITE};` : `${COLORS.MAIN_BLACK}`)};
    bottom: 0;
    left: 100%;
`;

const StyledMessageReadContainer = styled.div`
    position: relative;
`;

export const MessageReadCheck = memo<IMessageReadCheckProps>(({ isMessageRead }) => {
    return (
        <StyledMessageReadContainer>
            <StyledIsMessageReadContainer isMessageRead={isMessageRead}>
                <CheckOutlined />
            </StyledIsMessageReadContainer>
        </StyledMessageReadContainer>
    );
});

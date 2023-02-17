import { memo } from "react";
import { EnterOutlined } from "@ant-design/icons";
import styled from "styled-components";

interface IReplyProps {
    color?: string;
    fontSize?: string;
}

const StyledEnterOutlined = styled(EnterOutlined)<IReplyProps>`
    transform: scaleX(-1);
    font-size: ${(props) => props.fontSize && props.fontSize};
    color: ${(props) => props.color && props.color};
`;

export const Reply = memo<IReplyProps>(({ color, fontSize }) => {
    return <StyledEnterOutlined rotate={180} color={color} fontSize={fontSize} />;
});

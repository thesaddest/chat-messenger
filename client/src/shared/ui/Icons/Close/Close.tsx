import { memo } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styled from "styled-components";

interface ICloseProps {
    color?: string;
    fontSize?: string;
}

const StyledCloseOutlined = styled(CloseOutlined)<ICloseProps>`
    font-size: ${(props) => props.fontSize && props.fontSize};
    color: ${(props) => props.color && props.color};
`;

export const Close = memo<ICloseProps>(({ color, fontSize }) => {
    return <StyledCloseOutlined color={color} fontSize={fontSize} />;
});

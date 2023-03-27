import { memo } from "react";
import { MinusOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { COLORS } from "../../../const";

interface IVerticalPipeProps {
    fontSize?: string;
}

const StyledMinusOutlined = styled(MinusOutlined)<IVerticalPipeProps>`
    position: absolute;
    color: ${COLORS.MAIN_WHITE};
    font-size: ${({ fontSize }) => fontSize && fontSize};
    width: 30px;
    right: 100%;
`;

export const VerticalPipe = memo<IVerticalPipeProps>(({ fontSize }) => {
    return <StyledMinusOutlined rotate={90} fontSize={fontSize} />;
});

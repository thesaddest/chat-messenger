import { EditOutlined } from "@ant-design/icons";
import { memo } from "react";
import styled from "styled-components";

interface IEditProps {
    fontSize?: string;
}

const StyledEdit = styled(EditOutlined)<IEditProps>`
    font-size: ${({ fontSize }) => (fontSize ? fontSize : "14px")};
`;

export const Edit = memo<IEditProps>(({ fontSize }) => {
    return <StyledEdit fontSize={fontSize} />;
});

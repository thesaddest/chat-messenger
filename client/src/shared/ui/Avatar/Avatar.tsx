import { memo, ReactNode } from "react";
import styled from "styled-components";
import { Avatar } from "antd";

interface IStyledAvatarProps {
    width?: string;
    height?: string;
    children?: ReactNode;
    src?: string;
}

const StyledAvatar = styled(Avatar)<IStyledAvatarProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => (props.width ? props.width : "54px")};
    height: ${(props) => (props.height ? props.height : "54px")};
    line-height: 1;
    margin-right: 0.3rem;
`;

export const SharedAvatar = memo<IStyledAvatarProps>(({ height, width, children, src }) => {
    return (
        <StyledAvatar height={height} width={width} src={src}>
            {children}
        </StyledAvatar>
    );
});

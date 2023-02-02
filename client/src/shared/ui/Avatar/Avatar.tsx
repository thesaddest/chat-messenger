import { memo } from "react";
import styled from "styled-components";
import { Avatar } from "antd";

interface IStyledAvatarProps {
    width?: string;
    height?: string;
}

const StyledAvatar = styled(Avatar)<IStyledAvatarProps>`
    width: ${(props) => (props.width ? props.width : "54px")};
    height: ${(props) => (props.height ? props.height : "54px")};
    line-height: 1;
    margin-right: 0.3rem;
`;

export const SharedAvatar = memo<IStyledAvatarProps>(({ height, width }) => {
    return <StyledAvatar height={height} width={width} />;
});

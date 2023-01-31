import { FC } from "react";
import styled from "styled-components";
import { Avatar } from "antd";

const StyledAvatar = styled(Avatar)`
    width: 54px;
    height: 54px;
    line-height: 1;
    margin-right: 0.3rem;
`;

export const SidebarAvatar: FC = () => {
    return <StyledAvatar />;
};

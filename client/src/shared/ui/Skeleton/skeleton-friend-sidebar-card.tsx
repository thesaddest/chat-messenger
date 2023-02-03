import { FC } from "react";
import { Skeleton, Space } from "antd";
import styled from "styled-components";

const StyledUsernameMessageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 8px;
`;

const StyledSpace = styled(Space)`
    margin-bottom: 0.5rem;
`;

export const SkeletonFriendSidebarCard: FC = () => {
    return (
        <StyledSpace>
            <Skeleton.Avatar size={54} active />
            <StyledUsernameMessageContainer>
                <Skeleton.Input active size="small" style={{ minWidth: "10px", width: "80px", height: "20px" }} />
                <Skeleton.Input active size="small" style={{ width: "150px", height: "20px" }} />
            </StyledUsernameMessageContainer>
        </StyledSpace>
    );
};

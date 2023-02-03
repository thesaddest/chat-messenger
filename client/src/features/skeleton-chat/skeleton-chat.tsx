import { FC, ReactNode } from "react";
import { List } from "antd";
import styled from "styled-components";

import { SkeletonNavbar, SkeletonFriendSidebarCard } from "../../shared/ui";

const StyledSkeletonFriendSidebar = styled(List)`
    .ant-list-item {
        padding: 0.5rem 0.75rem;
    }
`;

const StyledSkeletonContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    gap: 8px;
`;

const skeletonList = Array.from({ length: 8 }).map((_) => {
    return <SkeletonFriendSidebarCard />;
});

export const SkeletonChat: FC = () => {
    return (
        <StyledSkeletonContainer>
            <SkeletonNavbar />
            <StyledSkeletonFriendSidebar
                dataSource={skeletonList}
                renderItem={(item: ReactNode | unknown) => <List.Item>{item as ReactNode}</List.Item>}
            />
        </StyledSkeletonContainer>
    );
};

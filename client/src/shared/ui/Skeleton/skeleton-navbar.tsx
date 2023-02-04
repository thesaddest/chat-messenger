import { FC } from "react";
import { Skeleton, Space } from "antd";
import styled from "styled-components";

const StyledNavbarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0.5rem 0 0 0.5rem;
`;

export const SkeletonNavbar: FC = () => {
    return (
        <Space>
            <StyledNavbarContainer>
                <Skeleton.Input active size="default" style={{ height: "28px", minWidth: "10px", width: "105px" }} />
                <Skeleton.Button active style={{ minWidth: "42px", width: "46px" }} />
                <Skeleton.Button active style={{ minWidth: "42px", width: "46px" }} />
            </StyledNavbarContainer>
        </Space>
    );
};

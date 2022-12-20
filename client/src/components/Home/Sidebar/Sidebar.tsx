import { FC } from "react";
import { Button, Typography, Divider } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title } = Typography;

const StyledDivider = styled(Divider)`
    margin: 0;
`;

const StyledHeaderContainer = styled.header`
    padding: 0.5rem;
    display: flex;
    justify-content: space-evenly;
`;

const StyledTitle = styled(Title)`
    margin-bottom: 0;
`;

export const Sidebar: FC = () => {
    return (
        <>
            <StyledHeaderContainer>
                <StyledTitle level={4}>Add Friend</StyledTitle>
                <Button>
                    <WechatOutlined />
                </Button>
            </StyledHeaderContainer>
            <StyledDivider />
        </>
    );
};

import { Button, Divider, Modal, Typography } from "antd";
import { FC, useState } from "react";
import { WechatOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title } = Typography;

const StyledDivider = styled(Divider)`
    margin: 0;
`;

const StyledContainer = styled.div`
    padding: 0.5rem;
    display: flex;
    justify-content: start;
`;

const StyledTitle = styled(Title)`
    margin-bottom: 0;
    padding-right: 1rem;
    padding-left: 2rem;
`;

export const Navbar: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleOk = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCancel = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <StyledContainer>
                <StyledTitle level={4}>Add Friend</StyledTitle>
                <Button onClick={showModal}>
                    <Modal title="Add friend" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                    <WechatOutlined />
                </Button>
            </StyledContainer>
            <StyledDivider />
        </>
    );
};

import { FC } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
`;

export const Loader: FC = () =>
    <StyledLoadingContainer>
        <LoadingOutlined />
    </StyledLoadingContainer>;

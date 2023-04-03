import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import { Form } from "antd";
import { SendOutlined } from "@ant-design/icons";

import { SIZES } from "../../shared/const";
import { InputButton } from "../../shared/ui";

interface IHideMessageProps {
    setIsMessageHidden: Dispatch<SetStateAction<boolean>>;
}

const StyledFormItemButtonContainer = styled(Form.Item)`
    display: flex;
    justify-content: end;
    align-items: center;
    height: 100%;
    margin: 0;
    padding-right: 0.15rem;

    @media only screen and (min-width: ${SIZES.DESKTOP}) {
        .ant-form-item-row {
            width: 40px;
        }
    }
`;

export const HideMessage: FC<IHideMessageProps> = ({ setIsMessageHidden }) => {
    return (
        <StyledFormItemButtonContainer>
            <InputButton
                type={"primary"}
                icon={<SendOutlined />}
                htmlType={"submit"}
                block={true}
                textInsteadIcon={"Hide"}
                onClick={() => setIsMessageHidden(true)}
            />
        </StyledFormItemButtonContainer>
    );
};

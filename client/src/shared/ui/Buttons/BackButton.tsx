import { memo } from "react";
import { LeftOutlined } from "@ant-design/icons";

import { ZeroPaddingButton } from "./ZeroPaddingButton";

interface IBackButtonProps {
    onClick: () => void;
}

export const BackButton = memo<IBackButtonProps>(({ onClick }) => {
    return (
        <ZeroPaddingButton type="link" onClick={onClick}>
            <LeftOutlined /> Back
        </ZeroPaddingButton>
    );
});

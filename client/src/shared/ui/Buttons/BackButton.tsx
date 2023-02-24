import { memo } from "react";

import { ArrowLeft } from "../Icons";

import { ZeroPaddingButton } from "./ZeroPaddingButton";

interface IBackButtonProps {
    onClick: () => void;
}

export const BackButton = memo<IBackButtonProps>(({ onClick }) => {
    return (
        <ZeroPaddingButton type="link" onClick={onClick}>
            <ArrowLeft /> Back
        </ZeroPaddingButton>
    );
});

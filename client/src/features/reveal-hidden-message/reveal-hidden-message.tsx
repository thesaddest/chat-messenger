import { memo } from "react";

interface IRevealHiddenMessageProps {
    revealedMessage: string;
    revealedMessageError: string;
}

export const RevealHiddenMessage = memo<IRevealHiddenMessageProps>(({ revealedMessage, revealedMessageError }) => {
    return <div>{revealedMessageError ? revealedMessageError : revealedMessage}</div>;
});

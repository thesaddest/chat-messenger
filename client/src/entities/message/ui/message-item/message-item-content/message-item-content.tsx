import { memo } from "react";
import styled from "styled-components";

import { RepliedMessageItem } from "../../replied-message-item";
import { AttachedFileList, IFile } from "../../../../file";
import { MessageReadCheck } from "../../../../../shared/ui";
import { COLORS } from "../../../../../shared/const";

interface IMessageItemContentProps {
    isMessageForwarded?: boolean;
    to: string;
    from: string;
    forwardedFrom?: string;
    prevMessageContent?: string;
    prevMessageFrom?: string;
    attachedFilesAfterUpload?: IFile[];
    content: string;
    isMessageRead?: boolean;
    fromUsername?: string;
    isGroupMessage?: boolean;
    isHiddenMessage?: boolean;
    s3Location?: string;
}

interface ForwardedProps {
    to: string;
    from: string;
}

const StyledForwarded = styled.p<ForwardedProps>`
    font-size: 16px;
    font-style: italic;
    color: ${({ to, from }) => (to === from ? `${COLORS.MAIN_WHITE};` : `${COLORS.MAIN_BLACK}`)};
`;

const StyledMessageContentHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    padding-right: 0.2rem;
`;

export const MessageItemContent = memo<IMessageItemContentProps>(
    ({
        isMessageForwarded,
        to,
        from,
        forwardedFrom,
        prevMessageFrom,
        prevMessageContent,
        attachedFilesAfterUpload,
        content,
        isMessageRead,
        fromUsername,
        isGroupMessage,
        isHiddenMessage,
        s3Location,
    }) => {
        return (
            <>
                {isMessageForwarded && (
                    <StyledForwarded to={to} from={from}>
                        Forwarded from {forwardedFrom}
                    </StyledForwarded>
                )}
                {prevMessageContent && prevMessageFrom && (
                    <RepliedMessageItem prevMessageFrom={prevMessageFrom} content={prevMessageContent} />
                )}
                <StyledMessageContentHolder>
                    <h2>{isGroupMessage && fromUsername}</h2>
                    {attachedFilesAfterUpload && (
                        <AttachedFileList attachedFilesAfterUpload={attachedFilesAfterUpload} />
                    )}
                    <p>
                        {isHiddenMessage ? (
                            <img src={s3Location} width={"100%"} height={"100%"} alt={content} />
                        ) : (
                            content
                        )}
                    </p>
                </StyledMessageContentHolder>
                <MessageReadCheck isMessageRead={isMessageRead} />
            </>
        );
    },
);

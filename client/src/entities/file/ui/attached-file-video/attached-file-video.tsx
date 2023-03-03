import { memo } from "react";

import { IAttachedFileProps } from "../../model";

export const AttachedFileVideo = memo<IAttachedFileProps>(({ attachedFile }) => {
    return (
        <video width={"100%"} height={"100%"} controls>
            <source src={attachedFile.streamUrl} />
        </video>
    );
});

import { memo } from "react";

import { IAttachedFileProps } from "../../model";

export const AttachedFileImage = memo<IAttachedFileProps>(({ attachedFile }) => {
    return <img width={"100%"} height={"100%"} src={attachedFile.location} alt={attachedFile.name} />;
});

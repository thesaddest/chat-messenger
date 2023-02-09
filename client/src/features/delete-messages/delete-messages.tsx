import { Button } from "antd";
import { memo, useCallback } from "react";

import { deselectAllSelectedMessages, deleteMessages, IDeleteMessage } from "../../entities/message";
import { useAppDispatch } from "../../shared/lib/hooks";
import { Delete } from "../../shared/ui";

interface IDeleteMessagesProps {
    selectedMessages: IDeleteMessage[];
}

//TODO: add logic to delete somebody's message with immediately emitting to them
export const DeleteMessages = memo<IDeleteMessagesProps>(({ selectedMessages }) => {
    const dispatch = useAppDispatch();

    const handleClick = useCallback(() => {
        dispatch(deleteMessages({ messageIds: selectedMessages }));
        dispatch(deselectAllSelectedMessages());
    }, [dispatch, selectedMessages]);

    return (
        <div>
            <Button type="primary" danger onClick={handleClick}>
                Delete messages <Delete />
            </Button>
        </div>
    );
});

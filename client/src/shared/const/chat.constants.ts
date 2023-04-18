import { Rule } from "antd/es/form";

import { IRoom } from "../../entities/room";
import { IFriend } from "../../entities/friend";

export type Chat = IRoom | IFriend;
export type Chats = IRoom[] | IFriend[];

interface IChatRules {
    MESSAGE: Rule[];
    ROOM_NAME: Rule[];
}

export const DEFAULT_ACTIVE_KEY = "START";

export const CHAT_RULES: IChatRules = {
    MESSAGE: [
        { required: true, whitespace: true },
        { min: 1, message: "Please enter at least 1 character" },
    ],
    ROOM_NAME: [
        { required: true, whitespace: true },
        { min: 3, message: "Please enter at least 3 characters" },
    ],
};

export const DEFAULT_TAB_ITEM = [
    {
        label: "No friends",
        key: DEFAULT_ACTIVE_KEY,
        children: "Add some friends :)",
        style: { display: "flex", justifyContent: "center", paddingTop: "0.5rem" },
    },
];

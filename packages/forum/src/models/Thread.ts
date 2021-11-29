import type { Timestamp } from "firebase/firestore/lite";

type UserID = string;
type PostID = string;

type User = {
    id: UserID;
    name: string;
    created_time: Timestamp;
};

type Post = {
    id: PostID;
    created_time: Timestamp;
    updated_time: Timestamp;
    userId: UserID;
    parentId?: PostID;
    body: string;
};

type Thread = PostID[];

export type { User, Post, Thread };

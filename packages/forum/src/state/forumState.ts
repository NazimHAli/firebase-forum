import { filterThreads } from "@/utils/dataUtils";
import type { Timestamp } from "@firebase/firestore/dist/lite";
import { writable } from "svelte/store";

interface comment {
    board: string;
    dateCreated: Timestamp;
    dateModified: Timestamp;
    text: string;
    threadURL: string;
    user: {
        displayName: string;
        uid: string;
    };
}

interface selectedThread {
    title?: string;
    board: string;
    comments?: comment[];
}

const baseSelectedThread: selectedThread = {
    title: "",
    board: "",
    comments: [],
};

function createCustomStore() {
    const initialState = {
        allComments: [],
        boards: [],
        threads: [],
        lastVisibleThreadSnapshot: null,
        filteredThreads: [],
        selectedThread: baseSelectedThread,
    };

    const { subscribe, set, update } = writable(initialState);

    return {
        subscribe,
        update,
        setLastSnap: (lastSnap: any) =>
            update((prevState) => ({
                ...prevState,
                lastVisibleThreadSnapshot: lastSnap,
            })),
        setAllComments: (allComments: any) =>
            update((prevState) => ({
                ...prevState,
                allComments: allComments,
            })),
        setBoards: (boards: any) =>
            update((prevState) => ({
                ...prevState,
                boards: boards,
            })),
        setFilteredThreads: (allThreads = []) =>
            update((prevState) => ({
                ...prevState,
                filteredThreads: filterThreads(
                    prevState.threads.concat(allThreads)
                ),
            })),
        setSelectedThread: (selectedThread: any) =>
            update((prevState) => ({
                ...prevState,
                selectedThread: selectedThread,
            })),
        clearSelectedThread: () =>
            update((prevState) => ({
                ...prevState,
                selectedThread: { board: "" },
            })),
        updateAllThreads: (allThreads: ConcatArray<never>) =>
            update((prevState) => ({
                ...prevState,
                threads: prevState.threads.concat(allThreads),
                filteredThreads: filterThreads(
                    prevState.threads.concat(allThreads)
                ),
            })),
        reset: () => set(initialState),
    };
}

const forumState = createCustomStore();

export { forumState };

import { firestoreState } from "@/state/firestoreState";
import { extractDataFromDocs } from "@/utils/dataUtils";
import {
    collection,
    FieldPath,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from "firebase/firestore/lite";
import { get } from "svelte/store";

async function getPaginatedResults(
    collectionName: string,
    orderByField: string | FieldPath,
    getInitialResults: boolean,
    lastVisibleSnapshot = null,
    limitNum = 25
) {
    const { db } = get(firestoreState);

    if (lastVisibleSnapshot) {
        // Get the next limitNum
        const next = query(
            collection(db, collectionName),
            orderBy(orderByField),
            startAfter(lastVisibleSnapshot),
            limit(limitNum)
        );
        const documentSnapshots = await getDocs(next);
        const lastSnapshot =
            documentSnapshots?.docs[documentSnapshots?.docs?.length - 1] ||
            null;

        return [lastSnapshot, extractDataFromDocs(documentSnapshots.docs)];
    } else if (getInitialResults) {
        // Get the first page of limitNum
        const first = query(
            collection(db, collectionName),
            orderBy(orderByField),
            limit(limitNum)
        );
        const documentSnapshots = await getDocs(first);
        const lastSnapshot =
            documentSnapshots?.docs[documentSnapshots?.docs?.length - 1] ||
            null;

        return [lastSnapshot, extractDataFromDocs(documentSnapshots.docs)];
    }
}

async function getNextThreadsPage(
    detail: { inView: boolean },
    forumState: any
) {
    if (detail.inView) {
        const { lastVisibleThreadSnapshot } = get(forumState);

        // No more next page of results
        if (!lastVisibleThreadSnapshot) {
            return;
        }

        // Get next page of results
        const response = await getPaginatedResults(
            "threads",
            "dateCreated",
            false,
            lastVisibleThreadSnapshot
        );

        forumState.setLastSnap(response[0]);

        // Update threads if new ones exist
        if (response && response[1]?.length > 0) {
            forumState.updateAllThreads(response[1]);
        }
    }
}

export { getPaginatedResults, getNextThreadsPage };

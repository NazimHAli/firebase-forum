import { writable } from "svelte/store";

const firestoreState = writable({ app: null, db: null });

export { firestoreState };

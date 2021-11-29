import { Firestore } from "@firebase/firestore/lite";
import { writable } from "svelte/store";

const firestoreState = writable({ app: null, db: Firestore });

export { firestoreState };

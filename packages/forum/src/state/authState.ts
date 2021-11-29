import { writable } from "svelte/store";

const authState = writable({ auth: {}, user: { displayName: "", uid: "" } });

export { authState };

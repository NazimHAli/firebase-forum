import { authState } from "@/state/authState";
import { firestoreState } from "@/state/firestoreState";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: process.env.apiKey,
    appId: process.env.appId,
    authDomain: process.env.authDomain,
    measurementId: process.env.measurementId,
    messagingSenderId: process.env.messagingSenderId,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
};

const globalFirestoreApp = initializeApp(firebaseConfig);
const globalFirestoreDB = getFirestore();

firestoreState.set({ app: globalFirestoreApp, db: globalFirestoreDB });

// Initialize emulator for dev environment
if (process.env.NODE_ENV === "development") {
    import("firebase/firestore/lite").then((module) => {
        module.connectFirestoreEmulator(
            module.getFirestore(),
            "localhost",
            9091
        );
    });
}

const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("onAuthStateChanged signed in:", user.email);
        authState.set({ auth: auth, user: user });
    } else {
        console.log("onAuthStateChanged signed out");
        authState.set(null);
    }
});

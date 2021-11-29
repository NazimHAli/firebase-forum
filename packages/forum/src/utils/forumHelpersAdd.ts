import { addDoc, collection, doc, setDoc } from "firebase/firestore/lite";

async function addNewDocument(
    db,
    collectionName: string,
    data: any,
    path = ""
) {
    if (path) {
        await setDoc(doc(db, collectionName, path), data);
    } else {
        // Adds a new document with an auto-generated ID
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    }
}

function addThread(db, data, path = "") {
    addNewDocument(db, "threads", data, path);
}

function addComment(db, data, path = "") {
    addNewDocument(db, "comments", data, path);
}

export { addComment, addNewDocument, addThread };

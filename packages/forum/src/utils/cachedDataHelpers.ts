import {
    getDocsFromCache,
    getFirestore,
    loadBundle,
    namedQuery,
} from "firebase/firestore";

async function fetchCachedFirestoreData() {
    import("@/utils/initFireBase").then(async () => {
        const db = getFirestore();

        // Fetch the bundle from Firebase Hosting, if the CDN cache is hit the 'X-Cache'
        // response header will be set to 'HIT'
        const resp = await fetch(
            "http://localhost:9092/svelte-firebase-forum/us-central1/createBundle?bundle=threads"
        );

        // Load data into the Firestore SDK
        await loadBundle(db, resp.body);

        const query = await namedQuery(db, "latest-threads-query");
        const cachedDocs = await getDocsFromCache(query);

        console.log("Returned cachedDocs", cachedDocs);
    });
}

export { fetchCachedFirestoreData };

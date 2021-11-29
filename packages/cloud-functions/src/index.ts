const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

exports.createBundle = functions.https.onRequest(
  async (request: { query: { bundle: any } }, response: { set: (arg0: string, arg1: string) => void; end: (arg0: any) => void }) => {
    const collectionName = request.query.bundle;

    try {
      if (["boards", "threads", "comments"].includes(collectionName)) {
        const db = admin.firestore();
        const latestThreads = await db.collection(collectionName).orderBy("dateCreated", "asc").limit(50).get();
        const bundleBuffer = db.bundle("latest-threads").add("latest-threads-query", latestThreads).build();

        // Cache the response for up to 5 minutes;
        // see https://firebase.google.com/docs/hosting/manage-cache
        response.set("Cache-Control", "public, max-age=300, s-maxage=600");

        response.end(bundleBuffer);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

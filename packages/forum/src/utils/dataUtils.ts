function strToURL(text: string) {
    if (!text) {
        return text;
    }

    return text.replaceAll(" ", "-").replaceAll(":", "").toLowerCase();
}

function displayDate(dateObj: { seconds: number }) {
    if (!dateObj) {
        return dateObj;
    }

    return new Date(dateObj.seconds * 1000).toLocaleString();
}

function extractDataFromDocs(docs) {
    return docs.map((doc) => doc.data());
}

function filterThreads(allThreads) {
    const currentPath = window.location.hash.replace("#/", "");
    let filteredThreads = allThreads;

    if (currentPath.length) {
        filteredThreads = allThreads.filter((thread) =>
            currentPath.includes(thread?.board?.toLowerCase())
        );
    }

    return filteredThreads || [];
}

export { displayDate, extractDataFromDocs, filterThreads, strToURL };

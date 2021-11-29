import { forumState } from "@/state/forumState";
import Router from "simple-spa-router-ts";

function initRouter() {
    const router = new Router({
        mode: "hash",
        root: "/",
    });

    router
        .addRoute(/boards\/\w+\/\w+/, () => {
            forumState.setFilteredThreads();
        })
        .addRoute(/boards/, () => {
            forumState.clearSelectedThread();
            forumState.setFilteredThreads();
        })
        .addRoute("", () => {
            forumState.clearSelectedThread();
            forumState.setFilteredThreads();
        });
}

export { initRouter };

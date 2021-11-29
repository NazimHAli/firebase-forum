<script lang="ts">
    import { fade } from "svelte/transition";
    import { forumState } from "@/state/forumState";
    import { displayDate } from "@/utils/dataUtils";
    import { inview } from "svelte-inview";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { getNextThreadsPage } from "@/utils/lazyFirestore";

    const observerOptions = {
        rootMargin: "0px",
    };

    const handleGetNextPage = async ({ detail }) => {
        getNextThreadsPage(detail, forumState);
    };

    const getInitialThreads = () => {
        const { threads, lastVisibleThreadSnapshot } = get(forumState);

        if (threads.length === 0 || lastVisibleThreadSnapshot) {
            // Initialize Firebase app
            import("@/utils/initFireBase").then(() => {
                // Get first page of results
                import("@/utils/lazyFirestore").then(async (module) => {
                    const response = await module.getPaginatedResults(
                        "threads",
                        "dateCreated",
                        threads.length === 0,
                        lastVisibleThreadSnapshot
                    );

                    forumState.setLastSnap(response[0]);

                    if (response[1].length > 0) {
                        forumState.updateAllThreads(response[1]);
                    }
                });
            });
        }
    };

    onMount(() => {
        getInitialThreads();
    });
</script>

<div transition:fade>
    <h5>Thread List</h5>

    <ul class="collection">
        {#each $forumState.filteredThreads as thread}
            {#if thread}
                <li class="collection-item avatar hoverable">
                    <i class="material-icons circle avatar-bg"></i>

                    <a
                        on:click="{() => forumState.setSelectedThread(thread)}"
                        href="/#/{thread?.url}"
                    >
                        {thread.title}
                    </a>

                    <br /><small>{displayDate(thread?.dateCreated)}</small>

                    <span
                        class="new badge right"
                        data-badge-caption="{thread?.board.replace(
                            'boards/',
                            ''
                        )}"
                    >
                    </span>
                </li>
            {/if}
        {/each}
    </ul>

    {#if $forumState.filteredThreads.length}
        <span
            use:inview="{observerOptions}"
            on:change="{handleGetNextPage}"
            style="height: 1rem;"
        >
        </span>
    {/if}
</div>

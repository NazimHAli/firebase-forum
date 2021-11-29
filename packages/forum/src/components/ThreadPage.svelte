<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    import { forumState } from "@/state/forumState";
    import { displayDate } from "@/utils/dataUtils";
    import AddComment from "@/components/AddComment.svelte";

    const filteredComments = (allComments, thread) =>
        allComments.filter((comment) => thread.url === comment.threadURL);

    function updateActiveThreadComments() {
        forumState.update((prevState) => ({
            ...prevState,
            selectedThread: {
                ...prevState.selectedThread,
                comments: filteredComments(
                    prevState.allComments,
                    prevState.selectedThread
                ),
            },
        }));
    }

    onMount(() => {
        import("@/utils/forumHelpers").then((module) => {
            console.log("mount getAllComments");
            const allComments = module.getAllComments();
            allComments.then(() => {
                updateActiveThreadComments();
            });
        });
    });
</script>

<div transition:fade>
    {#if $forumState.selectedThread?.title}
        <h5>Thread Title: {$forumState.selectedThread.title}</h5>

        <ul class="collection">
            {#each $forumState?.selectedThread?.comments || [] as comment}
                <li class="collection-item avatar hoverable">
                    <i class="material-icons circle"></i>
                    <p>
                        {comment.user.displayName}
                        <small>{displayDate(comment.dateCreated)}</small>
                    </p>

                    <blockquote>{comment.text}</blockquote>
                </li>
            {/each}
        </ul>

        <AddComment />
    {/if}
</div>

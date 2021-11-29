<script lang="ts">
    import { authState } from "@/state/authState";
    import { forumState } from "@/state/forumState";
    import { get } from "svelte/store";

    let textInput = "";

    const handleAddComment = (selectedThread) => {
        import("@/utils/forumHelpers").then(async (module) => {
            const user = get(authState);

            module.addComment({
                board: selectedThread.board,
                text: textInput,
                threadURL: selectedThread.url,
                dateCreated: new Date(),
                dateModified: new Date(),
                user: {
                    displayName: user.user.displayName,
                    uid: user.user.uid,
                },
            });
        });
    };
</script>

<form
    on:submit|preventDefault="{() =>
        handleAddComment($forumState.selectedThread)}"
>
    <div class="row valign-wrapper">
        <div class="input-field col s8 m9">
            <input
                bind:value="{textInput}"
                id="input_text"
                type="text"
                data-length="120"
            />
            <label for="input_text">Comment text</label>
        </div>
        <div class="input-field col s6 m3 right-align">
            <button
                disabled="{!textInput || !$authState?.user?.displayName}"
                class="btn waves-effect waves-light"
                style="word-break: break-all;"
                type="submit"
                name="action"
            >
                Add comment
            </button>
        </div>
    </div>
</form>

<script lang="ts">
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import "@materializecss/materialize/dist/js/materialize";

    import { authState } from "@/state/authState";
    import { strToURL } from "@/utils/dataUtils";

    export let listAllCategories: any[] = [];

    let selectedCategory: { url: any; title: any };
    let textInput = "";
    let user;

    const setCategory = (category: typeof selectedCategory) => {
        selectedCategory = category;
    };

    const handleAddThread = () => {
        import("@/utils/forumHelpers").then(async (module) => {
            user = get(authState);

            module.addThread({
                board: selectedCategory.url,
                title: textInput,
                dateCreated: new Date(),
                dateModified: new Date(),
                url: `${selectedCategory.url}/${strToURL(textInput)}`,
                user: {
                    displayName: user.user.displayName,
                    uid: user.user.uid,
                },
            });
        });
    };

    const modalInstance = (create: boolean) => {
        const element = document.getElementById("modal-add-thread");

        if (create) {
            // @ts-ignore
            M.Modal.init(element);
        } else {
            // @ts-ignore
            const instance = M.Modal.getInstance(element);
            instance?.destroy();
        }
    };

    const toolTipInstance = (create: boolean) => {
        const element = document.getElementById("modal-thread");

        if (create) {
            // @ts-ignore
            M.Tooltip.init(element);
        } else {
            // @ts-ignore
            const instance = M.Tooltip.getInstance(element);
            instance?.destroy();
        }
    };

    onMount(() => {
        authState.subscribe((update) => {
            if (update?.user?.displayName) {
                toolTipInstance(false);
                modalInstance(true);
            } else {
                toolTipInstance(true);
                modalInstance(false);
            }
        });
    });
</script>

<button
    style="margin-top: 1rem; word-break: break-all;"
    class="waves-effect waves-light btn modal-trigger tooltipped"
    href="#modal-add-thread"
    data-tooltip="Login"
    id="modal-thread"
    on:click|preventDefault="{() => {}}"
>
    Start a thread
</button>

<div id="modal-add-thread" class="modal">
    <div class="modal-content">
        <h4>Create a new thread</h4>
        <p>Selected: {selectedCategory?.title || ""}</p>

        {#if listAllCategories.length}
            <form action="/#/">
                <div class="input-field col s4">
                    {#each listAllCategories as category}
                        <p>
                            <label>
                                <input
                                    type="radio"
                                    class="filled-in"
                                    checked="{category.title ===
                                        selectedCategory?.title}"
                                    on:click="{() => setCategory(category)}"
                                />
                                <span>{category.title}</span>
                            </label>
                        </p>
                    {/each}
                </div>

                <div class="input-field col s6">
                    <input
                        bind:value="{textInput}"
                        id="input_text"
                        type="text"
                        data-length="120"
                    />
                    <label for="input_text">Create new thread</label>
                </div>
            </form>
        {/if}
    </div>

    <div class="modal-footer">
        <button
            disabled="{!textInput || !$authState?.user?.displayName}"
            class="modal-close btn waves-effect waves-light"
            type="submit"
            name="action"
            on:click="{handleAddThread}"
        >
            {$authState?.user?.displayName
                ? "Create thread"
                : "Login to create thread"}
        </button>
    </div>
</div>

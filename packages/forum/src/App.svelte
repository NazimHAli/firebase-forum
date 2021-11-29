<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    import SideNavigation from "@/components/SideNavigation.svelte";
    import ToolbarLogin from "@/components/ToolbarLogin.svelte";
    import LoadingSpinner from "@/components/LoadingSpinner.svelte";

    // Dynamically selected components
    import ThreadPage from "@/components/ThreadPage.svelte";
    import ThreadList from "@/components/ThreadList.svelte";

    import { filterBoard, seedBoards } from "@/utils/seedFireStore";
    import { forumState } from "@/state/forumState";
    import { initRouter } from "@/utils/initRouter";

    let categories = { general: [], support: [], ideas: [] };

    onMount(() => {
        forumState.subscribe((response) => {
            categories["general"] = filterBoard(response.boards, "General");
            categories["support"] = filterBoard(response.boards, "Support");
            categories["ideas"] = filterBoard(response.boards, "Ideas");
        });

        initRouter();
        seedBoards();
    });
</script>

{#if !categories["general"]?.length}
    <LoadingSpinner />
{/if}

<div transition:fade class="row">
    <nav>
        <div class="nav-wrapper">
            <div class="col right">
                <ToolbarLogin />
            </div>
            <a href="/#/" class="brand-logo center">Firebase Forum</a>
            <ul id="nav-mobile" class="left hide-on-med-and-down">
                <li><a href="/#/">One</a></li>
                <li><a href="/#/">Two</a></li>
                <li><a href="/#/">Three</a></li>
            </ul>
        </div>
    </nav>

    <div class="container">
        <div class="col s12 m4 l3">
            <SideNavigation categories="{categories}" />
        </div>
        <div class="col s12 m8 l9">
            <svelte:component
                this="{$forumState.selectedThread?.board
                    ? ThreadPage
                    : ThreadList}"
            />
        </div>
    </div>
</div>

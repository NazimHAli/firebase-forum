<script lang="ts">
    import { afterUpdate } from "svelte";
    import AddThreadModal from "@/components/AddThreadModal.svelte";
    import SideNavigationBoards from "@/components/SideNavigationBoards.svelte";

    export let categories;

    let listAllCategories = [];

    afterUpdate(() => {
        if (categories["general"]?.length) {
            listAllCategories = categories["general"]
                .concat(categories["ideas"])
                .concat(categories["support"]);
        }
    });
</script>

<aside>
    <AddThreadModal listAllCategories="{listAllCategories}" />

    <SideNavigationBoards boards="{categories['general']}" />
    <SideNavigationBoards boards="{categories['ideas']}" />
    <SideNavigationBoards boards="{categories['support']}" />
</aside>

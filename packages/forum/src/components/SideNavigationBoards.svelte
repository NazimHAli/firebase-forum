<script lang="ts">
    export let boards = [];

    const setIsActive = (board) => {
        return window.location.hash === `#/${board.url}` ? "active" : "";
    };
</script>

{#if boards.length}
    <h5>{boards[0]?.category}</h5>

    <div class="collection">
        {#each boards as board}
            <a
                class="collection-item {setIsActive(board)}"
                href="/#/{board.url}"
            >
                {board.title}
            </a>
        {/each}
    </div>
{/if}

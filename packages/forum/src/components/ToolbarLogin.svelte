<script lang="ts">
    import { authState } from "@/state/authState";

    function handleLogOut() {
        import("firebase/auth").then((module) => {
            module.signOut(module.getAuth());
        });
    }

    function handleGoogleLogin() {
        import("firebase/auth").then((module) => {
            const auth = module.getAuth();

            const provider = new module.GoogleAuthProvider();
            module.signInWithPopup(auth, provider);
        });
    }
</script>

{#if $authState?.user?.displayName}
    <a
        class="waves-effect waves-light btn"
        href="/#/"
        on:click|preventDefault="{handleLogOut}"
    >
        Logout
    </a>
{:else}
    <a
        class="waves-effect waves-light btn"
        href="/#/"
        on:click|preventDefault="{handleGoogleLogin}"
    >
        Login
    </a>
{/if}

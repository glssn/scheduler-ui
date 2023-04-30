<script>
    import { onMount } from "svelte";
    import {
        authenticated,
        userData,
        authLoadingStore,
    } from "../stores/auth.js";

    onMount(async () => {
        authLoadingStore.set(false);
        // Check if already valid token
        let content = {};
        const response = await fetch("http://localhost:3000/validate", {
            credentials: "include",
        });
        if (response.ok) {
            content = await response.json();
            authenticated.set(true);
            userData.set(content.user);
            authLoadingStore.set(false);
        } else {
            authenticated.set(false);
            userData.set({});
            authLoadingStore.set(false);
        }
    });
</script>

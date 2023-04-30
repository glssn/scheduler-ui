<script lang="ts">
    import { A, Spinner } from 'flowbite-svelte'
    import "../app.css";
    import { onMount } from 'svelte';
    import NavBar from '../components/NavBar.svelte';
    import { authenticated, authLoadingStore, userData } from '../stores/auth.js'    
    import Login from '../components/Login.svelte';
    import { browser } from '$app/environment';
    import { env } from '$env/dynamic/public'

    async function Validate(_authStatus: boolean) {
    const response = await fetch("http://localhost:3000/validate", {
        credentials: "include"
    });

    try {
        if (response.ok) {
            const content = await response.json()
            userData.set(content.user);
            authenticated.set(true)
        } else {
            authenticated.set(false)
            userData.set({})
        }
    } catch (e) {
        console.log(e);
        authenticated.set(false);
    }
    return $authenticated;
}

</script>

<svelte:head>
    <title>Scheduler</title>
</svelte:head>

{#await Validate($authenticated)}
<div class="flex flex-col items-center justify-center h-screen">
    <Spinner />
</div>
{:then authenticated}
    {#if authenticated}
        <NavBar />
        <slot />
    {:else}
        <Login />
    {/if}
{/await}

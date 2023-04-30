<script>
    import { goto, invalidate } from '$app/navigation';
    import { onMount } from 'svelte';
    import { authenticated, userData, authLoadingStore } from '../../stores/auth.js'
    onMount(async () => {
        // attempt logout
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include'
        })
        // set svelte stores
        authenticated.set(false)
        userData.set({})
        // redirect to login
        await goto('/')
    });
    
</script>
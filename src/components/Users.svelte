<script>
    import { onMount } from "svelte";
    import { users } from "../stores/users.js"
    import UserTable from '../components/UserTable.svelte'

    /**
     * @type {never[]}
     */
    let content = [];

    onMount(async () => {
        // if users store not already populated
        if (Object.keys($users).length == 0) {
            const response = await fetch('http://localhost:3000/api/users/all', {
                credentials: 'include'
            })
            content = await response.json()
            users.set(content)
        }
    });
</script>

<div>
    {#if Object.keys($users).length != 0}
    <UserTable users={$users} />
    {/if}
</div>
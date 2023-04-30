<script>
    import { onMount } from "svelte";
    import dayjs from 'dayjs';

    /**
     * @type {any[]}
     */
    let events = [];

    onMount(async () => {
        const response = await fetch('http://localhost:3000/api/events/all', {
			credentials: 'include'
		})
        events = await response.json()
    });
</script>

<ul>
{#each events as event}
    <li>({dayjs(event.StartDate).format('ddd MMM DD, YYYY')}): 
        {#if event.Title}
            <b>{event.Title}</b>
        {:else}
            <b>{event.Type}</b>
        {/if}
    </li>
{:else}
    <h2>...</h2>
{/each}
</ul>
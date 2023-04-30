<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Heading, Spinner, Badge } from 'flowbite-svelte'
    import dayjs from 'dayjs';
    import relativeTime from'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime)

    /**
     * @type {{ user: { Username: any; }; }}
     */
    let user = {};
    let forbidden = false;
    let userLoading = false;
    let eventsLoading = false;
    let events = [];

    onMount(async () => {
        userLoading = true;
        eventsLoading = true;
        const response = await fetch(`http://localhost:3000/api/user/${$page.params.slug}`, {
            credentials: 'include'
        })
        if (response.ok) {
            user = await response.json()
            userLoading = false;
        } else {
            forbidden = true;
            userLoading = false;
        }
        const eventResponse = await fetch(`http://localhost:3000/api/events/user?id=${$page.params.slug}`, {
            credentials: 'include'
        })
        if (eventResponse.ok) {
            events = await eventResponse.json();
            events = events?.events;
        } 
        eventsLoading = false;
    });

</script>

{#if userLoading}
<Spinner />
{:else}
<div class="text-center">
    <Heading class="items-center">
        {user?.user?.Username}
        <Badge class="text-3xl font-semibold">{user?.user?.Role}</Badge>
    </Heading>
    
    <Heading tag="h3">events:</Heading>
    {#if eventsLoading}
    <Spinner />
    {:else}
    <div class='table'>
        <Table hoverable={true}>
        <TableHead>
            <TableHeadCell>Event ID</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Relative Date</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
        </TableHead>
        <TableBody class="divide-y">
            {#each events as { ID, StartDate, Type }}
            <TableBodyRow>
            <TableBodyCell>{ID}</TableBodyCell>
            <TableBodyCell>{dayjs(StartDate).format('ddd MMM DD, YYYY')}</TableBodyCell>
            <TableBodyCell>{dayjs(StartDate).fromNow()}</TableBodyCell>
            <TableBodyCell>{Type}</TableBodyCell>
            </TableBodyRow>
            {/each}
        </TableBody>
        </Table>
    </div>   
    {/if}
</div>
{/if}

<style>
    .table {
        width: 100%;
        flex-grow: 1;
        margin: 0 auto;
        max-width: 600px;
    }
</style>
<script>
    import { A, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    export let users = [];
</script>
 
<div class='table'>
    <Table hoverable={true}>
    <TableHead>
        <TableHeadCell>User ID</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
        {#each users as { ID, Username }} <!-- + real name once can get it back from ldap-->
        <TableBodyRow>
        <TableBodyCell>
            <A href="/user/{ID}" textColor="text-blue-600 dark:text-blue-500" aClass="inline-flex items-center font-medium  hover:underline">{Username}</A>
        </TableBodyCell>
        <TableBodyCell>Real Name</TableBodyCell>
        </TableBodyRow>
        {/each}
    </TableBody>
    </Table>
</div>

<style>
    .table {
		width: 100%;
		flex-grow: 1;
		margin: 0 auto;
		max-width: 600px;
	}
</style>



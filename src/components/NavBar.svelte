<script>
    import { goto, invalidate } from '$app/navigation';
    import { Spinner, Navbar, NavBrand, Avatar, NavLi, NavUl, NavHamburger, DropdownHeader, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte'
    import { onMount } from 'svelte';
    import { userData, authenticated } from '../stores/auth.js'    
</script>
<Navbar let:hidden let:toggle>
    <NavBrand href="/">
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        Scheduler
      </span>
    </NavBrand>
    <NavUl {hidden}>
        <NavLi href="/events">Events</NavLi>
        <NavLi href="/users">Users</NavLi>
    </NavUl>
    <div class="flex items-center md:order-2">
        {#if $authenticated}
        <div class="flex items-center md:order-2">
            <Avatar id="avatar-menu">{$userData.Username.slice(-2).toUpperCase()}</Avatar>
            <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1"/>
        </div>
        <Dropdown placement="bottom" triggeredBy="#avatar-menu">
            <DropdownHeader>
                <span class="block text-sm">{$userData.Username}</span>
                <span class="block truncate text-sm font-medium">Real Name</span>
            </DropdownHeader>
            <DropdownItem href="/profile">Profile</DropdownItem>
            <DropdownItem href="/settings">Settings</DropdownItem>
            <DropdownDivider />
            <DropdownItem rel="external" href="/logout">Sign out</DropdownItem>
        </Dropdown>
        {:else}
        <Spinner />
        {/if}
    </div>
  </Navbar>

<script>
    import { goto } from "$app/navigation";
    import { Button, Input, Label, Helper } from "flowbite-svelte";
    import {
        userData,
        authenticated,
        authLoadingStore,
    } from "../stores/auth.js";

    let userInput = "";
    let password = "";
    let colour = "base";

    const login = async () => {
        authLoadingStore.set(true);
        let content;
        // Send POST to login
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                user: userInput,
                password,
            }),
        });
        if (response.ok) {
            content = await response.json();
            // Set svelte stores
            authLoadingStore.set(false);
            authenticated.set(true);
            userData.set(content.user);
            // Redirect to /
            await goto("/");
        } else {
            authLoadingStore.set(false);
            authenticated.set(false);
            userData.set({});
            colour = "red";
        }
    };
</script>

<section class="bg-gray-50 dark:bg-gray-900">
    <form on:submit|preventDefault={login}>
        <div
            class="flex flex-col items-center justify-center px-6 py-8 mx-auto  h-screen lg:py-0"
        >
            <p
                class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
                Login
            </p>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
            >
                <div class="p-10 space-y-8 md:space-y-6 sm:p-8">
                    <div class="mb-6">
                        <Label
                            for="username"
                            class="block mb-2"
                            bind:color={colour}>Username</Label
                        >
                        <Input
                            id="username"
                            placeholder="cs000aa"
                            bind:value={userInput}
                            bind:color={colour}
                        />
                    </div>
                    <div class="mb-6">
                        <Label for="password" bind:color={colour}
                            >Password</Label
                        >
                        <Input
                            type="password"
                            id="password"
                            bind:color={colour}
                            placeholder="••••••••••••••••"
                            bind:value={password}
                        />
                        {#if colour != "base"}
                            <Helper class="mt-2" bind:color={colour}
                                >Invalid username and password</Helper
                            >
                        {/if}
                    </div>
                    <div class="mb-6">
                        <Button
                            type="submit"
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</section>

<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
  
    export const load: Load = ({ session }) => {
      if (!session.user) {
        return {
          status: 302,
          redirect: '/auth/login',
        }
      }
  
      return {
        status: 200,
        props: {
          user: session.user.username,
        },
      }
    }
</script>

<script>
    import { Heading, Card, Hr } from "flowbite-svelte";
    import { userData } from '../../stores/auth.js'

	let user = {};
	userData.subscribe(u => user = u)
</script>

<div class='flex items-center justify-center '>
    <Card size="lg" padding='xl' class='place-content-center grow '>
        <Heading tag="h2">{user.Username}</Heading>
        <Hr class="my-2 mx-auto md:my-5" width="w-48" height="h-1" />
        <Heading tag="h4">Preferences</Heading>
        
    </Card>
</div>

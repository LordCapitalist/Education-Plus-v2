<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from './supabaseClient'
  import type { AuthSession } from '@supabase/supabase-js'
  import Account from './lib/Account.svelte'
  import Frontpage from './lib/Frontpage.svelte'
  import Auth from './lib/Auth.svelte'
  import Logo from './assets/Education plus logo.png'
  

  let session: AuthSession

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session = data.session
    })

    supabase.auth.onAuthStateChange((_event, _session) => {
      session = _session
    })
  })
</script>

<main>
  <img src={Logo} class="Logo" alt="Logo education plus" />

  
  


  

</main>

<div class="container" style="padding: 50px 0 100px 0">
  {#if !session}
  <Auth />
  {:else}
  <Frontpage {session} />
  {/if}
</div>
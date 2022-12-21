<script lang="ts">
    import { onMount } from "svelte";
    import type { AuthSession } from "@supabase/supabase-js";
    import { supabase } from "../supabaseClient";
    import Avatar from './Avatar.svelte'
    


    export let session: AuthSession;
  
    let loading = false
    let username: string | null = null
    let Skole: string | null = null
    let avatarUrl: string | null = null



  
    onMount(() => {
      getProfile()

    })
  
    const getProfile = async () => {
      try {
        loading = true
        const { user } = session
  
        const { data, error, status } = await supabase
          .from('profiles')
          .select('username, Skole, avatar_url')
          .eq('id', user.id)
          .single()
  
        if (error && status !== 406) throw error
  
        if (data) {
          username = data.username
          Skole = data.Skole
          avatarUrl = data.avatar_url
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        loading = false
      }
    }
  
    const updateProfile = async () => {
      try {
        loading = true
        const { user } = session
  
        const updates = {
          id: user.id,
          username,
          Skole,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        }
  
        let { error } = await supabase.from('profiles').upsert(updates)
  
        if (error) {
          throw error
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        loading = false
      }
    }

    
    
  </script>
  








  <form on:submit|preventDefault={updateProfile} class="form-widget">
    <div>Email: {session.user.email}</div>
    <div>
      <label for="username">Name</label>
      <input id="username" type="text" bind:value={username} />
    </div>
    <div>
      <label for="Skole">Skole</label>
      <input id="Skole" type="text" bind:value={Skole} />
      <Avatar bind:url="{avatarUrl}" size="{150}" on:upload="{updateProfile}" />
    </div>
    <div>
      <button type="submit" class="button primary block" disabled={loading}>
        {loading ? 'Saving ...' : 'Update profile'}
      </button>
    </div>
    <button type="button" class="button block" on:click={() => supabase.auth.signOut()}>
      Sign Out
    </button>
    <div>
   
</div>

  
  </form>



  <style>


  
  input{
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: black;


  }
  </style>
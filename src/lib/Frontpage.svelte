<script lang="ts">
import type { AuthSession } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";
import Avatar from './Avatar.svelte'
import Account from "./Account.svelte";
import OpretQuiz from "./OpretQuiz.svelte";
import Playquiz from "./playquiz.svelte";



export let session: AuthSession;
let showAccount = false;
let showOpretQuiz = false;
let showplayquiz = false;





const toggleAccount = () => {
  showAccount = !showAccount;


};

const toggleOpretQuiz = () => {
  showOpretQuiz = !showOpretQuiz;
};
const togglePlayquiz = () => {
  showplayquiz = !showplayquiz;

};


</script>

{#if session}
<button on:click={toggleAccount}>Account</button>
{#if showAccount}

<Account {session} />

{/if}
<button on:click={toggleOpretQuiz}>Opret Quiz</button>
{#if showOpretQuiz}
<OpretQuiz {session} />
{/if}
<button on:click={togglePlayquiz}>Play Quiz</button>
{#if showplayquiz}
<Playquiz {session} />
{/if}
{/if}






  




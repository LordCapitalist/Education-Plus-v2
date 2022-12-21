<script lang="ts">
import type { AuthSession } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";

export let session: AuthSession;
let showAccount = false;
let showOpretQuiz = false;
let showplayquiz = false;

    let loading = false

    let id: number | null = null
    let Category: string | null = null
    let Difficulty: string | null = null
    let Question: string | null = null
    let Option1: string | null = null
    let Option2: string | null = null
    let Option3: string | null = null
    let Option4: string | null = null
    let Answers: string | null = null
    let Answer: string | null = null

    async function getquestion() {
        const { data, error } = await supabase
            .from('Kemi')
            .select('Question, Option1, Option2, Option3, Option4, Answers')
            .eq('Category', Category)
            .eq('Difficulty', Difficulty)
            .limit(1)
            .single()
        Question = data.Question
        Option1 = data.Option1
        Option2 = data.Option2
        Option3 = data.Option3
        Option4 = data.Option4

    }

    //Check the chosen answer from the drop down menu and compare to the real answer in the database
    async function checkanswer() {
        const { data, error } = await supabase
            .from('Kemi')
            .select('Answers')
            .eq('Question', Question)
            .limit(1)
            .single()
        Answers = data.Answers
        if (Answers == Answer) {
            alert("Correct")
        }
        else {
            alert("Wrong")
        }
    }
        
    
</script>


<form on:submit|preventDefault={getquestion}>

    <select name="Category" id="Category" bind:value={Category} >
        <option value="Grundstoffer">Grundstoffer</option>
        <option value="Ioner og Ionforbindelser">Ioner og Ionforbindelser</option>
        <option value="Kovalent binding">Kovalent binding</option>
        <option value="Mængdeberegning">Mængdeberegning</option>
        <option value="Blandinger">Blandinger</option>
        <option value="Syre-basereaktioner">Syre-basereaktioner</option>
        <option value="Redoxreaktioner">Redoxreaktioner</option>

    </select>

    <select name="Difficulty" id="Difficulty" bind:value={Difficulty} >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
        <option value="Challenging">Challenging</option>

    </select>
    <button on:click={getquestion}>Get Quiz</button>

    {#if Question}

    <div>
        <label for="Question">Question</label>
        <input id="Question" type="text" bind:value={Question} />
      </div>



        
        <div>
        <label for="Option1">First option</label>
        <input name="Option1" id="Option1" type="text" bind:value={Option1} />
    
      </div>
      <div>
        <label for="Option2">Second option</label>
        <input name="Option2" id="Option2" type="text" bind:value={Option2} />
      </div>


      <div>
        <label for="Option3">Third option</label>
        <input name="Option3" id="Option3" type="text" bind:value={Option3} />
      </div>


      <div>
        <label for="Option4">Fourth option</label>
        <input name="Option4" id="Option4" type="text" bind:value={Option4} />
      </div>

        <select name="Answer" id="Answer" bind:value={Answer} >
            <option value="Option1">Option1</option>
            <option value="Option2">Option2</option>
            <option value="Option3">Option3</option>
            <option value="Option4">Option4</option>
        </select>

        <button on:click={checkanswer}>Check</button>
    {/if}


</form>






<style>
    select {
        width: 100%;
        height: 2.5rem;
        margin-bottom: 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.25rem;
        padding: 0 0.5rem;
        background-color: black;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        color: #ffffff;

    }


    input {
        width: 100%;
        height: 2.5rem;
        margin-bottom: 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.25rem;
        padding: 0 0.5rem;
        background-color: black;
        color: #ffffff;
    }
</style>
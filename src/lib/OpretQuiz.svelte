<script lang="ts">
    import type { AuthSession } from "@supabase/supabase-js";
    import { supabase } from "../supabaseClient";
    import Avatar from './Avatar.svelte'
    
    export let session: AuthSession;


     
    let loading = false
    let id: number | null = null
    let Category: string | null = null
    let Difficulty: string | null = null
    let Question: string | null = null
    let Option_1: string | null = null
    let Option_2: string | null = null
    let Option_3: string | null = null
    let Option_4: string | null = null
    let Answers: string | null = null
    
    export async function createquiz({
        id, Category, Difficulty, Question, Option_1, Option_2, Option_3, Option_4, Answers
    }){
    const {data, error} = await supabase.from("Kemi").insert([{
        
        id: id,
        Category: Category,
        Difficulty: Difficulty,
        Question: Question,
        Option_1: Option_1,
        Option_2: Option_2,
        Option_3: Option_3,
        Option_4: Option_4,
        Answers: Answers,
        
    }])
    }

async function getid() {
    const { data, error } = await supabase
        .from('Kemi')
        .select('id')
        .order('id', { ascending: false })
        .limit(1)
        .single()
    id = data.id + 1
}

//insert data into database where id is the highest id + 1 
async function insertData() {
    loading = true
    await getid()
    await createquiz({
        id, Category, Difficulty, Question, Option_1, Option_2, Option_3, Option_4, Answers
    })
    const { data, error, status } = await supabase
            .from('Kemi')
            .insert([
                { id: id , Category: Category, Difficulty: Difficulty, Question: Question, Option1: Option_1, Option2: Option_2, Option3: Option_3, Option4: Option_4, Answers: Answers }
            ])
            console.log(data, error, status)
        loading = false
        if (error) {
            alert(error.message)
        } else {
            alert('Success!')
        }
    
}


</script>

<form on:submit|preventDefault={insertData}>

    <select name="Category" id="Category" bind:value={Category} >
        <option value="Grundstoffer">Grundstoffer</option>
        <option value="Ioner og Ionforbindelser">Ioner og Ionforbindelser</option>
        <option value="Kovalent binding">Kovalent binding</option>
        <option value="Mængdeberegning">Mængdeberegning</option>
        <option value="Blandinger">Blandinger</option>
        <option value="Syre-basereaktioner">Syre-basereaktioner</option>
        <option value="Redoxreaktioner">Redoxreaktioner</option>

    </select>
    <select name="Difficulty" id="Difficulty" bind:value={Difficulty}>
        <option value="Easy">Easy</option>
        <option value="Normal">Normal</option>
        <option value="Hard">Hard</option>
        <option value="Challenging">Challenging</option>

   
    </select>
    <input type="text" name="Question" id="Question" placeholder="Question" bind:value={Question} > 

    <input type="text" name="Option1" id="Option1" placeholder="Option1" bind:value={Option_1}>
    <input type="text" name="Option2" id="Option2" placeholder="Option2" bind:value={Option_2} >
    <input type="text" name="Option3" id="Option3" placeholder="Option3" bind:value={Option_3}>
    <input type="text" name="Option4" id="Option4" placeholder="Option4" bind:value={Option_4}>

    <select type="text" name="Answers" id="Answers" placeholder="Answers" bind:value={Answers}>
        <option value="Option1">Option 1</option>
        <option value="Option2">Option 2</option>
        <option value="Option3">Option 3</option>
        <option value="Option4">Option 4</option>
    </select>

    <button on:click={insertData} disabled={loading}>
        {#if loading}
            Loading...
        {:else}
            Insert data
        {/if}
    </button>
    
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

    input {
        width: 100%;
        height: 2.5rem;
        margin-bottom: 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.25rem;
        padding: 0 0.5rem;
        background-color: black;
    }
    
</style>
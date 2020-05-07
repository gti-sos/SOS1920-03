<script>
    import {
        onMount
    } from "svelte";

    import {
        pop
    } from "svelte-spa-router";


    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    export let params = {};
    let tcs = {};
    let updatedCountry = "";
    let updatedYear = "";
    let updatedTourist = 12345;
    let updatedDifference = "X.X %";
    let updatedIncome = 123456;
    let errorMsg = "";

    onMount(getTcs);

    async function getTcs() {

        console.log("Fetching tcs...");
        const res = await fetch("/api/v1/tourist_countries_stats/" + params.country + "/" + params.year);

        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            tcs = json;
            updatedCountry = tcs.country;
            updatedYear = tcs.year;
            updatedTourist = tcs.tourist;
            updatedDifference = tcs.difference_2016_17;
            updatedIncome = tcs.tourist_income;
            console.log("Received tcs.");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }


    async function updateTcs() {

        console.log("Updating tcs..." + JSON.stringify(params.tcsCountry));

        const res = await fetch("/api/v1/tourist_countries_stats/" + params.country + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                country: params.country,
                year: parseInt(params.year),
                "tourist": updatedTourist,
                "difference_2016_17": updatedDifference,
                "tourist_income": updatedIncome
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getTcs();
        });



    }
    

</script>
<main>
    <h3>Edtitar Estadísticas de <strong>{params.country}</strong></h3>
    {#await tcs}
        Loading tcs...
    {:then tcs}
        <Table bordered>
            <thead>
                <tr>
                    <th>tcs</th>>
                    <th>Country</th>
                    <th>Year</th>
                    <th>Tourist</th>
                    <th>Difference 16-17</th>
                    <th>Tourist Income</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{tcs.country}</td>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{updatedTourist}"></td>
                    <td><input bind:value="{updatedDifference}"></td>
                    <td><input bind:value="{updatedIncome}"></td>
                    <td> <Button outline  color="primary" on:click={updateTcs}>Update</Button> </td>
                </tr>
        </tbody>
        </Table>
    {/await}
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Back</Button>
</main>
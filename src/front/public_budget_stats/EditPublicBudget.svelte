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
    let updatedCountry = "XXXX";
    let updatedYear = 12345;
    let updatedIncome = "XXXX@xxxxx.com";
    let updatedPopulation = "X.X %";
    let updatedLoss = "XXXXXXXXXX";
    let errorMsg = "";
    onMount(getTcs);
    async function getTcs() {
        console.log("Fetching tcs...");
        const res = await fetch("/api/v1/public_budget_stats/" + params.tcsCountry);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            tcs = json;
            updatedCountry = tcs.country;
            updatedYear = tcs.year;
            updatedIncome = tcs.income;
            updatedPopulation = tcs.population;
            updatedLoss = tcs.loss;
            console.log("Received tcs.");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }
    async function updateTcs() {
        console.log("Updating tcs..." + JSON.stringify(params.tcsCountry));
        const res = await fetch("/api/v1/tourist_countries_stats/" + params.tcsCountry, {
            method: "PUT",
            body: JSON.stringify({
                country: params.tcsCountry,
                year: updatedYear,
                income: updatedIncome,
                population: updatedPopulation,
                loss: updatedLoss
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
    <h3>Edit Tcs <strong>{params.tcsCountry}</strong></h3>
    {#await tcs}
        Loading tcs...
    {:then tcs}
        <Table bordered>
            <thead>
                <tr>
                    <th>Country</th>
                    <th>Year</th>
                    <th>Income</th>
                    <th>Population</th>
                    <th>Loss</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td><input bind:value="{updatedYear}"></td>
                    <td><input bind:value="{updatedIncome}"></td>
                    <td><input bind:value="{updatedPopulation}"></td>
                    <td><input bind:value="{updatedLoss}"></td>
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
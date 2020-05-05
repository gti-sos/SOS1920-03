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
    let updatedTourist = "XXXX@xxxxx.com";
    let updatedDifference = "X.X %";
    let updatedIncome = "XXXXXXXXXX";
    let errorMsg = "";

    onMount(getTcs);

    async function getTcs() {

        console.log("Fetching tcs...");
        const res = await fetch("/api/v1/tourist_countries_stats/" + params.tcsCountry);

        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            tcs = json;
            updatedCountry = tcs.country;
            updatedYear = tcs.year;
            updatedTourist = tcs.tourist;
            updatedDifference = tcs.difference;
            updatedIncome = tcs.income;
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
                tourist: updatedTourist,
                difference: updatedDifference,
                income: updatedIncome
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
                    <th>Tourist</th>
                    <th>Difference</th>
                    <th>Income</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td><input bind:value="{updatedYear}"></td>
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
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
    let updatedYear = 0;
    let updatedTourist = 0;
    let updatedDifference = 0;
    let updatedIncome = 0;
    let errorMsg = "";

    onMount(getTcs);

    async function getTcs() {

        console.log("Fetching tcs...");
        const res = await fetch("/api/v1/tourist_countries_stats/" + params.country+"/"+params.year);

        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            tcs = json;
            updatedCountry = params.country;
            updatedYear = parseInt(params.year);
            updatedTourist = tcs.tourist;//tcs["tourist"]
            updatedDifference = tcs.difference_2016_17;
            updatedIncome = tcs.tourist_income;
            console.log("Received tcs.");
        } else {
           errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }


    async function updateTcs() {

        console.log("Updating tcs..." + JSON.stringify(params.country));

        const res = await fetch("/api/v1/tourist_countries_stats/" + params.country + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                "country": params.country,
                "year": parseInt(params.year),
                "tourist": updatedTourist,
                "difference_2016_17": updatedDifference,
                "tourist_income": updatedIncome
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getTcs();
            if(res.ok){
                alert("Actualización exitosa");
            }else{
                alert("Los datos no han sido correctamente introducidos");
            }
        });



    }
    

</script>
<main>
    <h3>Edtitar Estadísticas de <strong>{params.country}</strong> del año <strong>{params.year}</strong></h3>
    {#await tcs}
        Loading tcs...
    {:then tcs}
        <Table bordered>
            <thead>
                <tr>
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
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td><input required type="number" step="1" min="0" bind:value="{updatedTourist}"></td>
                    <td><input required type="number" step="1" min="0" bind:value="{updatedDifference}"></td>
                    <td><input required type="number" step="1" min="0" bind:value="{updatedIncome}"></td>
                    <td> <Button outline  color="primary" on:click={updateTcs}>Actualizar datos</Button> </td>
                </tr>
        </tbody>
        </Table>
    {/await}
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Retroceder</Button>
</main>
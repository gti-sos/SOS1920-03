<script>
	import {
		onMount
	} from "svelte";

	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	let tcs = [];
	let newTcs = {
		country: "",
		year: "",
		tourist: "",
        difference: "",
        income: ""
	};

	onMount(getTcs);

	async function getTcs() {

		console.log("Fetching tcs...");
		const res = await fetch("/api/v1/tourists_countries_stats");

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			tcs = json;
			console.log("Received " + tcs.length + " tcs.");
		} else {
			console.log("ERROR!");
		}
	}

	async function insertTcs() {

		console.log("Inserting tcs..." + JSON.stringify(newTcs));

		const res = await fetch("/api/v1/tourists_countries_stats", {
			method: "POST",
			body: JSON.stringify(newTcs),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function (res) {
			getTcs();
		});

	}
	async function deleteTcs(name) {
		const res = await fetch("/api/v1/tourists_countries_stats/" + name, {
			method: "DELETE"
		}).then(function (res) {
			getTcs();
		});
	}
</script>

<main>

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
					<td><input bind:value="{newTcs.country}"></td>
					<td><input bind:value="{newTcs.year}"></td>
					<td><input bind:value="{newTcs.tourist}"></td>
                    <td><input bind:value="{newTcs.difference}"></td>
                    <td><input bind:value="{newTcs.income}"></td>
					<td> <Button outline  color="primary" on:click={insertTcs}>Insert</Button> </td>
				</tr>

				{#each tcs as tcs}
					<tr>
						<td>
							<a href="#/tourists_countries_stats/{tcs.country}">{tcs.country}</a>
						</td>
						<td>{tcs.year}</td>
						<td>{tcs.tourist}</td>
                        <td>{tcs.difference}</td>
                        <td>{tcs.income}</td>
						<td><Button outline color="danger" on:click="{deleteTcs(tcs.country)}">Delete</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}


</main>
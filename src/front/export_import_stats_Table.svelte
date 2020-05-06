<script>
	let export_import_stats =[];
	async function get_export_import_stats(){
		console.log("Fetching stats...");
		const res = await fetch("/api/v1/export_import_stats");

		if(res.ok){
			console.log("Ok.");
			const json = await res.json();
			export_import_stats = json;
			console.log("Received "+export_import_stats.length+" stats.");
		}else{
			console.log("Error cargando datos");
		}
	}

	get_export_import_stats();
  </script>

<main>
	<table>
		<thead>
			<tr>
				<td>Country</td>
				<td>Year</td>
				<td>import_profit</td>
				<td>export_profit</td>
				<td>food_export</td>
			</tr>
		</thead>	
	    <tbody>
			<tr>
				<td>Country</td>
				<td>Year</td>
				<td>import_profit</td>
				<td>export_profit</td>
				<td>food_export</td>
			</tr>
		</tbody>
	</table>
</main>

<style>
	table{
		border: 1px solid black;
	}
</style>
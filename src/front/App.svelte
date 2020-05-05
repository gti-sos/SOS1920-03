<script>
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte';
	import Home from './Home.svelte';

	//Antonio Jose Marin Rodriguez
	import TouristsCountriesTable from './tourists_countries_stats/TouristsCountriesTable.svelte';
	import EditTouristsCountries from './tourists_countries_stats/EditTouristsCountries.svelte';

	//Rafa
	//import ExportsImportsTable from './exports_imports_stats/ExportsImportsTable.svelte';
	//import EditExportsImports from './exports_imports_stats/EditExportsImports.svelte';

	//Jose Manuel
	//import PublicBudgetTable from './public_budget_stats/PublicBudgetTable.svelte';
	//import EditPublicBudget from './public_budget_stats/EditPublicBudget.svelte';



	const routes = {
		"/": Home,
		"/tourists_countries_stats": TouristsCountriesTable,
		"/tourists_countries_stats/:country/:year": EditTouristsCountries,

		"/exports_imports_stats": ExportsImportsTable,
		"/exports_imports_stats/:country/:year": EditExportsImports,
		
		"/public_budget_stats": PublicBudgetTable,
		"/public_budget_stats/:country/:year": EditPublicBudget,
		
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>
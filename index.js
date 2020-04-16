const express = require("express");
const bodyParser = require("body-parser"); 	
const path = require("path");
const port = process.env.PORT || 80;
const app = express();
app.use(bodyParser.json());
//------------------------------------------------------------------------------
//--------------------ANTONIO JOSE MARIN RODRIGUEZ------------------------------
//------------------------------------------------------------------------------

const TouristsCountriesStatsAPI = require(path.join(__dirname,"TouristsCountriesStatsAPI"));
TouristsCountriesStatsAPI(app);

//------------------------------------------------------------------------------
//--------------------JUAN RAFAEL BARRAGAN FRANCO-------------------------------
//------------------------------------------------------------------------------

const exports_imports_stats_API= require(path.join(__dirname,"exports_imports_stats_API"));
exports_imports_stats_API(app);

//------------------------------------------------------------------------------
//--------------------JOSE MANUEL GONZALEZ DOMINGUEZ----------------------------
//------------------------------------------------------------------------------

const public_budget_stats_API= require(path.join(__dirname,"public_budget_stats_API"));
public_budget_stats_API(app);

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");


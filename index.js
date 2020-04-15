const express = require("express");
const bodyParser = require("body-parser");
const dataStore = require("nedb");
const path = require("path");
const TouristsCountriesStatsAPI = require(path.join(__dirname,"TouristsCountriesStatsAPI"));

console.log("Running module...");

const dbFileName = path.join(__dirname, "tourists_countries_stats.db");
const BASE_API_URL = "/api/v1";
const port = process.env.PORT || 80;
const app = express();
app.use(bodyParser.json());

const db = new dataStore({
				filename: dbFileName,
				autoload: true
});


TouristsCountriesStatsAPI(app,db);


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");
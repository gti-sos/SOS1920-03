const express = require("express");
const bodyParser = require("body-parser");
const dataStore = require("nedb");
const path = require("path");
const public_budget_stats_API = require(path.join(__dirname,"public_budget_stats_API"))
	const dbFileName= path.join(__dirname,"stats.db");
	const port = process.env.PORT || 80;
	const app = express();
app.use(bodyParser.json());
	const BASE_API_URL = "/api/v1";
	const db = new dataStore({
				filename: dbFileName,
				autoload: true
	});
public_budget_stats_API(app,db);



app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");




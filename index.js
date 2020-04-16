const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const TouristsCountriesStatsAPI = require(path.join(__dirname,"TouristsCountriesStatsAPI"));
const port = process.env.PORT || 80;
const app = express();
app.use(bodyParser.json());

TouristsCountriesStatsAPI(app);

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");
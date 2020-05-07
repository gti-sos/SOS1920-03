const express = require("express");
const bodyParser = require("body-parser"); 	
const path = require("path");
const port = process.env.PORT || 12345;
const app = express();
app.use(bodyParser.json());

app.use("/", express.static("./public"));

//------------------------------------------------------------------------------
//--------------------ANTONIO JOSE MARIN RODRIGUEZ------------------------------
//------------------------------------------------------------------------------

const tourists_countries_stats_API = require(path.join(__dirname,"./src/back/tourists_countries_stats_API"));
tourists_countries_stats_API(app);

//------------------------------------------------------------------------------
//--------------------JUAN RAFAEL BARRAGAN FRANCO-------------------------------
//------------------------------------------------------------------------------

const exports_imports_stats_API= require(path.join(__dirname,"./src/back/exports_imports_stats_API"));
exports_imports_stats_API(app);

//------------------------------------------------------------------------------
//--------------------JOSE MANUEL GONZALEZ DOMINGUEZ----------------------------
//------------------------------------------------------------------------------

const public_budget_stats_API= require(path.join(__dirname,"./src/back/public_budget_stats_API"));
public_budget_stats_API(app);

app.listen(port, () => {
	console.log("Server ready at port " + port);
});

console.log("Starting server...");


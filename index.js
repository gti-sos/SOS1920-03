const express = require("express");
const bodyParser = require("body-parser"); 	
const path = require("path");
const port = process.env.PORT || 80;
const app = express();
app.use(bodyParser.json());


const public_budget_stats_API= require(path.join(__dirname,"public_budget_stats_API"));
public_budget_stats_API(app);



app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");




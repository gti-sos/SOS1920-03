const express = require("express");
const bodyParser = require("body-parser"); 	
const path = require("path");
const port = process.env.PORT || 80;
const app = express();
app.use(bodyParser.json());

//------------------------------------------------------------------------------
//--------------------JUAN RAFAEL BARRAGAN FRANCO-------------------------------
//------------------------------------------------------------------------------
const exports_imports_stats_API= require(path.join(__dirname,"exports_imports_stats_API"));
exports_imports_stats_API(app);



app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");


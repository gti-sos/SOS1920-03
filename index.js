const express = require("express");
const bodyParser = require("body-parser"); 	
const path = require("path");
const port = process.env.PORT || 80;
const app = express();
app.use(bodyParser.json());
//------------------------------------------------------------------------------
//--------------------ANTONIO JOSE MARIN RODRIGUEZ------------------------------
//------------------------------------------------------------------------------




//------------------------------------------------------------------------------
//--------------------JUAN RAFAEL BARRAGAN FRANCO-------------------------------
//------------------------------------------------------------------------------
const exports_imports_stats_API= require(path.join(__dirname,"exports_imports_stats_API"));
exports_imports_stats_API(app);


//------------------------------------------------------------------------------
//--------------------JOSE MANUEL GONZALEZ DOMINGUEZ----------------------------
//------------------------------------------------------------------------------
app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");


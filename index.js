const express = require("express");
const bodyParser = require("body-parser"); 	
const path = require("path");
const port = process.env.PORT || 80;
const app = express();
app.use(bodyParser.json());


const greetingAPI= require(path.join(__dirname,"exports_imports_stats_API"));
greetingAPI(app);



app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");
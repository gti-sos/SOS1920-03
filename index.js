const express = require("express");
const bodyParser = require("body-parser"); 	
const path = require("path");
const greetingAPI= require(path.join(__dirname,"greetingAPI_juabarfra"));
const port = process.env.PORT || 80;
const app = express();
app.use(bodyParser.json());
greetingAPI(app);

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");
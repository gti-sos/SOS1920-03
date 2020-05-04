const express = require("express");
const bodyParser = require("body-parser"); 	

const back = require("./src/back");
const port = process.env.PORT || 80;
const app = express();
app.use(bodyParser.json());

back(app);


app.use("/", express.static("./public"));



app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server on port "+port);


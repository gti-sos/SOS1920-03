const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

var exports_imports_stats = [
	{ 
		country: "Alemania",
		year: 2017,
		import_profit: 1571000,
		export_profit: 1104000,
		food_export:5.61
	},
	{ 
		country: "España",
		year: 2017,
		import_profit: 342400,
		export_profit: 333400,
		food_export: 16.23	
	}
];

const BASE_API_URL = "/api/v1";

// GET exports_imports_stats

app.get(BASE_API_URL+"/exports_imports_stats", (req,res) =>{
	res.send(JSON.stringify(exports_imports_stats,null,2));
	console.log("Data sent:"+JSON.stringify(exports_imports_stats,null,2));
});


// POST exports_imports_stats

app.post(BASE_API_URL+"/exports_imports_stats",(req,res) =>{
	
	var newStat = req.body;
	
	if((newStat == "") || (newStat.country == null)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		exports_imports_stats.push(newContact); 	
		res.sendStatus(201,"CREATED");
	}
});

// DELETE || (newStat.country == null)

// GET || (newStat.country == null)/country

app.get(BASE_API_URL+"/exports_imports_stats/:country", (req,res)=>{
	
	var country = req.params.country;
	
	var filteredstats = exports_imports_stats.filter((c) => {
		return (c.country == country);
	});
	
	
	if(filteredstats.length >= 1){
		res.send(filteredstats[0]);
	}else{
		res.sendStatus(404,"COUNTRY NOT FOUND");
	}
});

// PUT CONTACT/XXX

// DELETE exports_imports_stats/country

app.delete(BASE_API_URL+"/exports_imports_stats/:country", (req,res)=>{
	
	var country = req.params.country;
	
	var filteredstats = exports_imports_stats.filter((c) => {
		return (c.country != country);
	});
	
	
	if(filteredstats.length < exports_imports_stats.length){
		exports_imports_stats = filteredstats;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"COUNTRY NOT FOUND");
	}
	
	
});


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");
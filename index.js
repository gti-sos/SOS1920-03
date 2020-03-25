const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

var tourists_countries_stats = [
	{ 
		country: "Francia",
		year: 2017,
		tourist: 85800000,
		difference_2016_17: 2.6,
		tourist_income:	60700000000
	},
	{ 
		country: "España",
		year: 2017,
		tourist: 81900000,
		difference_2016_17: 10.1,
		tourist_income:	67900000000	
	}
];

const BASE_API_URL = "/api/v1";

// GET COUNTRIES

app.get(BASE_API_URL+"/tourists_countries_stats/loadInitialData", (req,res) =>{
	res.send(JSON.stringify(tourists_countries_stats,null,2));
	console.log("Data sent:"+JSON.stringify(tourists_countries_stats,null,2));
});


// POST COUNTRIES

app.post(BASE_API_URL+"/tourists_countries_stats",(req,res) =>{
	
	var newTCS = req.body;
	
	if((newTCS == "") || (newTCS.country == null)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		tourists_countries_stats.push(newTCS); 	
		res.sendStatus(201,"CREATED");
	}
});

// DELETE COUNTRIES

// GET COUNTRY/XXX

app.get(BASE_API_URL+"/tourists_countries_stats/:country", (req,res)=>{
	
	var country = req.params.country;
	
	var filteredTCS = tourists_countries_stats.filter((c) => {
		return (c.country == country);
	});
	
	
	if(filteredTCS.length >= 1){
		res.send(filteredTCS[0]);
	}else{
		res.sendStatus(404,"COUNTRY NOT FOUND");
	}
});

// PUT COUNTRY/XXX

// DELETE COUNTRY/XXX

app.delete(BASE_API_URL+"/tourists_countries_stats/:country", (req,res)=>{
	
	var country = req.params.country;
	
	var filteredTCS = tourists_countries_stats.filter((c) => {
		return (c.country != country);
	});
	
	
	if(filteredTCS.length < tourists_countries_stats.length){
		tourists_countries_stats = filteredTCS;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"COUNTRY NOT FOUND");
	}
	
	
});


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");
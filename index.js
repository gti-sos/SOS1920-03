const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

var tourists_countries_stats = [];

const BASE_API_URL = "/api/v1";

//GET loadInitialData
app.get(BASE_API_URL + "/tourists_countries_stats/loadInitialData", (req,res) => {
	var stats= [
	{ 
		country: "Francia",
		year: 2017,
		tourist: 85800000,
		difference_2016_17: 2.6,
		tourist_income:	60700000000
	},
	{ 
		country: "Espana",
		year: 2017,
		tourist: 81900000,
		difference_2016_17: 10.1,
		tourist_income:	67900000000	
	}];
	tourists_countries_stats=stats;
	res.send(JSON.stringify(stats,null,2))
});

// GET COUNTRIES

app.get(BASE_API_URL+"/tourists_countries_stats", (req,res) =>{
	res.send(JSON.stringify(tourists_countries_stats,null,2));
	console.log("Data sent:"+JSON.stringify(tourists_countries_stats,null,2));
});

//PUT COUNTRIES ERROR
app.put(BASE_API_URL+"/tourists_countries_stats", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})


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

app.delete(BASE_API_URL+"/tourists_countries_stats", (req,res)=>{
    tourists_countries_stats = [];
    res.send(JSON.stringify(tourists_countries_stats,null,2));
    
});

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

app.put(BASE_API_URL +"/tourists_countries_stats/:country/:year",(req,res)=>{
    var country=req.params.country;
    var year=req.params.year;
    var data=req.body;
    
    if(country!=data.country||year!=data.year){
        res.status(400).send("BAD Request");
    }else{
        var filteredTCS = tourists_countries_stats.filter((c) => {
        return (c.country != country || c.year != year);
        });      
        tourists_countries_stats = filteredTCS;
        tourists_countries_stats.push(data);
        res.status(200).send("DATA UPDATED");
    }
});

//POST COUNTRY/xxx
app.post(BASE_API_URL+"/tourists_countries_stats/:country", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/tourists_countries_stats/:year", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/tourists_countries_stats/:import_profit", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/tourists_countries_stats/:export_profit", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/tourists_countries_stats/:food_export", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})

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
		res.sendStatus(404,"NOT FOUND");
	}
	
	
});


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");
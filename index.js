const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

var public_budget_stats = [];

const BASE_API_URL = "/api/v1";

// GET COUNTRIES

app.get(BASE_API_URL+"/public_budget_stats/loadInitialData", (req,res) =>{
	var datos =[
	{ 
		country: "Francia",
		year: 2017,
		public_budget_income: 1598000000,
		population: 82605000,
		public_budget_loss: 1573000000000
	},
	{ 
		country: "España",
		year: 2017,
		public_budget_income:492400000,
		population: 46491000,
		public_budget_loss:	535900000000	
	}
		];
	public_budget_stats=datos;
	res.send(JSON.stringify(datos,null,2))
});
//GET countries

app.get(BASE_API_URL+"/public_budget_stats", (req,res) =>{
	res.send(JSON.stringify(public_budget_stats,null,2));
	console.log("Data sent:"+JSON.stringify(public_budget_stats,null,2));
});


// POST COUNTRIES

app.post(BASE_API_URL+"/public_budget_stats",(req,res) =>{
	
	var newCountry = req.body;
	
	if((newCountry == "") || (newCountry.country == null)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		public_budget_stats.push(newCountry); 	
		res.sendStatus(201,"CREATED");
	}
});

// DELETE COUNTRIES
app.delete(BASE_API_URL+"/public_budget_stats", (req,res)=>{
    public_budget_stats = [];
    res.send(JSON.stringify(public_budget_stats,null,2));
});
// GET COUNTRY/XXX

app.get(BASE_API_URL+"/public_budget_stats/:country", (req,res)=>{
	
	var country = req.params.country;
	
	var filteredStats = public_budget_stats.filter((c) => {
		return (c.country == country);
	});
	
	
	if(filteredStats.length >= 1){
		res.send(filteredStats[0]);
	}else{
		res.sendStatus(404,"COUNTRY NOT FOUND");
	}
});

// PUT COUNTRY/XXX
app.put(BASE_API_URL +"/public_budget_stats/:country/:year",(req,res)=>{
    var country=req.params.country;
    var year=req.params.year;
    var data=req.body;
    
    if(country!=data.country||year!=data.year){
        res.status(400).send("BAD DATA");
    }else{
        var filteredStats = public_budget_stats.filter((c) => {
        return (c.country != country || c.year != year);
        });      
        public_budget_stats = filteredStats;
        public_budget_stats.push(data);
        res.status(200).send("DATA UPDATED");
    }
});

// DELETE COUNTRY/XXX

app.delete(BASE_API_URL+"/public_budget_stats/:country", (req,res)=>{
	
	var country = req.params.country;
	
	var filteredStats = public_budget_stats.filter((c) => {
		return (c.country != country);
	});
	
	
	if(filteredStats.length < public_budget_stats.length){
		public_budget_stats = filteredStats;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"COUNTRY NOT FOUND");
	}
	
	
});

//PUT exports_imports_stats
app.put(BASE_API_URL+"/public_budget_stats", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})
//POST exports_imports_stats/xxxx
app.post(BASE_API_URL+"/public_budget_stats/:country", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/public_budget_stats/:year", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/public_budget_stats/:public_budget_income", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/public_budget_stats/:population", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/public_budget_stats/:public_budget_loss", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");
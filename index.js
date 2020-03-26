const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use("/",express.static("./public"));
app.use(bodyParser.json());

var port = process.env.PORT || 80;

const BASE_API_URL = "/api/v1";


//------------------------------------------------------------------------------
//--------------------JUAN RAFAEL BARRAGAN FRANCO-------------------------------
//------------------------------------------------------------------------------

var exports_imports_stats = [];

//GET loadInitialData
app.get(BASE_API_URL + "/exports_imports_stats/loadInitialData", (req,res) => {
	var stats= [
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
	}];
	exports_imports_stats=stats;
	res.send(JSON.stringify(stats,null,2))
});
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
		exports_imports_stats.push(newStat); 	
		res.sendStatus(201,"CREATED");
	}
});

// DELETE exports_imports_stats
app.delete(BASE_API_URL+"/exports_imports_stats", (req,res)=>{
    exports_imports_stats = [];
    res.send(JSON.stringify(exports_imports_stats,null,2));
    
});
//PUT exports_imports_stats
app.put(BASE_API_URL+"/exports_imports_stats", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})
//POST exports_imports_stats/xxxx
app.post(BASE_API_URL+"/exports_imports_stats/:country", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/exports_imports_stats/:year", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/exports_imports_stats/:import_profit", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/exports_imports_stats/:export_profit", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/exports_imports_stats/:food_export", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
})
// GET exports_imports_stats/country

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
//GET extra para el put
app.get(BASE_API_URL+"/exports_imports_stats/:country/:year", (req,res)=>{
    
    var country = req.params.country;
    var year = req.params.year;
    var filteredStats = exports_imports_stats.filter((c) => {
        return (c.country == country && c.year == year);
    });
    if(filteredStats.length >= 1){
        res.send(filteredStats[0]);
    }else{
        res.status(404).send("NOT FOUND");
    }
});
// PUT exports_imports_stats/country/year
app.put(BASE_API_URL +"/exports_imports_stats/:country/:year",(req,res)=>{
    var country=req.params.country;
    var year=req.params.year;
    var data=req.body;
    
    if(country!=data.country||year!=data.year){
        res.status(400).send("BAD DATA");
    }else{
        var filteredStats = exports_imports_stats.filter((c) => {
        return (c.country != country || c.year != year);
        });      
        exports_imports_stats = filteredStats;
        exports_imports_stats.push(data);
        res.status(200).send("DATA UPDATED");
    }
});
// DELETE exports_imports_stats/country

app.delete(BASE_API_URL+"/exports_imports_stats/:country", (req,res)=>{
	
	var country = req.params.country;
	
	var filteredstats = exports_imports_stats.filter((c) => {
		return (c.country != country);
	});
	
	
	if(filteredstats.length < exports_imports_stats.length){
		exports_imports_stats = filteredstats;
		res.sendStatus(200,"COUNTRY DELETED");
	}else{
		res.sendStatus(404,"COUNTRY NOT FOUND");
	}
	
	
});

//------------------------------------------------------------------------------
//--------------------JOSE MANUEL GONZALEZ DOMINGUEZ-------------------------------
//------------------------------------------------------------------------------


var public_budget_stats = [];

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

//------------------------------------------------------------------------------
//--------------------ANTONIO JOSE MARIN RODRIGUEZ------------------------------
//------------------------------------------------------------------------------

var tourists_countries_stats = [];

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
		res.sendStatus(404,"NOT FOUND");
	}
});

// PUT COUNTRY/XXX

app.put(BASE_API_URL +"/tourists_countries_stats/:country/:year",(req,res)=>{
    var country=req.params.country;
    var year=req.params.year;
    var data=req.body;
    
    if(country!=data.country||year!=data.year){
        res.status(400).send("BAD REQUEST");
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
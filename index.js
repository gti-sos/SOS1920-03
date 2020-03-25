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
//GET loadInitialData
app.get(BASE_API_URL + "/exports_imports_stats/loadInitialData", (req,res) => {
	res.send(JSON.stringify(exports_imports_stats,null,2))
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
app.delete(BASE_API_URL+"/exports_imports_stats"),(req,res)=>{
	var filteredStats = exports_imports_stats.filter((c) => {
		return (c.country != null);
	});
	
	
	if(filteredStats.length == 0){
		exports_imports_stats = filteredStats;
		res.sendStatus(200);
	}else{
		res.sendStatus(400,"COUNTRY NOT FOUND");
	}
};

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

// PUT exports_imports_stats/country
app.put(BASE_API_URL +"/lottery-sales/:country/:year",(req,res)=>{
    var country=req.params.country;
    var year=req.params.year;
    var data=req.body;
    
    if(country!=data.country||year!=data.year){
        res.status(400).send("BAD DATA");
    }else{
        var filteredStats = exports_imports_stats.filter((c) => {
        return (c.country != country || c.year != year);
        });      
        stats = filteredStats;
        stats.push(data);
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


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");
module.exports = function (app){
	console.log("Registering exports_imports_stats API......");
	const dataStore = require("nedb");
	const path = require("path");
	
	const dbFileName= path.join(__dirname,"stats.db");
	const BASE_API_URL = "/api/v1";
	const db = new dataStore({
				filename: dbFileName,
				autoload: true
	});
	
	var exports_imports_stats = [];
	
	
	
	
	//-----------------------------------------------------------
	//--------------------TODOS LOS GET -------------------------
	//-----------------------------------------------------------
	
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
		country: "Espagna",
		year: 2017,
		import_profit: 342400,
		export_profit: 333400,
		food_export: 16.23	
	}];
		exports_imports_stats=stats;
		db.insert(stats);
		res.sendStatus(200);
		console.log("Initial stats loaded:" +JSON.stringify(stats,null,2));
	});
	// GET exports_imports_stats

	app.get(BASE_API_URL+"/exports_imports_stats", (req,res) =>{
		console.log("NEW GET ...../exports_imports_stats");
		db.find({}, (err, exports_imports_stats) =>{
			exports_imports_stats.forEach((c)=>{delete c._id});
			res.send(JSON.stringify(exports_imports_stats,null,2));
			console.log("Data sent:"+JSON.stringify(exports_imports_stats,null,2));
		});
	});
	// GET exports_imports_stats/country
	app.get(BASE_API_URL+"/exports_imports_stats/:country", (req,res)=>{
		console.log("NEW GET ...../exports_imports_stats/country");
		var reqcountry = req.params.country;
		db.find({country:reqcountry}, (err, exports_imports_stats) =>{
			exports_imports_stats.forEach((c)=>{delete c._id});
			res.send(JSON.stringify(exports_imports_stats,null,2));
			console.log("Data sent:"+JSON.stringify(exports_imports_stats,null,2));
		});
		
	});
	//GET exports_imports_stats/country/year
	app.get(BASE_API_URL+"/exports_imports_stats/:country/:year", (req,res)=>{
		console.log("NEW GET ...../exports_imports_stats/country/year");
		var reqcountry = req.params.country;
		var reqyear = parseInt(req.params.year);
		db.find({country: reqcountry, year: reqyear}, (err, exports_imports_stats) =>{
			exports_imports_stats.forEach((c)=>{delete c._id});
			res.send(JSON.stringify(exports_imports_stats,null,2));
			console.log("Data sent:"+JSON.stringify(exports_imports_stats,null,2));
		});
	});
	
	
	
	
	
	//-----------------------------------------------------------
	//--------------------TODOS LOS POST-------------------------
	//-----------------------------------------------------------
	
	// POST exports_imports_stats

	app.post(BASE_API_URL+"/exports_imports_stats",(req,res) =>{
		console.log("NEW POST ...../exports_imports_stats");
		var newStat = req.body;
	
		if((newStat == "") || (newStat.country == null)){
			res.sendStatus(400,"BAD REQUEST");
		} else {
			db.insert(newStat); 	
			res.sendStatus(201,"CREATED");
		}
	});
	//POST exports_imports_stats/xxxx
	app.post(BASE_API_URL+"/exports_imports_stats/:country", (req,res)=>{
		console.log("NEW POST ...../exports_imports_stats/country/year");
		res.status(405).send("NOT ALLOWED");
	});
	app.post(BASE_API_URL+"/exports_imports_stats/:year", (req,res)=>{
		console.log("NEW POST ...../exports_imports_stats/country/year");
		res.status(405).send("NOT ALLOWED");
	});
	app.post(BASE_API_URL+"/exports_imports_stats/:import_profit", (req,res)=>{
		console.log("NEW POST ...../exports_imports_stats/country/year");
		res.status(405).send("NOT ALLOWED");
	});
	app.post(BASE_API_URL+"/exports_imports_stats/:export_profit", (req,res)=>{
		console.log("NEW POST ...../exports_imports_stats/country/year");
		res.status(405).send("NOT ALLOWED");
	});
	app.post(BASE_API_URL+"/exports_imports_stats/:food_export", (req,res)=>{
		console.log("NEW POST ...../exports_imports_stats/country/year");
		res.status(405).send("NOT ALLOWED");
	});
	
	//POST exports_imports_stats/country/year
	app.post(BASE_API_URL+"/exports_imports_stats/:country/:year", (req,res)=>{
		console.log("NEW POST ...../exports_imports_stats/country/year");
		res.status(405).send("NOT ALLOWED");
	});
	
	
	//-----------------------------------------------------------
	//--------------------TODOS LOS PUT -------------------------
	//-----------------------------------------------------------
	
	//PUT exports_imports_stats
	app.put(BASE_API_URL+"/exports_imports_stats", (req,res)=>{
		console.log("NEW PUT ...../exports_imports_stats");
	    res.status(405).send("NOT ALLOWED");
	});
	
	// PUT exports_imports_stats/country/year
	app.put(BASE_API_URL +"/exports_imports_stats/:country/:year",(req,res)=>{
		console.log("NEW PUT ...../exports_imports_stats/country/year");
		var reqcountry=req.params.country;
		var reqyear=parseInt(req.params.year);
		var data=req.body;

		if(data==""){
			res.status(400).send("BAD DATA");
		}else{
			db.remove({country: reqcountry, year: reqyear}, { multi: true }, function (err, salida) {});
			db.insert(data);
			res.sendStatus(200);
				/*		if(salida==1){
					console.log("DATA UPDATED");
					db.insert(data);
					res.sendStatus(200);
				}else{
					console.log("DATA NOT FOUND");
					res.sendStatus(404);
				}*/
			
		}
	});
	
	//-----------------------------------------------------------
	//--------------------TODOS LOS DELETE ----------------------
	//-----------------------------------------------------------
	
	// DELETE exports_imports_stats
	app.delete(BASE_API_URL+"/exports_imports_stats", (req,res)=>{
		console.log("NEW DELETE ...../exports_imports_stats");
		db.remove({},{multi:true}, (err, exports_imports_stats) => {
			console.log("Data removed");
			res.send(JSON.stringify(exports_imports_stats,null,2));
		});
	});
	// DELETE exports_imports_stats/country

	app.delete(BASE_API_URL+"/exports_imports_stats/:country", (req,res)=>{
		console.log("NEW DELETE ...../exports_imports_stats/country");
		var reqcountry = req.params.country;
		db.remove({country:reqcountry},{multi:true}, (err, salida) => {
				if(salida==0){
					console.log("DATA NOT FOUND");
					res.sendStatus(404);
				}else{
					console.log("DATA REMOVED");
					res.sendStatus(200);
				}
		});
	});
	
	//DELETE exports_imports_stats/country/year
	app.delete(BASE_API_URL+"/exports_imports_stats/:country/:year", (req,res)=>{
		console.log("NEW DELETE ...../exports_imports_stats/country/year");
			var reqcountry = req.params.country;
			var reqyear = parseInt(req.params.year);
			db.remove({country:reqcountry,year:reqyear},{multi:true}, (err, salida) => {
				if(salida==1){
					console.log("DATA REMOVED");
					res.sendStatus(200);
				}else{
					console.log("DATA NOT FOUND");
					res.sendStatus(404);
				}
			});
	});
	
	
	
	
	console.log("OK.");
}
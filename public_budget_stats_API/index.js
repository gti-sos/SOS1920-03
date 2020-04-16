module.exports = function (app){
	console.log("Registering public_budget_stats API......");
	const dataStore = require("nedb");
	const path = require("path");
	
	const dbFileName= path.join(__dirname,"public_budget_stats");
	const BASE_API_URL = "/api/v1";
	const db = new dataStore({
				filename: dbFileName,
				autoload: true
	});
	
	var public_budget_stats = [];
	
	// GET COUNTRIES

app.get(BASE_API_URL+"/public_budget_stats/loadInitialData", (req,res) =>{
	var stats =[
	{ 
		country: "Francia",
		year: 2017,
		public_budget_income: 1598000000,
		population: 82605000,
		public_budget_loss: 1573000000000
	},
	{ 
		country: "Espagna",
		year: 2017,
		public_budget_income:492400000,
		population: 46491000,
		public_budget_loss:	535900000000	
	},
	{
		country: "Alemania",
		year: 2017,
		public_budget_income:1598000000,
		population: 82605000,
		public_budget_loss:	1573000000
		
		}];
		public_budget_stats=stats;
		db.remove({}, { multi: true }, function(err, numRemoved) {});
		db.insert(stats);
		res.sendStatus(200);
		console.log("Initial stats loaded:" +JSON.stringify(stats,null,2));
});
//GET countries
app.get(BASE_API_URL+"/public_budget_stats/:country", (req,res)=>{
		console.log("NEW GET ...../public_budget_stats/country");
		var reqcountry = req.params.country;
		db.find({country:reqcountry}, (err, public_budget_stats) =>{
			public_budget_stats.forEach((c)=>{delete c._id});
			res.send(JSON.stringify(public_budget_stats,null,2));
			console.log("Data sent:"+JSON.stringify(public_budget_stats,null,2));
		});
		
	});

//GET country/year
	app.get(BASE_API_URL+"/public_budget_stats/:country/:year", (req,res)=>{
		console.log("NEW GET ...../public_budget_stats/country/year");
		var reqcountry = req.params.country;
		var reqyear = parseInt(req.params.year);
		db.find({country: reqcountry, year: reqyear}, (err, public_budget_stats) =>{
			public_budget_stats.forEach((c)=>{delete c._id});
			res.send(JSON.stringify(public_budget_stats,null,2));
			console.log("Data sent:"+JSON.stringify(public_budget_stats,null,2));
		});
	});

	//--------------------GET AND PAGINATION-------------------------
	
	app.get(BASE_API_URL+"/public_budget_stats", (req,res) =>{
		var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        
        var from = parseInt(req.query.from);
        var to = parseInt(req.query.to);
		
        var country = req.query.country;
        var year = parseInt(req.query.year);
        var public_budget_income = parseInt(req.query.public_budget_income);
        var population = parseInt(req.query.population);
        var public_budget_loss = parseFloat(req.query.public_budget_loss);
		
		if(from && to) {
            db.find({ year: {$gte: from, $lte: to}}).skip(offset).limit(limit).exec((err, public_budget_stats)=>{
                if(public_budget_stats.length == 0) {
                  	res.status(404).send("NOT FOUND");
                }else { 
                    public_budget_stats.forEach((c)=>{delete c._id});
					res.send(JSON.stringify(public_budget_stats,null,2));
                }    
			});
			} else if(country || year || public_budget_income || population || public_budget_loss) {
			
              if(!year && !public_budget_income && !population && !public_budget_loss ) {
                   db.find({country:country}).skip(offset).limit(limit).exec((err, public_budget_stats)=>{   
						if(public_budget_stats.length == 0) {
							res.status(404).send("NOT FOUND");
						}else { 
							public_budget_stats.forEach((c)=>{delete c._id});
							res.send(JSON.stringify(public_budget_stats,null,2));
						}  
                	});
             
			  }else if(!country && !public_budget_income && !population && !public_budget_loss ) {
					db.find({year:year}).skip(offset).limit(limit).exec((err, public_budget_stats)=>{
						if(public_budget_stats.length == 0) {
							res.status(404).send("NOT FOUND");
						}else { 
							public_budget_stats.forEach((c)=>{delete c._id});
							res.send(JSON.stringify(public_budget_stats,null,2));
						} 
					});
				  
        		
			  }else if(!country && !year && !population && !public_budget_loss) {
					db.find({public_budget_income:public_budget_income}).skip(offset).limit(limit).exec((err, public_budget_stats)=>{
						if(public_budget_stats.length == 0) {
							res.status(404).send("NOT FOUND");
						}else { 
							public_budget_stats.forEach((c)=>{delete c._id});
							res.send(JSON.stringify(public_budget_stats,null,2));
						} 
					}); 
			
        
			  }else if(!country && !year && !public_budget_income && !public_budget_loss ) {
					db.find({population:population}).skip(offset).limit(limit).exec((err, public_budget_stats)=>{
						if(public_budget_stats.length == 0) {
							res.status(404).send("NOT FOUND");
						}else { 
							public_budget_stats.forEach((c)=>{delete c._id});
							res.send(JSON.stringify(public_budget_stats,null,2));
						} 
					});
			
        
			  }else if(!country && !year && !public_budget_income && !population ) {
					db.find({public_budget_loss:public_budget_loss}).skip(offset).limit(limit).exec((err, public_budget_stats)=>{   
						if(public_budget_stats.length == 0) {
							res.status(404).send("NOT FOUND");
						}else { 
							public_budget_stats.forEach((c)=>{delete c._id});
							res.send(JSON.stringify(public_budget_stats,null,2));
						} 
					});
				  
        
			  }else if(!public_budget_income && !population && !public_budget_loss ) {
					db.find({country:country, year: year}).skip(offset).limit(limit).exec((err, public_budget_stats)=>{
						if(public_budget_stats.length == 0) {
							res.status(404).send("NOT FOUND");
						}else { 
							public_budget_stats.forEach((c)=>{delete c._id});
							res.send(JSON.stringify(public_budget_stats,null,2));
						} 
					});
       
			  }else {
				db.find(
					{country:country,
					 year:year,
					 public_budget_income:public_budget_income,
					 population:population})
					.skip(offset).limit(limit).exec((err, public_budget_stats)=>{
					
					if(public_budget_stats.length == 0) {
						res.status(404).send("NOT FOUND");
					} else { 
						public_budget_stats.forEach((c)=>{delete c._id});
						res.send(JSON.stringify(public_budget_stats,null,2));
						} 
				});
        	 }			
			
        }else {
            db.find({}).skip(offset).limit(limit).exec((err, public_budget_stats)=>{
                    public_budget_stats.forEach((c)=>{delete c._id});
					res.send(JSON.stringify(public_budget_stats,null,2));
				});      
            };
    
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
	
	//POST public_budget_stats/xxxx
app.post(BASE_API_URL+"/public_budget_stats/:country", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
});
app.post(BASE_API_URL+"/public_budget_stats/:year", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
});
app.post(BASE_API_URL+"/public_budget_stats/:public_budget_income", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
});
app.post(BASE_API_URL+"/public_budget_stats/:population", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
});
app.post(BASE_API_URL+"/public_budget_stats/:public_budget_loss", (req,res)=>{
    res.status(405).send("NOT ALLOWED");
});
	
	app.post(BASE_API_URL+"/public_budget_stats/:country/:year", (req,res)=>{
		console.log("NEW POST ...../public_budget_stats/country/year");
		res.status(405).send("NOT ALLOWED");
	});
	
	//PUT
	//PUT public_budget_stats
	app.put(BASE_API_URL+"/public_budget_stats", (req,res)=>{
		console.log("NEW PUT ...../public_budget_stats");
	    res.status(405).send("NOT ALLOWED");
	});
	
	// PUT public_budget_stats/country/year
	app.put(BASE_API_URL +"/public_budget_stats/:year",(req,res)=>{
		console.log("NEW PUT ...../public_budget_stats/country/year");
		var reqcountry=req.params.country;
		var reqyear=parseInt(req.params.year);
		var data=req.body;

		if(data==""){
			res.status(400).send("BAD DATA");
		}else{
			db.remove({country: reqcountry, year: reqyear}, { multi: true }, function (err, salida) {});
			db.insert(data);
			res.sendStatus(200);
				
			
		}
	});
	
	//--------------------TODOS LOS DELETE ----------------------
	
	// DELETE public_budget_stats
	app.delete(BASE_API_URL+"/public_budget_stats", (req,res)=>{
		console.log("NEW DELETE ...../public_budget_stats");
		db.remove({},{multi:true}, (err, public_budget_stats) => {
			console.log("Data removed");
			res.send(JSON.stringify(public_budget_stats,null,2));
		});
	});
	// DELETE public_budget_stats

	app.delete(BASE_API_URL+"/public_budget_stats/:country", (req,res)=>{
		console.log("NEW DELETE ...../public_budget_stats/country");
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
	
	//DELETE public_budget_stats/country/year
	app.delete(BASE_API_URL+"/public_budget_stats/:country/:year", (req,res)=>{
		console.log("NEW DELETE ...../public_budget_stats/country/year");
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
	
	
	
};
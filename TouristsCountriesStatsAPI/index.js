module.exports = function(app,db){
console.log("Registering Tourists Countries Stats API...");
	
const BASE_API_URL = "/api/v1";	
var tourists_countries_stats = [];

//GET loadInitialData
app.get(BASE_API_URL + "/tourists_countries_stats/loadInitialData", (req,res) => {
	
	console.log("NEW GET .../tourists_countries_stats/loadInitialData");
	
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
	db.remove({}, { multi: true }, function(err, numRemoved) {});
	db.insert(stats);
	res.sendStatus(200);
	console.log("Initial data loaded:"+JSON.stringify(tourists_countries_stats,null,2));
});

// GET COUNTRIES

app.get(BASE_API_URL+"/tourists_countries_stats", (req,res) =>{
	
	console.log("NEW GET .../tourists_countries_stats");
	
	db.find({}, (err,tourists_countries_stats) => {
		
		tourists_countries_stats.forEach( (c) => {
			delete c._id;
		})
		
		res.send(JSON.stringify(tourists_countries_stats,null,2));
		console.log("Data sent:"+JSON.stringify(tourists_countries_stats,null,2));
	});
});
	
// GET tourists_countries_stats/country
	app.get(BASE_API_URL+"/tourists_countries_stats/:country", (req,res)=>{
		console.log("NEW GET ...../tourists_countries_stats/country");
		var reqcountry = req.params.country;
		db.find({country:reqcountry}, (err, tourists_countries_stats) =>{
			tourists_countries_stats.forEach((c)=>{delete c._id});
			res.send(JSON.stringify(tourists_countries_stats,null,2));
			console.log("Data sent:"+JSON.stringify(tourists_countries_stats,null,2));
		});
		
	});
	
//GET tourists_countries_stats/country/year
	app.get(BASE_API_URL+"/tourists_countries_stats/:country/:year", (req,res)=>{
		console.log("NEW GET ...../tourists_countries_stats/country/year");
		var reqcountry = req.params.country;
		var reqyear = parseInt(req.params.year);
		db.find({country: reqcountry, year: reqyear}, (err, tourists_countries_stats) =>{
			tourists_countries_stats.forEach((c)=>{delete c._id});
			res.send(JSON.stringify(tourists_countries_stats,null,2));
			console.log("Data sent:"+JSON.stringify(tourists_countries_stats,null,2));
		});
	});
	
//PAGINACION GET
	
	app.get(BASE_API_URL+"/tourists_countries_stats", (req,res) =>{
		var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        
        var from = parseInt(req.query.from);
        var to = parseInt(req.query.to);
		
        var country = req.query.country;
        var year = parseInt(req.query.year);
        var tourist = parseInt(req.query.tourist);
        var difference_2016_17 = parseInt(req.query.difference_2016_17);
        var tourist_income = parseFloat(req.query.tourist_income);
        
    
        if(from && to) {
            db.find({ year: {$gte: from, $lte: to}}).skip(offset).limit(limit).exec((err, tourists_countries_stats)=>{
                if(tourists_countries_stats.length == 0) {
                  	res.status(404).send("NOT FOUND");
                }else { 
                    tourists_countries_stats.forEach((c)=>{delete c._id});
					res.send(JSON.stringify(tourists_countries_stats,null,2));
                }    
			});
			
        } else if(country || year || tourist || difference_2016_17 || tourist_income) {
			
              if(!year && !tourist && !difference_2016_17 && !tourist_income ) {
                   db.find({country:country}).skip(offset).limit(limit).exec((err, tourists_countries_stats)=>{   
						if(tourists_countries_stats.length == 0) {
							res.status(404).send("NOT FOUND");
						}else { 
							tourists_countries_stats.forEach((c)=>{delete c._id});
							res.send(JSON.stringify(tourists_countries_stats,null,2));
						}  
                	});
             
			  }else if(!country && !tourist && !difference_2016_17 && !tourist_income ) {
					db.find({year:year}).skip(offset).limit(limit).exec((err, tourists_countries_stats)=>{
						if(tourists_countries_stats.length == 0) {
							res.status(404).send("NOT FOUND");
						}else { 
							tourists_countries_stats.forEach((c)=>{delete c._id});
							res.send(JSON.stringify(tourists_countries_stats,null,2));
						} 
					});
				  
        		
			  }else if(!country && !year && !difference_2016_17 && !tourist_income) {
					db.find({tourist:tourist}).skip(offset).limit(limit).exec((err, tourists_countries_stats)=>{
						if(tourists_countries_stats.length == 0) {
							res.status(404).send("NOT FOUND");
						}else { 
							tourists_countries_stats.forEach((c)=>{delete c._id});
							res.send(JSON.stringify(tourists_countries_stats,null,2));
						} 
					}); 
			
        
			  }else if(!country && !year && !tourist && !tourist_income ) {
					db.find({difference_2016_17:difference_2016_17}).skip(offset).limit(limit)
						.exec((err, tourists_countries_stats)=>{
							if(tourists_countries_stats.length == 0) {
								res.status(404).send("NOT FOUND");
							}else { 
								tourists_countries_stats.forEach((c)=>{delete c._id});
								res.send(JSON.stringify(tourists_countries_stats,null,2));
							} 
						});
			
        
			  }else if(!country && !year && !tourist && !difference_2016_17 ) {
					db.find({difference_2016_17:difference_2016_17}).skip(offset).limit(limit)
						.exec((err, tourists_countries_stats)=>{   
						if(tourists_countries_stats.length == 0) {
							res.status(404).send("NOT FOUND");
						}else { 
							tourists_countries_stats.forEach((c)=>{delete c._id});
							res.send(JSON.stringify(tourists_countries_stats,null,2));
						} 
					});
				  
        
			  }else if(!tourist && !difference_2016_17 && !tourist_income ) {
					db.find({country:country, year: year}).skip(offset).limit(limit).exec((err, tourists_countries_stats)=>{
						if(tourists_countries_stats.length == 0) {
							res.status(404).send("NOT FOUND");
						}else { 
							tourists_countries_stats.forEach((c)=>{delete c._id});
							res.send(JSON.stringify(tourists_countries_stats,null,2));
						} 
					});
       
			  }else {
				db.find(
					{country:country,
					 year:year,
					 tourist:tourist,
					 difference_2016_17:difference_2016_17})
					.skip(offset).limit(limit).exec((err, tourists_countries_stats)=>{
					
					if(tourists_countries_stats.length == 0) {
						res.status(404).send("NOT FOUND");
					} else { 
						tourists_countries_stats.forEach((c)=>{delete c._id});
						res.send(JSON.stringify(tourists_countries_stats,null,2));
						} 
				});
        	 }			
			
        }else {
            db.find({}).skip(offset).limit(limit).exec((err, tourists_countries_stats)=>{
                    tourists_countries_stats.forEach((c)=>{delete c._id});
					res.send(JSON.stringify(tourists_countries_stats,null,2));
				});      
            };
    
	});
	
	
	

//PUT COUNTRIES ERROR
app.put(BASE_API_URL+"/tourists_countries_stats", (req,res)=>{
    console.log("NEW PUT ...../tourists_countries_stats");
	res.status(405).send("NOT ALLOWED");
})


// POST COUNTRIES

app.post(BASE_API_URL+"/tourists_countries_stats",(req,res) =>{
	console.log("NEW POST ...../tourists_countries_stats");
	var newTCS = req.body;
	
	if((newTCS == "") || (newTCS.country == null)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		db.insert(newTCS); 	
		res.sendStatus(201,"CREATED");
	}
});

// DELETE COUNTRIES

app.delete(BASE_API_URL+"/tourists_countries_stats", (req,res)=>{
    console.log("NEW DELETE ...../tourists_countries_stats");
	db.remove({},{multi:true}, (err, tourists_countries_stats) => {
		console.log("Data removed");
		res.send(JSON.stringify(tourists_countries_stats,null,2));
	});
    
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
    console.log("NEW PUT ...../tourists_countries_stats/country/year");
	var country=req.params.country;
    var year=req.params.year;
    var data=req.body;
    
    if(country!=data.country||year!=data.year){
        res.status(400).send("BAD Request");
    }else{
       /* var filteredTCS = tourists_countries_stats.filter((c) => {
        return (c.country != country || c.year != year);
        });      
        tourists_countries_stats = filteredTCS;
        tourists_countries_stats.push(data);
        res.status(200).send("DATA UPDATED");
    	*/
		db.remove({country: country, year: year}, { multi: true }, function (err, salida) {});
		db.insert(data);
		res.sendStatus(200).send("DATA UPDATED");
	
	}
		
});

//POST COUNTRY/xxx
app.post(BASE_API_URL+"/tourists_countries_stats/:country", (req,res)=>{
    console.log("NEW POST ...../tourists_countries_stats/country/year");
	res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/tourists_countries_stats/:year", (req,res)=>{
    console.log("NEW POST ...../tourists_countries_stats/country/year");
	res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/tourists_countries_stats/:import_profit", (req,res)=>{
    console.log("NEW POST ...../tourists_countries_stats/country/year");
	res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/tourists_countries_stats/:export_profit", (req,res)=>{
    console.log("NEW POST ...../tourists_countries_stats/country/year");
	res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/tourists_countries_stats/:food_export", (req,res)=>{
    console.log("NEW POST ...../tourists_countries_stats/country/year");
	res.status(405).send("NOT ALLOWED");
})
app.post(BASE_API_URL+"/tourists_countries_stats/:country/:year", (req,res)=>{
	console.log("NEW POST ...../tourists_countries_stats/country/year");
	res.status(405).send("NOT ALLOWED");
});

// DELETE COUNTRY/XXX

app.delete(BASE_API_URL+"/tourists_countries_stats/:country", (req,res)=>{
	console.log("NEW DELETE ...../tourists_countries_stats/country");
	var country = req.params.country;
	
	/*var filteredTCS = tourists_countries_stats.filter((c) => {
		return (c.country != country);
	});
	
	
	if(filteredTCS.length < tourists_countries_stats.length){
		tourists_countries_stats = filteredTCS;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"NOT FOUND");
	}*/
	db.remove({country:country},{multi:true}, (err, salida) => {
				if(salida==0){
					console.log("DATA NOT FOUND");
					res.sendStatus(404);
				}else{
					console.log("DATA REMOVED");
					res.sendStatus(200);
				}
		});
	
	
});
	
	//DELETE tourists_countries_stats/country/year
	app.delete(BASE_API_URL+"/tourists_countries_stats/:country/:year", (req,res)=>{
		console.log("NEW DELETE ...../tourists_countries_stats/country/year");
			var country = req.params.country;
			var year = parseInt(req.params.year);
			db.remove({country:country,year:year},{multi:true}, (err, salida) => {
				if(salida==1){
					console.log("DATA REMOVED");
					res.sendStatus(200);
				}else{
					console.log("DATA NOT FOUND");
					res.sendStatus(404);
				}
			});
	});
}
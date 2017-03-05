var express 			= require("express"),
app 					= express(),
//to get APIS
request 				= require("request"),
//to link css
path 					= require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {	
	res.render("search");
});

app.get("/results", function(req, res) {
	var query = req.query.search;
	var url = "http://www.omdbapi.com/?t=" + query +"&y=&plot=short&r=json&tomatoes=true";
	console.log(url);
	request(url, function(err, response, body) {
		if(!err && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("search", {data: data});
		}
	});
});

app.get("*", function(req, res) {	
	res.render("search");
});


app.listen(process.env.PORT || 3000, function() {
  console.log('Spinning up!');
});


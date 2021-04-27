var Curiosity = document.getElementById("Curriosity")
var Opportunity = document.getElementById("Opportunity")
var Spirit = document.getElementById("Spirit")
var Rovers = document.getElementById("Rovers")


var apiURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=PUxgro2fgT0RlNQ3CSy2X8Zxk0hbwxZoWFR2UPh3"
consolelog(apiURL)
					var apiKey = 'PUxgro2fgT0RlNQ3CSy2X8Zxk0hbwxZoWFR2UPh3'; 

					var request = new XMLHttpRequest(); 
					request.open('GET', exampleURL + '&api_key=' + apiKey, true);

					request.addEventListener('load',function(){

					if(request.status >= 200 && request.status < 400){
					var response = JSON.parse(request.responseText);
					console.log(response);
					} 
					else {
					     console.log("Error in network request: " + request.statusText);
					}});
					request.send(null);
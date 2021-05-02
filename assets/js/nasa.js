let xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		let data = JSON.parse(this.responseText);


		let date = data["date"];
		let explanation = data["explanation"];
		let title = data["title"];
		let url = data["url"];

		document.getElementById("wrapper-url").src = url;
		document.getElementById("wrapper-title").innerHTML = title;
		document.getElementById("wrapper-explanation").innerHTML = explanation;

	}
};


let queryUrl = "https://api.nasa.gov/planetary/apod?";
let queryKey = "api_key=w3obOup6Ajl4dqP082rz16tqUZ27tfxDFdXlixML&";
let queryDate = "date=" + "2015-02-09" + "&";

let queryFull = queryUrl + queryKey + queryDate;

var api_key = "DEMO_KEY";

xmlhttp.open("GET", queryFull, true);
xmlhttp.send();


// donate function starts
function donations() {
	var donations = document.querySelector('#donations');
	var form = document.querySelector('form');
	var nameInput = document.querySelector('#name');
	var amountInput = document.querySelector('#amount');
	var fail = document.querySelector('#fail');
	
	form.addEventListener('submit',function(event){
		event.preventDefault();

		var name = nameInput.value;
		var amount = amountInput.value;

		if(!amount || !name) {
			fail.setAttribute('style', "display: block;");
		} else {
			fail.setAttribute('style', "display: none;");
			donations.innerHTML += '<li>' + name + ' - $' + amount + '</li>';
			store();
		}
	},false)
	
	function store() {
		localStorage.myitems = donations.innerHTML;
	}
	
	function getValues() {
		var storedValues = localStorage.myitems;
		
		donations.innerHTML = storedValues;
	}
	getValues();
};
donations();
=======
	function donations() {
		var donations = document.querySelector('#donations');
		var form = document.querySelector('form');
		var nameInput = document.querySelector('#name');
		var amountInput = document.querySelector('#amount');
		var fail = document.querySelector('#fail');
		
		form.addEventListener('submit',function(event){
			event.preventDefault();

			var name = nameInput.value;
			var amount = amountInput.value;

			if(!amount || !name) {
				fail.setAttribute('style', "display: block;");
			} else {
				fail.setAttribute('style', "display: none;");
				donations.innerHTML += '<li>' + name + ' - $' + amount + '</li>';
				store();
			}
		},false)
		
		function store() {
			localStorage.myitems = donations.innerHTML;
		}
		
		function getValues() {
			var storedValues = localStorage.myitems;
			
			donations.innerHTML = storedValues;
		}
		getValues();
	};
	donations();
// donate function ends

//Rover Ids
var Curiosity = document.getElementById("Curriosity")
var Opportunity = document.getElementById("Opportunity")
var Spirit = document.getElementById("Spirit")
var Rovers = document.getElementById("Rovers")

//Start Rover Photos Functions
var currentRoverData = [];
var roverImages = [];
var roverID = "";
var cameras = {
	curiosity: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
	opportunity: ['FHAZ', 'RHAZ', 'PANCAM', 'MINITES', 'NAVCAM'],
	spirit: ['FHAZ', 'RHAZ', 'PANCAM', 'MINITES', 'NAVCAM']
};


//API and Developer Key
var key = "PUxgro2fgT0RlNQ3CSy2X8Zxk0hbwxZoWFR2UPh3";
var nasa_api = "https://api.nasa.gov/mars-photos/api/v1";
var currentSliderValue = $("#currentSliderValue")[0].innerHTML;

function setSliderRange(value) {
	$("#slider")[0].max = "99999";
}
function setCurrentSOL(value) {
	$("#currentSliderValue")[0].innerHTML = value;
}

function cickrover(roverID) {

	// deselect all rovers
	$(".roverClick").removeClass('roverClick').addClass('rover');

	// set selected rover active
	var selector = "#" + roverID;
	$(selector).addClass('roverClick');
}


//Start Rover Data
function getRoverData(roverID) {

	$.ajax({
		url: nasa_api + "/rovers/" + roverID + "/photos?sol=" + currentSliderValue + "&camera=FHAZ" + "& api_key=8MVw29iMD3R88EJBobvj2hcAKZvzJcoR8NimnZDS",
		type: 'GET',
		error: function (data) {
			alert("An error has occured. See error message : " + data.responseText);
		},
		success: function (data) {
			console.log(data)
			currentRoverData = data;
			$(".text").html("Name: " + data.photo_manifest.name + "<br>Launch date: " + data.photo_manifest.launch_date + "<br>Landing date: " + data.photo_manifest.landing_date + "<br>Newest sol: " + data.photo_manifest.max_sol + "<br>Total photos: " + data.photo_manifest.max_sol);

		}

	});
}
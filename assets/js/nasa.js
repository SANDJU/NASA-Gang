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
var Curiosity = document.getElementById("curriosity")
var Opportunity = document.getElementById("opportunity")
var Spirit = document.getElementById("spirit")
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
var key = "&api_key=PUxgro2fgT0RlNQ3CSy2X8Zxk0hbwxZoWFR2UPh3";
var nasa_api = "https://api.nasa.gov/mars-photos/api/v1";
//var currentSliderValue = $("#currentSliderValue")[0].innerHTML;

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
		url: nasa_api + "/rovers/" + roverID + "/photos?sol=" + currentSliderValue + key,
		type: 'GET',
		error: function (data) {
			alert("An error has occured. See error message : " + data.responseText);
		},
		
		success: function (data) {
			console.log(data)
			currentRoverData = data;

		}

	});
}
https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY


function selectRover(roverID) {

	this.roverID = roverID;

	// set selected rover active
	cickrover(roverID);

	// fetch rover information from Nasa API
	getRoverData(roverID);
}

//Select camera
function setCameras(roverID) {

	var camerasToSet = [];

	switch (roverID) {
		case "curiosity":
			camerasToSet = cameras.curiosity;
			break;

		case "opportunity":
			camerasToSet = cameras.opportunity;
			break;

		case "spirit":
			camerasToSet = cameras.spirit;zz
			break;

	}
	$("#sel_cam").empty();


	for (var i = 0; i < camerasToSet.length; i++) {
		appendRadioButton(camerasToSet[i]);
	}

}

function appendRadioButton(name) {
	$("#sel_cam").append('<li><input type="radio" name="camera" value="' + name + '">' + name + '</li>');
}

function getImages() {
	var activeCamera = $('#sel_cam input:checked').val();

	$.ajax({
		url: nasa_api + "/rovers/" + roverID + "/photos?sol=" + currentSliderValue + "&camera=" + activeCamera + key,
		error: function (data) {
			$("#right").append('<p id="warning">Info: No photos for this selection! Please change your parameters. Thank you.</p>');
		},
		success: function (images) {
			roverImages = images.photos;
			for (var i = 0; i < roverImages.length; i++) {
				$("#right").append('<img class="rov_img" src="' + roverImages[i].img_src + '">');
			}
		}
	});

	$("#right").empty();
}
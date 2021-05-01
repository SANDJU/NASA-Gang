let xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
	if(this.readyState ==4 && this.status ==200) {
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
	(function(){
	
		var donations = document.querySelector('#donations');
		var form = document.querySelector('form');
		var nameInput = document.querySelector('#name');
		var amountInput = document.querySelector('#amount');
		var fail = document.querySelector('#fail');
		
		form.addEventListener('submit',function(e){
		e.preventDefault();

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
		
		donations.addEventListener('click',function(e){
		var t = e.target;
		if(t.classList.contains('checked')){
			t.parentNode.removeChild(t);
		} else {
			t.classList.add('checked');
		}
		store();
		},false)
		
		function store() {
		localStorage.myitems = donations.innerHTML;
		}
		
		function getValues() {
		var storedValues = localStorage.myitems;
		if(!storedValues) {
			donations.innerHTML = '<li>Elon Musk - $179,400,000</li>';
		}
		else {
			donations.innerHTML = storedValues;
		}
		}
		getValues();
	})();
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
	curiosity:['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
	opportunity:['FHAZ', 'RHAZ', 'PANCAM', 'MINITES', 'NAVCAM'],
	spirit:['FHAZ', 'RHAZ', 'PANCAM', 'MINITES', 'NAVCAM']
};


//API and Developer Key
var key = "0MBgxNs4QpgozbvtFsYv3gdhR5ezpO1bOKiZJ1dS";
var nasa_api = "https://api.nasa.gov/mars-photos/api/v1";

function setSliderRange(value){
	$( "#slider")[0].max = value;
}
function setCurrentSOL(value){
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
function getRoverData(roverID){
	var url = "https://api.nasa.gov/mars-photos/api/v1"
	$.ajax({
		url: nasa_api + "/manifests/" + roverID + "?api_key=" + key,
		type: 'GET',
		error:function(data){
			alert("An error has occured. See error message : " + data.responseText);
		},
		success:function(data) {
			currentRoverData = data;
			$(".text").html("Name: " + data.photo_manifest.name + "<br>Launch date: " + data.photo_manifest.launch_date + "<br>Landing date: " + data.photo_manifest.landing_date + "<br>Newest sol: " + data.photo_manifest.max_sol + "<br>Total photos: " + data.photo_manifest.max_sol);

			// get number of sols
			var numberOfSols = currentRoverData.photo_manifest.max_sol; //currentRoverData.numberOfSols

			// update slider range with number of sols
			setSliderRange(numberOfSols);

			// set cameras 
			setCameras(roverID);

		}
		
	});	
}



function selectRover (roverID) {

	this.roverID = roverID;

	// set selected rover active
	cickrover(roverID);

	// fetch rover information from Nasa API
	getRoverData(roverID);	
}

//Select camera
function setCameras(roverID){

	var camerasToSet = [];

	switch (roverID)
	{
		case "Curiosity" : 
			camerasToSet = cameras.curiosity;
			break;

		case "Opportunity" :
			camerasToSet = cameras.opportunity;
			break;

		case "Spirit" :
			camerasToSet = cameras.spirit;
			break;

	}
	$("#sel_cam").empty();


	for (var i = 0; i < camerasToSet.length; i++) {
		appendRadioButton(camerasToSet[i]);
	}

}

function appendRadioButton(name){
	$("#sel_cam").append('<li><input type="radio" name="camera" value="' + name + '">'+ name +'</li>');
}

function getImages () {
	var activeCamera = $('#sel_cam input:checked').val();

	fetch({
		url: nasa_api + "/rovers/" + roverID + "/photos?sol=" + currentSliderValue + "&camera=" + activeCamera + "&api_key=" + "0MBgxNs4QpgozbvtFsYv3gdhR5ezpO1bOKiZJ1dS",
		error:function(data){
			$("#right").append('<p id="warning">Info: No photos for this selection! Please change your parameters. Thank you.</p>');
		},
		success:function(images) {
			roverImages = images.photos;
			for (var i = 0; i < roverImages.length; i++) {
			$("#right").append('<img class="rov_img" src="' + roverImages[i].img_src + '">');
			}
		}
	});

	$("#right").empty();
}
// APOD image function begins
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
// APOD image function ends

//NASA Image function begins
var photoURL = "https://images-api.nasa.gov/search?q=ingenuity&description=ingenuity&media_type=image"
function getPhoto() {
    $.ajax({
        url:photoURL,
        method:"GET",
    }).then(function(data) {
        console.log(data);
        var photoPull = data.collection.items[5
		].links[0].href;
        console.log(photoPull);
        $("#img").attr("src", photoPull);
        
    });
}
getPhoto();
//NASA Image function ends
// donate function starts
function donations() {
	var donations = document.querySelector('#donations');
	var form = document.querySelector('form');
	var nameInput = document.querySelector('#name');
	var amountInput = document.querySelector('#amount');
	var fail = document.querySelector('#fail');

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		var name = nameInput.value;
		var amount = amountInput.value;

		if (!amount || !name) {
			fail.setAttribute('style', "display: block;");
		} else {
			fail.setAttribute('style', "display: none;");
			donations.innerHTML += '<li>' + name + ' - $' + amount + '</li>';
			store();
		}
	}, false)

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
var key = "&page=1&api_key=PUxgro2fgT0RlNQ3CSy2X8Zxk0hbwxZoWFR2UPh3";
var nasa_api = "https://api.nasa.gov/mars-photos/api/v1";

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
		url: nasa_api + "/rovers/" + roverID + "/photos?sol=" + "62" + key,
		type: 'GET',
		error: function (data) {
			alert("An error has occured. See error message : " + data.responseText);
		},

		success:function(data) {
			console.log(data)
			currentRoverData = data;

			// set cameras 
			setCameras(roverID)
		}

	});
}


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
			camerasToSet = cameras.spirit; 
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
		url: nasa_api + "/rovers/" + roverID + "/photos?sol=" + "62" + key,
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
/* Popup 1 variables and Functions */
var popup = document.getElementById('popup-one')
var popupBtn = document.getElementById('btn-1')
var closeBtn = document.getElementsByClassName('close-btn')[0]
window.addEventListener('click', clickOutOne);

popupBtn.addEventListener('click', openPopup);

function openPopup(){
	popup.style.display = 'block';
}
closeBtn.addEventListener('click', closePopup)

function closePopup(){
	popup.style.display = 'none'
}
function clickOutOne(e){
	if(e.target == popup)
	popup.style.display = 'none'
}
/* Popup Variables and Functions for Popup 2 */

var popupTwo = document.getElementById('popup-two')
var popupBtnTwo = document.getElementById('btn-2')
var closeBtnTwo = document.getElementsByClassName('close-btn')[1]
window.addEventListener('click', clickOutTwo);

popupBtnTwo.addEventListener('click', openPopupTwo);

function openPopupTwo(){
	popupTwo.style.display = 'block'
}
closeBtnTwo.addEventListener('click', closePopupTwo)

function closePopupTwo(){
	popupTwo.style.display = 'none'
}
function clickOutTwo(e){
	if(e.target == popupTwo)
	popupTwo.style.display = 'none'
}
/* Popup Variables and Funcions for Popup 3 */
var popupThree = document.getElementById('popup-three')
var popupBtnThree = document.getElementById('btn-3')
var closeBtnThree = document.getElementsByClassName('close-btn')[2]
window.addEventListener('click', clickOutThree);

popupBtnThree.addEventListener('click', openPopupThree);

function openPopupThree(){
	popupThree.style.display = 'block'
}
closeBtnThree.addEventListener('click', closePopupThree)

function closePopupThree(){
	popupThree.style.display = 'none'
}
function clickOutThree(e){
	if(e.target == popupThree)
	popupThree.style.display = 'none'
}
/* Popup Variables and Functions for Popup 4 */
var popupFour = document.getElementById('popup-four')
var popupBtnFour = document.getElementById('btn-4')
var closeBtnFour = document.getElementsByClassName('close-btn')[3]
window.addEventListener('click', clickOutFour);

popupBtnFour.addEventListener('click', openPopupFour);

function openPopupFour(){
	popupFour.style.display = 'block'
}
closeBtnFour.addEventListener('click', closePopupFour)

function closePopupFour(){
	popupFour.style.display = 'none'
}
function clickOutFour(e){
	if(e.target == popupFour)
	popupFour.style.display = 'none'
}
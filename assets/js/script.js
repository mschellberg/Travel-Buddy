// Setting up the map - Map A
function initMap() {
    var philadelphia = new google.maps.LatLng(39.9526, -75.1652);
        //infowindow = new google.maps.InfoWindow();
        map = new google.maps.Map(
        document.getElementById('map'), {center: philadelphia, zoom:13});

        var marker = new google.maps.Marker({
            position: philadelphia,
            map: map,
            draggable: true
    });
// Map A Search Box
    var input = document.getElementById("autocomplete");
    var searchBox = new google.maps.places.SearchBox(input);
    

    google.maps.event.addListener(searchBox, 'places_changed', function(){
        var places = searchBox.getPlaces();
// Location search appears in the title element
        var srcLocation = $(input).val();
        $("#locationTitle").text(srcLocation);
        //saveLocation(location);

        var bounds = new google.maps.LatLngBounds ();
        for(i=0; place=places[i];i++){
            bounds.extend(place.geometry.location);
            marker.setPosition(place.geometry.location);
    }
        map.fitBounds(bounds);
        map.setZoom(15);
    });


// Map B
    var philadelphia2 = new google.maps.LatLng(39.9526, -75.1652);
    map2 = 
    new google.maps.Map(
        document.getElementById('map2'), {center: philadelphia2, zoom:13});

        var marker2 = new google.maps.Marker({
            position: philadelphia2,
            map: map2,
            draggable: true
        });
// Map B Search Box
    var input2 = document.getElementById("autocomplete2");
    var searchBox2 = new google.maps.places.SearchBox(input2);
    
    google.maps.event.addListener(searchBox2, 'places_changed', function(){
        var places2 = searchBox2.getPlaces();
        destinationLocation = $(input2).val();
        
        $("#locationTitle2").text(destinationLocation);
        
        var bounds2 = new google.maps.LatLngBounds ();
        for(i=0; place=places2[i];i++){
            bounds2.extend(place.geometry.location);
            marker2.setPosition(place.geometry.location);
        }

        map2.fitBounds(bounds2);
        map2.setZoom(15);
        event.preventDefault();
});
}
/*
// Local Storage
function saveLocation(locationString) {
    window.localStorage.setItem("lastLocation", locationString);
}

function getLocation() {
    var lastLocation = window.localStorage.getItem("lastLocation");
    if (lastLocation != null) {
        return lastLocation;
    } else {
        return "";
    }
}*/


//var for the form: <form> and <input> elements
var userFormOneEl = document.querySelector(".user-form-one");
var weatherContainerEl = document.querySelector("#weather-container-one");
var weatherSearchTerm = document.querySelector("#weather-search-term-one");
var destinationOneInputEl = document.querySelector("#autocomplete");
var currentCityTemp = document.getElementById("current-city-temp");
var currentCityWindSpeed = document.getElementById("current-city-wind");
var currentCityHumidity = document.getElementById("current-city-humidity");
//below is for Weather B
var userFormTwoEl = document.querySelector("#user-form-two");
var weatherContainerTwoEl = document.querySelector("#weather-container-two");
var weatherSearchTermTwo = document.querySelector("#weather-search-term-two");
var destinationTwoInputEl = document.querySelector("#autocomplete2");
var currentCityTempTwo = document.getElementById("current-city-temp-two");
var currentCityWindSpeedTwo = document.getElementById("current-city-wind-two");
var currentCityHumidityTwo = document.getElementById("current-city-humidity-two");

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});


//to be executed upon a form submission browser event 
var formSubmitHandler = function(event) {
  event.preventDefault();
  //get value from input element
  var city = destinationOneInputEl.value.trim();
  if(city) {
    getUserCity(city); //if there is a value, the value is passed to getUserCity function as argument 
    destinationOneInputEl.value=""; //clears form
  } /*else {
    alert("Please enter a city and state")
    return;
  };*/

};

//Weather B

//to be executed upon a form submission browser event 
var formSubmitHandlerTwo = function(event) {
  event.preventDefault();
  //get value from input element
  var city = destinationTwoInputEl.value.trim();
  if(city) {
    getUserCityTwo(city); //if there is a value, the value is passed to getUserCity function as argument 
    destinationTwoInputEl.value=""; //clears form
  } /*else {
    alert("Please enter a city and state")
    return;
  };*/
};



var getUserCity = function(city, state) {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&units=imperial&appid=6a22242f54371d060e263ed6f93748a9")
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
      displayCurrentWeather(data)
       console.log(data);
      });
    } /*else {
      alert("Error!");
    }*/
})
/*.catch(function(error) {
  alert("unable to connect to Weather App");
});*/
};

//Weather B
var getUserCityTwo = function(city, state) {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&units=imperial&appid=6a22242f54371d060e263ed6f93748a9")
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
      displayCurrentWeatherTwo(data)
      });
    } /*else {
      alert("Error!");
    }*/
})
/*.catch(function(error) {
  alert("unable to connect to Weather App");
});*/
};



var displayCurrentWeather =function (weatherData) {


  var iconUrl = "https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";

  
  weatherSearchTerm.innerHTML = weatherData.name + '<img src="' + iconUrl + '">' 
   currentCityWindSpeed.innerHTML =  weatherData.wind.speed 
   currentCityHumidity.innerHTML = weatherData.main.humidity 
   currentCityTemp.innerHTML = weatherData.main.temp 

   
 };

 var displayCurrentWeatherTwo =function (weatherData) {

  var iconUrl = "https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";

  
  weatherSearchTermTwo.innerHTML = weatherData.name + '<img src="' + iconUrl + '">' 
   currentCityWindSpeedTwo.innerHTML =  weatherData.wind.speed 
   currentCityHumidityTwo.innerHTML = weatherData.main.humidity 
   currentCityTempTwo.innerHTML = weatherData.main.temp 
   

   
 };
 
//event listeners
userFormOneEl.addEventListener("submit", formSubmitHandler);
//userFormTwoEl.addEventListener("submit", formSubmitHandlerTwo);

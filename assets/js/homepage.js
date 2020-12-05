//var for the form: <form> and <input> elements
var userFormOneEl = document.querySelector("#user-form-one");
var userFormTwoEl = document.querySelector("#user-form-two");
var weatherContainerEl = document.querySelector("#weather-container-one");
var weatherSearchTerm = document.querySelector("#weather-search-term-one");
var destinationOneInputEl = document.querySelector("#destination-one");
var currentCityTitle = document.getElementById("current-city-title");
var currentCityTemp = document.getElementById("current-city-temp");
var currentCityUvIndex = document.getElementById("uv-index");
var currentCityWindSpeed = document.getElementById("current-city-wind");
var currentCityHumidity = document.getElementById("current-city-humidity");
var currentCityUvIndex = document.getElementById("uv-index");



//to be executed upon a form submission browser event 
var formSubmitHandler = function(event) {
  event.preventDefault();
  //get value from input element
  var city = destinationOneInputEl.value.trim();
  if(city) {
    getUserCity(city); //if there is a value, the value is passed to getUserCity function as argument 
    destinationOneInputEl.value=""; //clears form
  } else {
    alert("Please enter a city and state")
    return;
  };
};


var getUserCity = function(city, state) {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&units=imperial&appid=6a22242f54371d060e263ed6f93748a9")
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
      displayCurrentWeather(data)
       console.log(data);
      });
    } else {
      alert("Error!");
    }
})
.catch(function(error) {
  alert("unable to connect to Weather App");
});
};



var displayCurrentWeather =function (weatherData) {

  // had to get Icon url seperately from data 

  var iconUrl = "https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";

  
  weatherSearchTerm.innerHTML = weatherData.name + '<img src="' + iconUrl + '">' 
   currentCityWindSpeed.innerHTML =  weatherData.wind.speed 
   currentCityHumidity.innerHTML = weatherData.main.humidity 
   currentCityTemp.innerHTML = weatherData.main.temp 

   
 };

//event listener to userFormEl
userFormOneEl.addEventListener("submit", formSubmitHandler);
//event listener to userFormEl
//userFormTwoEl.addEventListener("submit", formSubmitHandler);
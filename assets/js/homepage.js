//var for the form: <form> and <input> elements
var userFormOneEl = document.querySelector("#user-form-one");
var weatherContainerEl = document.querySelector("#weather-container-one");
var weatherSearchTerm = document.querySelector("#weather-search-term-one");
var destinationOneInputEl = document.querySelector("#destination-one");
var currentCityTemp = document.getElementById("current-city-temp");
var currentCityWindSpeed = document.getElementById("current-city-wind");
var currentCityHumidity = document.getElementById("current-city-humidity");
//below is for Weather B
var userFormTwoEl = document.querySelector("#user-form-two");
var weatherContainerTwoEl = document.querySelector("#weather-container-two");
var weatherSearchTermTwo = document.querySelector("#weather-search-term-two");
var destinationTwoInputEl = document.querySelector("#destination-two");
var currentCityTempTwo = document.getElementById("current-city-temp-two");
var currentCityWindSpeedTwo = document.getElementById("current-city-wind-two");
var currentCityHumidityTwo = document.getElementById("current-city-humidity-two");


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

//Weather B

//to be executed upon a form submission browser event 
var formSubmitHandlerTwo = function(event) {
  event.preventDefault();
  //get value from input element
  var city = destinationTwoInputEl.value.trim();
  if(city) {
    getUserCityTwo(city); //if there is a value, the value is passed to getUserCity function as argument 
    destinationTwoInputEl.value=""; //clears form
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

//Weather B
var getUserCityTwo = function(city, state) {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&units=imperial&appid=6a22242f54371d060e263ed6f93748a9")
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
      displayCurrentWeatherTwo(data)
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
userFormTwoEl.addEventListener("submit", formSubmitHandlerTwo);
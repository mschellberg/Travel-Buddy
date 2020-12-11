

$(document).ready(function() {
    var returnVisit = localStorage.getItem('returnVisit');
    if (returnVisit== null) {
        localStorage.setItem('returnVisit', 1);
  
        $("#welcome").addClass("is-active");
    };
  });
  
var generalPlaces = [];
var marker = {};
var bounds = {};
var generalPlaces2 = [];
var bound2 = [];
var marker2 = [];


  // Setting up the map - Map A
  function initMap() {
    var philadelphia = new google.maps.LatLng(39.9526, -75.1652);
        infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(
        document.getElementById('map'), {center: philadelphia, zoom:13});
  
            marker = new google.maps.Marker({
            position: philadelphia,
            map: map,
            draggable: true
        });

// Map A Search Box
var input = document.getElementById("autocomplete");
var searchBox = new google.maps.places.SearchBox(input);
console.log(input)

google.maps.event.addListener(searchBox, 'places_changed', function(){
    
    var places = this.getPlaces();
    console.log(generalPlaces, 'goodbye');
    generalPlaces = places;
   console.log(generalPlaces, 'hello world');

    bounds = new google.maps.LatLngBounds ();
 
    

    
});  

    
  // Map B
    var philadelphia2 = new google.maps.LatLng(39.9526, -75.1652);
    map2 = 
    new google.maps.Map(
        document.getElementById('map2'), {center: philadelphia2, zoom:13});
  
            marker2 = new google.maps.Marker({
            position: philadelphia2,
            map: map2,
            draggable: true
        });
  // Map B Search Box
    var input2 = document.getElementById("autocomplete2");
    var searchBox2 = new google.maps.places.SearchBox(input2);
    console.log(input + 'hello')
    google.maps.event.addListener(searchBox2, 'places_changed', function(){
        var places2 = this.getPlaces();
        console.log(generalPlaces2, 'goodbye');
        generalPlaces2 = places2;

   
        
        bounds2 = new google.maps.LatLngBounds ();
        
  });


  
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
}
  
  //var for the form: <form> and <input> elements
  var userFormOneEl = document.querySelector(".user-form-one");
  var weatherContainerEl = document.querySelector("#weather-container-one");
  var weatherSearchTerm = document.querySelector("#weather-search-term-one");
  var destinationOneInputEl = document.querySelector("#autocomplete");
  
  //FORECAST
  var forecastCardsEl= document.getElementById("forecast-cards");
  var forecastCardsTwoEl= document.getElementById("forecast-cards-two");
  //below is for Weather B
  var userFormTwoEl = document.querySelector(".user-form-two");
  var weatherContainerTwoEl = document.querySelector("#weather-container-two");
  var weatherSearchTermTwo = document.querySelector("#weather-search-term-two");
  var destinationTwoInputEl = document.querySelector("#autocomplete2");
  
  
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
    console.log(destinationOneInputEl.value + 'world');
    if(city) { 
        
    for(i=0; place=generalPlaces[i];i++){
        bounds.extend(place.geometry.location);
        marker.setPosition(place.geometry.location);
    }
    map.fitBounds(bounds);
    map.setZoom(15);
    

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

    for(i=0; place=generalPlaces2[i];i++){
        bounds2.extend(place.geometry.location);
        marker2.setPosition(place.geometry.location);
    }
    map2.fitBounds(bounds2);
    map2.setZoom(15);

  

    getUserCityTwo(city); //if there is a value, the value is passed to getUserCity function as argument 
    destinationTwoInputEl.value=""; //clears form
  } /*else {
    alert("Please enter a city and state")
    return;
  };*/
  };
  
  
  
  var getUserCity = function(city, state) {
  fetch("https://api.openweathermap.org/data/2.5/forecast/?q=" + city + "," + state + "&cnt=5&units=imperial&appid=6a22242f54371d060e263ed6f93748a9")
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
      displayCurrentWeather(data)
       console.log(data);
      });
    } 
  })
  
  };
  
  
  
  //Weather B
  var getUserCityTwo = function(city, state) {
  fetch("https://api.openweathermap.org/data/2.5/forecast/?q=" + city + "," + state + "&cnt=5&units=imperial&appid=6a22242f54371d060e263ed6f93748a9")
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
      displayCurrentWeatherTwo(data)
      });
    } 
  })
  
  };
  
  
  
  var displayCurrentWeather =function (weatherData) {
  forecastCardsEl.innerHTML = ''
  
    for (var i= 0;  i < weatherData.list.length; i+=8 ) {
  
      date =[moment().add(1,'days').format('L'),moment().add(2,'days').format('L'),moment().add(3,'days').format('L'),moment().add(4,'days').format('L'),moment().add(5,'days').format('L')]
  
      for(vari=0; i<date.length; i++){
  
  
        var forecastiIconUrl = "https://openweathermap.org/img/w/" + weatherData.list[i].weather[0].icon + ".png";
  
        var div = document.createElement("div")
        div.classList.add("column")
  
                      
        var innerHtml = 
        '<div class="columns">' + 
        '<div class="column">' + 
       '<div class="card">' + 
          '<div class="card-body has-background-info has-text-white"">' +
              '<center>' +
              '<h5 class="card-title is-size-5">'+ date[i] +'</h5>' +
              '<p class="card-text"><img src="' + forecastiIconUrl + '"></p>' + 
              '<p class="card-text"><b>High:</b> '+weatherData.list[i].main.temp_max+' °F</p>' +
              '<p class="card-text"><b>Low:</b> '+weatherData.list[i].main.temp_min+' °F</p>' +
             '<p class="card-text"><b>Humidity:</b> '+weatherData.list[i].main.humidity+'%</p>' +
             '<p class="card-text"><b>Wind Speed:</b> '+weatherData.list[i].wind.speed+' MPH</p>' +
            '</div>' +
        '</div>'
  
        div.innerHTML = innerHtml
       forecastCardsEl.appendChild(div)
      }; 
    };
  };
  
  
  var displayCurrentWeatherTwo =function (weatherData) {
    forecastCardsTwoEl.innerHTML = ''
  
    for (var i= 0;  i < weatherData.list.length; i+=8 ) {
  
      date =[moment().add(1,'days').format('L'),moment().add(2,'days').format('L'),moment().add(3,'days').format('L'),moment().add(4,'days').format('L'),moment().add(5,'days').format('L')]
  
      for(vari=0; i<date.length; i++){
  
  
        var forecastiIconUrl = "https://openweathermap.org/img/w/" + weatherData.list[i].weather[0].icon + ".png";
  
        var div = document.createElement("div")
        div.classList.add("column")
  
                      
        var innerHtml = 
        '<div class="columns">' + 
        '<div class="column">' + 
       '<div class="card">' + 
          '<div class="card-body has-background-info has-text-white">' +
              '<center>' +
              '<h5 class="card-title is-size-5">'+ date[i] +'</h5>' +
              '<p><img src="' + forecastiIconUrl + '"></p>' + 
              '<p><b>High:</b> '+weatherData.list[i].main.temp_max+' °F</p>' +
              '<p><b>Low:</b> '+weatherData.list[i].main.temp_min+' °F</p>' +
             '<p><b>Humidity:</b> '+weatherData.list[i].main.humidity+'%</p>' +
             '<p><b>Wind Speed:</b> '+weatherData.list[i].wind.speed+' MPH</p>' +
            '</div>' +
        '</div>'
  
        div.innerHTML = innerHtml
       forecastCardsTwoEl.appendChild(div)
      }; 
    };
  };
  
  //event listeners
  userFormOneEl.addEventListener("mouseenter", formSubmitHandler);
  userFormTwoEl.addEventListener("mouseenter", formSubmitHandlerTwo);
  userFormOneEl.addEventListener("submit", formSubmitHandler);
  userFormTwoEl.addEventListener("submit", formSubmitHandlerTwo);
  
  // Modal
  /*$(document).ready(function() {
    var returnVisit = localStorage.getItem('returnVisit');
    if (returnVisit== null) {
        localStorage.setItem('returnVisit', 1);
        $("#welcome").addClass("is-active");
    };
  });*/
  
  
  // Get started button pre-loading location values
  $("#start").click(function() {
    $("#welcome").removeClass("is-active")
    var inputOne = $("#location-1");
    localStorage.setItem("location1", inputOne.val());
    var inputTwo = $("#location-2");
    localStorage.setItem("location2", inputTwo.val());
  
    
    // Push first location to map
    $("#autocomplete").val(localStorage.getItem('location1'));
  
    // Map 1 Search Box
    $("#plan").trigger('click')
  
  
    // Push second location to second map
    $("#autocomplete2").val(localStorage.getItem('location2'));
    // Map 2 Search Box
    $("#plan2").trigger('click')
  });
  
  $("#cancel").click(function() {
    $("#welcome").removeClass("is-active")

  });

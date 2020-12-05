// Setting up the map
function initMap() {
    var philadelphia = new google.maps.LatLng(39.9526, -75.1652);
        infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(
        document.getElementById('map'), {center: philadelphia, zoom:8});

        var marker = new google.maps.Marker({
            position: philadelphia,
            map: map,
            draggable: true
        });
        

// Search Box for location
    const input = document.getElementById("autocomplete");
    console.log("searchBox", input);
    const searchBox = new google.maps.places.SearchBox(input);

    
    google.maps.event.addListener(searchBox, 'places_changed', function(){
        var places = searchBox.getPlaces();
        // Location search appears in the title element
        $("#locationTitle").text(input.val());
        var bounds = new google.maps.LatLngBounds ();
        var i, place;
        for(i=0; place=places[i];i++){
            bounds.extend(place.geometry.location);
            marker.setPosition(place.geometry.location);
        }

        map.fitBounds(bounds);
        map.setZoom(15);
    });

};




    
var flagStop = true;
var map = null;
var flightPath = null;

let startGps = function () {
    flagStop = true;
    if (navigator.geolocation) {
        loopPos();
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
    
}

function loopPos() {
    if (!flagStop) return;
    navigator.geolocation.getCurrentPosition(sendPos);
    setTimeout(loopPos, 5000);
    initMap(sendPos)
}

function sendPos(position) {
    var http = new XMLHttpRequest();
    http.open("POST", "/location", true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            console.log("result " + http.responseText);
        }
    }
    http.setRequestHeader("authorization", localStorage.getItem("tokenGeolocator"));
    http.send(JSON.stringify({
        gpsLatitud: position.coords.latitude,
        gpsLongitud: position.coords.longitude,
    }));


}

function stopGps() {
    flagStop = false;
}

function clearMap() {
    stopGps();
    if(flightPath != null){
        flightPath.setMap(null);
    }
}

function initMap(gpsInfo) {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 20,
        center: { lat: gpsInfo[0].gpsLatitud,
            lng: gpsInfo[0].gpsLongitud }
    });
    var flightPlanCoordinates = [];
    for (var i = 0; i < gpsInfo.length; i++) {
        flightPlanCoordinates.push({ lat: gpsInfo[i].gpsLatitud, lng: gpsInfo[i].gpsLongitud })
    }
    flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    flightPath.setMap(map);
    map.setCenter(pos);
    map.setZoom(18);
    placeMarker(pos,map);
}

function showValues(){
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("GET", "/locations", true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            if(http.response.gpsInfo.length != 0){
                document.getElementById("map").innerHTML = JSON.stringify(http.response.gpsInfo);
            }else{
                console.log("empty route")
            }
        }
    }
    http.setRequestHeader("authorization", localStorage.getItem("tokenGeolocator"));
    http.send();
}

function placeMarker(position, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
    map.panTo(position);
}
var flagStop = true;
var map = null;
var flightPath = null;

let start = function () {
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
}

function sendPos(position) {
    var http = new XMLHttpRequest();
    http.open("POST", "/location", true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            if(http.response.gpsInfo.length != 0){
                initMap2(http.response.gpsInfo)
            }else{
                console.log("Ruta vacía")
            }
        }
    }
    http.setRequestHeader("authorization", localStorage.getItem("tokenGeolocator"));
    http.send(JSON.stringify({
        gpsLatitud: position.coords.latitude,
        gpsLongitud: position.coords.longitude,
    }));
}

function stop() {
    flagStop = false;
}

function initMap2(gpsInfo) {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 20,
        center: { lat: gpsInfo[0].gpsLatitud,
            lng: gpsInfo[0].gpsLongitud }
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
            lat: gpsInfo[0].gpsLatitud,
            lng: gpsInfo[0].gpsLongitud}
    map.setCenter(pos);
    map.setZoom(18);
    placeMarker(pos,map);
    ;});}
}

function initMap(){
    map =  new google.maps.Map(document.getElementById('map'), {zoom: 4});
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude}
    map.setCenter(pos);
    map.setZoom(18);
    placeMarker(pos,map);
    ;});}
}

function verRutas(){
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("GET", "/locations", true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            if(http.response.gpsInfo.length != 0){
                var DatosJson = JSON.parse(JSON.stringify(http.response.gpsInfo));
                $('#Table').append('<caption>Rutas</caption>');
                $("#Table").append('<tr><th>Latitud</th>'+
                '<th>Longitud</th>' + 
                '<th>Hora</th>' +
                '<th>Fecha</th></tr>');
                for (i = 0; i < DatosJson.length; i++){

            $("#Table").append('<tr>' + 
                '<td>' + DatosJson[i].gpsLatitud + '</td>'+
                '<td>' + DatosJson[i].gpsLongitud + '</td>'+
                '<td>' + DatosJson[i].hora + '</td>'+
                '<td>' + DatosJson[i].fecha + '</td>'+'</tr>');
    }
            }else{
                console.log("Ruta vacía")
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
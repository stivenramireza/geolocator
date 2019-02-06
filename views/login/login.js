let login = function () {
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("POST", "/login", true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            localStorage.setItem("tokenGeolocator", http.response.token);
            window.location.replace('/profile/profile.html')
        }
    }

    http.send(JSON.stringify({ username: document.getElementById("username").value, 
    password: document.getElementById("password").value }));

}

let changeToSingup = function () {
    window.location.replace('/signup/signup.html')
}
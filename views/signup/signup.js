let signup = function () {
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("POST", "/signup", true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            localStorage.setItem("tokenGeolocator", http.response.token);
            window.location.replace('/profile/profile.html')
        }
        
    }


    http.send(JSON.stringify({
        displayName: document.getElementById("displayNameSing").value,
        username: document.getElementById("nameSing").value,
        email: document.getElementById("emailSing").value,
        password: document.getElementById("passwordSing").value
    }));

}

let changeToLogin = function () {
    window.location.replace('/login/login.html')
}
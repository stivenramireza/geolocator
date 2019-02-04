let signup = function () {
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("POST", "/signup", true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            localStorage.setItem("geolocatortoken", http.response.token);
            window.location.replace('/profile/profile.html')
        }
        
    }


    http.send(JSON.stringify({
        displayName: document.getElementById("displayName").value,
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }));

}

let changeToLogin = function () {
    window.location.replace('/login/login.html')
}
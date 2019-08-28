$(document).ready(function () {
    $("#gWrapper").show();

    getLocation();
    $("#gWrapper").hide();
    $("#celcbtn").hide();
});


var loader = $("#local");
var weather = $("#weather");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        loader.html = "Geolocation is not supported by this browser.";
    }
    console.log("hello");
};

function showPosition(position) {
    var html = "";
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    html += "Latitude: " + lat + "<br>Longitude: " + long;
    $(loader).html(html);

    getWeather(long, lat);
}

var getWeather = function (long, lat) {
    // $("#gWrapper").show();
    var url =
        "https://fcc-weather-api.glitch.me/api/current?&lat=" +
        lat.toFixed() +
        "&lon=" +
        long.toFixed();

    $.ajax({
        url: url,
        crossDomain: true,
        dataType: "jsonp",
        success: function (result) {
            temp = result.main.temp;

            $("#local2").html(result.name);

            $("#line1").html(result.weather[0].description);
            $(".icon").attr("src", result.weather[0].icon);
            $("#weather").text(temp.toFixed());



            $("#gWrapper").hide();

           
        }
    });
    $("#celcbtn").click(function () {
        var faren = ((temp * 1.8) + 32).toFixed();
        var celc = temp.toFixed();

        $("#weather").text(celc);
        $("#celc").text("C");
        $(this).hide();
        $("#faren").show();
    });

    $("#faren").click(function () {
        var celc = temp;
        var faren = ((temp * 1.8) + 32).toFixed();
        $("#weather").text(faren);
        $("#celc").text("F");
        $(this).hide();
        $("#celcbtn").show();
    });
};
function myApp() {
    // $("#gWrapper").show();

            getLocation();
            $("#gWrapper").hide();
            $("#celcbtn").hide();



        var loader = $("#local");
        var weather = $("#weather");

        function getLocation() {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, error);

            } else {

                loader.html = "Geolocation is not supported by this browser.";
            }

        };
            function showPosition(position) {
                var html = "";
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                html += "Latitude: " + lat + "<br>Longitude: " + long;
              //  $(loader).html(html);
               // console.log(position);

                getWeather(long, lat);
            }
            function error(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
              };

    var getWeather = function (long, lat) {

        // $("#gWrapper").show();
        var key = "d74714e96875738b320436fefff33ab9"
        var url =
            "api.openweathermap.org/data/2.5/weather&lat=" +
            lat.toFixed() +
            "&lon=" +
            long.toFixed() +
            "&APPID="+ key;
console.log(url);
        $.ajax({
            url: url,
            crossDomain: true,
            dataType: "jsonp",
            success: function (result) {
                // temp = result.main.temp;

                // $("#local2").html(result.name);

                // $("#line1").html(result.weather[0].description);
                // $(".icon").attr("src", result.weather[0].icon);
                // $("#weather").text(temp.toFixed());



                // $("#gWrapper").hide();

            console.log(result);
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
};

module.exports = myApp;   
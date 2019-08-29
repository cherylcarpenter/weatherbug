function myApp() {
    var Inputmask = require('inputmask');

    $("#forecast").hide();


    maskInput();

   function maskInput(){
    var selector = document.getElementById("submitZip");
    var im = new Inputmask("99999");
    im.mask(selector);

    
    };
    

    global.getWeather = function (zip){
        var key = "d74714e96875738b320436fefff33ab9"
        var url =
            "http://api.openweathermap.org/data/2.5/weather?zip="+
            zip+",us" +
            "&APPID=" + key +"&units=imperial";

            $.ajax({
                url: url,
                crossDomain: true,
                dataType: "jsonp",
                success: function (result) {
                    var temp = result.main.temp;
                    var iconUrl = "https://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";
     
                    $("#line1").html(result.weather[0].description);
                    $(".icon").attr("src", iconUrl);
                    
                    $("#weather").text(temp.toFixed());
                    $("#intro").hide();
                    $("#submitWrapper").hide();
                    $("#forecast").show();
                   // console.log(result);
                }
            });
        
    };
};





module.exports = myApp;   
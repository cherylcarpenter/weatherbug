function myApp() {
    // $("#gWrapper").show();

    //getLocation();
    $("#gWrapper").hide();
    $("#celcbtn").hide();
    

    $("#forecast").hide();


    maskInput();

   function maskInput(){
       
    $(document.getElementById("#submitZip")).inputmask("99999",{autoclear: false});

    };
    

    global.getWeather = function (zip){
        // $("#gWrapper").show();
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
                    var iconUrl = "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";
     
                    $("#line1").html(result.weather[0].description);
                    $(".icon").attr("src", iconUrl);
                    
                    $("#weather").text(temp.toFixed());
                    $("#intro").hide();
                    $("#submitWrapper").hide();
                    $("#forecast").show();


                    $("#gWrapper").hide();
                    console.log(result);
                }
            });
           
    
  

    };
 
};





module.exports = myApp;   
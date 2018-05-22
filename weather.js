$("#myCarousel").hide();

document.getElementById("searching").focus();

$("#submitBtn").on("click", function () {
    var searching = $("#searching").val();
    //        console.log(searching);
    getCity(searching);
    $("#explanation").remove();
});

var searchingBar = document.getElementById("searching");
searchingBar.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        var searching = $("#searching").val();
        //            console.log(searching);
        getCity(searching);
        $("#explanation").remove();
    };
});

$("#createFavourite").on("click", function () {
    var favouriteCity = $("#searching").val();
    //        console.log(favouriteCity);
    var buttonFavouriteCity = document.createElement("button");
    buttonFavouriteCity.setAttribute("class", "btn fav-bar");
    buttonFavouriteCity.innerHTML = favouriteCity;

    document.getElementById("listCities").appendChild(buttonFavouriteCity);

});


$(document).on("click", ".fav-bar", function () {
    var searching = $(this).text();
    //        console.log(searching);
    getCity(searching);
    $("#explanation").remove();
});


function getCity(searching) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searching + "&APPID=792c99e72789a093340e9fefbcd1f2fc",

        success: function (weather) {
            $("#myCarousel").show();
            //                console.log(weather);

            var nameCityTitle = weather.city.name;
            $("#cityNameTitle").html("<h1>" + nameCityTitle + "'s weather" + "</h1>");

            imageInfo(weather, 0, "cardZero", "#imageZero");
            imageInfo(weather, 1, "cardOne", "#imageOne");
            imageInfo(weather, 2, "cardTwo", "#imageTwo");
            imageInfo(weather, 3, "cardThree", "#imageThree");
            imageInfo(weather, 4, "cardFour", "#imageFour");
            imageInfo(weather, 5, "cardFive", "#imageFive");

        },
        error: function () {
            var errorMessage = document.createElement("h2");
            errorMessage.append("Ooops! Is that a valid city? Try again!");
            document.getElementById("cityNameTitle").innerHTML = '';
            document.getElementById("cityNameTitle").appendChild(errorMessage);

        }

    });
};



function imageInfo(weather, x, cardNumber, imageNumber) {

    var clearCards = document.getElementById(cardNumber);
    clearCards.innerHTML = '';

    var coordLat = weather.city.coord.lat;
    var coordLon = weather.city.coord.lon;
    var coordinates = coordLat.toString() + " , " + coordLon.toString();

    var country = weather.city.country;

    var temperature = weather.list[x].main.temp - 273.15;
    var temp = temperature.toFixed(1);

    var weatherDescrip = weather.list[x].weather[0].description;

    var date = weather.list[x].dt_txt;

    var maxTemp = weather.list[x].main.temp_max - 273.15;
    var tempMax = maxTemp.toFixed(1);

    var minTemp = weather.list[x].main.temp_min - 273.15;
    var tempMin = minTemp.toFixed(1)

    var wind = weather.list[x].wind.speed;
    var speed = wind * 1.852;
    var windSpeed = speed.toFixed(2);

    var humidity = weather.list[x].main.humidity;

    var pressure = weather.list[x].main.pressure;


    var weatherIcon = weather.list[x].weather[0].icon;
    //                    console.log(weatherIcon);

    showBackgroundImage(weatherIcon, imageNumber);


    var p = document.createElement("p");
    p.innerHTML = date;
    document.getElementById(cardNumber).appendChild(p);

    var p = document.createElement("p");
    p.innerHTML = weatherDescrip;
    document.getElementById(cardNumber).appendChild(p);

    var p = document.createElement("p");
    p.innerHTML = "Temp: " + temp + "&#8451;";
    document.getElementById(cardNumber).appendChild(p);

    var p = document.createElement("p");
    p.innerHTML = "T.Max: " + tempMax + "&#8451;" + " | T.Min: " + tempMin + "&#8451;";
    document.getElementById(cardNumber).appendChild(p);

    var p = document.createElement("p");
    p.innerHTML = "Wind: " + windSpeed + "Km/h";
    document.getElementById(cardNumber).appendChild(p);

    var p = document.createElement("p");
    p.innerHTML = "Hum: " + humidity + "%" + " | Press: " + pressure + "Bar";;
    document.getElementById(cardNumber).appendChild(p);

};



function showBackgroundImage(weatherIcon, imageNumber) {
    if ((weatherIcon == "11d") || (weatherIcon == "11n")) {
        $(imageNumber).attr("src", "Imatges/heavyRain1.jpg");

    } else if ((weatherIcon == "09d") || (weatherIcon == "09n")) {
        $(imageNumber).attr("src", "Imatges/heavyRainUmbrella.jpg");

    } else if ((weatherIcon == "10d") || (weatherIcon == "10n")) {
        $(imageNumber).attr("src", "Imatges/rainny.jpg");

    } else if ((weatherIcon == "13d") || (weatherIcon == "13n")) {
        $(imageNumber).attr("src", "Imatges/snowingDraw.jpg");

    } else if ((weatherIcon == "01d") || (weatherIcon == "01n")) {
        $(imageNumber).attr("src", "Imatges/sunnyCity.jpg");

    } else if ((weatherIcon == "02d") || (weatherIcon == "02n") || (weatherIcon == "03d") || (weatherIcon == "03n") || (weatherIcon == "04d") || (weatherIcon == "04n")) {
        $(imageNumber).attr("src", "Imatges/cloudy.jpg");

    } else if ((weatherIcon == "50d") || (weatherIcon == "50n")) {
        $(imageNumber).attr("src", "Imatges/danger.jpg");
    };
}

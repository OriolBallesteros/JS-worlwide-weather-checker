$("#myCarousel").hide();

document.getElementById("searching").focus();

//click on -- fire search
$("#submitBtn").on("click", function () {
    searchEvent();
});

//click Enter -- fire search
var searchingBar = document.getElementById("searching");
searchingBar.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        searchEvent();
    };
});

function searchEvent() {
    var searching = $("#searching").val();
    getCity(searching);
    $("#explanation").remove();
    $("#searching").val('');
}

//API call
function getCity(searching) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searching + "&APPID=792c99e72789a093340e9fefbcd1f2fc",

        success: function (weather) {
            $("#myCarousel").show();

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


//Functions root
function imageInfo(weather, x, cardNumber, imageNumber) {

    var clearCards = document.getElementById(cardNumber);
    clearCards.innerHTML = '';

    var values = valuesPicked(weather, x);

    showBackgroundImage(values.weatherIcon, imageNumber);

    printData(values.date, cardNumber);
    printData(values.weatherDescrip, cardNumber);
    printData("Temp: " + values.temp + "&#8451;", cardNumber);
    printData("T.Max: " + values.tempMax + "&#8451;" + " | T.Min: " + values.tempMin + "&#8451;", cardNumber);
    printData("Wind: " + values.windSpeed + "Km/h", cardNumber);
    printData("Hum: " + values.humidity + "%" + " | Press: " + values.pressure + "Bar", cardNumber);
};

//set all info into variables
function valuesPicked(weather, x){
    return {
        date: weather.list[x].dt_txt,
        weatherDescrip: weather.list[x].weather[0].description,
        temp: (weather.list[x].main.temp - 273.15).toFixed(1),
        tempMax:(weather.list[x].main.temp_max - 273.15).toFixed(1),
        tempMin: (weather.list[x].main.temp_min - 273.15).toFixed(1),
        windSpeed: (weather.list[x].wind.speed * 1.852).toFixed(2),
        humidity: weather.list[x].main.humidity,
        pressure: weather.list[x].main.pressure,
        weatherIcon: weather.list[x].weather[0].icon
    }
};

//set correct image
function showBackgroundImage(weatherIcon, imageNumber) {
    switch (weatherIcon) {
        case '11d' || '11n':
            setImageNumberAttr("Imatges/heavyRain1.jpg", imageNumber);
            break;

        case '09d' || '09n':
            setImageNumberAttr("Imatges/heavyRainUmbrella.jpg", imageNumber);
            break;

        case '10d' || '10n':
            setImageNumberAttr("Imatges/rainny.jpg", imageNumber);
            break;

        case '13d' || '13n':
            setImageNumberAttr("Imatges/snowingDraw.jpg", imageNumber);
            break;

        case '01d' || '01n':
            setImageNumberAttr("Imatges/sunnyCity.jpg", imageNumber);
            break;

        case '02d' || '02n' || '03n' || '03d':
            setImageNumberAttr("Imatges/cloudy.jpg", imageNumber);
            break;

        case '50d' || '50n':
            setImageNumberAttr("Imatges/danger.jpg", imageNumber);
            break;
    }
};

//set attribute of the image
function setImageNumberAttr(image, imageNumber) {
    return $(imageNumber).attr("src", image);
};

//DOM info
function printData(print, cardNumber){
    var p = document.createElement("p");
    p.innerHTML = print;
    document.getElementById(cardNumber).appendChild(p);

};

//Add city to favourites list
$("#createFavourite").on("click", function () {
    var favouriteCity = $("#searching").val();
    var buttonFavouriteCity = document.createElement("button");
    buttonFavouriteCity.setAttribute("class", "btn fav-bar");
    buttonFavouriteCity.innerHTML = favouriteCity;

    document.getElementById("listCities").appendChild(buttonFavouriteCity);
});

//Search using favourites list
$(document).on("click", ".fav-bar", function () {
    var searching = $(this).text();
    getCity(searching);
    $("#explanation").remove();
});
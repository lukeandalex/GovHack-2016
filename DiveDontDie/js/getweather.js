var _PremiumApiBaseURL = 'http://api.worldweatheronline.com/premium/v1/';
var _PremiumApiKey;
_PremiumApiKey = 'd757720584d24a1b81a152906163007';

//Get Marine Weather Data
function JSONP_MarineWeather(input) {
    var url = _PremiumApiBaseURL + "marine.ashx?q=" + input.query +
        "&format=" + input.format +
        "&fx=" + input.fx +
        "&key=" + _FreeApiKey +
        "&tide=yes&";

    jsonP(url, input.callback);
}

// Helper
function jsonP(url, callback) {
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        contentType: "application/json",
        jsonpCallback: callback,
        dataType: 'jsonp',
        success: function (json) {
            console.dir('success');
        },
        error: function (e) {
            console.log(e.message);
        }
    });
}

var dateOutput = '';
var swellOutput = '';
var windOutput = '';
var windDirectionOutput = '';
var tideOutput = '';
var waterTemp = '';
var dateToString;
var dateToPass;
var cloudCover;

$(document).ready(function () {
    GetMarineWeather();

});


function GetMarineWeather(e) {

    var marineWeatherInput = {
        query: '31.93, 115.76',
        format: 'JSON',
        fx: '',
        callback: 'MarineWeatherCallback'
    };
    JSONP_MarineWeather(marineWeatherInput);
    e.preventDefault();
}

function MarineWeatherCallback(marineWeather) {
    var allDataToday = marineWeather.data.weather[0];
    dateOutput = allDataToday.date;
    swellOutput = allDataToday.hourly[2].swellHeight_m + "M";
    windDirectionOutput = allDataToday.hourly[2].winddir16Point;
    windOutput = allDataToday.hourly[2].windspeedKmph + "KM/h  " + windDirectionOutput;
    tideOutput = allDataToday.tides[0].tide_data[0].tideHeight_mt + "M";
    waterTemp = allDataToday.hourly[2].waterTemp_C + "°";
    cloudCover = allDataToday.hourly[2].cloudcover + "%";

    dateToPass = Date.parse(dateOutput);
    dateToString = dateToPass.toString("dddd MMMM yyyy");



    //$('#swell').empty();

    $('#conditionsDate').html(dateToString);
    $('#swell').html(swellOutput);
    $('#wind').html(windOutput);
    $('#tide').html(tideOutput);
    $('#waterTemp').html(waterTemp);
    $('#season').html(cloudCover);
}


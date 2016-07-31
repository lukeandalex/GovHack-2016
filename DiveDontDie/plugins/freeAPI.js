
var _FreeApiBaseURL = 'http://api.worldweatheronline.com/premium/v1/';
/*
    Please change the FreeAPIKey to your own. 
    These keys have been provided for testing only.
    If you don't have one, then register now: http://developer.worldweatheronline.com/member/register    
*/
var _FreeApiKey = 'd757720584d24a1b81a152906163007';

// -------------------------------------------

function JSONP_LocalWeather(input) {
    var url = _FreeApiBaseURL + 'weather.ashx?q=' + input.query + '&format=' + input.format + '&extra=' + input.extra + '&num_of_days=' + input.num_of_days + '&date=' + input.date + '&fx=' + input.fx + '&cc=' + input.cc + '&includelocation=' + input.includelocation + '&show_comments=' + input.show_comments + '&key=' + _FreeApiKey;

    jsonP(url, input.callback);
}

function JSONP_SearchLocation(input) {
    var url = _FreeApiBaseURL + "search.ashx?q=" + input.query + "&format=" + input.format + "&timezone=" + input.timezone + "&popular=" + input.popular + "&num_of_results=" + input.num_of_results + "&key=" + _FreeApiKey;

    jsonP(url, input.callback);
}

function JSONP_TimeZone(input) {
    var url = _FreeApiBaseURL + "tz.ashx?q=" + input.query + "&format=" + input.format + "&key=" + _FreeApiKey;

    jsonP(url, input.callback);
}

function JSONP_MarineWeather(input) {
    var url = _FreeApiBaseURL + "marine.ashx?q=" + input.query + "&format=" + input.format + "&fx=" + input.fx + "&key=" + _FreeApiKey + "&tide=yes";

    jsonP(url, input.callback);

}

// -------------------------------------------

// Helper Method
function jsonP(url, callback) {
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        contentType: "application/json",
        jsonp: callback,
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


// $(document).ready(function () {
//     GetMarineWeather();
//
// });
//
// google.maps.event.addListener(map, 'click', function( event ){
//     lat = event.latLng.lat();
//     lng = event.latLng.lng();
//     GetMarineWeather(lat, lng);
// });
//
// function GetMarineWeather(e, lat, lng) {
//
//     var marineWeatherInput = {
//         query: '31.93,115.76',
//         format: 'JSON',
//         fx: '',
//         callback: 'MarineWeatherCallback'
//     };
//     JSONP_MarineWeather(marineWeatherInput);
//     e.preventDefault();
// }

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


// $( document ).ready(function() {
//     GetMarineWeather();
// });

// google.maps.event.addListener(map, 'click', function( event ){
//
//     lato = event.latLng.lat();
//     longo = event.latLng.lng();
//     GetMarineWeather(lato, longo);
// });





// function GetMarineWeather(lat, lng) {
//
//     //noinspection JSAnnotator
//     var marineWeatherInput = {
//         query: 'lat, lng',
//         format: 'JSON',
//         fx: '',
//         callback: 'MarineWeatherCallback'
//     };
//     JSONP_MarineWeather(marineWeatherInput);
//     //e.preventDefault();
// }

// function GetMarineWeather() {
//
//     //noinspection JSAnnotator
//     var marineWeatherInput = {
//         query: '-32.93, 115.78',
//         format: 'JSON',
//         fx: '',
//         callback: 'MarineWeatherCallback'
//     };
//     JSONP_MarineWeather(marineWeatherInput);
//     //e.preventDefault();
// }





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



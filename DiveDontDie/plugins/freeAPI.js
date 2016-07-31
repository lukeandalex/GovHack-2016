var _FreeApiBaseURL = 'http://api.worldweatheronline.com/premium/v1/';
/*
    Please change the FreeAPIKey to your own. 
    These keys have been provided for testing only.
    If you don't have one, then register now: http://developer.worldweatheronline.com/member/register    
*/
var _FreeApiKey = '37d91fdb2ee14af0a6395909163107';

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
var conditions;
var dateToString;
var dateToPass;
var cloudCover;








function GetMarineWeather(late, lnge) {
	
	
    var marineWeatherInput = {
		query: late+","+lnge,
        format: 'JSON',
        fx: '',
        callback: 'MarineWeatherCallback'
    };
	//marineWeatherInput.query = 
    JSONP_MarineWeather(marineWeatherInput);
    //e.preventDefault();
	
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

    //dateToPass = Date.parse(dateOutput);
	var today = new Date();
	var weekday = new Array(7);
	weekday[0]=  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";
	
	var month = new Array(12);
	month[0]=  "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";


	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var n = weekday[today.getDay()];
	var m = month[mm-1];


	today = n + " " + dd + " " + m;



    //$('#swell').empty();

    $('#conditionsDate').html(today);
    $('#swell').html(swellOutput);
    $('#wind').html(windOutput);
    $('#tide').html(tideOutput);
    $('#waterTemp').html(waterTemp);
    $('#season').html(cloudCover);
}


